import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, Sparkles, Award } from 'lucide-react';

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: 'Performances' | 'Classical Bharatanatyam' | 'Guru & Shishya' | 'Pride Students';
  description: string;
  featured?: boolean;
}

const galleryItems: GalleryItem[] = [
  {
    id: 'group-perf',
    src: '/gallery/gallery-group-performance.jpg',
    title: 'Academy Dance Troupe Presentation',
    category: 'Performances',
    description: 'Students in vibrant classical costumes alongside Guru Ayushi Dubey celebrating a joyful stage performance.',
    featured: true,
  },
  {
    id: 'guru-shishya',
    src: '/gallery/gallery-guru-student.jpg',
    title: 'Guru & Shishya Tradition',
    category: 'Guru & Shishya',
    description: 'Honoring the sacred teacher-disciple bond with Guru Ayushi Dubey providing guidance and heartfelt mentorship.',
    featured: true,
  },
  {
    id: 'bharatanatyam-pose-1',
    src: '/gallery/gallery-student-pose-1.jpg',
    title: 'Aramandi & Utplavana Precision',
    category: 'Classical Bharatanatyam',
    description: 'Disciplined classical stance displaying perfect balance, mudra precision, and intricate traditional jewelry.',
    featured: true,
  },
  {
    id: 'bharatanatyam-pose-2',
    src: '/gallery/gallery-student-pose-2.jpg',
    title: 'Hastak & Natya Expression',
    category: 'Classical Bharatanatyam',
    description: 'Expansive posture capturing the grace and abhinaya essence of ancient Bharatanatyam choreography.',
    featured: true,
  },
  {
    id: 'blue-pose',
    src: '/gallery/gallery-student-blue-pose.jpg',
    title: 'Devotional Bhavam Pose',
    category: 'Classical Bharatanatyam',
    description: 'Graceful arching posture expressing pure joy, rhythm, and devotion in dazzling blue and gold attire.',
    featured: true,
  },
  {
    id: 'yellow-pose',
    src: '/gallery/gallery-student-yellow-pose.jpg',
    title: 'Golden Costumed Alarippu Pose',
    category: 'Classical Bharatanatyam',
    description: 'Exquisite yellow and crimson costume showcasing eye expression, hand mudras, and foot posture.',
  },
  {
    id: 'green-night',
    src: '/gallery/gallery-student-green-night.jpg',
    title: 'Twilight Recital Stance',
    category: 'Performances',
    description: 'Radiant stage presence during an evening open-air cultural performance.',
  },
  {
    id: 'blessings-poster',
    src: '/gallery/gallery-blessings-poster.jpg',
    title: 'Nataraja Grace & Teacher Blessings',
    category: 'Guru & Shishya',
    description: 'Special dedication honoring our shining students under the divine grace and blessings of Lord Nataraja.',
    featured: true,
  },
  {
    id: 'pride-1',
    src: '/pride_students/media__1790113785865.jpg',
    title: 'Celebrated Student Performer',
    category: 'Pride Students',
    description: 'Outstanding dedication and talent recognized in academy events.',
  },
  {
    id: 'pride-2',
    src: '/pride_students/media__1790113785913.jpg',
    title: 'Academy Pride Dancer',
    category: 'Pride Students',
    description: 'Showcasing elegance, agility, and emotional depth.',
  },
  {
    id: 'pride-3',
    src: '/pride_students/media__1790113785945.jpg',
    title: 'Stage Excellence',
    category: 'Pride Students',
    description: 'Exemplary rhythm and coordination during cultural demonstrations.',
  },
  {
    id: 'pride-4',
    src: '/pride_students/media__1790113785991.jpg',
    title: 'Grace in Motion',
    category: 'Pride Students',
    description: 'Capturing the vibrant energy of academy learners.',
  },
  {
    id: 'pride-5',
    src: '/pride_students/media__1790113786062.jpg',
    title: 'Artistic Dedication',
    category: 'Pride Students',
    description: 'Refined movements honed through rigorous discipline and practice.',
  },
  {
    id: 'pride-6',
    src: '/pride_students/media__1790114700914.jpg',
    title: 'Recital Accomplishment',
    category: 'Pride Students',
    description: 'Proud showcase of mastery in classical postures and steps.',
  },
  {
    id: 'pride-7',
    src: '/pride_students/media__1790114700970.jpg',
    title: 'Youth Performing Star',
    category: 'Pride Students',
    description: 'Illuminating the stage with youthful enthusiasm and technique.',
  },
  {
    id: 'pride-8',
    src: '/pride_students/media__1790114701027.jpg',
    title: 'Dance Passionate',
    category: 'Pride Students',
    description: 'Embodying the vibrant spirit and heritage of Natya Shakti Academy.',
  },
];

