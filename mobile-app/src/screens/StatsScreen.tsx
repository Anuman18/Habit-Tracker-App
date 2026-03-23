import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { loadHabits } from '../services/habitStorage';
import { Habit } from '../types/habit';

export default function StatsScreen() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadHabits();
      setHabits(data);
    };

    fetchData();
  }, []);

  const totalHabits = habits.length;

  const totalCompletions = habits.reduce(
    (sum, habit) => sum + habit.completedDates.length,
    0
  );

  const completionRate =
    totalHabits === 0 ? 0 : (totalCompletions / totalHabits).toFixed(1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Your Stats</Text>

      <Text>Total Habits: {totalHabits}</Text>
      <Text>Total Completions: {totalCompletions}</Text>
      <Text>Avg Completion: {completionRate}</Text>

      {completionRate > 5 && (
        <Text style={styles.insight}>🔥 You are very consistent!</Text>
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
    marginBottom: 20,
  },
  insight: {
    marginTop: 20,
    fontSize: 16,
    color: 'green',
  },
});