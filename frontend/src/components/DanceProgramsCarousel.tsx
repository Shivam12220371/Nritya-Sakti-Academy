import React, { useRef, useEffect, useState } from 'react';

const programs = [
  { img: '/dance2.jpg', title: 'Expressive Formations', desc: 'Master emotive storytelling' },
  { img: '/dance3.jpg', title: 'Stage Performing Art', desc: 'Choreographed group synergy' },
  { img: '/dance4.jpg', title: 'Rhythmic Intricacy', desc: 'Footwork, mudras, precision' },
  { img: '/class_bharatanatyam_1790074472985.png', title: 'Bharatanatyam', desc: 'Ancient grace and devotion' },
  { img: '/class_kathak_1790074487878.png', title: 'Kathak Spinning', desc: 'Fast rhythmic footwork' },
  { img: '/class_odissi_1790074501671.png', title: 'Odissi Mudras', desc: 'Elegant traditional postures' },
  { img: '/bolly_group_1790074514198.png', title: 'Bollywood Group', desc: 'High energy synchronization' },
  { img: '/bolly_solo_1790074531054.png', title: 'Bollywood Solo', desc: 'Dynamic solo expressions' },
  { img: '/fusion_dance_1790074545098.png', title: 'Indian Fusion', desc: 'Mixing classical and modern' },
];

const DanceProgramsCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [targetSpeed, setTargetSpeed] = useState(-1);
  const currentSpeed = useRef(-1);
  const position = useRef(0);
  const reqRef = useRef<number>(0);
  const isPausedRef = useRef(false);
  
  const items = [...programs, ...programs];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const scroll = () => {
      if (!isPausedRef.current) {
        currentSpeed.current += (targetSpeed - currentSpeed.current) * 0.1;
        position.current += currentSpeed.current;

        const halfWidth = track.scrollWidth / 2;
        
        if (position.current <= -halfWidth) {
          position.current += halfWidth;
        } else if (position.current > 0) {
          position.current -= halfWidth;
        }

        track.style.transform = `translateX(${position.current}px)`;
      }
      reqRef.current = requestAnimationFrame(scroll);
    };
    reqRef.current = requestAnimationFrame(scroll);

    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [targetSpeed]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const normalized = (x / width) * 2 - 1; 
    const speed = normalized * -5;
    setTargetSpeed(speed);
  };

  const handleMouseLeave = () => {
    setTargetSpeed(-1.5);
  };

  const togglePause = () => {
    isPausedRef.current = !isPausedRef.current;
  };

  return (
    <div 
      className="relative w-full overflow-hidden py-10" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={trackRef} 
        className="flex gap-8 w-max px-4"
        style={{ willChange: 'transform' }}
      >
        {items.map((item, index) => (
          <div 
            key={index}
            onClick={togglePause}
            className="group relative rounded-3xl overflow-hidden shadow-lg h-96 w-80 shrink-0 cursor-pointer"
          >
             <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors z-10 pointer-events-none"></div>
             <img 
               src={item.img} 
               alt={item.title} 
               className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700" 
             />
             <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-slate-900 to-transparent z-20 pointer-events-none">
                 <h3 className="text-white font-bold text-xl">{item.title}</h3>
                 <p className="text-slate-300 text-sm mt-1">{item.desc}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DanceProgramsCarousel;
