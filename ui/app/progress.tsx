import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const LEVELS = [
  {
    id: 1,
    title: 'Line Cook',
    points: '0-100',
    description: 'Just starting your culinary journey',
    icon: '👨‍🍳',
  },
  {
    id: 2,
    title: 'Sous Chef',
    points: '101-250',
    description: 'Getting comfortable in the kitchen',
    icon: '🔪',
  },
  {
    id: 3,
    title: 'Head Chef',
    points: '251-500',
    description: 'Leading the kitchen with confidence',
    icon: '🏆',
  },
  {
    id: 4,
    title: 'Master Chef',
    points: '501-1000',
    description: 'Creating culinary masterpieces',
    icon: '⭐',
  },
  {
    id: 5,
    title: 'Gordon Ramsay',
    points: '1000+',
    description: 'WHERE IS THE LAMB SAUCE?!',
    icon: '👑',
  },
];

export default function ProgressScreen() {
  const router = useRouter();
  // Mock user data - replace with actual user data later
  const userPoints = 275;
  const currentLevel = LEVELS.find((level, index) => {
    const nextLevel = LEVELS[index + 1];
    const points = parseInt(level.points.split('-')[0]);
    const nextPoints = nextLevel ? parseInt(nextLevel.points.split('-')[0]) : Infinity;
    return userPoints >= points && userPoints < nextPoints;
  });

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        scrollEventThrottle={16}
        scrollEnabled={true}
        alwaysBounceVertical={false}
      >
        <Text style={styles.header}>Your Cooking Journey</Text>
        <View style={styles.currentLevel}>
          <Text style={styles.currentLevelIcon}>{currentLevel?.icon}</Text>
          <Text style={styles.currentLevelTitle}>{currentLevel?.title}</Text>
          <Text style={styles.points}>{userPoints} Points</Text>
        </View>

        <View style={styles.progressContainer}>
          {LEVELS.map((level, index) => {
            const isCurrentLevel = level.id === currentLevel?.id;
            const isCompleted = userPoints >= parseInt(level.points.split('-')[0]);

            return (
              <View 
                key={level.id} 
                style={[
                  styles.levelCard,
                  isCurrentLevel && styles.currentLevelCard,
                  isCompleted && styles.completedLevel
                ]}
              >
                <View style={styles.levelHeader}>
                  <Text style={styles.levelIcon}>{level.icon}</Text>
                  <View>
                    <Text style={styles.levelTitle}>{level.title}</Text>
                    <Text style={styles.levelPoints}>{level.points} points</Text>
                  </View>
                </View>
                <Text style={styles.levelDescription}>{level.description}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    height: 100,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  backButton: {
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  currentLevel: {
    alignItems: 'center',
    marginBottom: 30,
  },
  currentLevelIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  currentLevelTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  points: {
    fontSize: 18,
    color: '#666',
  },
  progressContainer: {
    gap: 15,
  },
  levelCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  currentLevelCard: {
    borderColor: '#8B4513',
    backgroundColor: '#fff',
  },
  completedLevel: {
    backgroundColor: '#f0f8f0',
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  levelPoints: {
    fontSize: 14,
    color: '#666',
  },
  levelDescription: {
    fontSize: 14,
    color: '#444',
  },
}); 