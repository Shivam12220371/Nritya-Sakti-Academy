import { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface Review {
  name: string;
  date: string;
  rating: number;
  text: string;
  avatarUrl: string;
}

const reviews: Review[] = [
  {
    name: 'Priyanka Pal',
    date: '2 weeks ago',
    rating: 5,
    text: 'Very talented teacher my daughter is very happy to join this class. The individual attention and patience are truly commendable.',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
  },
  {
    name: 'Anita Jha',
    date: '2 weeks ago',
    rating: 5,
    text: 'My 5 year old daughter learned a lot basics. I recommend Ayushi Mam to all kids for their initial age.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
  },
  {
    name: 'Bhanupriya Ojha',
    date: '2 weeks ago',
    rating: 5,
    text: 'Natya Shakti Academy is a fantastic dance institute. I highly recommend everyone to enroll their kids here. Thank you!',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  },
  {
    name: 'DEEPTI SRIVASTAVA',
    date: '2 weeks ago',
    rating: 5,
    text: 'Wonderful atmosphere and extremely patient teaching for young learners. We are so glad to be part of Natya Shakti Academy.',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
  },
  {
    name: 'Preeti Singh',
    date: '2 weeks ago',
    rating: 5,
    text: 'The experience here is very good, and ma\'am teaches dance very well. My daughter is very happy after taking the class.',
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=256&q=80',
  },
  {
    name: 'sakshi gupta',
    date: '2 weeks ago',
    rating: 5,
    text: 'The confidence and self-belief you have built in the kids is truly appreciable. Your patience, dedication, and constant encouragement have made such a positive difference in them.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
  },
  {
    name: 'Jyotika Tiwari',
    date: '2 weeks ago',
    rating: 5,
    text: 'Natya Shakti is an amazing place to learn dance, and Ayushi Mam is so graceful and energetic that she really makes students love dancing. My daughter just adores her dance teacher.',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80',
  },
  {
    name: 'S K',
    date: '2 weeks ago',
    rating: 5,
    text: 'Brilliant instructors, welcoming atmosphere, and the perfect place to learn both classical and modern dance styles!',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
  },
  {
    name: 'jyoti kumari',
    date: '2 weeks ago',
    rating: 5,
    text: 'Nice academy ☺️ Best dance learning experience.',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80',
  },
  {
    name: 'nutan yadav',
    date: '2 weeks ago',
    rating: 5,
    text: 'Outstanding dedication and authentic classical guidance. Ayushi Ma\'am is an exceptional mentor.',
    avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=256&q=80',
  },
  {
    name: 'Ayushi Saket',
    date: '2 weeks ago',
    rating: 5,
    text: 'This Academy is really very good, and very satisfying. Highly recommended! 👍☺️',
    avatarUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=256&q=80',
  }
];

const GoogleReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll / auto-advance replacement every 4 seconds without needing button click
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Keep scroll container aligned to the active review smoothly
  useEffect(() => {
    if (scrollRef.current) {
      const cardWidth = 320; // card width + gap
      scrollRef.current.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  const handlePrev = () => {
    setIsPaused(true);
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsPaused(true);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header with verified Google rating and direct link */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 shrink-0">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#463F3A]">Google Reviews</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <span className="text-3xl font-bold text-[#463F3A] mr-2">5.0</span>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
            <div className="w-px h-6 bg-slate-300"></div>
            <div>
              <p className="text-slate-600 font-medium text-sm">Google Reviews</p>
              <p className="text-xs text-slate-500">Based on 25+ real reviews</p>
            </div>
          </div>
        </div>

        {/* Read All Reviews on Google Link */}
        <div className="flex items-center gap-3">
          <a 
            href="https://maps.app.goo.gl/oq1W6MNDgvEU5KK58" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-[#463F3A] bg-white border border-[#EADCCF] hover:bg-[#F3E8E0] transition-colors shadow-sm"
          >
            Read all reviews on Google
            <ExternalLink className="w-4 h-4 opacity-70" />
          </a>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrev}
              aria-label="Previous review"
              className="w-10 h-10 rounded-full bg-white border border-[#EADCCF] text-[#463F3A] hover:bg-[#F3E8E0] transition-colors flex items-center justify-center shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleNext}
              aria-label="Next review"
              className="w-10 h-10 rounded-full bg-white border border-[#EADCCF] text-[#463F3A] hover:bg-[#F3E8E0] transition-colors flex items-center justify-center shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Carousel (Auto-advances smoothly, stays stable on hover/click) */}
      <div 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative"
      >
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none] px-1"
        >
          {reviews.map((review, index) => {
            const isActive = index === currentIndex;
            const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=463F3A&color=fff&size=128&bold=true`;
            return (
              <div 
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsPaused(true);
                }}
                className={`w-[300px] sm:w-[340px] shrink-0 snap-start bg-white p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isActive 
                    ? 'border-[#C9A991] shadow-lg scale-[1.02]' 
                    : 'border-[#F3E8E0] shadow-sm hover:border-[#C9A991]/60'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={review.avatarUrl || fallbackAvatar} 
                        alt={review.name}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src !== fallbackAvatar) {
                            target.src = fallbackAvatar;
                          }
                        }}
                        className="w-12 h-12 rounded-full object-cover shadow-sm shrink-0 border border-slate-200"
                      />
                      <div>
                        <h4 className="font-bold text-[#463F3A] line-clamp-1 text-sm">{review.name}</h4>
                        <p className="text-xs text-gray-400">{review.date}</p>
                      </div>
                    </div>
                    {/* Google Icon Badge */}
                    <div className="w-5 h-5 shrink-0 mt-1">
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex text-amber-500 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-[#463F3A]/80 text-sm leading-relaxed line-clamp-4">
                    "{review.text}"
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-[#C9A991]">
                  <span className="font-medium">Verified Google Review</span>
                  <span className="text-slate-400">★★★★★</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicator dots */}
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {reviews.map((_, dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => {
                setCurrentIndex(dotIndex);
                setIsPaused(true);
              }}
              aria-label={`Go to review ${dotIndex + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                dotIndex === currentIndex 
                  ? 'w-6 bg-[#C9A991]' 
                  : 'w-2 bg-[#EADCCF] hover:bg-[#C9A991]/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoogleReviews;
