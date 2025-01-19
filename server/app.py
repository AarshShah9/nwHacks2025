from flask import Flask, request, jsonify
from flask_cors import CORS
from database import add_to_inventory, remove_from_inventory, get_inventory, modify_profile, get_profile

app = Flask(__name__)
CORS(app)

"""
    Add Profile Endpoint -> POST
    @params: user profile in request.data
    @return: ok
"""
@app.route('/profile/modify', methods=['POST'])
def modify():
    if request.method == 'POST':
        data = request.data
        modify_profile(data.name, data.exp, data.allergies, data.restrictions, data.diseases)
        return "OK", 200
    else:
        return error()
    
"""
    Get Profile Endpoint -> GET
    @return: user profile
"""
@app.route('/profile/get', methods=['GET'])
def get():
    if request.method == 'GET':
        return get_profile(), 200
    else:
        return error()

"""
    Add Image Endpoint -> POST
    @params: base64 image in request.data
    @return: json with list of ingredients + amount
"""
@app.route('/insert/', methods=['POST'])
def insert():
    if request.method == 'POST':
        # Use algo.py to parse and add to database
        return 0
    else:
        return error()
    
"""
    Generate Recipe Endpoint -> GET
    @return: json with list of recipes and details
"""
@app.route('/generate/', methods=['GET'])
def generate():
    if request.method == 'GET':
        # Use algo.py to cross match ingredients and get 4 recipes
        return 0
    else:
        return error()


def error():
    return jsonify({'error': 'Not Found', 'message': 'The requested URL was not found on the server.'}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)