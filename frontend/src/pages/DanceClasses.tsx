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
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-[#fbf8f5]">
      
      {/* Cinematic Parallax Background - Kept soft and light */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 h-[130vh] w-full"
      >
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#fbf8f5]/30 via-[#fbf8f5]/85 to-[#fbf8f5]" />
        <img 
          src="/ghungroo_feet.png" 
          alt="Classical Dancer Feet Shadow" 
          className="h-full w-full object-cover opacity-[0.14] mix-blend-multiply"
        />
      </motion.div>

      <div className="relative z-20 pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="relative mb-24 overflow-hidden rounded-[2.5rem] border border-[#eaded5] bg-gradient-to-br from-[#fffdfb] via-[#fffaf6] to-[#f6ece8] px-6 py-10 shadow-[0_24px_70px_-45px_rgba(75,36,74,0.5)] md:pl-20">
          <div className="absolute -right-20 -top-32 h-72 w-72 rounded-full bg-[#c99a5a]/10 blur-3xl" />
          <div className="absolute bottom-0 right-12 h-1 w-24 bg-[#c99a5a]" />
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.3em] text-[#9b5b67]">
              Our Curriculum
            </span>
            <h1 className="mb-6 font-serif text-5xl leading-tight text-[#2c1f2f] md:text-7xl">
              Find Your <br/> <span className="font-light italic text-[#9b5b67]">&nbsp;Rhythm.</span>
            </h1>
            <p className="max-w-2xl text-lg font-light leading-relaxed text-[#756b73] md:text-xl">
              Experience the profound depth of classical art in an environment tailored for your ambitions. Join us in the evening, when the shadows stretch and the spirit dances.
            </p>
          </motion.div>
        </div>

        {/* Schedule Timeline - Asymmetric Layout */}
        <div className="mb-32 relative">
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-px bg-gradient-to-b from-[#eaded5]/0 via-[#c99a5a]/50 to-[#eaded5]/0 md:block"></div>
          
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
                  <h2 className="mb-2 font-serif text-6xl text-[#9b5b67] md:text-8xl">5<span className="font-sans text-4xl font-light text-[#9b5b67]/75">PM</span></h2>
                  <p className="text-sm font-bold uppercase tracking-widest text-[#2c1f2f]">Evening Initiation</p>
                </div>
              </div>
              <motion.div animate={floatAnim} className="md:w-1/2">
                <div className="group relative overflow-hidden rounded-[2rem] border border-[#eaded5] bg-[#fffdfb] p-8 shadow-[0_12px_35px_-24px_rgba(75,36,74,0.7)] transition-all hover:-translate-y-1 hover:border-[#c99a5a] hover:shadow-xl">
                  <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#f0d9d7]/60 blur-2xl transition-all duration-700 group-hover:scale-150"></div>
                  <h3 className="relative mb-6 font-serif text-2xl font-bold text-[#2c1f2f]">Foundation & Form</h3>
                  <ul className="space-y-4 relative z-10">
                    <li className="flex items-center gap-4 text-[#756b73]">
                      <span className="block h-2 w-2 rounded-full bg-[#c99a5a]"></span>
                      <span className="text-lg font-medium tracking-wide">Bharatanatyam (Batch A)</span>
                    </li>
                    <li className="flex items-center gap-4 text-[#756b73]">
                      <span className="block h-2 w-2 rounded-full bg-[#c99a5a]"></span>
                      <span className="text-lg font-medium tracking-wide">Bollywood Style (Batch B)</span>
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
                  <h2 className="mb-2 font-serif text-6xl text-[#2c1f2f] md:text-8xl">6<span className="font-sans text-4xl font-light text-[#2c1f2f]/70">PM</span></h2>
                  <p className="text-sm font-bold uppercase tracking-widest text-[#9b5b67]">Peak Expression</p>
                </div>
              </div>
              <motion.div animate={{ ...floatAnim, transition: { ...floatAnim.transition, delay: 1 } }} className="md:w-1/2 flex justify-end">
                <div className="group relative w-full overflow-hidden rounded-[2rem] border border-[#eaded5] bg-[#fffdfb] p-8 text-left shadow-[0_12px_35px_-24px_rgba(75,36,74,0.7)] transition-all hover:-translate-y-1 hover:border-[#9b5b67] hover:shadow-xl">
                  <div className="absolute left-0 top-0 h-32 w-32 rounded-full bg-[#f0d9d7]/60 blur-2xl transition-all duration-700 group-hover:scale-150"></div>
                  <h3 className="relative mb-6 font-serif text-2xl font-bold text-[#2c1f2f]">Movement & Flow</h3>
                  <ul className="space-y-4 relative z-10">
                    <li className="flex flex-row-reverse items-center justify-end gap-4 text-[#756b73]">
                      <span className="block h-2 w-2 rounded-full bg-[#9b5b67]"></span>
                      <span className="text-right text-lg font-medium tracking-wide">Free Style Dance (Mixed)</span>
                    </li>
                    <li className="flex flex-row-reverse items-center justify-end gap-4 text-[#756b73]">
                      <span className="block h-2 w-2 rounded-full bg-[#9b5b67]"></span>
                      <span className="text-right text-lg font-medium tracking-wide">Bharatanatyam (Batch B)</span>
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
                  <h2 className="mb-2 font-serif text-6xl text-[#9b5b67] md:text-8xl">7<span className="font-sans text-4xl font-light text-[#9b5b67]/75">PM</span></h2>
                  <p className="text-sm font-bold uppercase tracking-widest text-[#2c1f2f]">Advanced Rhythm</p>
                </div>
              </div>
              <motion.div animate={{ ...floatAnim, transition: { ...floatAnim.transition, delay: 2 } }} className="md:w-1/2">
                <div className="group relative overflow-hidden rounded-[2rem] border border-[#eaded5] bg-[#fffdfb] p-8 shadow-[0_12px_35px_-24px_rgba(75,36,74,0.7)] transition-all hover:-translate-y-1 hover:border-[#c99a5a] hover:shadow-xl">
                  <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#f0d9d7]/60 blur-2xl transition-all duration-700 group-hover:scale-150"></div>
                  <h3 className="relative mb-6 font-serif text-2xl font-bold text-[#2c1f2f]">Mastery & Drill</h3>
                  <ul className="space-y-4 relative z-10">
                    <li className="flex items-center gap-4 text-[#756b73]">
                      <span className="block h-2 w-2 rounded-full bg-[#c99a5a]"></span>
                      <span className="text-lg font-medium tracking-wide">Bollywood Style (Batch A)</span>
                    </li>
                    <li className="flex items-center gap-4 text-[#756b73]">
                      <span className="block h-2 w-2 rounded-full bg-[#c99a5a]"></span>
                      <span className="text-lg font-medium tracking-wide">Masterclass / Performance Drill</span>
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
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
          >
            {/* All-Rounder Track */}
            <div className="flex flex-col items-start rounded-[2rem] border border-[#eaded5] bg-gradient-to-br from-[#fffdfb] to-[#f8eeeb] p-10 shadow-[0_12px_35px_-24px_rgba(75,36,74,0.7)] transition-all hover:-translate-y-1 hover:border-[#c99a5a] hover:shadow-xl">
              <Sparkle className="mb-6 h-10 w-10 text-[#c99a5a]" />
              <h4 className="mb-3 font-serif text-3xl font-bold text-[#2c1f2f]">All-Rounder Track</h4>
              <p className="mb-8 font-light text-[#756b73]">For students who wish to experience and master every style of dance we teach.</p>
              
              <ul className="space-y-4 font-medium tracking-wide text-[#2c1f2f]">
                <li className="flex items-center gap-4"><span className="h-2 w-2 rounded-full bg-[#c99a5a]"></span> 2 Days: Bharatanatyam Form</li>
                <li className="flex items-center gap-4"><span className="h-2 w-2 rounded-full bg-[#c99a5a]"></span> 2 Days: Bollywood Style Choreography</li>
                <li className="flex items-center gap-4"><span className="h-2 w-2 rounded-full bg-[#c99a5a]"></span> 1 Day: Free Style Expression</li>
              </ul>
            </div>

            {/* Specialist Track */}
            <div className="flex flex-col items-start rounded-[2rem] border border-[#eaded5] bg-gradient-to-br from-[#fffdfb] to-[#f8eeeb] p-10 shadow-[0_12px_35px_-24px_rgba(75,36,74,0.7)] transition-all hover:-translate-y-1 hover:border-[#9b5b67] hover:shadow-xl">
              <ShieldCheck className="mb-6 h-10 w-10 text-[#9b5b67]" />
              <h4 className="mb-3 font-serif text-3xl font-bold text-[#2c1f2f]">Specialist Track</h4>
              <p className="mb-8 font-light text-[#756b73]">For students who have a singular passion and dedicate themselves strictly to one art form.</p>
              
              <div className="flex w-full items-start gap-4 rounded-[1.5rem] border border-[#eaded5] bg-[#fbf8f5] p-6">
                <Info className="mt-1 h-6 w-6 shrink-0 text-[#9b5b67]" />
                <p className="font-medium leading-relaxed text-[#2c1f2f]">
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
