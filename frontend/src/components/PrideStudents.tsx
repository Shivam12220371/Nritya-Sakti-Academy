import { motion } from 'framer-motion';

const PrideStudents = () => {
  const images = [
    '/pride_students/media__1790113785865.jpg',
    '/pride_students/media__1790113785913.jpg',
    '/pride_students/media__1790113785945.jpg',
    '/pride_students/media__1790113785991.jpg',
    '/pride_students/media__1790113786062.jpg',
  ];

  // We duplicate the images to create a seamless infinite scrolling effect
  const repeatedImages = [...images, ...images];

  return (
    <section className="py-24 bg-slate-900 border-t border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-6">
              Our Pride Students
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Meet our extraordinarily talented and celebrated dancers who have brought immense pride and recognition to our academy.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="relative w-full">
        {/* Fading Edges for the carousel */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>

       {/* Scrolling Container */}
        <div className="flex overflow-hidden relative w-full h-[400px]">
          <div className="flex gap-6 absolute animate-[scrolling_20s_linear_infinite] hover:[animation-play-state:paused] w-max">
            {repeatedImages.map((src, index) => (
              <div 
                key={index} 
                className="w-80 h-[400px] shrink-0 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(245,158,11,0.1)] border-[4px] border-white/5 bg-slate-800 relative group cursor-pointer"
              >
                <img
                  src={src}
                  alt={`Pride Student ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                {/* Decorative border on hover */}
                <div className="absolute inset-0 border-2 border-amber-500/0 group-hover:border-amber-500/100 rounded-xl transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scrolling {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-\\[scrolling_20s_linear_infinite\\] {
          animation: scrolling 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default PrideStudents;