const categories = [
  'All',
  'Performances',
  'Classical Bharatanatyam',
  'Guru & Shishya',
  'Pride Students',
] as const;

type Category = (typeof categories)[number];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const showPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev! > 0 ? prev! - 1 : filteredItems.length - 1));
    }
  };

  const showNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev! < filteredItems.length - 1 ? prev! + 1 : 0));
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, filteredItems.length]);

  return (
    <div className="pt-28 pb-24 min-h-screen bg-[#FDFBF9] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#C9A991]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-10 w-[600px] h-[600px] bg-[#FCF4F4]/70 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <span className="text-[#C9A991] font-bold tracking-[0.3em] uppercase text-xs mb-3 block drop-shadow-sm flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Our Visual Story
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <h1 className="text-5xl md:text-7xl font-serif mb-5 tracking-tight text-[#463F3A] leading-tight">
              Academy <span className="italic font-light text-[#C9A991]">Gallery</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              Explore the grace, expressions, and radiant milestones of our dancers and revered Guru Ayushi Dubey.
            </p>
          </motion.div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedImageIndex(null);
                }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                  isActive
                    ? 'bg-[#463F3A] text-white shadow-md scale-105'
                    : 'bg-white border border-[#F3E8E0] text-[#463F3A]/80 hover:bg-[#FCF4F4] hover:text-[#463F3A]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => openLightbox(index)}
                className="group relative bg-white rounded-3xl overflow-hidden border border-[#F3E8E0]/70 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-md text-[#463F3A] shadow-sm">
                      {item.featured && <Award className="w-3 h-3 text-[#C9A991]" />}
                      {item.category}
                    </span>
                  </div>

                  {/* Zoom Icon Button on Hover */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-[#463F3A] flex items-center justify-center shadow-md">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Description overlaid at bottom of image */}
                  <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                    <h3 className="text-base font-serif font-medium leading-snug line-clamp-1 drop-shadow-md">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/80 line-clamp-2 mt-1 font-light leading-relaxed drop-shadow-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Banner - Celebration & Join Class CTA */}
        <div className="mt-20 p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-r from-[#FCF4F4] via-[#FDFBF9] to-[#F3E8E0] border border-[#F3E8E0] text-center relative overflow-hidden shadow-sm">
          <div className="max-w-2xl mx-auto relative z-10">
            <span className="text-[#C9A991] font-bold tracking-[0.25em] uppercase text-xs mb-2 block">
              Join Our Dance Family
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#463F3A] mb-4">
              Be Part of Our Next Showcase
            </h2>
            <p className="text-gray-600 font-light leading-relaxed mb-6">
              From foundational postures to breathtaking stage recitals, experience true classical and contemporary dance learning under expert guidance.
            </p>
            <a
              href="/classes"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#463F3A] text-white hover:bg-[#C9A991] transition-colors duration-300 font-medium text-sm tracking-wide shadow-md"
            >
              Explore Dance Classes
            </a>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && filteredItems[selectedImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
              aria-label="Close image modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={showPrev}
              className="absolute left-4 sm:left-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={showNext}
              className="absolute right-4 sm:right-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[90vh] flex flex-col items-center justify-center text-center"
            >
              <div className="relative max-h-[75vh] overflow-hidden rounded-2xl shadow-2xl bg-black">
                <img
                  src={filteredItems[selectedImageIndex].src}
                  alt={filteredItems[selectedImageIndex].title}
                  className="max-h-[75vh] w-auto max-w-full object-contain mx-auto"
                />
              </div>

              {/* Caption & Category */}
              <div className="mt-4 text-white max-w-xl">
                <span className="text-[#C9A991] text-xs font-semibold uppercase tracking-widest block mb-1">
                  {filteredItems[selectedImageIndex].category}
                </span>
                <h3 className="text-xl font-serif font-medium mb-1">
                  {filteredItems[selectedImageIndex].title}
                </h3>
                <p className="text-sm text-gray-300 font-light">
                  {filteredItems[selectedImageIndex].description}
                </p>
                <div className="mt-2 text-xs text-gray-400">
                  {selectedImageIndex + 1} of {filteredItems.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;

