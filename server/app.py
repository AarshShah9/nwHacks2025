import base64
from flask import Flask, request, jsonify
from flask_cors import CORS

from algo import get_ingredients_from_image

app = Flask(__name__)
CORS(app)

"""
    Submit Ingredient Image Endpoint -> POST
    @return: json with list of ingredients scanned
"""
@app.route('/ingredients/inventory', methods=['POST'])
def generate():
    if request.method == 'GET':
        # Get images? 
        return 0
    else:
        return error()
    

"""
    Submit Ingredient Image Endpoint -> POST
    @return: json with list of ingredients scanned
"""
@app.route('/ingredients/scan', methods=['POST'])
def scan_ingredients():
    if request.method == 'POST':
        try:
            data = request.get_json()
            image_data = data['image']
            image = base64.b64decode(image_data)
            # need to save the images somehow
            ingredients = get_ingredients_from_image(image) # in algo.py
            return jsonify({'ingredients': ingredients})
        except Exception as e:
            return jsonify({'error': str(e)}), 400
    else:
        return error()
    

"""
    Approve -> POST
    @return: json with list of ingredients scanned
"""
@app.route('/ingredients/scan', methods=['POST'])
def scan_ingredients():
    if request.method == 'POST':
        try:
            data = request.get_json()
            image_data = data['image']
            image = base64.b64decode(image_data)
            # right now takes path to image 
            # need to save the images somehow
            ingredients = get_ingredients_from_image(image) # in algo.py
            return jsonify({'ingredients': ingredients})
        except Exception as e:
            return jsonify({'error': str(e)}), 400
    else:
        return error()

"""
    Generate Recipe Endpoint -> POST
    @params: ingredients to use
    @return: ok
"""
@app.route('/recipe/generate', methods=['POST'])
def generate_recipe_header():
    if request.method == 'POST':
        try:
            # Get the JSON data from the frontend
            data = request.get_json()
            ingredients = data['ingredients']
            
            # Call the existing function to generate the recipe header
            recipe_header = generate_recipe_header_from_ingredients(ingredients, allergies, previous_recipes)

            # If recipe header is None, return an error message
            if not recipe_header:
                return jsonify({'error': 'Failed to generate recipe header'}), 500
            
            # Return the recipe header in JSON format
            return jsonify(recipe_header)
        
        except Exception as e:
            # Handle any unexpected errors
            return jsonify({'error': str(e)}), 400
    else:
        return jsonify({'error': 'Invalid request method'}), 405

def error():
    return jsonify({'error': 'Not Found', 'message': 'The requested URL was not found on the server.'}), 404

if __name__ == '__main__':
    app.run(debug=True)