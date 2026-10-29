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
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-[#fbf8f5] pb-24 pt-28 selection:bg-[#c99a5a]/20">
      {/* Cinematic Professional Studio Background Image */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <img 
          src="/about_us_bg.png" 
          alt="Natya Shakti Academy Classical Dance Studio" 
          className="w-full h-full object-cover object-center fixed inset-0 opacity-25 filter blur-[0.5px]"
        />
        {/* Soft Luxury Overlay to ensure immaculate readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fbf8f5]/95 via-[#fbf8f5]/88 to-[#fbf8f5]/98" />
        
        {/* Ambient Radial Spotlights */}
        <div className="absolute right-1/4 top-0 h-[500px] w-[500px] rounded-full bg-[#c99a5a]/15 blur-[120px]" />
        <div className="absolute bottom-1/4 left-10 h-[600px] w-[600px] rounded-full bg-[#f0d9d7]/60 blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-24 relative">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" as const }}>
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.3em] text-[#9b5b67]">
              Our Story
            </span>
            <h1 className="mb-6 font-serif text-4xl leading-tight tracking-tight text-[#2c1f2f] sm:text-5xl md:text-7xl">
              About <span className="font-light italic text-[#9b5b67]">Natya Shakti Academy</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl font-light leading-relaxed text-[#756b73]">
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
            <div className="absolute inset-0 rounded-[2.5rem] bg-[#eaded5] opacity-60 blur-2xl transition-all duration-700 group-hover:blur-3xl"></div>
            
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white xl:h-[650px] bg-white">
                <motion.img 
                  style={{ filter: blurZoom, WebkitFilter: blurZoom }}
                  src="/ayushi.jpg" 
                  alt="Ayushi Dubey" 
                  className="w-full h-full object-cover object-top transition-transform duration-700" 
                />
                
                <div className="absolute bottom-0 left-0 w-full p-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#c99a5a] drop-shadow-md">Founder & Lead Instructor</p>
                        <h3 className="text-4xl font-serif text-white mb-2 drop-shadow-lg leading-tight">Ayushi Dubey</h3>
                        <div className="mt-4 h-1 w-12 rounded-full bg-[#c99a5a]"></div>
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
                <div className="absolute bottom-0 left-0 top-0 hidden w-1 origin-top scale-y-0 rounded-full bg-gradient-to-b from-[#c99a5a] to-transparent transition-transform duration-500 ease-out group-hover:scale-y-100 md:block"></div>
                <h3 className="mb-4 flex items-center gap-4 font-serif text-3xl text-[#2c1f2f]">
                    <CalendarHeart className="h-8 w-8 rounded-xl bg-[#f0d9d7] p-1.5 text-[#9b5b67]" />
                    Our Journey
                </h3>
                <p className="text-justify text-lg font-light leading-relaxed text-[#756b73] md:text-left">
                    Organized and established in <strong className="font-medium text-[#2c1f2f]">April 2020</strong>, the Natya Shakti Academy was brought to life by <strong className="font-medium text-[#2c1f2f]">Ayushi Dubey</strong>, the proud owner and passionate instructor of the academy. What started as a vision to spread the joy of dance has grown into a thriving community.
                </p>
            </motion.div>

            {/* Styles */}
            <motion.div variants={itemVariants} className="relative group">
                <div className="absolute bottom-0 left-0 top-0 hidden w-1 origin-top scale-y-0 rounded-full bg-gradient-to-b from-[#c99a5a] to-transparent transition-transform duration-500 ease-out group-hover:scale-y-100 md:block"></div>
                <h3 className="mb-4 flex items-center gap-4 font-serif text-3xl text-[#2c1f2f]">
                    <Sparkles className="h-8 w-8 rounded-xl bg-[#f0d9d7] p-1.5 text-[#9b5b67]" />
                    Styles We Teach
                </h3>
                <p className="mb-6 text-lg font-light leading-relaxed text-[#756b73]">
                    Under the expert guidance of Ayushi Dubey, the academy specializes in a variety of expressive forms:
                </p>
                <div className="flex flex-wrap gap-4">
                    <motion.div whileHover={{ y: -5 }} className="flex items-center gap-2 rounded-full border border-[#eaded5] bg-[#fffdfb] px-5 py-2.5 text-sm font-medium tracking-wide text-[#2c1f2f] shadow-sm transition-all hover:shadow-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#c99a5a]"></span> Classical Bharatanatyam
                    </motion.div>
                    <motion.div whileHover={{ y: -5 }} className="flex items-center gap-2 rounded-full border border-[#eaded5] bg-[#fffdfb] px-5 py-2.5 text-sm font-medium tracking-wide text-[#2c1f2f] shadow-sm transition-all hover:shadow-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#c99a5a]"></span> Bollywood Style
                    </motion.div>
                    <motion.div whileHover={{ y: -5 }} className="flex items-center gap-2 rounded-full border border-[#eaded5] bg-[#fffdfb] px-5 py-2.5 text-sm font-medium tracking-wide text-[#2c1f2f] shadow-sm transition-all hover:shadow-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#c99a5a]"></span> Free Style Dance
                    </motion.div>
                </div>
            </motion.div>

            {/* Who Can Join */}
            <motion.div variants={itemVariants} className="relative group">
                <div className="absolute bottom-0 left-0 top-0 hidden w-1 origin-top scale-y-0 rounded-full bg-gradient-to-b from-[#c99a5a] to-transparent transition-transform duration-500 ease-out group-hover:scale-y-100 md:block"></div>
                <h3 className="mb-4 flex items-center gap-4 font-serif text-3xl text-[#2c1f2f]">
                    <Users className="h-8 w-8 rounded-xl bg-[#f0d9d7] p-1.5 text-[#9b5b67]" />
                    Who Can Join?
                </h3>
                <p className="text-lg font-light leading-relaxed text-[#756b73]">
                    Dance has no boundaries! We proudly welcome both <strong className="font-medium text-[#2c1f2f]">girls and boys</strong> of all ages to join our classes. Whether you are an absolute beginner or looking to perfect your stage presence, there is a place for you at our academy.
                </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default AboutUs;
