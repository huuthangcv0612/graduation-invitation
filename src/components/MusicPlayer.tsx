import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { invitationData } from '../data/invitation';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(invitationData.music.src);
    audio.loop = true;
    audioRef.current = audio;

    audio.addEventListener('error', () => {
      // Gracefully set error state so site doesn't crash if file is missing
      setHasError(true);
      setIsPlaying(false);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current || hasError) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.warn("Audio play prevented or missing:", err);
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={togglePlay}
        disabled={hasError}
        aria-label={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
        className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 border ${
          isPlaying 
            ? 'bg-champagne-gold text-charcoal border-champagne-light shadow-champagne-gold/30' 
            : 'bg-charcoal/90 text-ivory-100 border-champagne-gold/40 hover:border-champagne-gold'
        } ${hasError ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 animate-pulse text-charcoal" />
        ) : (
          <VolumeX className="w-5 h-5 text-ivory-300" />
        )}

        {/* Audio Visualizer Waves effect when playing */}
        {isPlaying && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-champagne-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-champagne-dark"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
};
