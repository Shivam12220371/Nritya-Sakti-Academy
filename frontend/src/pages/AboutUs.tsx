import { motion } from 'framer-motion';
import { Sparkles, CalendarHeart, Users } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl font-extrabold mb-6 tracking-tight text-slate-900 dark:text-white">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Nritya Shakti Academy</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
              Empowering dancers and preserving the rich heritage of classical and modern dance forms.
            </p>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
            
          {/* Image Side */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white dark:border-slate-800 xl:h-[500px]">
                <img src="/dance1.jpg" alt="Ayushi Dubey - Founder" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-amber-400 font-bold tracking-widest uppercase text-sm mb-1">Founder & Lead Instructor</p>
                    <h3 className="text-3xl font-bold text-white mb-2">Ayushi Dubey</h3>
                </div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="space-y-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <CalendarHeart className="w-6 h-6 text-indigo-500" />
                    Our Journey
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                    Organized and established in <strong className="text-indigo-600 dark:text-indigo-400 font-bold">April 2020</strong>, the Nritya Shakti Academy was brought to life by <strong>Ayushi Dubey</strong>, the proud owner and passionate instructor of the academy. What started as a vision to spread the joy of dance has grown into a thriving community.
                </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-amber-500" />
                    Styles We Teach
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg mb-4">
                    Under the expert guidance of Ayushi Dubey, the academy specializes in a variety of expressive forms:
                </p>
                <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-full font-bold text-sm tracking-wide">Classical Bharatanatyam</span>
                    <span className="px-4 py-2 bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400 rounded-full font-bold text-sm tracking-wide">Bollywood Style</span>
                    <span className="px-4 py-2 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full font-bold text-sm tracking-wide">Free Style Dance</span>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Users className="w-6 h-6 text-green-500" />
                    Who Can Join?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                    Dance has no boundaries! We proudly welcome both <strong>girls and boys</strong> of all ages to join our classes. Whether you are an absolute beginner or looking to perfect your stage presence, there is a place for you at our academy.
                </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default AboutUs;
