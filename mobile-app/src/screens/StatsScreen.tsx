import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { loadHabits } from '../services/habitStorage';
import { Habit } from '../types/habit';
import { getSuggestions } from '../utils/suggestions';

export default function StatsScreen() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadHabits();
      setHabits(data);
    };

    fetchData();
  }, []);

  // 📊 Calculations
  const totalHabits = habits.length;

  const totalCompletions = habits.reduce(
    (sum, habit) => sum + habit.completedDates.length,
    0
  );

  const completionRate =
    totalHabits === 0
      ? 0
      : Number((totalCompletions / totalHabits).toFixed(1));

  // 💡 Suggestions
  const suggestions = getSuggestions(habits);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Your Stats</Text>

      {/* 📈 Stats */}
      <Text>Total Habits: {totalHabits}</Text>
      <Text>Total Completions: {totalCompletions}</Text>
      <Text>Avg Completion: {completionRate}</Text>

      {completionRate > 5 && (
        <Text style={styles.insight}>🔥 You are very consistent!</Text>
      )}

      {/* 💡 Suggestions */}
      <View style={styles.suggestionBox}>
        <Text style={styles.suggestionTitle}>💡 Suggestions</Text>

        {suggestions.length === 0 ? (
          <Text>No suggestions yet 👍</Text>
        ) : (
          suggestions.map((s, index) => (
            <Text key={index} style={styles.suggestionText}>
              {s}
            </Text>
          ))
        )}
      </View>
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
    marginTop: 15,
    fontSize: 16,
    color: 'green',
  },
  suggestionBox: {
    marginTop: 25,
  },
  suggestionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  suggestionText: {
    marginTop: 5,
  },
});