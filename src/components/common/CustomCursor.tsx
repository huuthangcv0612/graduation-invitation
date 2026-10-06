import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Disable custom cursor on mobile touch or if reduced motion preferred
    if (window.innerWidth < 768 || shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible, shouldReduceMotion]);

  if (!isVisible || shouldReduceMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden hidden md:block">
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-champagne-gold/60 pointer-events-none"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isHovered ? 1.5 : 1,
          borderColor: isHovered ? '#d4af37' : 'rgba(197, 160, 89, 0.6)',
          backgroundColor: isHovered ? 'rgba(197, 160, 89, 0.1)' : 'transparent',
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 28,
          mass: 0.1,
        }}
      />
      {/* Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-champagne-gold pointer-events-none"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isHovered ? 0.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 800,
          damping: 35,
        }}
      />
    </div>
  );
};
