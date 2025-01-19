from database import add_to_inventory, remove_from_inventory, get_inventory, modify_profile, get_profile

def test1():
    modify_profile("peter", 100, [], [], [])
    print(get_profile())

def test2():
    add_to_inventory("beef", 2, "raw")
    add_to_inventory("onion", 2, "raw")
    remove_from_inventory("onion", 1)
    print(get_inventory())

if __name__ == '__main__':
    test2()