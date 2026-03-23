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