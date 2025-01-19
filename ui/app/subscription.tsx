import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';

export default function SubscriptionScreen() {
  const router = useRouter();
  const { profileData, loading } = useUser();

  // Mock subscription data (in real app, this would come from backend)
  const subscription = {
    status: 'active',
    plan: 'Monthly Plan',
    price: '$5.00',
    nextBilling: '2024-03-14',
    features: [
      'Unlimited Recipe Generation',
      'Personalized Meal Plans',
      'Progress Tracking',
      'Cooking History',
      'Leaderboard Access'
    ]
  };

  return (
    <View style={styles.container}>
      {/* Subscription Status Card */}
      <View style={styles.statusCard}>
        <View style={styles.statusHeader}>
          <Ionicons 
            name={subscription.status === 'active' ? 'checkmark-circle' : 'alert-circle'} 
            size={24} 
            color={subscription.status === 'active' ? '#4CAF50' : '#F44336'} 
          />
          <Text style={styles.statusText}>
            {subscription.status === 'active' ? 'Active Subscription' : 'Inactive'}
          </Text>
        </View>
        <View style={styles.planDetails}>
          <Text style={styles.planName}>{subscription.plan}</Text>
          <Text style={styles.planPrice}>{subscription.price}<Text style={styles.perMonth}>/month</Text></Text>
        </View>
        <Text style={styles.nextBilling}>
          Next billing date: {subscription.nextBilling}
        </Text>
      </View>

      {/* Features List */}
      <View style={styles.featuresSection}>
        <Text style={styles.featuresTitle}>Included Features</Text>
        {subscription.features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.manageButton}>
          <Text style={styles.manageButtonText}>Manage Subscription</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.supportButton}>
          <Text style={styles.supportButtonText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  statusCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#333',
  },
  planDetails: {
    marginBottom: 15,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  perMonth: {
    fontSize: 16,
    color: '#666',
  },
  nextBilling: {
    fontSize: 14,
    color: '#666',
  },
  featuresSection: {
    marginBottom: 30,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  actions: {
    gap: 15,
  },
  manageButton: {
    backgroundColor: '#8B4513',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  manageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  supportButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8B4513',
  },
  supportButtonText: {
    color: '#8B4513',
    fontSize: 16,
    fontWeight: '600',
  },
}); 