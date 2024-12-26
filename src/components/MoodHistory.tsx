import React from 'react';

interface MoodEntry {
  id: string;
  name: string;
  mood: string;
  created_at: string;
}

interface MoodHistoryProps {
  entries: MoodEntry[];
  onSelect: (entry: MoodEntry) => void;
}

export function MoodHistory({ entries, onSelect }: MoodHistoryProps) {
  return (
    <div className="w-full">
      <select 
        className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        onChange={(e) => {
          const entry = entries.find(entry => entry.id === e.target.value);
          if (entry) onSelect(entry);
        }}
      >
        <option value="">Select a previous entry</option>
        {entries.map((entry) => (
          <option key={entry.id} value={entry.id}>
            {entry.name} - {entry.mood} ({new Date(entry.created_at).toLocaleDateString()})
          </option>
        ))}
      </select>
    </div>
  );
}