import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUser } from '../../context/UserContext';

const QUICK_ACTIONS = [
  { id: 1, icon: 'grid' as keyof typeof Ionicons.glyphMap, label: 'My Fridge', route: '/fridge'},
  { id: 2, icon: 'search' as keyof typeof Ionicons.glyphMap, label: 'Search' },
  { id: 3, icon: 'calendar' as keyof typeof Ionicons.glyphMap, label: 'Track', route: '/track' },
  { id: 4, icon: 'trophy' as keyof typeof Ionicons.glyphMap, label: 'Leaderboard', route: '/leaderboard' },
];

const EXERCISES = [
  {
    id: 1,
    title: 'Beginner Recipes',
    subtitle: 'Start your cooking journey',
    color: '#FFE4B5',
    icon: '🥗',
    animal: '🐰'
  },
  {
    id: 2,
    title: 'Quick Meals',
    subtitle: '15-minute recipes',
    color: '#E0FFE0',
    icon: '⏱️',
    animal: '🐊'
  },
  {
    id: 3,
    title: 'Healthy Options',
    subtitle: 'Nutritious and delicious',
    color: '#FFE4E1',
    icon: '🥑',
    animal: '🦊'
  }
];

const TRENDING_RECIPES = [
  {
    id: 1,
    title: 'Veggie Stir Fry',
    cookTime: '20 min',
    color: '#FFE0E0',
    icon: '🥢',
    animal: '🐯'
  },
  {
    id: 2,
    title: 'Pasta Carbonara',
    cookTime: '25 min',
    color: '#E0F4FF',
    icon: '🍝',
    animal: '🦊'
  },
  {
    id: 3,
    title: 'Berry Smoothie',
    cookTime: '5 min',
    color: '#FFE6F5',
    icon: '🥤',
    animal: '🐼'
  }
];

export default function DiscoverScreen() {
  const router = useRouter();
  const { profileData, loading } = useUser();

  const getLevel = (exp: number) => {
    if (exp >= 1000) return 5;
    if (exp >= 500) return 4;
    if (exp >= 250) return 3;
    if (exp >= 100) return 2;
    return 1;
  };

  const getLevelProgress = (exp: number) => {
    // Define level thresholds
    const levels = [
      { min: 0, max: 100 },    // Level 1: 0-100
      { min: 100, max: 250 },  // Level 2: 100-250
      { min: 250, max: 500 },  // Level 3: 250-500
      { min: 500, max: 1000 }, // Level 4: 500-1000
      { min: 1000, max: 1500 } // Level 5: 1000-1500
    ];

    const currentLevel = getLevel(exp) - 1; // Convert to 0-based index
    const { min, max } = levels[currentLevel];
    const levelExp = exp - min;
    const levelRange = max - min;
    const progress = (levelExp / levelRange) * 100;
    
    return Math.min(progress, 100);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Discover</Text>

      {/* Progress Card */}
      <View style={styles.progressCard}>
        <View style={styles.progressContent}>
          <View style={styles.levelIcon}>
            <Text style={styles.levelNumber}>
              {loading ? '-' : profileData ? getLevel(profileData.exp) : '1'}
            </Text>
          </View>
          <View style={styles.progressText}>
            <Text style={styles.progressTitle}>
              Welcome back, {loading ? '...' : profileData?.name || 'Chef'}
            </Text>
            <Text style={styles.progressSubtitle}>Let's hit our daily goal!</Text>
          </View>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${loading ? 0 : profileData ? getLevelProgress(profileData.exp) : 0}%` }
            ]} 
          />
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        {QUICK_ACTIONS.map((action) => (
          <TouchableOpacity 
            key={action.id} 
            style={styles.actionItem}
            onPress={() => action.route ? router.push({ pathname: action.route as any }) : null}
          >
            <View style={styles.actionIcon}>
              <Ionicons name={action.icon} size={24} color="#8B4513" />
            </View>
            <Text style={styles.actionLabel}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Exercise Section */}
      <View style={styles.exerciseSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Explore</Text>
          <TouchableOpacity>
            <Text style={styles.seeMore}>See More →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.exerciseList}
        >
          {EXERCISES.map((exercise) => (
            <TouchableOpacity 
              key={exercise.id} 
              style={[styles.exerciseCard, { backgroundColor: exercise.color }]}
            >
              <View style={styles.exerciseContent}>
                <View>
                  <Text style={styles.exerciseTitle}>{exercise.title}</Text>
                  <Text style={styles.exerciseSubtitle}>{exercise.subtitle}</Text>
                  <TouchableOpacity style={styles.letsGoButton}>
                    <Text style={styles.buttonText}>Let's Go</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.exerciseAnimal}>{exercise.animal}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Trending Recipes Section */}
      <View style={styles.exerciseSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Recipes</Text>
          <TouchableOpacity>
            <Text style={styles.seeMore}>See More →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.exerciseList}
        >
          {TRENDING_RECIPES.map((recipe) => (
            <TouchableOpacity 
              key={recipe.id} 
              style={[styles.exerciseCard, { backgroundColor: recipe.color }]}
            >
              <View style={styles.exerciseContent}>
                <View>
                  <Text style={styles.exerciseTitle}>{recipe.title}</Text>
                  <Text style={styles.exerciseSubtitle}>{recipe.cookTime}</Text>
                  <TouchableOpacity style={styles.letsGoButton}>
                    <Text style={styles.buttonText}>Cook Now</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.exerciseAnimal}>{recipe.animal}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  progressCard: {
    backgroundColor: '#8B4513',
    margin: 20,
    borderRadius: 15,
    padding: 15,
  },
  progressContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  levelIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  levelNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  progressText: {
    flex: 1,
  },
  progressTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  progressSubtitle: {
    color: '#fff',
    opacity: 0.8,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 3,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  actionItem: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    color: '#666',
  },
  exerciseSection: {
    padding: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeMore: {
    color: '#8B4513',
    fontSize: 14,
  },
  exerciseList: {
    paddingRight: 20,
  },
  exerciseCard: {
    width: 250,
    borderRadius: 15,
    marginRight: 15,
    padding: 15,
    overflow: 'hidden',
  },
  exerciseContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  exerciseSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  exerciseAnimal: {
    fontSize: 40,
  },
  letsGoButton: {
    backgroundColor: '#8B4513',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
}); 