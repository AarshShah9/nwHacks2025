import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock data for users
const USERS = [
  {
    id: 1,
    name: 'Sarah Chen',
    points: 1200,
    avatar: '🦊',
    weeklyChange: +120,
  },
  {
    id: 2,
    name: 'Mike Johnson',
    points: 850,
    avatar: '🐨',
    weeklyChange: +85,
  },
  {
    id: 3,
    name: 'Emma Davis',
    points: 720,
    avatar: '🐼',
    weeklyChange: -20,
  },
  {
    id: 4,
    name: 'Alex Kim',
    points: 500,
    avatar: '🦁',
    weeklyChange: +50,
  },
  {
    id: 5,
    name: 'Lisa Wang',
    points: 350,
    avatar: '🐸',
    weeklyChange: +30,
  },
  {
    id: 6,
    name: 'John Smith',
    points: 200,
    avatar: '🐧',
    weeklyChange: +15,
  },
];

const getLevelInfo = (points: number) => {
  if (points >= 1000) return { title: 'Gordon Ramsay', icon: '👑' };
  if (points >= 500) return { title: 'Master Chef', icon: '⭐' };
  if (points >= 250) return { title: 'Head Chef', icon: '🏆' };
  if (points >= 100) return { title: 'Sous Chef', icon: '🔪' };
  return { title: 'Line Cook', icon: '👨‍🍳' };
};

export default function LeaderboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Leaderboard</Text>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Top 3 Podium */}
        <View style={styles.podium}>
          {/* Second Place */}
          <View style={[styles.podiumItem, styles.secondPlace]}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarEmoji}>{USERS[1].avatar}</Text>
              <Text style={styles.levelIcon}>{getLevelInfo(USERS[1].points).icon}</Text>
            </View>
            <Text style={styles.podiumName}>{USERS[1].name}</Text>
            <Text style={styles.podiumPoints}>{USERS[1].points} pts</Text>
            <Text style={styles.podiumPosition}>#2</Text>
          </View>

          {/* First Place */}
          <View style={[styles.podiumItem, styles.firstPlace]}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarEmoji}>{USERS[0].avatar}</Text>
              <Text style={styles.levelIcon}>{getLevelInfo(USERS[0].points).icon}</Text>
            </View>
            <Text style={styles.podiumName}>{USERS[0].name}</Text>
            <Text style={styles.podiumPoints}>{USERS[0].points} pts</Text>
            <Text style={styles.podiumPosition}>#1</Text>
          </View>

          {/* Third Place */}
          <View style={[styles.podiumItem, styles.thirdPlace]}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarEmoji}>{USERS[2].avatar}</Text>
              <Text style={styles.levelIcon}>{getLevelInfo(USERS[2].points).icon}</Text>
            </View>
            <Text style={styles.podiumName}>{USERS[2].name}</Text>
            <Text style={styles.podiumPoints}>{USERS[2].points} pts</Text>
            <Text style={styles.podiumPosition}>#3</Text>
          </View>
        </View>

        {/* Rest of the Leaderboard */}
        <View style={styles.leaderboardList}>
          {USERS.slice(3).map((user, index) => {
            const levelInfo = getLevelInfo(user.points);
            
            return (
              <View key={user.id} style={styles.leaderboardItem}>
                <Text style={styles.rank}>#{index + 4}</Text>
                <Text style={styles.smallAvatarEmoji}>{user.avatar}</Text>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userLevel}>{levelInfo.title}</Text>
                </View>
                <View style={styles.pointsContainer}>
                  <Text style={styles.points}>{user.points}</Text>
                  <Text 
                    style={[
                      styles.weeklyChange,
                      { color: user.weeklyChange >= 0 ? '#4CAF50' : '#F44336' }
                    ]}
                  >
                    {user.weeklyChange >= 0 ? '+' : ''}{user.weeklyChange}
                  </Text>
                </View>
                <Text style={styles.levelIcon}>{levelInfo.icon}</Text>
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
    paddingTop: 60,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 30,
    height: 200,
  },
  podiumItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    paddingTop: 20,
  },
  avatarContainer: {
    position: 'relative',
    width: 80,
    height: 80,
    backgroundColor: '#f0f0f0',
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#8B4513',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 40,
  },
  smallAvatarEmoji: {
    fontSize: 30,
    marginRight: 15,
    width: 50,
    textAlign: 'center',
  },
  levelIcon: {
    fontSize: 24,
    position: 'absolute',
    bottom: -10,
    right: -10,
  },
  podiumName: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
  },
  podiumPoints: {
    fontSize: 14,
    color: '#666',
  },
  podiumPosition: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
    marginTop: 5,
  },
  leaderboardList: {
    gap: 15,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 12,
  },
  rank: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 40,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  userLevel: {
    fontSize: 14,
    color: '#666',
  },
  pointsContainer: {
    alignItems: 'flex-end',
    marginRight: 15,
  },
  points: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  weeklyChange: {
    fontSize: 14,
  },
  firstPlace: {
    transform: [{ translateY: -20 }],
  },
  secondPlace: {
    transform: [{ translateY: 10 }],
  },
  thirdPlace: {
    transform: [{ translateY: 20 }],
  },
}); 