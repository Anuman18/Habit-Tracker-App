import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Habit } from '../types/habit';
import { saveHabits, loadHabits } from '../services/habitStorage';
import { v4 as uuidv4 } from 'uuid';

export default function AddHabitScreen({ navigation }: any) {
  const [title, setTitle] = useState('');

  const handleAddHabit = async () => {
    if (!title.trim()) return;

    const existingHabits = await loadHabits();

    const newHabit: Habit = {
      id: uuidv4(),
      title,
      frequency: 'daily',
      createdAt: new Date().toISOString(),
      completedDates: [],
    };

    const updatedHabits = [...existingHabits, newHabit];

    await saveHabits(updatedHabits);

    navigation.goBack(); // go back to home
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Habit</Text>

      <TextInput
        placeholder="Enter habit name"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <Button title="Save Habit" onPress={handleAddHabit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
});