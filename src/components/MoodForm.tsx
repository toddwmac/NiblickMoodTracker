import React, { useEffect, useState } from 'react';
import { MoodSelector } from './MoodSelector';
import type { MoodType } from '../lib/types';

interface MoodFormProps {
  onSubmit: (name: string, mood: MoodType) => Promise<void>;
  loading: boolean;
  initialName?: string;
  initialMood?: MoodType;
  selectedEntry?: { name: string; mood: MoodType } | null;
}

export function MoodForm({ 
  onSubmit, 
  loading, 
  selectedEntry,
  initialName = '', 
  initialMood = 'smile' 
}: MoodFormProps) {
  const [name, setName] = useState(initialName);
  const [mood, setMood] = useState<MoodType>(initialMood);

  // Update form when selected entry changes
  useEffect(() => {
    if (selectedEntry) {
      setName(selectedEntry.name);
      setMood(selectedEntry.mood as MoodType);
    }
  }, [selectedEntry]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    await onSubmit(name, mood);
    setName('');
    setMood('smile');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter your name"
        />
      </div>

      <MoodSelector mood={mood} setMood={setMood} />

      <div className="text-center">
        <p className="text-xl font-medium text-gray-800">
          {mood === 'smile' ? "That's a lovely smile!" : 
           mood === 'meh' ? "Meh... just another day?" : 
           "Turn that frown upside down!"}
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg px-4 py-2 hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Save Mood'}
      </button>
    </form>
  );
}