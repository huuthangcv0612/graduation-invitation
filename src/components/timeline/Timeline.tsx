import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { GraduationCap, Sparkles, Code, BookOpen, Rocket } from 'lucide-react';
import { invitationData } from '../../data/invitation';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASE_CINEMATIC } from '../../utils/animation';

export const Timeline: React.FC = () => {
  const { timeline } = invitationData;
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const icons = [BookOpen, Code, Rocket, Sparkles, GraduationCap];

  return (
    <section 
      ref={containerRef}
      id="journey" 
      className="py-24 px-4 sm:px-6 bg-ivory-100 border-t border-champagne-gold/15"
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-champagne-dark font-semibold block mb-2">
            Academic Milestone
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            MY JOURNEY
          </h2>
          <p className="text-xs sm:text-sm font-sans text-charcoal/60 mt-2">
            Hành trình 4 năm học tập và phát triển bản thân tại Đại học Xây dựng Hà Nội
          </p>
          <div className="w-12 h-[1px] bg-champagne-gold/40 mx-auto mt-4" />
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative">
          
          {/* Base Background Track Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] bg-champagne-gold/20 -translate-x-1/2" />

          {/* Dynamic Animated Line Drawing */}
          <motion.div 
            style={{ height: shouldReduceMotion ? "100%" : lineHeight }}
            className="absolute left-4 sm:left-1/2 top-0 w-[2px] bg-champagne-gold -translate-x-1/2 origin-top" 
          />

          <div className="space-y-12 sm:space-y-16">
            {timeline.map((item, index) => {
              const isEven = index % 2 === 0;
              const IconComp = icons[index % icons.length];
              const isLast = index === timeline.length - 1;

              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: EASE_CINEMATIC }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Badge Icon on Center Line */}
                  <motion.div 
                    whileHover={{ scale: 1.2 }}
                    className={`absolute left-4 sm:left-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center shadow-md transition-colors ${
                      isLast 
                        ? 'bg-champagne-gold border-white text-charcoal shadow-champagne-gold/40' 
                        : 'bg-white border-champagne-gold text-charcoal'
                    }`}
                  >
                    <IconComp className={`w-4 h-4 ${isLast ? 'text-charcoal animate-pulse' : 'text-champagne-dark'}`} />
                  </motion.div>

                  {/* Card Content Box */}
                  <div className={`pl-12 sm:pl-0 sm:w-1/2 ${isEven ? 'sm:pr-12 sm:text-right' : 'sm:pl-12 sm:text-left'}`}>
                    <div className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 hover:shadow-card-hover ${
                      isLast 
                        ? 'bg-charcoal text-white border-champagne-gold shadow-invitation relative overflow-hidden' 
                        : 'bg-white text-charcoal border-champagne-gold/25 shadow-sm'
                    }`}>
                      {isLast && (
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-champagne-gold/20 rounded-full blur-xl pointer-events-none" />
                      )}

                      <div className={`inline-block text-xs font-sans font-bold tracking-widest px-3 py-1 rounded-full uppercase mb-2 ${
                        isLast 
                          ? 'bg-champagne-gold text-charcoal' 
                          : 'bg-ivory-200 text-champagne-dark'
                      }`}>
                        {item.year}
                      </div>

                      <h3 className={`font-serif text-xl sm:text-2xl font-bold mb-2 ${
                        isLast ? 'text-champagne-light' : 'text-charcoal'
                      }`}>
                        {item.title}
                      </h3>

                      <p className={`text-xs sm:text-sm font-sans leading-relaxed ${
                        isLast ? 'opacity-85 text-ivory-100' : 'text-charcoal/70'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
