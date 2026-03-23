import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Habit } from '../../src/types/habit';
import { loadHabits } from '../../src/services/habitStorage';
import { Link } from 'expo-router';
import { Button } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { toggleHabitCompletion } from '../../src/services/habitStorage';


export default function HomeScreen() {
  const [habits, setHabits] = useState<Habit[]>([]);

  <Link href="/add" asChild>
  <Button title="Add Habit" />
</Link>

  useEffect(() => {
    const fetchHabits = async () => {
      const data = await loadHabits();
      setHabits(data);
    };

    fetchHabits();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Habits</Text>

      {habits.length === 0 ? (
        <Text>No habits yet 🚀</Text>
      ) : (
        habits.map((habit) => {
  const today = new Date().toISOString().split('T')[0];
  const completed = habit.completedDates.includes(today);

  return (
    <TouchableOpacity
      key={habit.id}
      onPress={async () => {
        const updated = await toggleHabitCompletion(habit.id);
        setHabits(updated);
      }}
      style={{
        padding: 12,
        marginBottom: 10,
        backgroundColor: completed ? '#4CAF50' : '#eee',
        borderRadius: 8,
      }}
    >
      <Text style={{ color: completed ? '#fff' : '#000' }}>
        {habit.title}
      </Text>
    </TouchableOpacity>
  );
})
      )}
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
    marginBottom: 10,
  },
});