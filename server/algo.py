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


def get_ingredients_from_image(base64_encode):
    """
    Uses Google's Gemini API to recognize ingredients in an image.
    """
    print("Detecting ingredients within image...")

    load_dotenv()

    # Fetch  API key from environment variables
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY is not set. Please set it as an environment variable.")
    
    genai.configure(api_key=api_key)
        
    model = genai.GenerativeModel(model_name="gemini-1.5-pro")
    prompt = """
    Analyze the image to detect food ingredients and return a JSON object with the following structure:

    {
        "ingredients": [
            {
                "name": "ingredient_name",
                "count": number_of_items_detected,
                "units": "measurement_units_if_applicable_or_piece",
                "expiry": "expiration_in_days_assuming_recent_purchase",
                "carbon_footprint": "1, 2, or 3 where 3 represents the highest footprint"
            }
        ]
    }

    For each ingredient:
    - Provide the count of items or measurements (e.g., "1 piece", "200 grams").
    - Estimate the expiration time in days assuming the ingredient was recently bought (e.g., fresh produce, packaged goods).
    - Assess the carbon footprint on a scale of 1 to 3, where 3 is the least environmentally friendly.

    Do not include any text outside of the JSON format.
    """
    response = model.generate_content(
        [{'mime_type': 'image/png', 'data': base64_encode}, prompt]
    )


    result = response.text
    log_to_file(response.text, "ingredient_classification/responses")


    ingredients = parse_json_response(result)
    print(ingredients)
    return ingredients

def generate_full_recipe_instructions(ingredients, allergies):
    """
    Uses Google's Gemini API to generate detailed recipe instructions based on the provided recipe header.
    """
    load_dotenv()
    ingredient_names = []
    for ingred in ingredients:
        ingredient_names.append(ingred['name'])

    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY is not set. Please set it as an environment variable.")
    
    genai.configure(api_key=api_key)

    model = genai.GenerativeModel(model_name="gemini-1.5-pro")

    generation_config = {
    "temperature": 2,
    "top_p": 0.95,  # Use snake_case for consistency in Python
    "top_k": 40,  # Adjusted key to match snake_case
    "max_output_tokens": 8192,  # Consistent snake_case
    "response_mime_type": "application/json",  # Consistent snake_case
    "response_schema": {
        "type": "object",
        "properties": {
            "recipe_name": {
                "type": "string",
                "description": "The name of the recipe."
            },
            "short_description": {
                "type": "string",
                "description": "A short description of the recipe."
            },
            "cooking_time": {
                "type": "number",
                "description": "The time required to cook the recipe in minutes."
            },
            "difficulty": {
                "type": "string",
                "enum": ["Easy", "Medium", "Hard"],
                "description": "The difficulty level of the recipe."
            },
            "ingredients": {
                "type": "array",
                "items": {
                    "type": "string"
                },
                "description": "A list of ingredients required for the recipe."
            },
            "instructions": {
                "type": "array",
                "items": {
                    "type": "string"
                },
                "description": "Step-by-step instructions for preparing the recipe."
            },
            "url": {
                "type": "string",
                "description": "A URL to the full recipe or source."
            }
        },
        "required": [
            "recipe_name",
            "short_description",
            "cooking_time",
            "difficulty",
            "ingredients",
            "instructions"
        ]
    }
    }

    prompt = f"""
    I want to generate a structured recipe header using the following ingredients: {allergies}.
    You may assume we have common household commodities.

    I have the following dietary restrictions: {allergies}. Do not include any of these ingredients in the recipe.

    Structure the response in JSON format as given
    """

    response = model.generate_content(prompt, generation_config=generation_config)
    candidates = response.candidates  # or whatever method is provided
    # Accessing the first candidate's text field
    gg = candidates[0]
    text = gg.content.parts[0].text
          
    log_to_file(prompt, "recipe_instructions_generation/prompts")
    log_to_file(text, "recipe_instructions_generation/responses")
    return text


def assess_points_from_recipe_header(recipe, restrictions, diseases):
    """
    Uses Google's Gemini API to generate recipes using the given ingredients, limiting recipe generation using allergies,
    restrictions, diseases.
    """
    print("Assessing points based upon carbon footprint and health...")

    load_dotenv()
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY is not set. Please set it as an environment variable.")
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel(model_name="gemini-1.5-pro")
    if isinstance(recipe["ingredients"], str):
        recipe["ingredients"] = json.loads(recipe["ingredients"])  # Parse string as JSON to get a list

    # Now safely iterate over the ingredients
    ingredient_names = [ingredient for ingredient in recipe["ingredients"]]
    generation_config = {
    "temperature": 2,
    "max_output_tokens": 8192,  # Use snake_case for consistency in Python
    "response_mime_type": "application/json",  # Use snake_case and correct key format
    "response_schema": {  # Correct key to match snake_case convention
        "type": "object",
        "properties": {
            "nutritional_values": {
                "type": "string",
                "description": "The nutritional information as a string."
            },
            "carbon_footprint": {
                "type": "number",
                "description": "The carbon footprint of the recipe, in grams"
            },
            "points_response": {
                "type": "number",
                "description": "The response in numerical format, representing points."
            },
            "justification_response": {
                "type": "string",
                "description": "A textual justification or reasoning."
            },
            "warnings": {
                "type": "string",
                "description": "Warnings or alerts as a string."
            }
        },
        "required": ["nutritional_values", "points_response", "justification_response"]
    }
    }

    # Define the prompt template directly
    prompt = f"""
    Based upon the recipe header, I want to assess the recipe with a points system based upon its nutritional value and carbon footprint.
    Use real and accurate nutritional values and carbon footprint values to the best of your abilities based on the recipe name and description.

    This is the recipe I have: {recipe["recipe_name"]}, {recipe["short_description"]}. 

    The ingredients: {", ".join(ingredient_names)}. 
    These are restrictions and diseases I have: {", ".join(restrictions)}, {", ".join(diseases)}.
    
    If they apply to the recipe, mention it and deduct points accordingly.

    Provide an explanation for the points you give, clearly based upon:
    - Real nutritional values, and healthiness of the recipe/food
    - Carbon footprint values
    - Deductions for diseases and restrictions violated 
    Structure your response in JSON format as given.
    """
    response = model.generate_content(prompt, generation_config=generation_config)
    candidates = response.candidates  # or whatever method is provided
    # Accessing the first candidate's text field
    gg = candidates[0]
    text = gg.content.parts[0].text
    
    log_to_file(prompt, "points_analysis/prompts")
    log_to_file(text, "points_analysis/responses")

    return text


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
    logs_dir = os.path.join("logs", folder_name)
    
    os.makedirs(logs_dir, exist_ok=True)

    current_time = datetime.now().strftime("%Y%m%d_%H%M%S")
    log_filename = os.path.join(logs_dir, f"log_{current_time}.txt")
    
    with open(log_filename, "w") as log_file:
        log_file.write(log_text + "\n")


if __name__ == "__main__":
    main()
