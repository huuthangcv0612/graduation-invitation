import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { invitationData } from '../../data/invitation';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { revealUp, EASE_CINEMATIC } from '../../utils/animation';

export const Invitation: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition();
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const cardY = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const cardRotateX = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const cardScale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  const mouseRotateX = mouse.isMobile || shouldReduceMotion ? 0 : -mouse.y * 5;
  const mouseRotateY = mouse.isMobile || shouldReduceMotion ? 0 : mouse.x * 5;

  const combinedRotateX = useTransform(cardRotateX, (v) => v + mouseRotateX);

  return (
    <section 
      ref={sectionRef} 
      id="invitation" 
      className="relative py-24 px-4 sm:px-6 bg-ivory-50 overflow-hidden perspective-[1200px]"
    >
      <div className="max-w-3xl mx-auto relative">
        
        {/* 3D Paper Card */}
        <motion.div 
          style={{
            y: shouldReduceMotion ? 0 : cardY,
            rotateX: shouldReduceMotion ? 0 : combinedRotateX,
            rotateY: shouldReduceMotion ? 0 : mouseRotateY,
            scale: shouldReduceMotion ? 1 : cardScale,
            transformStyle: 'preserve-3d',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE_CINEMATIC }}
          className="relative bg-white rounded-2xl p-8 sm:p-14 shadow-invitation border border-champagne-gold/25 text-center transition-shadow duration-300"
        >
          {/* Top Decorative Emblem */}
          <motion.div 
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-12 h-12 mx-auto mb-6 rounded-full bg-ivory-100 border border-champagne-gold/30 flex items-center justify-center shadow-sm"
          >
            <Sparkles className="w-5 h-5 text-champagne-gold" />
          </motion.div>

          <span className="text-xs font-sans tracking-[0.3em] uppercase text-champagne-dark font-semibold block mb-2">
            The Invitation
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-8 uppercase">
            LỜI MỜI DỰ LỄ TỐT NGHIỆP
          </h2>

          <div className="w-16 h-[1px] bg-champagne-gold/50 mx-auto mb-10" />

          {/* Salutation */}
          <motion.p 
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-serif text-xl sm:text-2xl text-charcoal/90 italic font-medium mb-8"
          >
            "{invitationData.message.salutation}"
          </motion.p>

          {/* Staggered Paragraphs */}
          <div className="space-y-5 max-w-2xl mx-auto text-charcoal/80 text-base sm:text-lg leading-relaxed font-sans mb-10">
            {invitationData.message.body.map((paragraph, idx) => (
              <motion.p 
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 * idx, ease: EASE_CINEMATIC }}
                className="font-light"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="h-[1px] w-12 bg-champagne-gold/30" />
            <Heart className="w-4 h-4 text-champagne-dark fill-champagne-gold/20" />
            <div className="h-[1px] w-12 bg-champagne-gold/30" />
          </div>

          {/* Closing Quote Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="p-6 sm:p-7 rounded-xl bg-ivory-100/90 border border-champagne-gold/25 max-w-xl mx-auto shadow-sm"
          >
            <p className="font-serif text-lg sm:text-xl font-semibold text-champagne-dark italic">
              "{invitationData.message.closing}"
            </p>
          </motion.div>

          {/* Signature */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10"
          >
            <p className="text-xs font-sans tracking-widest uppercase text-charcoal/50 mb-1">
              Trân trọng,
            </p>
            <p className="font-serif text-2xl font-bold text-charcoal gold-gradient-text">
              {invitationData.person.name}
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
