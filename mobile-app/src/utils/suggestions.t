import { Habit } from '../types/habit';

export const getSuggestions = (habits: Habit[]): string[] => {
  const suggestions: string[] = [];

  habits.forEach((habit) => {
    const totalDays = habit.completedDates.length;

    // If habit rarely completed
    if (totalDays < 2) {
      suggestions.push(
        `⚠️ You are not consistent with "${habit.title}". Try starting small.`
      );
    }

    // If habit is consistent
    if (totalDays >= 5) {
      suggestions.push(
        `🔥 Great job on "${habit.title}"! Keep it up!`
      );
    }
  });

  return suggestions;
};