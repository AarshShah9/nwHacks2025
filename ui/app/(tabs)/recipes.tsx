import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '../../constants/api';
import { useRouter } from 'expo-router';

interface Recipe {
  recipe_name: string;
  short_description: string;
  cooking_time: string;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
  nutritional_values: string;
  points_response: string;
  justification_response: string;
  warnings: string;
}

export default function RecipesScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/recipes/get`);
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await response.json();
      setRecipes(data.recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateRecipe = async () => {
    try {
      setGenerating(true);
      const response = await fetch(`${API_URL}/recipes/generate`);
      if (!response.ok) {
        throw new Error('Failed to generate recipe');
      }
      const recipe = await response.json();
      // Navigate to recipe detail screen with the generated recipe
      router.push({
        pathname: '/recipe/[id]',
        params: { 
          id: Date.now().toString(),
          recipe: JSON.stringify(recipe)
        }
      });
    } catch (error) {
      console.error('Error generating recipe:', error);
    } finally {
      setGenerating(false);
    }
  };

  if (loading || generating) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B4513" />
        <Text style={styles.loadingText}>
          {generating ? 'Generating your recipe...' : 'Loading recipes...'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Recipes</Text>
        <TouchableOpacity 
          style={styles.generateButton}
          onPress={handleGenerateRecipe}
        >
          <Ionicons name="add-circle-outline" size={24} color="#fff" />
          <Text style={styles.generateButtonText}>Generate New Recipe</Text>
        </TouchableOpacity>
      </View>

      {recipes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No recipes available</Text>
          <Text style={styles.emptySubText}>Generate your first recipe!</Text>
        </View>
      ) : (
        <View style={styles.recipesContainer}>
          {recipes.map((recipe, index) => (
            <TouchableOpacity key={index} style={styles.recipeCard}>
              <View style={styles.recipeHeader}>
                <Text style={styles.recipeName}>{recipe.recipe_name}</Text>
                <View style={styles.recipeMetrics}>
                  <View style={styles.metric}>
                    <Ionicons name="time-outline" size={16} color="#666" />
                    <Text style={styles.metricText}>{recipe.cooking_time}</Text>
                  </View>
                  <View style={styles.metric}>
                    <Ionicons name="trophy-outline" size={16} color="#666" />
                    <Text style={styles.metricText}>{recipe.points_response} pts</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.recipeDescription}>{recipe.short_description}</Text>
              <View style={styles.difficultyBadge}>
                <Text style={styles.difficultyText}>{recipe.difficulty}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B4513',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  recipesContainer: {
    padding: 20,
  },
  recipeCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  recipeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  recipeMetrics: {
    flexDirection: 'row',
    gap: 12,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricText: {
    fontSize: 14,
    color: '#666',
  },
  recipeDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  difficultyText: {
    fontSize: 12,
    color: '#333',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
  },
}); 