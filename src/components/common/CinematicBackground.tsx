import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const CinematicBackground: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<'hero' | 'invitation' | 'event' | 'location' | 'memories' | 'footer'>('hero');
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.4;

      const sections = [
        { id: 'hero', theme: 'hero' },
        { id: 'invitation', theme: 'invitation' },
        { id: 'details', theme: 'event' },
        { id: 'location', theme: 'location' },
        { id: 'memories', theme: 'memories' },
      ];

      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveTheme(sec.theme as any);
            return;
          }
        }
      }

      // Check footer
      const docHeight = document.documentElement.scrollHeight;
      if (window.scrollY + window.innerHeight >= docHeight - 300) {
        setActiveTheme('footer');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme glow colors mapping
  const themeGlows = {
    hero: 'rgba(197, 160, 89, 0.12)',
    invitation: 'rgba(230, 202, 101, 0.15)',
    event: 'rgba(211, 201, 183, 0.14)',
    location: 'rgba(154, 123, 56, 0.14)',
    memories: 'rgba(244, 232, 193, 0.16)',
    footer: 'rgba(197, 160, 89, 0.18)',
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Ambient Glow Sphere */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px]"
        animate={{
          backgroundColor: themeGlows[activeTheme],
          scale: shouldReduceMotion ? 1 : [1, 1.05, 1],
        }}
        transition={{
          backgroundColor: { duration: 1.2, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Subtle Noise / Film Grain Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative Floating Ambient Particles */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 opacity-20">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-champagne-gold"
              style={{
                width: (i % 2 === 0 ? 3 : 2) + 'px',
                height: (i % 2 === 0 ? 3 : 2) + 'px',
                top: (15 + (i * 11) % 75) + '%',
                left: (10 + (i * 17) % 80) + '%',
              }}
              animate={{
                y: [0, -25, 0],
                opacity: [0.2, 0.7, 0.2],
              }}
              transition={{
                duration: 5 + (i % 3),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
