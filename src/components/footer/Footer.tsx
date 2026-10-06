import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Heart } from 'lucide-react';
import { invitationData } from '../../data/invitation';
import { EASE_CINEMATIC } from '../../utils/animation';

export const Footer: React.FC = () => {
  return (
    <footer className="py-24 px-4 sm:px-6 bg-[#161513] text-white relative overflow-hidden border-t border-champagne-gold/30">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-champagne-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        
        {/* Top Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_CINEMATIC }}
          className="w-16 h-16 mx-auto mb-6 rounded-full bg-champagne-gold/15 border border-champagne-gold/40 flex items-center justify-center shadow-lg"
        >
          <GraduationCap className="w-8 h-8 text-champagne-gold" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE_CINEMATIC }}
          className="font-serif text-3xl sm:text-5xl font-bold tracking-wide text-ivory-100 mb-4 uppercase"
        >
          THANK YOU
        </motion.h2>

        {/* Quote Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE_CINEMATIC }}
          className="font-serif text-lg sm:text-2xl italic text-champagne-light max-w-xl mx-auto mb-8 leading-relaxed"
        >
          "Cảm ơn vì đã đồng hành cùng mình trong hành trình này."
        </motion.p>

        <div className="w-16 h-[1px] bg-champagne-gold/40 mx-auto mb-8" />

        {/* Name and Degree */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE_CINEMATIC }}
          className="mb-12"
        >
          <p className="font-serif text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider gold-gradient-text mb-1">
            {invitationData.person.name}
          </p>
          <p className="text-xs font-sans tracking-[0.25em] text-ivory-300/70 uppercase">
            {invitationData.person.title}
          </p>
        </motion.div>

        {/* See You Card */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE_CINEMATIC }}
          className="p-6 sm:p-8 rounded-2xl bg-champagne-gold/10 border border-champagne-gold/30 max-w-md mx-auto shadow-2xl"
        >
          <span className="text-xs font-sans tracking-[0.3em] text-champagne-gold font-semibold uppercase block mb-2">
            See You At My Graduation
          </span>
          <p className="font-serif text-3xl font-bold text-ivory-100 tracking-widest">
            {invitationData.event.date}
          </p>
          <p className="text-xs font-sans text-ivory-300/60 uppercase tracking-wider mt-1">
            {invitationData.event.time} · {invitationData.event.location}
          </p>
        </motion.div>

        {/* Footer Credit */}
        <div className="mt-16 text-[11px] font-sans text-ivory-300/40 tracking-widest uppercase flex items-center justify-center gap-2">
          <span>Digital Graduation Invitation</span>
          <span>•</span>
          <span className="flex items-center gap-1 text-champagne-gold">
            Made with <Heart className="w-3 h-3 fill-champagne-gold" /> for 2026
          </span>
        </div>

      </div>
    </footer>
  );
};
