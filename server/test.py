from database import add_to_inventory, remove_from_inventory, get_inventory, modify_profile, get_profile, get_recipes

def test1():
    modify_profile("peter", 100, [], [], [])
    print(get_profile())

def test2():
    print(get_recipes())

if __name__ == '__main__':
    test2()