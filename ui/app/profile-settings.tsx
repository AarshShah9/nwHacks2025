import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useUser } from '../context/UserContext';
import { useState } from 'react';

export default function ProfileSettingsScreen() {
  const { profileData, setProfileData, fetchProfileData } = useUser();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: profileData?.name || '',
    allergies: Array.isArray(profileData?.allergies) ? profileData.allergies.join(', ') : '',
    diseases: Array.isArray(profileData?.diseases) ? profileData.diseases.join(', ') : '',
    restrictions: Array.isArray(profileData?.restrictions) ? profileData.restrictions.join(', ') : '',
  });

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://128.189.228.211:5000/profile/modify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          exp: profileData?.exp || 0, // Keep existing exp
          allergies: formData.allergies.split(',').map(item => item.trim()).filter(Boolean),
          diseases: formData.diseases.split(',').map(item => item.trim()).filter(Boolean),
          restrictions: formData.restrictions.split(',').map(item => item.trim()).filter(Boolean),
        }),
      });

      if (response.ok) {
        // Refresh profile data
        await fetchProfileData();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
          placeholder="Your name"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Allergies</Text>
        <Text style={styles.hint}>Separate with commas (e.g., peanuts, shellfish)</Text>
        <TextInput
          style={styles.input}
          value={formData.allergies}
          onChangeText={(text) => setFormData(prev => ({ ...prev, allergies: text }))}
          placeholder="Enter your allergies"
          multiline
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Medical Conditions</Text>
        <Text style={styles.hint}>Separate with commas (e.g., diabetes, hypertension)</Text>
        <TextInput
          style={styles.input}
          value={formData.diseases}
          onChangeText={(text) => setFormData(prev => ({ ...prev, diseases: text }))}
          placeholder="Enter your medical conditions"
          multiline
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Dietary Restrictions</Text>
        <Text style={styles.hint}>Separate with commas (e.g., vegetarian, gluten-free)</Text>
        <TextInput
          style={styles.input}
          value={formData.restrictions}
          onChangeText={(text) => setFormData(prev => ({ ...prev, restrictions: text }))}
          placeholder="Enter your dietary restrictions"
          multiline
        />
      </View>

      <TouchableOpacity 
        style={[styles.saveButton, loading && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={loading}
      >
        <Text style={styles.saveButtonText}>
          {loading ? 'Saving...' : 'Save Changes'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  hint: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    fontStyle: 'italic',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    minHeight: 45,
  },
  saveButton: {
    backgroundColor: '#8B4513',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 