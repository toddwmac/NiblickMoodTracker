export type MoodType = 'smile' | 'meh' | 'frown';

export interface MoodEntry {
  id: string;
  name: string;
  mood: string;
  created_at: string;
}