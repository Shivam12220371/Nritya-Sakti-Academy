import { useEffect } from 'react';
import { motion } from 'framer-motion';
import PrideStudents from '../components/PrideStudents';

const GalleryPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#FAFAFA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-16 relative">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <span className="text-[#C9A991] font-bold tracking-[0.3em] uppercase text-xs mb-4 block drop-shadow-sm">
              Our Visual Story
            </span>
            <h1 className="text-5xl md:text-7xl font-serif mb-6 tracking-tight text-[#463F3A] leading-tight">
              Academy Gallery
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              Experience the grace, energy, and dedication of our students through these beautiful moments.
            </p>
          </motion.div>
        </div>

        {/* We place the PrideStudents component here which handles the masonry/carousel gallery display */}
      </div>
      <PrideStudents />
    </div>
  );
};

export default GalleryPage;
