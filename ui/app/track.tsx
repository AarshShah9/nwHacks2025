import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface Meal {
  name: string;
  time: string;
  points: number;
}

interface CookingHistory {
  [date: string]: Meal[];
}

// Mock data for cooking history
const MOCK_COOKING_HISTORY: CookingHistory = {
  '2024-02-14': [
    { name: 'Grilled Chicken Salad', time: '7:30 PM', points: 150 },
    { name: 'Chocolate Cake', time: '8:30 PM', points: 100 },
  ],
  '2024-02-13': [
    { name: 'Spaghetti Carbonara', time: '6:45 PM', points: 200 },
  ],
  '2024-02-11': [
    { name: 'Vegetable Stir Fry', time: '7:00 PM', points: 180 },
    { name: 'Fruit Smoothie', time: '8:00 AM', points: 80 },
  ],
  '2024-02-10': [
    { name: 'Homemade Pizza', time: '6:30 PM', points: 250 },
  ],
};

export default function TrackScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Get dates for the current week
  const getCurrentWeekDates = () => {
    const today = new Date();
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(date);
    }
    return dates;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const weekDates = getCurrentWeekDates();

  const getDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getDay = (date: Date) => {
    return date.getDate();
  };

  const hasCookedMeals = (date: string) => {
    return MOCK_COOKING_HISTORY[date] !== undefined;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cooking History</Text>
      
      {/* Calendar Strip */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.calendarStrip}>
        {weekDates.map((date, index) => {
          const dateStr = formatDate(date);
          const isSelected = selectedDate === dateStr;
          const hasCooked = hasCookedMeals(dateStr);
          
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateButton,
                isSelected && styles.selectedDate,
                hasCooked && styles.cookedDate
              ]}
              onPress={() => setSelectedDate(dateStr)}
            >
              <Text style={[styles.dayName, isSelected && styles.selectedText]}>
                {getDayName(date)}
              </Text>
              <Text style={[styles.dayNumber, isSelected && styles.selectedText]}>
                {getDay(date)}
              </Text>
              {hasCooked && (
                <View style={styles.cookingIndicator} />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Meals List */}
      <ScrollView style={styles.mealsList}>
        {selectedDate && MOCK_COOKING_HISTORY[selectedDate] ? (
          MOCK_COOKING_HISTORY[selectedDate].map((meal, index) => (
            <View key={index} style={styles.mealCard}>
              <View style={styles.mealInfo}>
                <Text style={styles.mealName}>{meal.name}</Text>
                <Text style={styles.mealTime}>{meal.time}</Text>
              </View>
              <View style={styles.pointsContainer}>
                <Ionicons name="trophy-outline" size={16} color="#8B4513" />
                <Text style={styles.pointsText}>{meal.points} pts</Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              {selectedDate 
                ? "No meals cooked on this day" 
                : "Select a date to view meals"}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  calendarStrip: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  dateButton: {
    width: 60,
    height: 80,
    marginHorizontal: 5,
    borderRadius: 12,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  selectedDate: {
    backgroundColor: '#8B4513',
  },
  cookedDate: {
    borderWidth: 1,
    borderColor: '#8B4513',
  },
  dayName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  selectedText: {
    color: '#fff',
  },
  cookingIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#8B4513',
    position: 'absolute',
    bottom: 8,
  },
  mealsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  mealCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginBottom: 10,
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  mealTime: {
    fontSize: 14,
    color: '#666',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  pointsText: {
    marginLeft: 4,
    color: '#8B4513',
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
  },
}); 