from flask import Flask, request, jsonify
from flask_cors import CORS
from database import add_to_inventory, remove_from_inventory, get_inventory, modify_profile, get_profile, add_to_recipes, get_recipes
from algo import get_ingredients_from_image, assess_points_from_recipe_header, generate_full_recipe_instructions
import json
app = Flask(__name__)
CORS(app)

"""
    Add Profile Endpoint -> POST
    @params: user profile in request.data
    @return: ok
"""
@app.route('/profile/modify', methods=['POST'])
def profileModify():
    if request.method == 'POST':
        data = request.get_json()
        restrictions = data.get('restrictions')
        if not isinstance(restrictions, list):
            restrictions = [token.strip() for token in data.get('restrictions').split(',')]
        allergies = data.get('allergies')
        if not isinstance(allergies, list):
            allergies = [token.strip() for token in data.get('allergies').split(',')]
        diseases = data.get('diseases')
        if not isinstance(diseases, list):
            diseases = [token.strip() for token in data.get('diseases').split(',')]

        modify_profile(data.get('name'), data.get('exp'), allergies, 
                       restrictions, diseases)
        return "OK", 200
    else:
        return error()
    
"""
    Get Profile Endpoint -> GET
    @return: user profile
"""
@app.route('/profile/get', methods=['GET'])
def profileGet():
    if request.method == 'GET':
        return get_profile(), 200
    else:
        return error()
    
"""
    Get Ingredients -> GET
    @return: all current ingredients
"""
@app.route('/inventory/get', methods=['GET'])
def inventoryGet():
    if request.method == 'GET':
        return get_inventory(), 200
    else:
        return error()

"""
    Add Image Endpoint -> POST
    @params: base64 image in request.data
    @return: json with list of ingredients + amount
"""
@app.route('/ingredients/scan', methods=['POST'])
def ingredientsScan():
    if request.method == 'POST':  
        print("received request")
        ingredients = get_ingredients_from_image(request.get_json().get('image'))
        print(ingredients) 
        # example {'ingredients': [{'name': 'tomato', 'count': 4, 'units': 'piece', 'expiry': 7, 'carbon_footprint': 1}]}
        return ingredients, 200

    else:
        return error()
    
"""
    Validate Ingredients Endpoint -> POST
    @params: ingredients json
    @return: success
"""
@app.route('/ingredients/validate', methods=['POST'])
def ingredientsValidate():
    if request.method == 'POST':  
        print("received request to add all ingredients")
        ingredients = request.get_json()
        for ingred in ingredients:
            add_to_inventory(ingred['name'], ingred['count'], ingred['units'], ingred['expiry'], ingred['carbon_footprint'])
        return "OK", 200

    else:
        return error()

"""
    Delete Ingredient Endpoint -> POST
    @param: ingredient name
"""
@app.route('/ingredients/delete', methods=['POST'])
def ingredientsDelete():
    if request.method == 'POST':
        data = request.get_json()
        name = data.get_json('name')
        remove_from_inventory(name, 999999)
        return 200
    else:
        return error()
    
"""
    Generate Recipe Endpoint -> GET
    @return: json with list of recipes and details
"""
@app.route('/recipes/generate', methods=['GET'])
def recipesGenerate():
    if request.method == 'GET':
        profile = get_profile()
        inventory = get_inventory()
        recipe = generate_full_recipe_instructions(inventory['ingredients'], profile['allergies'], profile['restrictions'])
        recipe_parsed = json.loads(recipe)        # format:
        # {{
        #     "recipe_name": "your answer",
        #     "short_description": "your answer",
        #     "cooking_time": "your answer",
        #     "difficulty": "Choose from: Easy/Medium/Hard",
        #     "ingredients": ["List all required ingredients here"],
        #     "instructions": ["Step-by-step cooking instructions"],
        #      "url" : "dhdhj"
        # }}
        points_analysis = assess_points_from_recipe_header(recipe_parsed, profile['diseases'])
        # format:     {{
        # "nutritional_values": "your_response_here",
        # "points_response": "your_response_here",
        # "justification_response": "your_response_here",
        # "warnings": "your_response_here" # Include warnings if applicable, or leave as an empty string.
        # }}
        points_parsed = json.loads(points_analysis)        # format:
        print("recipe info", points_parsed)
        
        recipe_info = {**recipe_parsed, **points_parsed}

        return recipe_info, 200
    else:
        return error()

"""
    Confirm Recipes Endpoint -> POST
    @param: ingredients list
"""
@app.route('/recipes/confirm', methods=['POST'])
def recipesConfirm():
    if request.method == 'POST':
        profile = get_profile()
        data = request.get_json()
        recipe_info = data.get_json('recipe')
        new_points = int(recipe_info['points_response'])
        ingredients = recipe_info['ingredients']
        for ingred in ingredients:
            remove_from_inventory(ingred['name'], ingred['count'])
        modify_profile(profile['name'], profile['exp'] + new_points, profile['allergies'], 
                       profile['restrictions'], profile['restrictions'])
        add_to_recipes(recipe_info['recipe_name'], recipe_info['short_description'], recipe_info['cooking_time'], recipe_info['difficulty'],  recipe_info['ingredients'], recipe_info['instructions'], "",
                       recipe_info['nutritional_values'], recipe_info['points_response'], recipe_info['justification_response'], recipe_info['warnings'])
        return 200
    else:
        return error()


"""
    Get Recipes Endpoint -> GET
    @return: recipes
"""
@app.route('/recipes/get', methods=['GET'])
def recipesGet():
    if request.method == 'GET':
        return get_recipes(), 200
    else:
        return error()

def error():
    return jsonify({'error': 'Not Found', 'message': 'The requested URL was not found on the server.'}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)