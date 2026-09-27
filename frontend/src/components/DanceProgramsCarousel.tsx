import { useState, useRef, useEffect } from 'react';

const programs = [
  { img: '/dance2.jpg', title: 'Expressive Formations', desc: 'Master emotive storytelling', hoverDesc: 'Coordinate graceful gestures and evocative hand mudras to vividly illustrate complex myths and emotions as a group.' },
  { img: '/dance3.jpg', title: 'Stage Performing Art', desc: 'Choreographed group synergy', hoverDesc: 'Focus on precise formations, dynamic spacing, and harmonious group synchronization essential for theatrical stages.' },
  { img: '/dance4.jpg', title: 'Rhythmic Intricacy', desc: 'Footwork, mudras, precision', hoverDesc: 'Master complex footwork (Tatkar) synchronized perfectly with intricate hand gestures (Hastas) and facial expressions.' },
  { img: '/class_bharatanatyam_1790074472985.png', title: 'Bharatanatyam', desc: 'Ancient grace and devotion', hoverDesc: 'Learn the foundational adavus (basic steps) and symbolic mudras like Pataka and Tripataka of this ancient classical art.' },
  { img: '/class_kathak_1790074487878.png', title: 'Kathak Spinning', desc: 'Fast rhythmic footwork', hoverDesc: 'Develop lightning-fast spins (Chakkars) combined with sharp, expressive eye movements and rhythmic foot tapping.' },
  { img: '/class_odissi_1790074501671.png', title: 'Odissi Mudras', desc: 'Elegant traditional postures', hoverDesc: 'Master the distinct Tribhangi (three-bend) posture and lyrical mudras portraying divine romance and stories.' },
  { img: '/bolly_group_1790074514198.png', title: 'Bollywood Group', desc: 'High energy synchronization', hoverDesc: 'A vibrant mix of freestyle and Indian folk, focusing on energetic expressions, hooks, and perfect group timing.' },
  { img: '/bolly_solo_1790074531054.png', title: 'Bollywood Solo', desc: 'Dynamic solo expressions', hoverDesc: 'Unleash your charismatic personality with dramatic expressions and highly energetic pop hooks in solo center-stage routines.' },
  { img: '/fusion_dance_1790074545098.png', title: 'Indian Fusion', desc: 'Mixing classical and modern', hoverDesc: 'Blend precise classical mudras with fluid contemporary movements to create a unique, modern storytelling experience.' },
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

  const handleMouseEnter = () => {
    setTargetSpeed(0);
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
      onMouseEnter={handleMouseEnter}
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
             <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-slate-900 via-slate-900/90 to-transparent z-20 pointer-events-none transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                 <h3 className="text-white font-bold text-xl drop-shadow-md">{item.title}</h3>
                 <p className="text-amber-400 font-medium text-sm drop-shadow-md mt-1">{item.desc}</p>
                 <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 transition-all duration-500">
                    <div className="overflow-hidden">
                      <p className="text-slate-200 text-sm leading-relaxed mt-3 drop-shadow-sm">{item.hoverDesc}</p>
                    </div>
                 </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DanceProgramsCarousel;
