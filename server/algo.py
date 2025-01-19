import os
import google.generativeai as genai
import base64
from dotenv import load_dotenv
from datetime import datetime
import json
import re

"""
Definition of a recipe metadata, full recipe instructions elsewhere.
- recipe name
- short description
- cooking time
- ingredients
- nutritional values (calories, fats, proteins, carbs, etc.)
- carbon footprint
- points
- points justifications
"""


def get_ingredients_from_image(image_path):
    """
    Uses Google's Gemini API to recognize ingredients in an image.
    """
    print("Detecting ingredients within image...")

    load_dotenv()

    # Fetch the API key from environment variables
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY is not set. Please set it as an environment variable.")
    
    # Configure the Gemini API
    genai.configure(api_key=api_key)

    # Load the image
    with open(image_path, 'rb') as image_file:
        image_data = image_file.read()
    
    # Encode the image in base64
    encoded_image = base64.b64encode(image_data).decode('utf-8')
    
    # Define the model and the prompt
    model = genai.GenerativeModel(model_name="gemini-1.5-pro")
    prompt = "List all food ingredients within this image, separated by a single comma. Only use one word per ingredient."

    # Generate a response using the model
    response = model.generate_content(
        [{'mime_type': 'image/png', 'data': encoded_image}, prompt]
    )

    result = response.text
    log_to_file(response.text, "ingredient_classification/responses")

    # Extract the response text
    ingredients = [x.strip() for x in result.split(',')]
    print(ingredients)
    return ingredients

def generate_recipe_header_from_ingredients(ingredients, allergies, previous_recipes):
    """
    Uses Google's Gemini API to generate recipes using the given ingredients, limiting recipe generation using allergies.
    """
    print(f"Generating recipe header from ingredients: {ingredients} ...")
    load_dotenv()

    # Fetch the API key from environment variables
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY is not set. Please set it as an environment variable.")
    
    # Configure the Gemini API
    genai.configure(api_key=api_key)

    # Define the model and the prompt
    model = genai.GenerativeModel(model_name="gemini-1.5-pro")

    prompt = f"""
    I want to generate a structured recipe header using the following ingredients: {", ".join(ingredients)}.
    You may assume we have common household commodities.

    I have the following dietary restrictions: {", ".join(allergies)}. Do not include any of these ingredients in the recipe.

    {"Avoid generating recipes that are very similar to these:" + ", ".join(previous_recipes) if previous_recipes else "None"}.

    Structure your response in JSON format as follows:
    {{
    "recipe_name": "your_response",
    "short_description": "your_response",
    "cooking_time": "your_response"
    }}

    Do not include any additional text outside the JSON format.
    """

    # Generate a response using the model
    response = model.generate_content(prompt)

    result = response.text

    log_to_file(prompt, "recipe_header_generation/prompts")
    log_to_file(response.text, "recipe_header_generation/responses")
    # Extract and format the response
    try:
        recipe = parse_json_response(result)
    except ValueError as e:
        log_to_file(str(e), "recipe_header_generation/errors")
        recipe = None

    print(recipe)
    return recipe
    

def generate_full_recipe_instructions(recipe_header):
    """
    Uses Google's Gemini API to generate detailed recipe instructions based on the provided recipe header.
    """
    print(f"Generating full recipe instructions for: {recipe_header.get('recipe_name', 'Unknown Recipe')}...")
    load_dotenv()

    # Fetch the API key from environment variables
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY is not set. Please set it as an environment variable.")
    
    # Configure the Gemini API
    genai.configure(api_key=api_key)

    # Define the model and the prompt
    model = genai.GenerativeModel(model_name="gemini-1.5-pro")

    # Create the prompt for generating recipe instructions
    prompt = f"""
    Based on the following recipe header, generate detailed recipe instructions:
    {{
    "recipe_name": "{recipe_header.get('recipe_name', '')}",
    "short_description": "{recipe_header.get('short_description', '')}",
    "cooking_time": "{recipe_header.get('cooking_time', '')}"
    }}

    Structure the response in JSON format as follows:
    {{
    "recipe_name": "{recipe_header.get('recipe_name', '')}",
    "short_description": "{recipe_header.get('short_description', '')}",
    "cooking_time": "{recipe_header.get('cooking_time', '')}",
    "difficulty": "Choose from: Easy/Medium/Hard",
    "ingredients": ["List all required ingredients here"],
    "instructions": ["Step-by-step cooking instructions"]
    }}

    Do not include any text outside the JSON format.
    """

    # Generate a response using the model
    response = model.generate_content(prompt)

    result = response.text

    log_to_file(prompt, "recipe_instructions_generation/prompts")
    log_to_file(response.text, "recipe_instructions_generation/responses")

    # Extract and format the response
    try:
        full_recipe = parse_json_response(result)
    except ValueError as e:
        log_to_file(str(e), "recipe_instructions_generation/errors")
        full_recipe = None

    print(full_recipe)
    return full_recipe


