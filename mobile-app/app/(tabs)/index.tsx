import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Link } from 'expo-router';

import { Habit } from '../../src/types/habit';
import { loadHabits, toggleHabitCompletion } from '../../src/services/habitStorage';
import { calculateStreak } from '../../src/utils/streak';

export default function HomeScreen() {
  const [habits, setHabits] = useState<Habit[]>([]);

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

      {/* ➕ Add Habit Button */}
      <Link href="/add" asChild>
        <Button title="Add Habit" />
      </Link>

      {/* 📋 Habit List */}
      {habits.length === 0 ? (
        <Text style={styles.empty}>No habits yet 🚀</Text>
      ) : (
        habits.map((habit) => {
          const today = new Date().toISOString().split('T')[0];
          const completed = habit.completedDates.includes(today);

          const streak = calculateStreak(habit.completedDates);

          return (
            <TouchableOpacity
              key={habit.id}
              onPress={async () => {
                const updated = await toggleHabitCompletion(habit.id);
                setHabits(updated);
              }}
              style={[
                styles.habitItem,
                { backgroundColor: completed ? '#4CAF50' : '#eee' },
              ]}
            >
              <Text style={{ color: completed ? '#fff' : '#000' }}>
                {habit.title} 🔥 {streak}
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
    marginBottom: 15,
  },
  empty: {
    marginTop: 20,
    fontSize: 16,
  },
  habitItem: {
    padding: 12,
    marginTop: 10,
    borderRadius: 8,
  },
});