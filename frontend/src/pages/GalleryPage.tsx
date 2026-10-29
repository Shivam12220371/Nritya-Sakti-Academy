import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, Sparkles, Award } from 'lucide-react';

type CategoryType = 'Performances' | 'Classical Bharatanatyam' | 'Guru & Shishya' | 'Pride Students';

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: CategoryType | CategoryType[];
  description: string;
  featured?: boolean;
}

const galleryItems: GalleryItem[] = [
  {
    id: 'stage-recital-ensemble',
    src: '/gallery/gallery-group-stage-recital.jpg',
    title: 'Stage Recital Ensemble',
    category: ['Performances', 'Pride Students'],
    description: 'Our brilliant young students shining together on stage in vibrant classical Bharatanatyam attire.',
    featured: true,
  },
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
    category: ['Pride Students', 'Classical Bharatanatyam'],
    description: 'Disciplined classical stance displaying perfect balance, mudra precision, and intricate traditional jewelry.',
    featured: true,
  },
  {
    id: 'bharatanatyam-pose-2',
    src: '/gallery/gallery-student-pose-2.jpg',
    title: 'Hastak & Natya Expression',
    category: ['Pride Students', 'Classical Bharatanatyam'],
    description: 'Expansive posture capturing the grace and abhinaya essence of ancient Bharatanatyam choreography.',
    featured: true,
  },
  {
    id: 'blue-pose',
    src: '/gallery/gallery-student-blue-pose.jpg',
    title: 'Devotional Bhavam Pose',
    category: ['Pride Students', 'Classical Bharatanatyam'],
    description: 'Graceful arching posture expressing pure joy, rhythm, and devotion in dazzling blue and gold attire.',
    featured: true,
  },
  {
    id: 'yellow-pose',
    src: '/gallery/gallery-student-yellow-pose.jpg',
    title: 'Golden Costumed Alarippu Pose',
    category: ['Pride Students', 'Classical Bharatanatyam'],
    description: 'Exquisite yellow and crimson costume showcasing eye expression, hand mudras, and foot posture.',
  },
  {
    id: 'green-night',
    src: '/gallery/gallery-student-green-night.jpg',
    title: 'Twilight Recital Stance',
    category: ['Pride Students', 'Performances'],
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
    id: 'pride-duet',
    src: '/pride_students/media__1791832963128.jpg',
    title: 'Graceful Bharatanatyam Duet',
    category: ['Pride Students', 'Classical Bharatanatyam'],
    description: 'Disciplined young disciples performing synchronized classical postures with vibrant expressions.',
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
    : galleryItems.filter((item) =>
        Array.isArray(item.category)
          ? item.category.includes(activeCategory as CategoryType)
          : item.category === activeCategory
      );

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
    <div className="relative min-h-screen overflow-hidden bg-[#fbf8f5] pb-24 pt-28">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute right-1/4 top-0 h-[500px] w-[500px] rounded-full bg-[#c99a5a]/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-1/3 left-10 h-[600px] w-[600px] rounded-full bg-[#f0d9d7]/70 blur-[160px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <span className="mb-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-[#9b5b67]">
              <Sparkles className="w-3.5 h-3.5" />
              Our Visual Story
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <h1 className="mb-5 font-serif text-4xl leading-tight tracking-tight text-[#2c1f2f] sm:text-5xl md:text-7xl">
              Academy <span className="font-light italic text-[#9b5b67]">Gallery</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-[#756b73] md:text-xl">
              Explore the grace, expressions, and radiant milestones of our dancers and revered Guru Ayushi Dubey.
            </p>
          </motion.div>
        </div>

        {/* Category Filters */}
        <div className="mb-14 flex flex-wrap items-center justify-center gap-2.5">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedImageIndex(null);
                }}
                className={`rounded-full px-4 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 sm:px-5 ${
                  isActive
                    ? 'scale-105 bg-[#2c1f2f] text-white shadow-md'
                    : 'border border-[#eaded5] bg-[#fffdfb] text-[#2c1f2f]/80 hover:bg-[#f0d9d7] hover:text-[#2c1f2f]'
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
                className="group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-[#eaded5]/70 bg-[#fffdfb] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#f1ebe6]">
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
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fffdfb]/90 px-3 py-1 text-[11px] font-semibold text-[#2c1f2f] shadow-sm backdrop-blur-md">
                      {item.featured && <Award className="h-3 w-3 text-[#c99a5a]" />}
                      {Array.isArray(item.category)
                        ? (activeCategory !== 'All' && item.category.includes(activeCategory as CategoryType) ? activeCategory : item.category[0])
                        : item.category}
                    </span>
                  </div>

                  {/* Zoom Icon Button on Hover */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fffdfb]/90 text-[#2c1f2f] shadow-md backdrop-blur-md">
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
        <div className="relative mt-20 overflow-hidden rounded-[2.5rem] border border-[#eaded5] bg-gradient-to-r from-[#f0d9d7] via-[#fbf8f5] to-[#eaded5] p-8 text-center shadow-sm md:p-12">
          <div className="max-w-2xl mx-auto relative z-10">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.25em] text-[#9b5b67]">
              Join Our Dance Family
            </span>
            <h2 className="mb-4 font-serif text-3xl text-[#2c1f2f] md:text-4xl">
              Be Part of Our Next Showcase
            </h2>
            <p className="mb-6 font-light leading-relaxed text-[#756b73]">
              From foundational postures to breathtaking stage recitals, experience true classical and contemporary dance learning under expert guidance.
            </p>
            <a
              href="/classes"
              className="inline-flex items-center gap-2 rounded-full bg-[#2c1f2f] px-8 py-3.5 text-sm font-medium tracking-wide text-white shadow-md transition-colors duration-300 hover:bg-[#9b5b67]"
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
                <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-[#c99a5a]">
                  {Array.isArray(filteredItems[selectedImageIndex].category)
                    ? filteredItems[selectedImageIndex].category.join(' • ')
                    : filteredItems[selectedImageIndex].category}
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
