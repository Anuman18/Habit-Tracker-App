import StatsScreen from '../../src/screens/StatsScreen';


export const calculateStreak = (dates: string[]): number => {
  if (dates.length === 0) return 0;

  const sorted = [...dates].sort().reverse();
  let streak = 0;

  let currentDate = new Date();

  for (let i = 0; i < sorted.length; i++) {
    const date = currentDate.toISOString().split('T')[0];

    if (sorted[i] === date) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};


export default StatsScreen;