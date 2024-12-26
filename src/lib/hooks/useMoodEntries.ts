import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import type { MoodEntry, MoodType } from '../types';

export function useMoodEntries() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from('mood_entries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching entries:', error);
      return;
    }

    setEntries(data || []);
  };

  const saveMoodEntry = async (name: string, mood: MoodType) => {
    setLoading(true);
    setMessage('');

    const { error } = await supabase
      .from('mood_entries')
      .insert([{ name: name.trim(), mood }]);

    if (error) {
      setMessage('Error saving your mood. Please try again.');
      console.error('Error:', error);
    } else {
      setMessage('Mood saved successfully!');
      await fetchEntries();
    }

    setLoading(false);
    return !error;
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return { entries, loading, message, saveMoodEntry };
}