def assess_points_from_recipe_header(header, restrictions, diseases):
    """
    Uses Google's Gemini API to generate recipes using the given ingredients, limiting recipe generation using allergies,
    restrictions, diseases.
    """
    print("Assessing points based upon carbon footprint and health...")

    load_dotenv()
    # Fetch the API key from environment variables
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY is not set. Please set it as an environment variable.")
    # Configure the Gemini API
    genai.configure(api_key=api_key)

    # Define the model and the prompt
    model = genai.GenerativeModel(model_name="gemini-1.5-pro")
    prompt = f"""
    Based upon the recipe header, I want to assess the recipe with a points system based upon its nutritional value and carbon footprint.
    Use real and accurate nutritional values and carbon footprint values to the best of your abilities based on the recipe name and description.

    This is the recipe I have: {header["recipe_name"]}, {header["short_description"]}. 

    These are restrictions and diseases I have: {", ".join(restrictions)}, {", ".join(diseases)}. 
    If they apply to the recipe, mention it and deduct points accordingly.

    Provide an explanation for the points you give, clearly based upon:
    - Real nutritional values, and healthiness of the recipe/food
    - Carbon footprint values
    - Deductions for diseases and restrictions violated 

    Structure your response in JSON format as follows:
    {{
    "nutritional_values": "your_response_here",
    "points_response": "your_response_here",
    "justification_response": "your_response_here",
    "warnings": "your_response_here" # Include warnings if applicable, or leave as an empty string.
    }}
    Do not include any text outside the JSON format.
    """

    # Generate a response using the model
    response = model.generate_content(prompt)

    log_to_file(prompt, "points_analysis/prompts")
    log_to_file(response.text, "points_analysis/responses")
    # Extract and format the response
    try:
        points_analysis = parse_json_response(response.text)
    except ValueError as e:
        log_to_file(str(e), "points_analysis/errors")
        points_analysis = None
    return points_analysis


def main():
    # test_get_ingredients_from_image()
    # test_recipe_header_gen()
    # test_points_analysis()
    test_full_recipe_generation()
    return


def test_get_ingredients_from_image():
    image_path = "test_images/several_ingredients.png"
    ingredients = get_ingredients_from_image(image_path)

    assert len(ingredients) > 0
    return

def test_recipe_header_gen():
    test_ingredients_1 = ["tomato", "onion", "garlic", "beef", "pasta"]
    test_allergies_1 = ["dairy"]
    test_previous_recipes_1 = []

    ingredients = generate_recipe_header_from_ingredients(test_ingredients_1, test_allergies_1, [])
    # ingredients = generate_recipe_header_from_ingredients(test_ingredients_1, "tomato", [])

    assert len(ingredients) > 0
    return

def test_points_analysis():
    response = assess_points_from_recipe_header({
        "recipe_name": "Spaghetti Carbonara",
        "short_description": "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
        "cooking_time": "20 minutes"
    }, ["dairy"], ["lactose intolerance"])

def test_full_recipe_generation():
    ingredients = ["chicken breast", "broccoli", "soy sauce", "garlic"]
    allergies = ["gluten", "dairy"]
    previous_recipes = ["Broccoli Chicken Stir-Fry"]
    recipe_header = generate_recipe_header_from_ingredients(ingredients, allergies, previous_recipes)
    if recipe_header:
        full_recipe = generate_full_recipe_instructions(recipe_header)
        print(full_recipe)


def parse_json_response(response_text):
    """
    Parses the JSON response into a dictionary.
    """
    json_match = re.search(r"\{.*\}", response_text, re.DOTALL)
    if json_match:
        json_text = json_match.group(0)  # Extract the JSON string
        try:
            return json.loads(json_text)
        except json.JSONDecodeError as e:
            raise ValueError(f"Invalid JSON format: {e}")
    else:
        raise ValueError("No JSON content found in the response.")
    
    
def log_to_file(log_text, folder_name):
    """
    Logs the provided text into a timestamped file within the specified folder.
    Automatically creates non-existent directories in the path.
    
    Args:
        log_text (str): The text to be logged.
        folder_name (str): The folder path where the log file should be stored.
    """
    # Create the full path for the logs directory
    logs_dir = os.path.join("logs", folder_name)
    
    # Ensure all directories in the path exist
    os.makedirs(logs_dir, exist_ok=True)
    
    # Generate a timestamped log file name
    current_time = datetime.now().strftime("%Y%m%d_%H%M%S")
    log_filename = os.path.join(logs_dir, f"log_{current_time}.txt")
    
    # Write the log text to the file
    with open(log_filename, "w") as log_file:
        log_file.write(log_text + "\n")


if __name__ == "__main__":
    main()
