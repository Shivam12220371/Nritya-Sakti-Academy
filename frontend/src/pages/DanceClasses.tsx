import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Sparkle, Info } from 'lucide-react';
import { useRef } from 'react';

const DanceClasses = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const floatAnim: any = {
    y: [0, -15, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-slate-950 overflow-hidden">
      
      {/* Cinematic Parallax Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 h-[130vh] w-full"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950 z-10" />
        <img 
          src="/dancer-bg.png" 
          alt="Classical Dancer Silhouette" 
          className="w-full h-full object-cover opacity-60"
        />
      </motion.div>

      <div className="relative z-20 pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-left mb-24 md:pl-20 border-l-4 border-amber-500/50 pl-6">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <span className="text-amber-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 block drop-shadow-md">
              Our Curriculum
            </span>
            <h1 className="text-5xl md:text-7xl font-serif mb-6 text-white leading-tight drop-shadow-lg">
              Find Your <br/> <span className="italic text-amber-100 font-light">&nbsp;Rhythm.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl font-light leading-relaxed">
              Experience the profound depth of classical art in an environment tailored for your ambitions. Join us in the evening, when the shadows stretch and the spirit dances.
            </p>
          </motion.div>
        </div>

        {/* Schedule Timeline - Asymmetric Layout */}
        <div className="mb-32 relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/0 via-amber-500/50 to-amber-500/0"></div>
          
          <div className="flex flex-col gap-24">
            
            {/* 5 PM Slot */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-20"
            >
              <div className="md:w-1/2 flex justify-end">
                <div className="text-right">
                  <h2 className="text-6xl md:text-8xl font-serif text-amber-500/80 mb-2">5<span className="text-4xl text-amber-500/40 font-sans font-light">PM</span></h2>
                  <p className="text-amber-100/60 uppercase tracking-widest text-sm">Evening Initiation</p>
                </div>
              </div>
              <motion.div animate={floatAnim} className="md:w-1/2">
                <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-8 border border-slate-800/50 hover:border-amber-500/30 transition-colors shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-700"></div>
                  <h3 className="text-white font-serif text-2xl mb-6">Foundation & Form</h3>
                  <ul className="space-y-4 relative z-10">
                    <li className="flex items-center gap-4 text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 block"></span>
                      <span className="font-light tracking-wide text-lg">Bharatanatyam (Batch A)</span>
                    </li>
                    <li className="flex items-center gap-4 text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 block"></span>
                      <span className="font-light tracking-wide text-lg">Bollywood Style (Batch B)</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>

            {/* 6 PM Slot - Reversed */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-20"
            >
              <div className="md:w-1/2 flex justify-start">
                <div className="text-left">
                  <h2 className="text-6xl md:text-8xl font-serif text-rose-500/80 mb-2">6<span className="text-4xl text-rose-500/40 font-sans font-light">PM</span></h2>
                  <p className="text-rose-100/60 uppercase tracking-widest text-sm">Peak Expression</p>
                </div>
              </div>
              <motion.div animate={{ ...floatAnim, transition: { ...floatAnim.transition, delay: 1 } }} className="md:w-1/2 flex justify-end">
                <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-8 border border-slate-800/50 hover:border-rose-500/30 transition-colors shadow-2xl relative overflow-hidden group w-full text-left">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-700"></div>
                  <h3 className="text-white font-serif text-2xl mb-6">Movement & Flow</h3>
                  <ul className="space-y-4 relative z-10">
                    <li className="flex items-center justify-end gap-4 text-slate-300 flex-row-reverse">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 block"></span>
                      <span className="font-light tracking-wide text-lg text-right">Free Style Dance (Mixed)</span>
                    </li>
                    <li className="flex items-center justify-end gap-4 text-slate-300 flex-row-reverse">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 block"></span>
                      <span className="font-light tracking-wide text-lg text-right">Bharatanatyam (Batch B)</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>

            {/* 7 PM Slot */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-20"
            >
              <div className="md:w-1/2 flex justify-end">
                <div className="text-right">
                  <h2 className="text-6xl md:text-8xl font-serif text-indigo-500/80 mb-2">7<span className="text-4xl text-indigo-500/40 font-sans font-light">PM</span></h2>
                  <p className="text-indigo-100/60 uppercase tracking-widest text-sm">Advanced Rhythm</p>
                </div>
              </div>
              <motion.div animate={{ ...floatAnim, transition: { ...floatAnim.transition, delay: 2 } }} className="md:w-1/2">
                <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-8 border border-slate-800/50 hover:border-indigo-500/30 transition-colors shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-700"></div>
                  <h3 className="text-white font-serif text-2xl mb-6">Mastery & Drill</h3>
                  <ul className="space-y-4 relative z-10">
                    <li className="flex items-center gap-4 text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 block"></span>
                      <span className="font-light tracking-wide text-lg">Bollywood Style (Batch A)</span>
                    </li>
                    <li className="flex items-center gap-4 text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 block"></span>
                      <span className="font-light tracking-wide text-lg">Masterclass / Performance Drill</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>

        {/* Floating Policy Cards */}
        <div className="mt-32">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* All-Rounder Track */}
            <div className="bg-gradient-to-br from-slate-900/90 to-slate-950 backdrop-blur-xl p-10 border border-amber-500/20 rounded-[2rem] hover:border-amber-500/50 transition-colors shadow-2xl shadow-amber-500/5">
              <Sparkle className="w-10 h-10 text-amber-500 mb-6 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
              <h4 className="text-3xl font-serif text-amber-50 mb-3">All-Rounder Track</h4>
              <p className="text-amber-100/60 font-light mb-8">For students who wish to experience and master every style of dance we teach.</p>
              
              <ul className="space-y-4 text-slate-300 font-light tracking-wide">
                <li className="flex items-center gap-4"><span className="w-1 h-1 bg-amber-500 rounded-full"></span> 2 Days: Bharatanatyam Form</li>
                <li className="flex items-center gap-4"><span className="w-1 h-1 bg-rose-500 rounded-full"></span> 2 Days: Bollywood Style Choreography</li>
                <li className="flex items-center gap-4"><span className="w-1 h-1 bg-indigo-500 rounded-full"></span> 1 Day: Free Style Expression</li>
              </ul>
            </div>

            {/* Specialist Track */}
            <div className="bg-gradient-to-br from-slate-900/90 to-slate-950 backdrop-blur-xl p-10 border border-indigo-500/20 rounded-[2rem] hover:border-indigo-500/50 transition-colors shadow-2xl shadow-indigo-500/5">
              <ShieldCheck className="w-10 h-10 text-indigo-500 mb-6 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
              <h4 className="text-3xl font-serif text-indigo-50 mb-3">Specialist Track</h4>
              <p className="text-indigo-100/60 font-light mb-8">For students who have a singular passion and dedicate themselves strictly to one art form.</p>
              
              <div className="bg-indigo-950/40 border border-indigo-500/20 p-6 rounded-2xl flex gap-4 items-start shadow-inner">
                <Info className="w-6 h-6 text-indigo-400 shrink-0 mt-1" />
                <p className="text-indigo-100/70 font-light leading-relaxed">
                  Choose your specific core style (such as exclusive Bharatanatyam) and continue gracefully with that focused schedule throughout your entire journey.
                </p>
              </div>
            </div>
            
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default DanceClasses;
