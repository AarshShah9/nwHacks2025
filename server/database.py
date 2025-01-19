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
    inventory_ref.set({
        'count': count,
        'units': units,
        'expiry': expiry,
        'carbon_footprint': carbon_footprint
    })
    print("%s added to inventory" % (name))

'''
    Add to 'recipe' collection
    @params: name, amount, units, expiry, carbonImpact
'''
def add_to_recipe(name, count, units, expiry, carbon_footprint):
    inventory_ref = db.collection('recipes')
    inventory_ref = inventory_ref.document(name)
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
    if amount == 0:
        inventory_ref.delete()
    else: 
        inventory_ref.update({ 'amount': amount })
    print("%s has been removed" % (name))

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

