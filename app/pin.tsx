import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function PinScreen() {
  const [pin, setPin] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (pin === '1234') {
      Alert.alert('Success', 'PIN accepted!');
      // Navigate to your protected screen
      router.replace('/'); // або будь-яка сторінка
    } else {
      Alert.alert('Error', 'Incorrect PIN');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your PIN</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        keyboardType="numeric"
        value={pin}
        onChangeText={setPin}
        maxLength={4}
        placeholder="****"
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Ionicons name="checkmark-circle-outline" size={24} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  input: {
    width: '60%',
    fontSize: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#2E7D32',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2E7D32',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#2E7D32',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
