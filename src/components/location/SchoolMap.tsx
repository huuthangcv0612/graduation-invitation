import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { invitationData, BuildingInfo } from '../../data/invitation';
import { EASE_CINEMATIC } from '../../utils/animation';

export const SchoolMap: React.FC = () => {
  const { campusMap } = invitationData;
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingInfo | null>(
    campusMap.buildings.find(b => b.isDestination) || campusMap.buildings[0]
  );
  const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);

  const activeBuilding = campusMap.buildings.find(b => b.id === hoveredBuilding) || selectedBuilding;

  return (
    <section id="map" className="py-24 px-4 sm:px-6 bg-ivory-50 border-t border-champagne-gold/15">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-champagne-dark font-semibold block mb-2">
            Campus Guide
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            FIND YOUR WAY
          </h2>
          <p className="text-xs sm:text-sm font-sans text-charcoal/60 mt-2 max-w-md mx-auto">
            Sơ đồ hướng dẫn di chuyển từ Cổng trường Giải Phóng đến Phòng Lễ Tốt Nghiệp
          </p>
          <div className="w-12 h-[1px] bg-champagne-gold/40 mx-auto mt-4" />
        </div>

        {/* Route Steps Cards (Gate -> Yard -> Building H1 -> Room 112.H1) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {campusMap.routeSteps.map((stepItem, index) => {
            const isLast = index === campusMap.routeSteps.length - 1;
            return (
              <motion.div
                key={stepItem.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: EASE_CINEMATIC }}
                className={`relative p-5 rounded-xl border transition-all ${
                  isLast 
                    ? 'bg-champagne-gold/10 border-champagne-gold shadow-md' 
                    : 'bg-white border-champagne-gold/20 shadow-sm hover:border-champagne-gold/40'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-sans font-bold px-2.5 py-0.5 rounded-full ${
                    isLast ? 'bg-champagne-gold text-charcoal' : 'bg-ivory-200 text-charcoal/70'
                  }`}>
                    BƯỚC {stepItem.step}
                  </span>
                  {isLast && <Star className="w-4 h-4 text-champagne-dark fill-champagne-gold" />}
                </div>

                <h3 className="font-serif text-lg font-bold text-charcoal mb-1">
                  {stepItem.name}
                </h3>
                <p className="text-xs text-charcoal/60 font-sans">
                  {stepItem.detail}
                </p>

                {!isLast && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-6 h-6 rounded-full bg-ivory-100 border border-champagne-gold/30 flex items-center justify-center text-champagne-dark">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Campus SVG Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Map Graphic (SVG) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
            className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-champagne-gold/25 shadow-invitation relative"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-sans font-semibold tracking-wider text-charcoal/50 uppercase">
                Sơ đồ HUCE (Nhấp vào Tòa nhà để xem thông tin)
              </span>
              <span className="text-xs font-sans text-champagne-dark font-medium flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-champagne-gold" /> Điểm đến: Phòng 112.H1
              </span>
            </div>

            {/* SVG Campus Map Vector */}
            <div className="relative w-full aspect-[16/10] bg-ivory-100/60 rounded-xl border border-champagne-gold/20 overflow-hidden p-2">
              <svg 
                viewBox="0 0 800 500" 
                className="w-full h-full drop-shadow-sm select-none"
              >
                {/* Background Lawn / Paths */}
                <rect width="800" height="500" rx="8" fill="#f8f6f0" />
                
                {/* Main Entrance Road / Gate */}
                <path d="M 400 480 L 400 320" stroke="#dcd6c8" strokeWidth="40" strokeLinecap="round" />
                <path d="M 400 320 L 400 120" stroke="#dcd6c8" strokeWidth="24" strokeLinecap="round" />
                <path d="M 400 260 L 220 260" stroke="#dcd6c8" strokeWidth="20" strokeLinecap="round" />
                <path d="M 400 260 L 580 260" stroke="#dcd6c8" strokeWidth="20" strokeLinecap="round" />

                {/* Gate Entry Graphic */}
                <rect x="340" y="450" width="120" height="30" rx="4" fill="#333" />
                <text x="400" y="470" fill="#fff" fontSize="12" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">CỔNG 55 GIẢI PHÓNG</text>

                {/* Main Yard Plaza */}
                <circle cx="400" cy="260" r="45" fill="#e8e2d5" stroke="#c5a059" strokeWidth="2" strokeDasharray="4 4" />
                <text x="400" y="265" fill="#777" fontSize="11" fontFamily="sans-serif" textAnchor="middle">SÂN TRUNG TÂM</text>

                {/* Building: H1 (MAIN DESTINATION) */}
                <motion.g 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  onClick={() => setSelectedBuilding(campusMap.buildings[0])}
                  onMouseEnter={() => setHoveredBuilding('h1')}
                  onMouseLeave={() => setHoveredBuilding(null)}
                  className="cursor-pointer transition-transform duration-300"
                >
                  <rect 
                    x="280" y="80" width="240" height="120" rx="8" 
                    fill={activeBuilding?.id === 'h1' ? '#c5a059' : '#1c1c1c'} 
                    stroke="#c5a059" 
                    strokeWidth="3"
                    className="transition-colors duration-300"
                  />
                  <rect x="300" y="100" width="200" height="80" rx="4" fill="none" stroke="#fff" strokeWidth="1" strokeDasharray="4 2" opacity="0.4" />
                  
                  {/* Star Badge */}
                  <circle cx="400" cy="115" r="14" fill="#f4e8c1" />
                  <text x="400" y="120" fontSize="14" textAnchor="middle">⭐</text>

                  <text x="400" y="145" fill="#ffffff" fontSize="18" fontFamily="Georgia, serif" fontWeight="bold" textAnchor="middle">
                    TÒA NHÀ H1
                  </text>
                  <text x="400" y="168" fill="#f4e8c1" fontSize="13" fontFamily="sans-serif" fontWeight="600" textAnchor="middle">
                    PHÒNG 112.H1 (LỄ TỐT NGHIỆP)
                  </text>
                </motion.g>

                {/* Building: H2 */}
                <motion.g 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  onClick={() => setSelectedBuilding(campusMap.buildings[1])}
                  onMouseEnter={() => setHoveredBuilding('h2')}
                  onMouseLeave={() => setHoveredBuilding(null)}
                  className="cursor-pointer"
                >
                  <rect 
                    x="560" y="80" width="180" height="120" rx="8" 
                    fill={activeBuilding?.id === 'h2' ? '#c5a059' : '#ffffff'} 
                    stroke="#d3c9b7" 
                    strokeWidth="2"
                    className="transition-colors duration-300"
                  />
                  <text x="650" y="140" fill={activeBuilding?.id === 'h2' ? '#fff' : '#444'} fontSize="16" fontFamily="Georgia, serif" fontWeight="bold" textAnchor="middle">
                    TÒA NHÀ H2
                  </text>
                  <text x="650" y="162" fill={activeBuilding?.id === 'h2' ? '#f4e8c1' : '#888'} fontSize="11" fontFamily="sans-serif" textAnchor="middle">
                    Giảng đường H2
                  </text>
                </motion.g>

                {/* Building: Library */}
                <motion.g 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  onClick={() => setSelectedBuilding(campusMap.buildings[2])}
                  onMouseEnter={() => setHoveredBuilding('thu-vien')}
                  onMouseLeave={() => setHoveredBuilding(null)}
                  className="cursor-pointer"
                >
                  <rect 
                    x="60" y="80" width="180" height="120" rx="8" 
                    fill={activeBuilding?.id === 'thu-vien' ? '#c5a059' : '#ffffff'} 
                    stroke="#d3c9b7" 
                    strokeWidth="2"
                    className="transition-colors duration-300"
                  />
                  <text x="150" y="140" fill={activeBuilding?.id === 'thu-vien' ? '#fff' : '#444'} fontSize="16" fontFamily="Georgia, serif" fontWeight="bold" textAnchor="middle">
                    THƯ VIỆN
                  </text>
                  <text x="150" y="162" fill={activeBuilding?.id === 'thu-vien' ? '#f4e8c1' : '#888'} fontSize="11" fontFamily="sans-serif" textAnchor="middle">
                    Trung tâm TT-TV
                  </text>
                </motion.g>

                {/* Dynamic Route Line Drawing */}
                <motion.path 
                  d="M 400 440 L 400 210" 
                  fill="none" 
                  stroke="#c5a059" 
                  strokeWidth="4" 
                  strokeDasharray="8 6" 
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
              </svg>
            </div>
          </motion.div>

          {/* Interactive Info Card Panel */}
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              {activeBuilding && (
                <motion.div
                  key={activeBuilding.id}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.3 }}
                  className={`p-7 rounded-2xl border shadow-card-hover ${
                    activeBuilding.isDestination 
                      ? 'bg-charcoal text-white border-champagne-gold' 
                      : 'bg-white text-charcoal border-champagne-gold/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-sans font-bold tracking-widest px-3 py-1 rounded-full uppercase ${
                      activeBuilding.isDestination 
                        ? 'bg-champagne-gold text-charcoal' 
                        : 'bg-ivory-200 text-charcoal/80'
                    }`}>
                      {activeBuilding.isDestination ? '⭐ ĐỊA ĐIỂM CHÍNH' : 'KHU VỰC'}
                    </span>
                    <Info className={`w-5 h-5 ${activeBuilding.isDestination ? 'text-champagne-gold' : 'text-charcoal/40'}`} />
                  </div>

                  <h3 className={`font-serif text-2xl font-bold mb-2 ${
                    activeBuilding.isDestination ? 'text-champagne-light' : 'text-charcoal'
                  }`}>
                    {activeBuilding.name}
                  </h3>

                  <div className="space-y-2 mb-6 text-sm font-sans opacity-90">
                    <div className="flex justify-between py-1 border-b border-white/10">
                      <span className="opacity-70">Tầng / Vị trí:</span>
                      <span className="font-semibold">{activeBuilding.floor}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/10">
                      <span className="opacity-70">Phòng tổ chức:</span>
                      <span className="font-semibold">{activeBuilding.room}</span>
                    </div>
                  </div>

                  <p className="text-xs font-sans leading-relaxed opacity-80 mb-6">
                    {activeBuilding.description}
                  </p>

                  {activeBuilding.isDestination && (
                    <div className="p-3 rounded-lg bg-champagne-gold/20 border border-champagne-gold/40 text-xs font-sans flex items-center gap-2 text-champagne-light">
                      <CheckCircle2 className="w-4 h-4 text-champagne-gold shrink-0" />
                      <span>Đã gắn cờ địa điểm trao bằng Kỹ sư</span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
