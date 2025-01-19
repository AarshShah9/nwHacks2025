import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate('keys/service-account-key.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

'''
    Add to 'inventory' collection
    @params: name, amount, units, expiry, carbonImpact
'''
def add_to_inventory(name, count, units, expiry, carbon_footprint):
    inventory_ref = db.collection('inventory')
    inventory_ref = inventory_ref.document(name)
    doc = inventory_ref.get()
    if doc.exists:
        inventory_ref.update({'count': firestore.Increment(count)})
    else:
        inventory_ref.set({
            'count': count,
            'units': units,
            'expiry': expiry,
            'carbon_footprint': carbon_footprint
        })
    print("%s added to inventory" % (name))

'''
    Remove from 'inventory' collection
    @params: name, amount
'''
def remove_from_inventory(name, amount):
    inventory_ref = db.collection('inventory')
    inventory_ref = inventory_ref.document(name)
    count = inventory_ref.get().get('count')
    if count - amount <= 0:
        inventory_ref.delete()
        print("%s has been removed" % (name))
    else: 
        inventory_ref.update({ 'count':  count - amount})

'''
    Get entire 'inventory' collection
    @return: json formatted inventory
'''
def get_inventory():
    inventory_ref = db.collection('inventory')
    docs = inventory_ref.stream()
    ret = {"ingredients": []}

    for doc in docs:
        cur = doc.to_dict()
        cur['name'] = doc.id
        ret['ingredients'].append(cur)

    return ret

'''
    Add to 'recipes' collection
    @params: name, short_description, cooking_time, difficulty, ingredients, instructions,
             nutritional_values, points_response, justification_response, warnings
'''
def add_to_recipes(name, short_description, cooking_time, difficulty, ingredients, instructions, url,
                   nutritional_values, points_response, justification_response, warnings):
    recipes_ref = db.collection('recipes')
    recipes_ref = recipes_ref.document(name)
    recipes_ref.set({
        'short_description': short_description,
        'cooking_time': cooking_time,
        'difficulty': difficulty,
        'ingredients': ingredients,
        'instructions': instructions,
        'url': url,
        'nutritional_values': nutritional_values,
        'points_response': points_response,
        'justification_response': justification_response,
        'warnings': warnings
    })
    print("%s added to recipes" % (name))

'''
    Get 'recipes' collection
    @return: json list of recipes
'''
def get_recipes():
    recipes_ref = db.collection('recipes')
    docs = recipes_ref.stream()

    ret = {"recipes": []}

    for doc in docs:
        cur = doc.to_dict()
        cur['recipe_name'] = doc.id
        ret['recipes'].append(cur)

    return ret

'''
    Add/Modify User Profile
    @params: name, exp, allergies, restrictions, diseases
'''
def modify_profile(name, exp, allergies, restrictions, diseases):
    profile_ref = db.collection('user1')
    profile_ref = profile_ref.document('profile')
    profile_ref.set({
        'name': name,
        'exp': exp,
        'allergies': allergies,
        'restrictions': restrictions,
        'diseases': diseases
    })
    print("%s has been added" % (name))

'''
    Get User Profile
    @return: json user profile
'''
def get_profile():
    profile_ref = db.collection('user1')
    profile_ref = profile_ref.document('profile')

    return profile_ref.get().to_dict()

