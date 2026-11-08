import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { speakFrench, stopSpeech } from '../utils/speech';

interface AudioButtonProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  size = 'md',
  className = '',
  label,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isPlaying) {
      stopSpeech();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    const success = speakFrench(text, {
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });

    if (!success) {
      setIsPlaying(false);
    }
  };

  const sizeClasses = {
    sm: 'p-1 text-xs gap-1',
    md: 'p-2 text-sm gap-1.5',
    lg: 'px-3 py-2 text-base gap-2',
  };

  const iconSizes = {
    sm: 14,
    md: 17,
    lg: 20,
  };

  return (
    <button
      type="button"
      onClick={handleSpeak}
      title={`Écouter la prononciation : "${text}"`}
      aria-label={`Écouter : ${text}`}
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-95 ${
        isPlaying
          ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-300'
          : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:text-indigo-300 dark:hover:bg-indigo-900/50'
      } ${sizeClasses[size]} ${className}`}
    >
      {isPlaying ? (
        <VolumeX size={iconSizes[size]} className="animate-pulse" />
      ) : (
        <Volume2 size={iconSizes[size]} />
      )}
      {label && <span className="whitespace-nowrap">{label}</span>}
    </button>
  );
};
