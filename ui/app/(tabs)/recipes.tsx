import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

interface Recipe {
  id: string;
  name: string;
  time: string;
  difficulty: string;
  imageUrl: string;
  ingredients: string[];
  instructions: string[];
}

// Mock data for recipes
const MOCK_RECIPES: Recipe[] = [
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

export default function RecipesScreen() {
  const router = useRouter();

  const renderRecipeCard = ({ item }: { item: Recipe }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => router.push({
        pathname: '/recipe/[id]',
        params: { id: item.id }
      })}
    >
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.image}
      />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.metaInfo}>
          <Text style={styles.meta}>⏱ {item.time}</Text>
          <Text style={styles.meta}>📊 {item.difficulty}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recipes</Text>
      <FlatList
        data={MOCK_RECIPES}
        renderItem={renderRecipeCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  list: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardContent: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 15,
  },
  meta: {
    color: '#666',
    fontSize: 14,
  },
}); 