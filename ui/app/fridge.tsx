import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { API_URL } from '@/constants/api';
import { FlashList } from '@shopify/flash-list';

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
  const [fridgeItems, setFridgeItems] = useState<FridgeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchInventory = async () => {
    try {
      const response = await fetch(`${API_URL}/inventory/get`);
      const data: InventoryResponse = await response.json();
      setFridgeItems(data.ingredients);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  useEffect(() => {
    fetchInventory().finally(() => setLoading(false));
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchInventory();
    setRefreshing(false);
  };

  const handleDelete = async (itemName: string) => {
    try {
      setDeleting(itemName);
      const response = await fetch(`${API_URL}/ingredients/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: itemName
        })
      });

      if (response.ok) {
        // Remove item from local state
        setFridgeItems(current => current.filter(item => item.name !== itemName));
      } else {
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      setDeleting(null);
    }
  };

  const getCarbonFootprintColor = (value: number) => {
    switch (value) {
      case 1:
        return '#4CAF50'; // Green
      case 2:
        return '#FFC107'; // Yellow
      case 3:
        return '#F44336'; // Red
      default:
        return '#666';
    }
  };

  const renderItem = ({ item }: { item: FridgeItem }) => (
    <View style={styles.itemCard}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>
          {item.name.split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          ).join(' ')}
        </Text>
        <View style={styles.itemDetails}>
          <Text style={styles.itemExpiry}>Expires in {item.expiry} days</Text>
          <Text style={[
            styles.carbonFootprint,
            { color: getCarbonFootprintColor(item.carbon_footprint) }
          ]}>
            Carbon: {item.carbon_footprint}
          </Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.itemQuantity}>
          {item.count} {item.units}
        </Text>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => handleDelete(item.name)}
          disabled={deleting === item.name}
        >
          <Ionicons 
            name="trash-outline" 
            size={20} 
            color={deleting === item.name ? '#999' : '#F44336'} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading your ingredients...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlashList
          data={fridgeItems}
          renderItem={renderItem}
          estimatedItemSize={80}
          contentContainerStyle={styles.itemList}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>No items found</Text>
          )}
        />
      </View>

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
  listContainer: {
    flex: 1,
  },
  itemList: {
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
  rightContainer: {
    alignItems: 'flex-end',
    gap: 8,
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
  },
  itemQuantity: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8B4513',
  },
  deleteButton: {
    padding: 8,
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