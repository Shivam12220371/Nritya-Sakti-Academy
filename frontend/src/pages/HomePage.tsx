import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const HomePage = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl"></div>
          <div className="absolute bottom-10 -left-20 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl"></div>
        </div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 md:py-32 lg:py-40 flex flex-col md:flex-row items-center">
          <motion.div 
            initial="hidden" animate="visible" variants={fadeIn}
            className="md:w-1/2 text-center md:text-left"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-sm font-medium mb-6">
              ✨ Authentic Indian Classical Training
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Nritya Shakti Academy <br/><span className="text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Honoring Tradition. Inspiring Grace.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-lg mx-auto md:mx-0">
              Immerse yourself in the profound art of Indian classical dance. Learn the perfect postures, express deep emotions, and master intricate rhythms with our esteemed gurus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/login" className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2">
                Join the Academy <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/classes" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2">
                Explore Classes
              </Link>
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
             className="md:w-1/2 mt-16 md:mt-0 relative pl-0 md:pl-10"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white/10 bg-slate-800 flex items-center justify-center group cursor-pointer aspect-[4/3] rotate-3 hover:rotate-0 transition-transform duration-500 w-full">
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent z-10 pointer-events-none"></div>
               <img src="/dance1.jpg" alt="Masterclass Performance" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               <div className="z-20 w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center group-hover:bg-amber-500 group-hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.0)] group-hover:shadow-[0_0_30px_rgba(245,158,11,0.6)]">
                  <Play className="w-10 h-10 text-white ml-2" />
               </div>
               
               <div className="absolute bottom-6 left-6 z-20 text-left">
                   <p className="text-amber-400 font-bold tracking-widest uppercase text-sm mb-1">Live Masterclass</p>
                   <p className="text-white font-medium text-lg leading-tight">Advanced Formations<br/>and Mudras</p>
               </div>
            </div>
            
            {/* Ambient Background decoration behind hero image */}
            <div className="absolute -inset-10 bg-amber-500/20 blur-3xl -z-10 rounded-full"></div>
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Dance Programs</h2>
               <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Master diverse styles with our curriculum designed for all skill levels, from absolute beginners to advanced performers.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">
               {/* Custom Photo Cards */}
               
               <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="group relative rounded-3xl overflow-hidden shadow-lg h-96">
                   <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors z-10"></div>
                   <img src="/dance2.jpg" alt="Graceful expressions" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-slate-900 to-transparent z-20">
                       <h3 className="text-white font-bold text-2xl">Expressive Formations</h3>
                       <p className="text-slate-300 text-sm mt-1">Master emotive storytelling</p>
                   </div>
               </motion.div>

               <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="group relative rounded-3xl overflow-hidden shadow-lg h-96 -translate-y-6">
                   <div className="absolute inset-0 bg-gradient-to-b from-amber-500/20 to-black/60 group-hover:bg-black/20 transition-colors z-10"></div>
                   <img src="/dance3.jpg" alt="Stage Performers" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                   <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-slate-900 to-transparent z-20">
                       <h3 className="text-white font-bold text-2xl">Stage Performing Art</h3>
                       <p className="text-slate-300 text-sm mt-1">Choreographed group synergy</p>
                   </div>
               </motion.div>

               <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="group relative rounded-3xl overflow-hidden shadow-lg h-96">
                   <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors z-10"></div>
                   <img src="/dance4.jpg" alt="Classical Duet" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-slate-900 to-transparent z-20">
                       <h3 className="text-white font-bold text-2xl">Rhythmic Intricacy</h3>
                       <p className="text-slate-300 text-sm mt-1">Footwork, mudras, precision</p>
                   </div>
               </motion.div>
            </div>
         </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white dark:bg-slate-900">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-16">
               <div className="md:w-1/2">
                  <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Choose Our Academy?</h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">We don't just teach dance; we build performers. Our platform provides a complete ecosystem for your growth.</p>
                  
                  <div className="space-y-4">
                     {[
                        'Expert Teachers & Choreographers',
                        'Flexible Batch Slots',
                        'Recorded Video Materials',
                        'Detailed Progress Tracking',
                        'Certification on Completion'
                     ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                           <CheckCircle2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                           <span className="text-slate-800 dark:text-slate-200 font-medium text-lg">{item}</span>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="md:w-1/2">
                   <div className="bg-slate-100 dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
                      <h3 className="text-xl font-bold mb-6 text-center text-slate-500 tracking-widest uppercase">Student Journey</h3>
                      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-indigo-500 before:to-transparent">
                         {['Register for Trial', 'Choose Your Style', 'Learn from Experts', 'Track Your Progress', 'Perform on Stage'].map((step, index) => (
                             <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                 <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-800 bg-indigo-500 text-slate-50 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow font-bold text-sm">
                                    {index + 1}
                                 </div>
                                 <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 text-center font-medium
                                 transition-all hover:border-indigo-500 group-hover:-translate-y-1">
                                    {step}
                                 </div>
                             </div>
                         ))}
                      </div>
                   </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default HomePage;
