import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';

interface FridgeItem {
  name: string;
  quantity: number;
  unit: string;
  category: string;
}

// Mock data - replace with API call later
const MOCK_FRIDGE_ITEMS: FridgeItem[] = [
  { name: 'Milk', quantity: 1, unit: 'L', category: 'Dairy' },
  { name: 'Eggs', quantity: 12, unit: 'pcs', category: 'Dairy' },
  { name: 'Chicken Breast', quantity: 500, unit: 'g', category: 'Meat' },
  { name: 'Tomatoes', quantity: 4, unit: 'pcs', category: 'Vegetables' },
  { name: 'Onions', quantity: 3, unit: 'pcs', category: 'Vegetables' },
  { name: 'Apples', quantity: 6, unit: 'pcs', category: 'Fruits' },
  { name: 'Pasta', quantity: 500, unit: 'g', category: 'Pantry' },
  { name: 'Rice', quantity: 1, unit: 'kg', category: 'Pantry' },
];

const CATEGORIES = ['All', 'Dairy', 'Meat', 'Vegetables', 'Fruits', 'Pantry'];

export default function FridgeScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [fridgeItems, setFridgeItems] = useState<FridgeItem[]>([]);

  useEffect(() => {
    // Filter items based on selected category
    const filteredItems = selectedCategory === 'All'
      ? MOCK_FRIDGE_ITEMS
      : MOCK_FRIDGE_ITEMS.filter(item => item.category === selectedCategory);
    setFridgeItems(filteredItems);
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      {/* Category Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContainer}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.categoryTextActive
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Items List */}
      <ScrollView style={styles.itemList}>
        {fridgeItems.map((item, index) => (
          <View key={index} style={styles.itemCard}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCategory}>{item.category}</Text>
            </View>
            <Text style={styles.itemQuantity}>
              {item.quantity} {item.unit}
            </Text>
          </View>
        ))}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  categoryScroll: {
    maxHeight: 50,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    gap: 10,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  categoryButtonActive: {
    backgroundColor: '#8B4513',
  },
  categoryText: {
    color: '#666',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
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
  itemCategory: {
    fontSize: 14,
    color: '#666',
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
}); 