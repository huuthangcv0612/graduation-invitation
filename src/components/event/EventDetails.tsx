import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, DoorOpen } from 'lucide-react';
import { invitationData } from '../../data/invitation';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASE_CINEMATIC } from '../../utils/animation';

interface EventCardProps {
  item: {
    icon: React.ElementType;
    label: string;
    value: string;
    subtext: string;
  };
  index: number;
  initialZ: number;
  shouldReduceMotion: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ item, index, initialZ, shouldReduceMotion }) => {
  const IconComponent = item.icon;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
        z: shouldReduceMotion ? 0 : initialZ,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        z: 0,
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: EASE_CINEMATIC,
      }}
      whileHover={
        shouldReduceMotion 
          ? {} 
          : { 
              y: -8, 
              rotateX: 3, 
              rotateY: -3, 
              transition: { duration: 0.25 } 
            }
      }
      className="relative p-6 sm:p-7 bg-white rounded-xl border border-champagne-gold/25 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group perspective-[600px]"
    >
      <div className="flex items-center justify-between mb-6">
        <span className="text-[11px] font-sans tracking-widest font-semibold text-champagne-dark uppercase">
          {item.label}
        </span>
        <div className="w-9 h-9 rounded-full bg-ivory-100 group-hover:bg-champagne-gold group-hover:text-charcoal text-champagne-dark transition-colors duration-300 flex items-center justify-center border border-champagne-gold/30 shadow-sm">
          <IconComponent className="w-4 h-4" />
        </div>
      </div>

      <div>
        <h3 className="font-serif text-2xl font-bold text-charcoal group-hover:text-champagne-dark transition-colors duration-300 mb-2">
          {item.value}
        </h3>
        <p className="text-xs text-charcoal/60 font-sans leading-relaxed">
          {item.subtext}
        </p>
      </div>

      <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-champagne-gold/0 group-hover:bg-champagne-gold transition-colors duration-300 rounded-full" />
    </motion.div>
  );
};

export const EventDetails: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const details = [
    {
      icon: Calendar,
      label: 'DATE',
      value: invitationData.event.date,
      subtext: 'Thứ Sáu, Ngày 30 Tháng 10',
      z: 100,
    },
    {
      icon: Clock,
      label: 'TIME',
      value: invitationData.event.time,
      subtext: 'Bắt đầu đón khách từ 14:30',
      z: 60,
    },
    {
      icon: MapPin,
      label: 'LOCATION',
      value: invitationData.event.location,
      subtext: invitationData.event.address,
      z: 20,
    },
    {
      icon: DoorOpen,
      label: 'ROOM',
      value: invitationData.event.room,
      subtext: invitationData.event.building,
      z: -20,
    },
  ];

  return (
    <section id="details" className="py-20 px-4 sm:px-6 bg-ivory-100 border-t border-champagne-gold/15 perspective-[1000px]">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-14">
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-champagne-dark font-semibold block mb-2">
            Schedule & Venue
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            EVENT DETAILS
          </h2>
          <div className="w-12 h-[1px] bg-champagne-gold/40 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {details.map((item, index) => (
            <EventCard
              key={item.label}
              item={item}
              index={index}
              initialZ={item.z}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
