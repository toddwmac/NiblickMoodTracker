import React from 'react';
import { Smile, Frown, Meh } from 'lucide-react';

type MoodType = 'smile' | 'meh' | 'frown';

interface MoodSelectorProps {
  mood: MoodType;
  setMood: (mood: MoodType) => void;
}

export function MoodSelector({ mood, setMood }: MoodSelectorProps) {
  const getMoodIcon = () => {
    switch (mood) {
      case 'smile':
        return <Smile className="w-32 h-32 text-green-500 transition-all duration-300 hover:scale-110" />;
      case 'meh':
        return <Meh className="w-32 h-32 text-yellow-400 transition-all duration-300 hover:scale-110" />;
      case 'frown':
        return <Frown className="w-32 h-32 text-red-500 transition-all duration-300 hover:scale-110" />;
    }
  };

  return (
    <div 
      className="flex justify-center cursor-pointer"
      onClick={() => setMood(mood === 'smile' ? 'meh' : mood === 'meh' ? 'frown' : 'smile')}
    >
      {getMoodIcon()}
    </div>
  );
}