import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle2, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import DanceProgramsCarousel from '../components/DanceProgramsCarousel';

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
              Authentic Indian Classical Training
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Nritya Shakti Academy <br/><span className="text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Honoring Tradition. Inspiring Grace.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-lg mx-auto md:mx-0">
              Immerse yourself in the profound art of Indian classical dance. Learn the perfect postures, express deep emotions, and master intricate rhythms with our esteemed gurus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start flex-wrap">
              <Link to="/login" className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2">
                Join the Academy <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/classes" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2">
                Explore Classes
              </Link>
              <a 
                href="https://wa.me/916203053876" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(22,163,74,0.4)] flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" /> Talk to our Team
              </a>
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
             className="md:w-1/2 mt-16 md:mt-0 relative pl-0 md:pl-10"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white/10 bg-slate-800 flex items-center justify-center group cursor-pointer aspect-[4/3] rotate-3 hover:rotate-0 transition-transform duration-500 w-full">
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent z-10 pointer-events-none"></div>
               
               <motion.div 
                 animate={{ 
                   scale: [1.1, 1.15, 1.1, 1.18, 1.1],
                   rotate: [0, 2, -2, 1, 0],
                   y: [0, -10, 0, -5, 0],
                   x: [0, 5, -5, 2, 0]
                 }} 
                 transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
                 className="absolute inset-0 w-full h-full"
               >
                 <img src="/dance1.jpg" alt="Masterclass Performance" className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-500 origin-bottom" />
               </motion.div>

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
         </div>
         
         {/* Infinite scrolling interactive carousel */}
         <DanceProgramsCarousel />
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
                   <div className="relative bg-slate-100 dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 overflow-hidden shadow-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-200/40 via-purple-100/50 to-pink-200/40 dark:from-indigo-900/40 dark:via-purple-900/20 dark:to-pink-900/30 opacity-80 animate-[pulse_6s_ease-in-out_infinite] pointer-events-none z-0"></div>
                      
                      <h3 className="relative z-10 text-xl font-bold mb-6 text-center text-slate-500 tracking-widest uppercase">Student Journey</h3>
                      <div className="space-y-6 relative z-10 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-indigo-500 before:to-transparent">
                         {[
                            { title: 'Register for Trial', desc: 'Book a free introductory session online to explore our campus.' },
                            { title: 'Choose Your Style', desc: 'Pick your path: Classical forms or vibrant Bollywood styles.' },
                            { title: 'Learn from Experts', desc: 'Train intensively with our seasoned and certified gurus.' },
                            { title: 'Track Your Progress', desc: 'Monitor your growth in real-time in your dashboard.' },
                            { title: 'Perform on Stage', desc: 'Showcase your mastered art to a live, cheering audience.' }
                         ].map((step, index, arr) => {
                             const isLast = index === arr.length - 1;
                             return (
                               <motion.div 
                                 initial={{ opacity: 0, y: 30 }}
                                 whileInView={{ opacity: 1, y: 0 }}
                                 viewport={{ once: false, margin: "-50px" }}
                                 transition={{ duration: 0.5, delay: index * 0.2 }}
                                 key={index} 
                                 className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active cursor-pointer"
                               >
                                   <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-800 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow font-bold text-sm z-10 transition-colors ${isLast ? 'bg-amber-500 animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.6)]' : 'bg-indigo-500'}`}>
                                      {isLast ? '✨' : index + 1}
                                   </div>
                                   <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-5 rounded-xl shadow-sm border text-center 
                                   transition-all duration-300 hover:scale-105 z-10 relative overflow-hidden ${isLast ? 'border-amber-400 dark:border-amber-500 shadow-xl shadow-amber-500/10' : 'border-slate-200 dark:border-slate-700 hover:border-indigo-500 group-hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10'}`}>
                                      
                                      {isLast && <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 animate-[shimmer_2s_infinite] pointer-events-none"></div>}
                                      
                                      <div className="relative z-10">
                                        <h4 className={`font-bold text-lg transition-colors ${isLast ? 'text-amber-600 dark:text-amber-400' : 'text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'}`}>
                                          {step.title}
                                        </h4>
                                        
                                        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 mt-0 group-hover:mt-2">
                                           <div className="overflow-hidden">
                                              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                                {step.desc}
                                              </p>
                                           </div>
                                        </div>
                                        
                                        {isLast && <span className="block text-xs uppercase tracking-widest mt-2 text-amber-500 font-bold">Journey Complete</span>}
                                      </div>
                                   </div>
                               </motion.div>
                             );
                         })}
                      </div>
                   </div>
               </div>
            </div>
         </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }} whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} viewport={{ once: false, margin: "-100px" }} transition={{ duration: 0.7 }}
              className="md:w-1/2 relative"
            >
              <div className="relative group rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white dark:border-slate-800 aspect-[4/5] md:aspect-square lg:aspect-[4/5]">
                <img src="/ayushi.jpg" alt="Ayushi Dubey" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-6 left-6 z-10">
                  <p className="text-amber-400 font-bold tracking-widest uppercase text-sm mb-1">Founder & Lead Instructor</p>
                  <h3 className="text-3xl tracking-tight font-extrabold text-white">Ayushi Dubey</h3>
                </div>
              </div>
              {/* Decorative background behind image */}
              <div className="absolute -inset-6 bg-indigo-500/20 blur-3xl -z-10 rounded-full"></div>
            </motion.div>
            
            <div className="md:w-1/2 space-y-6">
              <motion.h2 
                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl md:text-5xl font-bold"
              >
                Meet the Founder
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed md:text-xl"
              >
                Under the expert guidance of <strong className="text-indigo-600 dark:text-indigo-400">Ayushi Dubey</strong>, the Nritya Shakti Academy stands as a beacon of artistic excellence. 
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm mt-8 space-y-4"
              >
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex text-amber-500 items-center justify-center shrink-0">
                       <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                       <h4 className="font-bold text-slate-900 dark:text-white text-lg">Specializations</h4>
                       <p className="text-slate-600 dark:text-slate-400">Professional instructor in Bharatanatyam, Classical, and Bollywood style.</p>
                    </div>
                 </div>
                 <div className="w-full h-px bg-slate-100 dark:bg-slate-800"></div>
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex text-indigo-500 items-center justify-center shrink-0">
                       <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                       <h4 className="font-bold text-slate-900 dark:text-white text-lg">Experience</h4>
                       <p className="text-slate-600 dark:text-slate-400">Over 6+ years of rich experience in this field and running the academy.</p>
                    </div>
                 </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
