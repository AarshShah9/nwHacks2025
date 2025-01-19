import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

// Using the same mock data from recipes.tsx
const MOCK_RECIPES = [
  {
    id: '1',
    name: 'Classic Spaghetti Carbonara',
    time: '30 mins',
    difficulty: 'Medium',
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=200',
    ingredients: [
      '400g spaghetti',
      '200g pancetta',
      '4 large eggs',
      '100g Pecorino Romano',
      'Black pepper'
    ],
    instructions: [
      'Cook pasta in salted water',
      'Fry pancetta until crispy',
      'Mix eggs and cheese',
      'Combine all ingredients'
    ]
  },
  {
    id: '2',
    name: 'Chicken Stir Fry',
    time: '25 mins',
    difficulty: 'Easy',
    imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=200',
    ingredients: [
      '500g chicken breast',
      'Mixed vegetables',
      'Soy sauce',
      'Ginger',
      'Garlic'
    ],
    instructions: [
      'Cut chicken into strips',
      'Stir fry vegetables',
      'Add chicken and sauce',
      'Cook until done'
    ]
  },
  {
    id: '3',
    name: 'Vegetarian Buddha Bowl',
    time: '40 mins',
    difficulty: 'Easy',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=200',
    ingredients: [
      'Quinoa',
      'Roasted chickpeas',
      'Avocado',
      'Sweet potato',
      'Kale'
    ],
    instructions: [
      'Cook quinoa',
      'Roast vegetables',
      'Prepare dressing',
      'Assemble bowl'
    ]
  }
];

export default function RecipeDetail() {
  const { id } = useLocalSearchParams();
  const recipe = MOCK_RECIPES.find(r => r.id === id);

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text>Recipe not found</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      bounces={false}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
    >
      <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.name}</Text>
        <View style={styles.metaInfo}>
          <Text style={styles.meta}>⏱ {recipe.time}</Text>
          <Text style={styles.meta}>📊 {recipe.difficulty}</Text>
        </View>

        <Text style={styles.sectionTitle}>Ingredients</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.listItem}>• {ingredient}</Text>
        ))}

        <Text style={styles.sectionTitle}>Instructions</Text>
        {recipe.instructions.map((instruction, index) => (
          <Text key={index} style={styles.listItem}>{index + 1}. {instruction}</Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  metaInfo: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  meta: {
    color: '#666',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 24,
  },
}); 