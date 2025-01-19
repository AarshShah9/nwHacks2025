import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';

interface FridgeItem {
  name: string;
  count: number;
  units: string;
  expiry: number;
  carbon_footprint: number;
}

interface InventoryResponse {
  ingredients: FridgeItem[];
}

export default function FridgeScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [fridgeItems, setFridgeItems] = useState<FridgeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://10.43.65.141:5000/inventory/get');
      const data: InventoryResponse = await response.json();
      setFridgeItems(data.ingredients);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading your ingredients...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Items List */}
      <ScrollView style={styles.itemList}>
        {fridgeItems.length === 0 ? (
          <Text style={styles.emptyText}>No items found</Text>
        ) : (
          fridgeItems.map((item, index) => (
            <View key={index} style={styles.itemCard}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemExpiry}>Expires in {item.expiry} days</Text>
                  <Text style={styles.carbonFootprint}>Carbon: {item.carbon_footprint}</Text>
                </View>
              </View>
              <Text style={styles.itemQuantity}>
                {item.count} {item.units}
              </Text>
            </View>
          ))
        )}
      </ScrollView>

      {/* Add Item Button */}
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add Item</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  itemList: {
    flex: 1,
    padding: 20,
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginBottom: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemDetails: {
    flexDirection: 'row',
    gap: 10,
  },
  itemExpiry: {
    fontSize: 14,
    color: '#666',
  },
  carbonFootprint: {
    fontSize: 14,
    color: '#4CAF50',
  },
  itemQuantity: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8B4513',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B4513',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 20,
  },
}); 