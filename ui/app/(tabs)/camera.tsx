import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ActivityIndicator, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

interface Ingredient {
  name: string;
  count: number;
  units: string;
  expiry: number;
  carbon_footprint: number;
}

export default function ImagePickerScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Processing image...');
  const [showSuccess, setShowSuccess] = useState(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [showForm, setShowForm] = useState(false);

  const scanIngredients = async (imageBase64: string) => {
    setLoadingMessage('Processing image...');
    setLoading(true);
    try {
      const response = await fetch('http://128.189.228.211:5000/ingredients/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: imageBase64,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to process image');
      }

      const data = await response.json(); 
      console.log(data);
      setIngredients(data.ingredients);
      setShowForm(true);
    } catch (error) {
      console.error('Error scanning ingredients:', error);
      // You might want to show an error message to the user here
    } finally {
      setLoading(false);
    }
  };

  const updateIngredient = (index: number, field: keyof Ingredient, value: string | number) => {
    const updatedIngredients = [...ingredients];
    const updatedIngredient = { ...updatedIngredients[index] };
    
    if (field === 'count' || field === 'expiry' || field === 'carbon_footprint') {
      updatedIngredient[field] = Number(value);
    } else if (field === 'name' || field === 'units') {
      updatedIngredient[field] = value as string;
    }
    
    updatedIngredients[index] = updatedIngredient;
    setIngredients(updatedIngredients);
  };

  const addNewIngredient = () => {
    setIngredients([...ingredients, {
      name: '',
      count: 1,
      units: 'piece',
      expiry: 7,
      carbon_footprint: 0
    }]);
  };

  const handleConfirm = async () => {
    setLoadingMessage('Adding ingredients...');
    setLoading(true);
    try {
      const response = await fetch('http://128.189.228.211:5000/ingredients/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ingredients),
      });

      if (!response.ok) {
        throw new Error('Failed to validate ingredients');
      }

      setShowSuccess(true);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Show success message
      setShowSuccess(false);
      setShowForm(false);
      setIngredients([]);
      setImage(null);
    } catch (error) {
      console.error('Error validating ingredients:', error);
      // You might want to show an error message to the user here
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setIngredients([]);
    setImage(null);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await scanIngredients(result.assets[0].base64 || '');
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await scanIngredients(result.assets[0].base64 || '');
    }
  };

  const removeIngredient = (index: number) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  if (showSuccess) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.successContainer}>
          <Ionicons name="checkmark-circle" size={50} color="#4CAF50" />
          <Text style={styles.successText}>Ingredients added successfully!</Text>
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B4513" />
        <Text style={styles.loadingText}>{loadingMessage}</Text>
      </View>
    );
  }

  if (showForm) {
    return (
      <ScrollView style={styles.formContainer}>
        <Text style={styles.formTitle}>Confirm Ingredients</Text>
        {ingredients?.map((ingredient, index) => (
          <View key={index} style={styles.ingredientForm}>
            <View style={styles.ingredientHeader}>
              <Text style={styles.ingredientNumber}>Item {index + 1}</Text>
              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => removeIngredient(index)}
              >
                <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              value={ingredient.name}
              onChangeText={(value) => updateIngredient(index, 'name', value)}
              placeholder="Name"
            />
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.smallInput]}
                value={ingredient.count.toString()}
                onChangeText={(value) => updateIngredient(index, 'count', value)}
                keyboardType="numeric"
                placeholder="Count"
              />
              <TextInput
                style={[styles.input, styles.smallInput]}
                value={ingredient.units}
                onChangeText={(value) => updateIngredient(index, 'units', value)}
                placeholder="Units"
              />
              <TextInput
                style={[styles.input, styles.smallInput]}
                value={ingredient.expiry.toString()}
                onChangeText={(value) => updateIngredient(index, 'expiry', value)}
                keyboardType="numeric"
                placeholder="Expiry (days)"
              />
            </View>
          </View>
        ))}
        
        <TouchableOpacity style={styles.addButton} onPress={addNewIngredient}>
          <Ionicons name="add" size={24} color="white" />
          <Text style={styles.buttonText}>Add Another Item</Text>
        </TouchableOpacity>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
            <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handleConfirm}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Ionicons name="camera" size={30} color="white" />
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Ionicons name="images" size={30} color="white" />
          <Text style={styles.buttonText}>Choose Photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#8B4513',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: 150,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlignVertical: 'center',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  ingredientForm: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  smallInput: {
    flex: 1,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    height: 48,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
    marginTop: 8,
    marginBottom: 24,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#8B4513',
  },
  cancelButtonText: {
    color: '#8B4513',
  },
  confirmButton: {
    backgroundColor: '#8B4513',
  },
  ingredientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  ingredientNumber: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  deleteButton: {
    padding: 8,
  },
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  successText: {
    marginTop: 16,
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: '600',
  },
});