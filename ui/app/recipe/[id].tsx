import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '../../constants/api';
import { useState } from 'react';
import { useUser } from '@/context/UserContext';

interface RecipeIngredient {
  name: string;
  count: number;
  units: string;
}

interface RecipeDetailProps {
  recipe_name: string;
  short_description: string;
  cooking_time: number;
  difficulty: string;
  ingredients: RecipeIngredient[];
  instructions: string[];
  nutritional_values: string;
  points_response: number;
  justification_response: string;
  warnings: string;
  carbon_footprint: number;
  url: string;
}

export default function RecipeDetailScreen() {
  const params = useLocalSearchParams();
  const { refetch } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const recipe: RecipeDetailProps = params.recipe ? JSON.parse(params.recipe as string) : null;
  const isViewMode = params.mode === 'view';
  
console.log(recipe);
  const handleReroll = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/recipes/generate`);
      if (!response.ok) {
        throw new Error('Failed to generate recipe');
      }
      const newRecipe = await response.json();
      // Update the current screen with new recipe data
      router.replace({
        pathname: '/recipe/[id]',
        params: { 
          id: Date.now().toString(),
          recipe: JSON.stringify(newRecipe)
        }
      });
    } catch (error) {
      console.error('Error generating new recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch(`${API_URL}/recipes/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipe: recipe
        })
      });

      if (response.ok) {
        // Switch to read-only mode after successful confirmation
        router.setParams({ mode: 'view' });
        refetch();
      } else {
        console.error('Failed to confirm recipe');
      }
    } catch (error) {
      console.error('Error confirming recipe:', error);
    }
  };

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text>Recipe not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{recipe.recipe_name}</Text>
        <View style={styles.metaInfo}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={20} color="#666" />
            <Text style={styles.metaText}>{recipe.cooking_time} min</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="trophy-outline" size={20} color="#666" />
            <Text style={styles.metaText}>{recipe.points_response} pts</Text>
          </View>
          <View style={styles.difficultyBadge}>
            <Text style={styles.difficultyText}>{recipe.difficulty}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.description}>{recipe.short_description}</Text>

      {recipe.warnings && (
        <View style={styles.warningBox}>
          <Ionicons name="warning-outline" size={20} color="#FFA500" />
          <Text style={styles.warningText}>{recipe.warnings}</Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.listItem}>
            • {ingredient.count} {ingredient.units} {ingredient.name}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        {recipe.instructions.map((instruction, index) => (
          <Text key={index} style={styles.listItem}>{index + 1}. {instruction}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nutritional Information</Text>
        <Text style={styles.nutritionalText}>{recipe.nutritional_values}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recipe Analysis</Text>
        <Text style={styles.justificationText}>{recipe.justification_response}</Text>
      </View>

      {recipe.carbon_footprint && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Carbon Footprint</Text>
          <Text style={styles.nutritionalText}>{recipe.carbon_footprint}</Text>
        </View>
      )}

      {!isViewMode && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.rerollButton]} 
            onPress={handleReroll}
            disabled={loading}
          >
            <Ionicons name="refresh" size={24} color="#8B4513" />
            <Text style={styles.rerollButtonText}>
              {loading ? 'Generating...' : 'Try Another Recipe'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.confirmButton]}
            onPress={handleConfirm}
          >
            <Ionicons name="checkmark-circle" size={24} color="#fff" />
            <Text style={styles.confirmButtonText}>Cook This!</Text>
          </TouchableOpacity>
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
  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 16,
    color: '#666',
  },
  difficultyBadge: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  difficultyText: {
    fontSize: 14,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    paddingHorizontal: 20,
    marginBottom: 20,
    lineHeight: 24,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    margin: 20,
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  warningText: {
    flex: 1,
    color: '#F57C00',
    fontSize: 14,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  listItem: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    lineHeight: 24,
  },
  nutritionalText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  justificationText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'justify',
  },
  buttonContainer: {
    padding: 20,
    gap: 12,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  rerollButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#8B4513',
  },
  confirmButton: {
    backgroundColor: '#8B4513',
  },
  rerollButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4513',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
}); 