import { motion } from 'framer-motion';

const PrideStudents = () => {
  const images = [
    '/pride_students/media__1790113785865.jpg',
    '/pride_students/media__1790113785913.jpg',
    '/pride_students/media__1790113785945.jpg',
    '/pride_students/media__1790113785991.jpg',
    '/pride_students/media__1790113786062.jpg',
    '/pride_students/media__1790114700914.jpg',
    '/pride_students/media__1790114700970.jpg',
    '/pride_students/media__1790114701027.jpg',
  ];

  // No longer repeating images since we are using a grid display

  return (
    <section className="py-24 bg-[#FCF4F4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-semibold text-[#463F3A] mb-6">
              Our Pride Students
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Meet our extraordinarily talented and celebrated dancers who have brought immense pride and recognition to our academy.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((src, index) => (
             <motion.div
               key={index}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: index * 0.1 }}
               viewport={{ once: true }}
               className="w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl border-4 border-white/80 bg-white relative group cursor-pointer transition-all duration-300 transform hover:-translate-y-2"
             >
               <img
                  src={src}
                  alt={`Pride Student ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrideStudents;
