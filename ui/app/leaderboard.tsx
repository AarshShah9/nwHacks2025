import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const MOCK_LEADERBOARD = [
  { id: 4, name: 'Jennifer', points: 780, change: 3, avatar: '🦊' },
  { id: 5, name: 'William', points: 756, change: -1, avatar: '🐸' },
  { id: 6, name: 'Samantha', points: 688, change: -2, avatar: '🐨' },
  { id: 7, name: 'Emery', points: 628, change: -1, avatar: '🦁' },
  { id: 8, name: 'Lydia', points: 560, change: -1, avatar: '🐸' },
];

const TOP_THREE = [
  { id: 2, rank: 2, avatar: '🐧', color: '#8B4513' },
  { id: 1, rank: 1, avatar: '🐢', color: '#2E7D32', label: 'WINNER' },
  { id: 3, rank: 3, avatar: '🦊', color: '#D35400' },
];

export default function LeaderboardScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Podium Section */}
      <View style={styles.podiumContainer}>
        <View style={styles.podiumLayout}>
          {TOP_THREE.map((item) => (
            <View 
              key={item.id} 
              style={[
                styles.podiumItem,
                { 
                  backgroundColor: item.color,
                  height: item.rank === 1 ? 120 : item.rank === 2 ? 100 : 80,
                  marginTop: item.rank === 1 ? 0 : 20
                }
              ]}
            >
              <View style={styles.avatarContainer}>
                <Text style={styles.avatar}>{item.avatar}</Text>
                {item.label && (
                  <View style={styles.winnerLabel}>
                    <Text style={styles.winnerText}>{item.label}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.rankText}>{item.rank}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Rankings List */}
      <ScrollView style={styles.rankingsList}>
        {MOCK_LEADERBOARD.map((item) => (
          <View key={item.id} style={styles.rankingItem}>
            <View style={styles.rankingLeft}>
              <Text style={styles.rankNumber}>{`0${item.id}`}</Text>
              <Text style={styles.avatar}>{item.avatar}</Text>
              <Text style={styles.name}>{item.name}</Text>
            </View>
            <View style={styles.rankingRight}>
              <Text style={styles.points}>{item.points} pts</Text>
              <Text 
                style={[
                  styles.change,
                  { color: item.change > 0 ? '#4CAF50' : '#F44336' }
                ]}
              >
                {item.change > 0 ? '+' : ''}{item.change}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  podiumContainer: {
    backgroundColor: '#f8e7d3',
    padding: 20,
    borderRadius: 20,
    margin: 20,
  },
  podiumLayout: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 150,
  },
  podiumItem: {
    width: 80,
    borderRadius: 15,
    marginHorizontal: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    fontSize: 24,
  },
  winnerLabel: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 5,
  },
  winnerText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  rankText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  rankingsList: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  rankingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  rankingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    width: 30,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  rankingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  points: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 10,
  },
  change: {
    fontSize: 14,
    fontWeight: '500',
  },
}); 