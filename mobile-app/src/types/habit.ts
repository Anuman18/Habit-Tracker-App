export type Habit = {
  id: string;
  title: string;
  description?: string;
  frequency: 'daily' | 'weekly';
  createdAt: string;

  // tracking
  completedDates: string[]; // ISO dates
};