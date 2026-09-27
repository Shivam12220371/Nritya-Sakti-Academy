import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  {
    name: 'Priyanka Pal',
    date: '2 weeks ago',
    text: 'Very talented teacher my daughter is very happy to join this class',
  },
  {
    name: 'Anita Jha',
    date: '2 weeks ago',
    text: 'My 5 year old daughter learned a lot basics\nI recommend Ayushi Mam to all kids for their initial age.',
  },
  {
    name: 'Bhanupriya Ojha',
    date: '2 weeks ago',
    text: 'Nritya Shakti Academy is a fantastic dance institute.I highly recommend everyone to enroll their kids here. Thank you!',
  },
  {
    name: 'DEEPTI SRIVASTAVA',
    date: '2 weeks ago',
    text: '',
  },
  {
    name: 'Preeti Singh',
    date: '2 weeks ago',
    text: 'The experience here is very good, and ma\'am teaches dance very well. My daughter is very happy after taking the class.',
  },
  {
    name: 'sakshi gupta',
    date: '2 weeks ago',
    text: 'The confidence and self-belief you have built in the kids is truly appreciable. Your patience, dedication, and constant encouragement have made such a positive difference in them.',
  },
  {
    name: 'Jyotika Tiwari',
    date: '2 weeks ago',
    text: 'Nritya Shakti is an amazing place to learn dance, and Ayushi Mam is so graceful and energetic that she really makes students love dancing. My daughter just adores her dance teacher.',
  },
  {
    name: 'S K',
    date: '2 weeks ago',
    text: 'Brilliant instructors, welcoming atmosphere, and the perfect place to learn both classical and modern dance styles!',
  },
  {
    name: 'jyoti kumari',
    date: '2 weeks ago',
    text: 'Nice academy ☺️',
  },
  {
    name: 'nutan yadav',
    date: '2 weeks ago',
    text: '',
  },
  {
    name: 'Ayushi Saket',
    date: '2 weeks ago',
    text: 'This Academy is really very good, and very satisfying. 👍☺️',
  }
];

const ReviewCard = ({ review, index }: { review: any, index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 65;
  const isLong = review.text.length > maxLength;
  
  const displayText = expanded || !isLong 
    ? review.text 
    : review.text.substring(0, maxLength).trim() + '...';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-[260px] h-[260px] snap-start shrink-0 bg-slate-50 dark:bg-slate-800/50 p-5 rounded-3xl border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-shadow flex flex-col relative"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <img 
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=random&color=fff&size=128&bold=true`} 
            alt={review.name}
            className="w-10 h-10 rounded-full object-cover shadow-sm shrink-0"
          />
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1 text-sm">{review.name}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">{review.date}</p>
          </div>
        </div>
        <div className="w-5 h-5 shrink-0 mt-0.5">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </div>
      </div>
      <div className="flex text-amber-500 mb-2">
        <Star className="w-3.5 h-3.5 fill-current" />
        <Star className="w-3.5 h-3.5 fill-current" />
        <Star className="w-3.5 h-3.5 fill-current" />
        <Star className="w-3.5 h-3.5 fill-current" />
        <Star className="w-3.5 h-3.5 fill-current" />
      </div>
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]">
        <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line text-sm leading-relaxed">
          {displayText}
          {isLong && !expanded && (
            <button 
              onClick={() => setExpanded(true)}
              className="ml-1 text-slate-900 dark:text-white font-semibold hover:underline"
            >
              Read more
            </button>
          )}
          {isLong && expanded && (
             <button 
             onClick={() => setExpanded(false)}
             className="ml-1 text-slate-500 dark:text-slate-400 text-xs font-semibold hover:underline"
           >
             Show less
           </button>
          )}
        </p>
      </div>
    </motion.div>
  );
};

const GoogleReviews = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 shrink-0">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Google Reviews</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-slate-900 dark:text-white mr-2">5.0</span>
                <div className="flex text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
              </div>
              <div className="w-px h-6 bg-slate-300 dark:bg-slate-700"></div>
              <div>
                <p className="text-slate-600 dark:text-slate-400 font-medium text-sm">Google Reviews</p>
                <p className="text-xs text-slate-500 dark:text-slate-500">Based on 25+ reviews</p>
              </div>
            </div>
          </div>
          <div className="mt-5 md:mt-0">
            <a 
              href="https://www.google.com/search?q=Nritya+Shakti+Academy+reviews" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2 border border-slate-300 dark:border-slate-700 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
            >
              Read all reviews on Google
            </a>
          </div>
        </div>

        <div className="relative group">
          {/* Scroll Navigation Arrows */}
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-5 z-10 bg-white dark:bg-slate-800 p-2.5 text-slate-700 dark:text-slate-300 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-slate-200 dark:border-slate-700 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 disabled:opacity-0 hidden md:flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-5 z-10 bg-white dark:bg-slate-800 p-2.5 text-slate-700 dark:text-slate-300 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-slate-200 dark:border-slate-700 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 disabled:opacity-0 hidden md:flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none] px-1 items-stretch"
          >
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} index={index} />
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
