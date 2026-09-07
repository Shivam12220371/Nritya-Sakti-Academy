import { motion } from 'framer-motion';
import { Clock, Info, CheckCircle2, ShieldCheck, Sparkle } from 'lucide-react';


const DanceClasses = () => {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold tracking-widest uppercase text-sm mb-2 block">Our Curriculum</span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-slate-900 dark:text-white">
              Dance Classes & Schedule
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium">
              Flexible learning structures tailored for your ambitions. Join us in the evenings and find your rhythm.
            </p>
          </motion.div>
        </div>

        {/* Schedule Grid - Column Wise (1 Hour Gap) */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-20"
        >
            <div className="flex items-center gap-3 justify-center mb-8">
                <Clock className="w-8 h-8 text-indigo-500" />
                <h2 className="text-3xl font-bold">Evening Schedule</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 5 PM Column */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-500"></div>
                    <div className="text-center mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <span className="text-indigo-600 dark:text-indigo-400 font-black text-3xl">5:00 PM</span>
                        <p className="text-slate-500 mt-1 font-medium">to 6:00 PM</p>
                    </div>
                     <ul className="space-y-4">
                        <li className="flex items-center justify-center p-3 rounded-xl bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 font-bold shadow-sm">Bharatanatyam (Batch A)</li>
                        <li className="flex items-center justify-center p-3 rounded-xl bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400 font-bold shadow-sm">Bollywood Style (Batch B)</li>
                    </ul>
                </div>

                {/* 6 PM Column */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-500"></div>
                    <div className="text-center mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <span className="text-amber-500 dark:text-amber-400 font-black text-3xl">6:00 PM</span>
                        <p className="text-slate-500 mt-1 font-medium">to 7:00 PM</p>
                    </div>
                     <ul className="space-y-4">
                        <li className="flex items-center justify-center p-3 rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 font-bold shadow-sm">Free Style Dance (Mixed)</li>
                        <li className="flex items-center justify-center p-3 rounded-xl bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 font-bold shadow-sm">Bharatanatyam (Batch B)</li>
                    </ul>
                </div>

                {/* 7 PM Column */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-500"></div>
                    <div className="text-center mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <span className="text-pink-500 font-black text-3xl">7:00 PM</span>
                        <p className="text-slate-500 mt-1 font-medium">to 8:00 PM</p>
                    </div>
                    <ul className="space-y-4">
                        <li className="flex items-center justify-center p-3 rounded-xl bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400 font-bold shadow-sm">Bollywood Style (Batch A)</li>
                        <li className="flex items-center justify-center p-3 rounded-xl bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400 font-bold shadow-sm">Masterclass / Drill</li>
                    </ul>
                </div>
            </div>
        </motion.div>

        {/* Academy Policy Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-10 md:p-14 shadow-xl">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    
                    <div className="md:w-1/3">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30">
                            <ShieldCheck className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-3xl font-extrabold mb-4">Academy Policy & Flexibility</h3>
                        <p className="text-slate-600 dark:text-slate-400 font-medium">
                            We believe that every student learns differently. That is why we provide ultimate flexibility while maintaining a structured curriculum for rapid growth.
                        </p>
                    </div>

                    <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Universal Learner Track */}
                        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-indigo-100 dark:border-indigo-900/30">
                            <h4 className="text-xl font-bold flex items-center gap-2 mb-4 text-slate-800 dark:text-slate-100">
                                <Sparkle className="w-5 h-5 text-amber-500" />
                                All-Rounder Track
                            </h4>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                                For students who wish to master every style of dance we teach.
                            </p>
                            <ul className="space-y-3 font-medium text-sm text-slate-700 dark:text-slate-300">
                                <li className="flex gap-3"><span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>2 Days: Bharatanatyam form</li>
                                <li className="flex gap-3"><span className="w-2 h-2 rounded-full bg-pink-500 mt-1.5 shrink-0"></span>2 Days: Bollywood Style choreography</li>
                                <li className="flex gap-3"><span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>1 Day: Free Style expression</li>
                            </ul>
                        </div>

                        {/* Dedicated Learner Track */}
                        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
                            <h4 className="text-xl font-bold flex items-center gap-2 mb-4 text-slate-800 dark:text-slate-100">
                                <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                                Specialist Track
                            </h4>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                                For students who have a singular passion and want to master one specific style.
                            </p>
                            <div className="flex p-4 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 text-green-800 dark:text-green-400 text-sm font-bold gap-3 items-start">
                                <Info className="w-5 h-5 shrink-0" />
                                <p>You can choose your specific style (e.g. only Bharatanatyam) and continue exclusively with that class schedule for the entire duration of your tenure.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </motion.div>

      </div>
    </div>
  );
};

export default DanceClasses;
