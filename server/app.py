from flask import Flask, request, jsonify
from flask_cors import CORS
from database import add_to_inventory, remove_from_inventory, get_inventory, modify_profile, get_profile
from algo import get_ingredients_from_image, assess_points_from_recipe_header, generate_full_recipe_instructions

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
        modify_profile(data.get('name'), data.get('exp'), data.get('allergies'), 
                       data.get('restrictions'), data.get('diseases'))
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
@app.route('/insert', methods=['POST'])
def insert():
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
@app.route('/validate_ingredients', methods=['POST'])
def validate_ingredients():
    if request.method == 'POST':  
        print("received request")
        ingredients = request.get_json()
        for ingred in ingredients:
            add_to_inventory(ingred['name'], ingred['count'], ingred['units'], ingred['expiry'], ingred['carbon_footprint'])
        return "OK", 200

    else:
        return error()
    
"""
    Generate Recipe Endpoint -> GET
    @return: json with list of recipes and details
"""
@app.route('/generate', methods=['GET'])
def generate():
    if request.method == 'GET':
        profile = get_profile()
        inventory = get_inventory()
        ingredient_names = [ingredient['name'] for ingredient in inventory['ingredients']]
        recipe = generate_full_recipe_instructions(ingredient_names, profile['allergies'])
        # format:
        # {{
        #     "recipe_name": "your answer",
        #     "short_description": "your answer",
        #     "cooking_time": "your answer",
        #     "difficulty": "Choose from: Easy/Medium/Hard",
        #     "ingredients": ["List all required ingredients here"],
        #     "instructions": ["Step-by-step cooking instructions"]
        # }}
        points_analysis = assess_points_from_recipe_header(recipe, profile['restrictions'], profile['diseases'])
        # format:     {{
        # "nutritional_values": "your_response_here",
        # "points_response": "your_response_here",
        # "justification_response": "your_response_here",
        # "warnings": "your_response_here" # Include warnings if applicable, or leave as an empty string.
        # }}

        recipe_info = {**recipe, **points_analysis}
    
        return recipe_info, 200
    else:
        return error()


def error():
    return jsonify({'error': 'Not Found', 'message': 'The requested URL was not found on the server.'}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)