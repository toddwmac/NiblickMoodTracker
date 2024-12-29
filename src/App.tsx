import React, { useState } from 'react';
import { MoodForm } from './components/MoodForm';
import { MoodHistory } from './components/MoodHistory';
import { useMoodEntries } from './lib/hooks/useMoodEntries';
import type { MoodEntry, MoodType } from './lib/types';

function App() {
  const { entries, loading, message, saveMoodEntry } = useMoodEntries();
  const [selectedEntry, setSelectedEntry] = useState<MoodEntry | null>(null);

  const handleSubmit = async (name: string, mood: MoodType) => {
    const success = await saveMoodEntry(name, mood);
    if (success) setSelectedEntry(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-auto space-y-8 transform hover:shadow-2xl transition-all duration-300">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Hey, How is your day going today Pat?
                    </h1>
        </div>

        <MoodForm 
          onSubmit={handleSubmit}
          loading={loading}
          selectedEntry={selectedEntry ? {
            name: selectedEntry.name,
            mood: selectedEntry.mood as MoodType
          } : null}
        />

        {entries.length > 0 && (
          <MoodHistory 
            entries={entries} 
            onSelect={(entry) => setSelectedEntry(entry)} 
          />
        )}

        {message && (
          <p className={`text-center ${
            message.includes('Error') ? 'text-red-500' : 'text-green-500'
          }`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;