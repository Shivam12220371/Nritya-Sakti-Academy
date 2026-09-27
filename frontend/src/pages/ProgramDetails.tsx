import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const programsData: Record<string, any> = {
  'kathak': {
    title: 'Kathak',
    subtitle: '"We Teach Kathak with Passion and Expertise"',
    description: `At Swar Sandhya Mahavidyalaya, we are dedicated to nurturing your dance journey through expert Kathak instruction. Our experienced teachers focus on the fundamental techniques, intricate footwork, and expressive storytelling that define this classical art form.

We offer a supportive environment where students of all levels can explore their creativity, develop their skills, and gain a deeper understanding of Kathak’s rich cultural heritage. Whether you’re a complete beginner or looking to refine your technique, our personalized approach ensures that you receive the guidance you need to flourish. Join us and discover the transformative power of Kathak!`,
    image: '/class_kathak_1790074487878.png',
    features: ['Intricate Footwork', 'Expressive Storytelling', 'Cultural Heritage']
  },
  'bharatanatyam': {
    title: 'Bharatanatyam',
    subtitle: '"Immerse Yourself in the Art of Bharatanatyam"',
    description: `Bharatanatyam, one of India’s oldest and most revered classical dance forms, is a beautiful blend of rhythm, expression, and tradition. Originating from the temples of Tamil Nadu, this dance is known for its precise footwork, graceful hand gestures, and sculptural poses that tell powerful stories. 

At Swar Sandhya Mahavidyalaya, we teach Bharatanatyam with a focus on preserving its rich cultural roots while encouraging each student to find their unique expression within the form. Whether you’re a beginner or an experienced dancer, our classes offer the perfect balance of technical training and creative exploration. Join us to experience the grace, discipline, and joy of Bharatanatyam!`,
    image: '/class_bharatanatyam_1790074472985.png',
    features: ['Precise Footwork', 'Graceful Gestures', 'Sculptural Poses']
  },
  'western-dance': {
    title: 'Western Dance',
    subtitle: '"Explore the World of Western Dance"',
    description: `Western dance brings a vibrant mix of styles, from ballet’s grace to hip-hop and jazz’s high-energy moves. At Swar Sandhya Mahavidyalaya, we offer Western dance classes that cater to all levels, providing you with the opportunity to express yourself, build confidence, and improve your technique. 

Whether you’re looking for the elegance of classical styles or the dynamic rhythms of contemporary dance, our experienced instructors will guide you every step of the way. Join us to unlock your creativity, develop new skills, and experience the thrill of Western dance!`,
    image: '/western_casual_dance.png',
    features: ['High-Energy Moves', 'Dynamic Rhythms', 'Build Confidence']
  },
  'zumba': {
    title: 'Zumba',
    subtitle: '"Dance Your Way to Fitness"',
    description: `Zumba is a highly energetic and incredibly fun fitness program that combines Latin and international music with dance moves. It's often called a "fitness-party" because it's so enjoyable that you'll forget you're actually working out! 

At our academy, our Zumba sessions are designed for everyone, regardless of fitness level or dancing ability. The routines feature aerobic interval training with a combination of fast and slow rhythms that tone and sculpt the body. Join us to sweat it out, lift your spirits, and dance your way to a healthier you!`,
    image: '/bollywood_dance_2_1790074011697.png',
    features: ['Fitness-Party Atmosphere', 'Aerobic Interval Training', 'Total Body Toning']
  },
  'free-style': {
    title: 'Free Style',
    subtitle: '"Express Yourself Without Boundaries"',
    description: `Free Style dance is all about exploring your organic movement, breaking away from rigid structures, and letting the music guide your body. It relies heavily on improvisation and individual expression, encouraging dancers to find their unique vocabulary.

We provide a safe, non-judgmental space where you can explore various dynamics, levels, and rhythms. Our instructors will teach you foundational techniques that you can blend together to create your own signature flow. Join us and let your body translate the music exactly how you feel it!`,
    image: '/bolly_solo_1790074531054.png',
    features: ['Unrestricted Movement', 'Improvisation', 'Individual Expression'],
    instrumentIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="w-[800px] h-[800px]">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
      </svg>
    ) // Headphones
  }
};

const instrumentSVGs: Record<string, any> = {
  'kathak': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.3" className="w-full h-full">
      {/* Abstract Tabla/Drums */}
      <path d="M7 21v-4M17 21v-4" />
      <ellipse cx="7" cy="11" rx="4" ry="2" />
      <ellipse cx="17" cy="13" rx="5" ry="2" />
      <path d="M3 11v6a4 4 0 0 0 8 0v-6M12 13v4a5 5 0 0 0 10 0v-4" />
    </svg>
  ),
  'bharatanatyam': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.3" className="w-full h-full">
      {/* Abstract Ghungroo / Bells / Mridangam */}
      <polygon points="4,12 20,8 20,16 4,12" />
      <line x1="8" y1="11" x2="8" y2="13" />
      <line x1="12" y1="10" x2="12" y2="14" />
      <line x1="16" y1="9" x2="16" y2="15" />
    </svg>
  ),
  'western-dance': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.3" className="w-full h-full">
      {/* Precision Guitar */}
      <circle cx="9" cy="14" r="4" />
      <path d="M11 12l10-10 M17 18l4 4" />
      <rect x="18" y="2" width="4" height="4" rx="1" />
    </svg>
  ),
  'zumba': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.3" className="w-full h-full">
      {/* Energetic Boombox / Audio waves */}
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="8" cy="12" r="3" />
      <circle cx="16" cy="12" r="3" />
      <path d="M8 6V4h8v2" />
    </svg>
  ),
  'free-style': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.3" className="w-full h-full">
      {/* Abstract Headphones */}
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
      <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  )
};

const ProgramDetails = () => {
  const { programId } = useParams<{ programId: string }>();
  const program = programId ? programsData[programId] : null;

  if (!program) {
    return <Navigate to="/" replace />;
  }

  const bgIcon = instrumentSVGs[programId || ''] || null;

  return (
    <div className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Premium Specific Instrument Shadow styling */}
      <div 
        className="fixed top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] text-slate-900/5 dark:text-slate-100/5 pointer-events-none z-0 rotate-12 blur-[1px]"
      >
        {bgIcon}
      </div>
      
      {/* Fallback subtle texture */}
      <div 
        className="fixed inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none z-0"
        style={{ 
          backgroundImage: 'url(/instruments-bg.png)', 
          backgroundSize: '400px', 
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 flex flex-col">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-light text-slate-900 dark:text-white tracking-tight mb-4 font-serif mt-4">
              {program.title}
            </h1>
            <h2 className="text-2xl md:text-3xl font-normal text-indigo-500 dark:text-indigo-400 mb-8 italic font-serif leading-10">
              {program.subtitle}
            </h2>
            
            <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl font-medium">
              {program.description.split('\\n\\n').map((paragraph: string, i: number) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
               {program.features.map((feature: string, i: number) => (
                 <div key={i} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center transform transition hover:-translate-y-1 hover:shadow-md">
                    <CheckCircle className="w-6 h-6 text-green-500 mb-2" />
                    <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{feature}</span>
                 </div>
               ))}
            </div>

            <div className="mt-12">
              <Link to="/login" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-all mr-4 inline-block">
                Enroll Now
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-full"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-200 to-indigo-200 dark:from-amber-900/30 dark:to-indigo-900/30 blur-2xl rounded-full opacity-60 -z-10"></div>
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-[8px] border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-900 aspect-[4/5] w-full max-h-[80vh]">
              <img 
                src={program.image} 
                alt={`${program.title} Dance`} 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetails;
