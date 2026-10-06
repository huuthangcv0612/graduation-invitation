import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const FloatingNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  const navItems = [
    { id: 'invitation', label: 'Lời Mời' },
    { id: 'details', label: 'Chi Tiết' },
    { id: 'location', label: 'Địa Điểm' },
    { id: 'map', label: 'Sơ Đồ Trường' },
    { id: 'journey', label: 'Hành Trình' },
    { id: 'memories', label: 'Kỷ Niệm' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;

      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-4">
      {/* Scroll Progress Bar Track */}
      <div className="relative w-[2px] h-28 bg-champagne-gold/20 rounded-full overflow-hidden mb-1">
        <motion.div
          style={{ scaleY }}
          className="absolute top-0 left-0 right-0 h-full bg-champagne-gold origin-top"
        />
      </div>

      {/* Floating Navigation Dots */}
      <div className="py-3 px-2 rounded-full glass-nav flex flex-col items-center gap-3 shadow-lg">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              aria-label={`Chuyển tới ${item.label}`}
              className="group relative flex items-center p-1 cursor-pointer focus:outline-none"
            >
              {/* Dot */}
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-champagne-gold scale-125 ring-4 ring-champagne-gold/20'
                    : 'bg-charcoal/30 hover:bg-champagne-gold/60'
                }`}
              />

              {/* Tooltip Label on Hover */}
              <span className="absolute left-8 px-3 py-1 rounded-md bg-charcoal text-white text-xs font-sans whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-md border border-champagne-gold/30">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
