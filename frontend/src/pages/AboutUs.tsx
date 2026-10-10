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
    <div ref={containerRef} className="pt-24 pb-16 min-h-screen bg-[#FAFAFA] overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#FCF4F4] rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-[#F3E8E0] rounded-full blur-[100px] -z-10 -translate-x-1/4 translate-y-1/3 opacity-50" />
      
      {/* Light Greenish Classical Instruments Shadow/Watermark - Kept subtle */}
      <div className="absolute inset-0 z-0 opacity-10 mix-blend-multiply pointer-events-none" style={{ backgroundImage: "url('/instruments-bg.png')", backgroundRepeat: "repeat", backgroundSize: "600px" }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-24 relative">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" as const }}>
            <span className="text-[#C9A991] font-bold tracking-[0.3em] uppercase text-xs mb-4 block drop-shadow-sm">
              Our Story
            </span>
            <h1 className="text-6xl md:text-7xl font-serif mb-6 tracking-tight text-[#463F3A] leading-tight">
              About <span className="italic font-light text-[#C9A991]">Natya Shakti Academy</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
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
            <div className="absolute inset-0 bg-[#F3E8E0] rounded-[2.5rem] blur-2xl group-hover:blur-3xl transition-all duration-700 opacity-60"></div>
            
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
                        <p className="text-[#C9A991] font-bold tracking-[0.2em] uppercase text-xs mb-2 drop-shadow-md">Founder & Lead Instructor</p>
                        <h3 className="text-4xl font-serif text-white mb-2 drop-shadow-lg leading-tight">Ayushi Dubey</h3>
                        <div className="w-12 h-1 bg-[#C9A991] rounded-full mt-4"></div>
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
                <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#C9A991] to-transparent rounded-full origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out hidden md:block"></div>
                <h3 className="text-3xl font-serif mb-4 flex items-center gap-4 text-[#463F3A]">
                    <CalendarHeart className="w-8 h-8 text-[#C9A991] p-1.5 bg-[#FCF4F4] rounded-xl" />
                    Our Journey
                </h3>
                <p className="text-gray-600 font-light leading-relaxed text-lg text-justify md:text-left">
                    Organized and established in <strong className="text-[#463F3A] font-medium">April 2020</strong>, the Natya Shakti Academy was brought to life by <strong className="text-[#463F3A] font-medium">Ayushi Dubey</strong>, the proud owner and passionate instructor of the academy. What started as a vision to spread the joy of dance has grown into a thriving community.
                </p>
            </motion.div>

            {/* Styles */}
            <motion.div variants={itemVariants} className="relative group">
                <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#C9A991] to-transparent rounded-full origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out hidden md:block"></div>
                <h3 className="text-3xl font-serif mb-4 flex items-center gap-4 text-[#463F3A]">
                    <Sparkles className="w-8 h-8 text-[#C9A991] p-1.5 bg-[#FCF4F4] rounded-xl" />
                    Styles We Teach
                </h3>
                <p className="text-gray-600 font-light leading-relaxed text-lg mb-6">
                    Under the expert guidance of Ayushi Dubey, the academy specializes in a variety of expressive forms:
                </p>
                <div className="flex flex-wrap gap-4">
                    <motion.div whileHover={{ y: -5 }} className="px-5 py-2.5 bg-white border border-[#F3E8E0] text-[#463F3A] rounded-full shadow-sm hover:shadow-md transition-all text-sm font-medium tracking-wide flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A991]"></span> Classical Bharatanatyam
                    </motion.div>
                    <motion.div whileHover={{ y: -5 }} className="px-5 py-2.5 bg-white border border-[#F3E8E0] text-[#463F3A] rounded-full shadow-sm hover:shadow-md transition-all text-sm font-medium tracking-wide flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A991]"></span> Bollywood Style
                    </motion.div>
                    <motion.div whileHover={{ y: -5 }} className="px-5 py-2.5 bg-white border border-[#F3E8E0] text-[#463F3A] rounded-full shadow-sm hover:shadow-md transition-all text-sm font-medium tracking-wide flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A991]"></span> Free Style Dance
                    </motion.div>
                </div>
            </motion.div>

            {/* Who Can Join */}
            <motion.div variants={itemVariants} className="relative group">
                <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#C9A991] to-transparent rounded-full origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out hidden md:block"></div>
                <h3 className="text-3xl font-serif mb-4 flex items-center gap-4 text-[#463F3A]">
                    <Users className="w-8 h-8 text-[#C9A991] p-1.5 bg-[#FCF4F4] rounded-xl" />
                    Who Can Join?
                </h3>
                <p className="text-gray-600 font-light leading-relaxed text-lg">
                    Dance has no boundaries! We proudly welcome both <strong className="text-[#463F3A] font-medium">girls and boys</strong> of all ages to join our classes. Whether you are an absolute beginner or looking to perfect your stage presence, there is a place for you at our academy.
                </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default AboutUs;
