import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, CalendarHeart, Users } from 'lucide-react';
import { useRef } from 'react';

const AboutUs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const blurZoom: any = useTransform(scrollYProgress, [0, 1], ["blur(0px) scale(1)", "blur(4px) scale(1.05)"]);

  // Stagger variants for content
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  return (
    <div ref={containerRef} className="pt-24 pb-16 min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-[100px] -z-10 -translate-x-1/4 translate-y-1/3" />
      
      {/* Light Greenish Classical Instruments Shadow/Watermark */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply dark:mix-blend-screen pointer-events-none" style={{ backgroundImage: "url('/instruments-bg.png')", backgroundRepeat: "repeat", backgroundSize: "600px" }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-24 relative">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" as const }}>
            <span className="text-amber-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 block drop-shadow-sm">
              Our Story
            </span>
            <h1 className="text-6xl md:text-7xl font-serif mb-6 tracking-tight text-slate-900 dark:text-white leading-tight">
              About <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Nritya Shakti Academy</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
              Empowering dancers and preserving the rich heritage of classical and modern dance forms.
            </p>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
            
          {/* Image Side - Cinematic Framing */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            transition={{ duration: 1, ease: "easeOut" as const }}
            className="relative group"
          >
            {/* Glowing Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/30 to-amber-500/30 rounded-[2.5rem] blur-2xl group-hover:blur-3xl transition-all duration-700 opacity-60"></div>
            
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/20 dark:border-slate-800/50 xl:h-[650px] bg-slate-900">
                <motion.img 
                  style={{ filter: blurZoom, WebkitFilter: blurZoom }}
                  src="/ayushi.jpg" 
                  alt="Ayushi Dubey - Founder" 
                  className="w-full h-full object-cover object-top transition-transform duration-700" 
                />
                
                <div className="absolute bottom-0 left-0 w-full p-10 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <p className="text-amber-400 font-bold tracking-[0.2em] uppercase text-xs mb-2 drop-shadow-md">Founder & Lead Instructor</p>
                        <h3 className="text-4xl font-serif text-white mb-2 drop-shadow-lg leading-tight">Ayushi Dubey</h3>
                        <div className="w-12 h-1 bg-amber-500 rounded-full mt-4"></div>
                    </motion.div>
                </div>
            </div>
          </motion.div>

          {/* Text Side - Fluid Floating Typography */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-12"
          >
            {/* Journey */}
            <motion.div variants={itemVariants} className="relative group">
                <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-indigo-500/10 rounded-full origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out hidden md:block"></div>
                <h3 className="text-3xl font-serif mb-4 flex items-center gap-4 text-slate-800 dark:text-slate-100">
                    <CalendarHeart className="w-8 h-8 text-indigo-500 p-1.5 bg-indigo-500/10 rounded-xl" />
                    Our Journey
                </h3>
                <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed text-lg text-justify md:text-left">
                    Organized and established in <strong className="text-indigo-600 dark:text-indigo-400 font-normal">April 2020</strong>, the Nritya Shakti Academy was brought to life by <strong className="text-slate-800 dark:text-slate-200 font-normal">Ayushi Dubey</strong>, the proud owner and passionate instructor of the academy. What started as a vision to spread the joy of dance has grown into a thriving community.
                </p>
            </motion.div>

            {/* Styles */}
            <motion.div variants={itemVariants} className="relative group">
                <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 to-amber-500/10 rounded-full origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out hidden md:block"></div>
                <h3 className="text-3xl font-serif mb-4 flex items-center gap-4 text-slate-800 dark:text-slate-100">
                    <Sparkles className="w-8 h-8 text-amber-500 p-1.5 bg-amber-500/10 rounded-xl" />
                    Styles We Teach
                </h3>
                <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed text-lg mb-6">
                    Under the expert guidance of Ayushi Dubey, the academy specializes in a variety of expressive forms:
                </p>
                <div className="flex flex-wrap gap-4">
                    <motion.div whileHover={{ y: -5 }} className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/50 text-amber-700 dark:text-amber-400 rounded-2xl shadow-sm hover:shadow-amber-500/20 shadow-amber-500/5 transition-all text-sm font-medium tracking-wide flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Classical Bharatanatyam
                    </motion.div>
                    <motion.div whileHover={{ y: -5 }} className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-pink-200 dark:border-pink-900/50 text-pink-700 dark:text-pink-400 rounded-2xl shadow-sm hover:shadow-pink-500/20 shadow-pink-500/5 transition-all text-sm font-medium tracking-wide flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span> Bollywood Style
                    </motion.div>
                    <motion.div whileHover={{ y: -5 }} className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 rounded-2xl shadow-sm hover:shadow-blue-500/20 shadow-blue-500/5 transition-all text-sm font-medium tracking-wide flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Free Style Dance
                    </motion.div>
                </div>
            </motion.div>

            {/* Who Can Join */}
            <motion.div variants={itemVariants} className="relative group">
                <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 to-emerald-500/10 rounded-full origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out hidden md:block"></div>
                <h3 className="text-3xl font-serif mb-4 flex items-center gap-4 text-slate-800 dark:text-slate-100">
                    <Users className="w-8 h-8 text-emerald-500 p-1.5 bg-emerald-500/10 rounded-xl" />
                    Who Can Join?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed text-lg">
                    Dance has no boundaries! We proudly welcome both <strong className="text-slate-800 dark:text-slate-200 font-normal">girls and boys</strong> of all ages to join our classes. Whether you are an absolute beginner or looking to perfect your stage presence, there is a place for you at our academy.
                </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default AboutUs;
