import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit } from '../types/habit';

const HABITS_KEY = 'HABITS_STORAGE';

export const saveHabits = async (habits: Habit[]) => {
  try {
    await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(habits));
  } catch (error) {
    console.error('Error saving habits:', error);
  }
};

export const loadHabits = async (): Promise<Habit[]> => {
  try {
    const data = await AsyncStorage.getItem(HABITS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading habits:', error);
    return [];
  }
};

export const toggleHabitCompletion = async (habitId: string) => {
  const habits = await loadHabits();

  const today = new Date().toISOString().split('T')[0];

  const updatedHabits = habits.map((habit) => {
    if (habit.id === habitId) {
      const alreadyCompleted = habit.completedDates.includes(today);

      return {
        ...habit,
        completedDates: alreadyCompleted
          ? habit.completedDates.filter((date) => date !== today)
          : [...habit.completedDates, today],
      };
    }
    return habit;
  });

  await saveHabits(updatedHabits);
  return updatedHabits;
};