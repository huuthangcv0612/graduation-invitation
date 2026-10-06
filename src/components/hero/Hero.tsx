import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, GraduationCap, Calendar, MapPin } from 'lucide-react';
import { invitationData } from '../../data/invitation';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface HeroProps {
  onScrollToInvitation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToInvitation }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll Progress Tracking for Hero Section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transform layers
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const badgeY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const badgeOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const ornamentY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[110vh] flex flex-col justify-between items-center pt-16 pb-16 px-4 sm:px-6 bg-ivory-100 overflow-hidden"
    >
      {/* Layer 1: Background Decorative Frames (0.1x Parallax) */}
      <motion.div 
        style={{ y: shouldReduceMotion ? 0 : ornamentY }}
        className="absolute inset-4 sm:inset-8 border border-champagne-gold/20 pointer-events-none rounded-sm z-0" 
      />
      <motion.div 
        style={{ y: shouldReduceMotion ? 0 : ornamentY }}
        className="absolute inset-5 sm:inset-10 border border-champagne-gold/10 pointer-events-none rounded-sm z-0" 
      />

      {/* Decorative Ornaments in corners */}
      <div className="absolute top-6 left-6 sm:top-10 sm:left-10 text-champagne-gold/40 text-xl font-serif z-10">✦</div>
      <div className="absolute top-6 right-6 sm:top-10 sm:right-10 text-champagne-gold/40 text-xl font-serif z-10">✦</div>
      <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-champagne-gold/40 text-xl font-serif z-10">✦</div>
      <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 text-champagne-gold/40 text-xl font-serif z-10">✦</div>

      {/* Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-champagne-gold/10 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Layer 4: Top Header Badge (0.7x Parallax) */}
      <motion.div 
        style={{ 
          y: shouldReduceMotion ? 0 : badgeY, 
          opacity: shouldReduceMotion ? 1 : badgeOpacity 
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="z-10 text-center"
      >
        <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-champagne-gold/10 border border-champagne-gold/30 mb-4 shadow-sm">
          <GraduationCap className="w-4 h-4 text-champagne-dark" />
          <span className="text-xs font-sans font-semibold tracking-[0.25em] text-champagne-dark uppercase">
            Official Graduation Invitation
          </span>
        </div>
      </motion.div>

      {/* Layer 3: Typography Layer (0.5x Parallax) */}
      <motion.div 
        style={{ 
          y: shouldReduceMotion ? 0 : titleY, 
          scale: shouldReduceMotion ? 1 : titleScale,
          opacity: shouldReduceMotion ? 1 : titleOpacity
        }}
        className="z-10 max-w-4xl mx-auto text-center flex flex-col items-center my-auto py-4"
      >
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xs sm:text-sm font-sans tracking-[0.35em] uppercase text-charcoal/60 mb-2 font-semibold"
        >
          {invitationData.event.title}
        </motion.p>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-charcoal mb-3 uppercase gold-gradient-text leading-tight"
        >
          {invitationData.person.name}
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-[1px] w-8 sm:w-16 bg-champagne-gold/40" />
          <h2 className="text-sm sm:text-lg font-serif italic tracking-wider text-charcoal/80">
            {invitationData.event.subtitle}
          </h2>
          <div className="h-[1px] w-8 sm:w-16 bg-champagne-gold/40" />
        </motion.div>

        {/* Layer 2: Portrait Image Layer (0.3x Parallax) */}
        <motion.div 
          style={{ 
            y: shouldReduceMotion ? 0 : imageY,
            scale: shouldReduceMotion ? 1 : imageScale 
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="relative w-44 sm:w-56 aspect-[3/4] mb-8 rounded-t-full rounded-b-2xl overflow-hidden p-1.5 bg-gradient-to-b from-champagne-gold/40 via-champagne-gold/20 to-transparent shadow-invitation group"
        >
          <div className="w-full h-full rounded-t-full rounded-b-xl overflow-hidden bg-beige-light">
            <img 
              src={invitationData.person.avatar} 
              alt={invitationData.person.name} 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        </motion.div>

        {/* Date & Location Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 text-charcoal/80"
        >
          <div className="flex items-center gap-2 text-base sm:text-lg font-serif font-semibold tracking-widest px-5 py-2 rounded-full bg-white/70 border border-champagne-gold/25 shadow-sm">
            <Calendar className="w-4 h-4 text-champagne-dark" />
            <span>{invitationData.event.date}</span>
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm font-sans tracking-wide px-5 py-2 rounded-full bg-white/70 border border-champagne-gold/25 shadow-sm">
            <MapPin className="w-4 h-4 text-champagne-dark" />
            <span>{invitationData.event.location}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Down Action */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="z-10"
      >
        <button
          onClick={onScrollToInvitation}
          aria-label="Xem lời mời"
          className="group flex flex-col items-center gap-2 text-charcoal/60 hover:text-champagne-dark transition-colors duration-300 cursor-pointer py-2"
        >
          <span className="text-xs font-sans tracking-[0.2em] uppercase font-medium">
            Xem lời mời
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-8 rounded-full border border-champagne-gold/40 flex items-center justify-center group-hover:border-champagne-gold group-hover:bg-champagne-gold/10"
          >
            <ArrowDown className="w-4 h-4 text-champagne-dark" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
};
