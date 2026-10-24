import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, MapPin, Phone, Mail, MessageCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import GoogleReviews from '../components/GoogleReviews';

const headlineLetterVariants = {
  hidden: { opacity: 0, x: 70 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
};

const HomePage = () => {
  return (
    <div className="pt-24 bg-[#FAFAFA] min-h-screen font-sans">
      
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-[#463F3A] md:bg-transparent min-h-[600px] md:min-h-[820px] flex items-center">
        {/* Split Backgrounds (Laptop & Desktop) */}
        <div className="hidden md:flex absolute inset-0 z-0">
          <div className="w-[65%] h-full bg-[#463F3A] relative overflow-hidden">
            {/* Ambient luxury radial glow */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#C9A991]/10 rounded-full blur-3xl pointer-events-none"></div>
            {/* Elegant SVG Curve Separator */}
            <svg className="absolute -right-[198px] top-0 h-full w-[200px] text-[#FAFAFA]" viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor">
              <path d="M0,100 C40,100 60,0 100,0 L100,100 Z" />
            </svg>
          </div>
          <div className="w-[35%] h-full bg-[#FAFAFA]"></div>
        </div>

        {/* Elegant Bottom Curve on Mobile transitioning into Dance Styles */}
        <div className="md:hidden absolute -bottom-1 inset-x-0 z-0 pointer-events-none">
          <svg className="w-full h-[36px] text-[#FAFAFA]" viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor">
            <path d="M0,100 Q50,0 100,100 Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col md:flex-row items-center pt-8 pb-14 md:py-0">
          
          {/* Left Text Content (Professional Column One Design) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 text-white pr-0 md:pr-10 relative"
          >
            {/* Elegant Ambient Blurred Shadows / Glows */}
            <div className="absolute -top-16 -left-12 w-80 h-80 bg-[#C9A991]/20 rounded-full blur-[100px] pointer-events-none -z-10"></div>
            <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-[#EADCCF]/15 rounded-full blur-[110px] pointer-events-none -z-10"></div>
            <div className="absolute -bottom-12 left-10 w-64 h-64 bg-amber-600/15 rounded-full blur-[90px] pointer-events-none -z-10"></div>

            {/* Headline with Gold Accents */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { delayChildren: 0.2, staggerChildren: 0.13 },
                },
              }}
              className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-semibold tracking-tight mb-6 leading-[1.15]"
              aria-label="Elegance in Motion, Tradition at Heart"
            >
              <span aria-hidden="true">
                <span className="inline-block whitespace-nowrap">
                {Array.from('Elegance in Motion,').map((letter, index) => (
                  <motion.span key={`first-line-${index}`} variants={headlineLetterVariants} className="inline-block">
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F3E8E0] to-[#C9A991]">
                  {Array.from('Tradition at Heart').map((letter, index) => (
                    <motion.span key={`second-line-${index}`} variants={headlineLetterVariants} className="inline-block">
                      {letter === ' ' ? '\u00A0' : letter}
                    </motion.span>
                  ))}
                </span>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <p className="text-[#D4D2CD] text-base sm:text-lg mb-8 max-w-md font-light leading-relaxed">
              Discover the timeless art of Bharatanatyam & Kathak. Master grace, discipline, and expressive storytelling under expert mentorship. Enroll today!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link 
                to="/register" 
                className="inline-flex items-center gap-2 bg-[#F3E8E0] text-[#463F3A] px-7 py-3.5 rounded-full font-semibold hover:bg-white hover:shadow-lg transition-all shadow-md group text-sm sm:text-base"
              >
                <span>Enroll Now</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/classes" 
                className="inline-flex items-center gap-2 bg-white/5 border border-white/20 text-white/90 px-6 py-3.5 rounded-full font-medium hover:bg-white/10 hover:border-[#C9A991] transition-all text-sm sm:text-base backdrop-blur-sm"
              >
                <span>Explore Batches</span>
              </Link>
            </div>

            {/* Professional Trust Indicators Strip */}
            <div className="pt-6 border-t border-white/10 flex items-center gap-5 sm:gap-8 text-left">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">10+ <span className="text-[#C9A991] text-xs sm:text-sm font-medium">Yrs</span></p>
                <p className="text-[11px] sm:text-xs text-gray-400 uppercase tracking-wider font-medium">Legacy</p>
              </div>
              <div className="w-px h-8 bg-white/15"></div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">500+ <span className="text-[#C9A991] text-xs sm:text-sm font-medium">Students</span></p>
                <p className="text-[11px] sm:text-xs text-gray-400 uppercase tracking-wider font-medium">Trained</p>
              </div>
              <div className="w-px h-8 bg-white/15"></div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xl sm:text-2xl font-bold text-white">5.0</span>
                  <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                </div>
                <p className="text-[11px] sm:text-xs text-gray-400 uppercase tracking-wider font-medium">Top Rated</p>
              </div>
            </div>
          </motion.div>

          {/* Right Image Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="md:w-1/2 mt-12 md:mt-0 right-0 relative"
          >
             <div className="relative w-full flex justify-center md:justify-end">
               {/* Stand-in for the dancer image which blends across the backgrounds */}
               <img 
                 src="/hero_dancing_pose.png" 
                 alt="Dancing Pose" 
                 className="w-full max-w-[500px] h-auto object-cover rounded-3xl shadow-2xl md:translate-x-12 ring-8 ring-white/10"
                 style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
               />
               <div className="absolute inset-x-0 bottom-0 py-4 flex justify-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-white"></div>
                 <div className="w-2 h-2 rounded-full bg-white/40"></div>
                 <div className="w-2 h-2 rounded-full bg-white/40"></div>
               </div>
             </div>
          </motion.div>

        </div>
      </section>

      {/* Dance Styles Section */}
      <section className="py-20 relative bg-gradient-to-b from-[#FAFAFA] to-[#FCF4F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#463F3A]">Dance Styles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-10 gap-8">
            {/* Bharatanatyam Card */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#F3E8E0] flex flex-col md:flex-row items-center gap-6"
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#463F3A] mb-4">Bharatanatyam</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Level:</span>
                    <span className="text-[#463F3A] font-medium text-right text-xs">Beginner, Intermediate<br/>Advanced</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Mode:</span>
                    <span className="text-[#463F3A] font-medium border border-[#F3E8E0] rounded-full px-3 py-1">Offline</span>
                  </div>
                </div>
                <Link to="/programs/bharatanatyam" className="inline-flex bg-[#F3E8E0] text-[#463F3A] px-6 py-2 rounded-full text-sm font-medium hover:bg-transparent border border-[#F3E8E0] hover:border-[#463F3A] transition-all">
                  View Details ↗
                </Link>
              </div>
              <div className="w-32 h-40 shrink-0 rounded-2xl overflow-hidden">
                <img src="/bharatanatyam_pose.png" alt="Bharatanatyam" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            {/* Kathak Card */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#F3E8E0] flex flex-col md:flex-row items-center gap-6"
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#463F3A] mb-4">Kathak</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Level:</span>
                    <span className="text-[#463F3A] font-medium text-right text-xs">Beginner, Intermediate<br/>Advanced</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Mode:</span>
                    <span className="text-[#463F3A] font-medium border border-[#F3E8E0] rounded-full px-3 py-1">Offline</span>
                  </div>
                </div>
                <Link to="/programs/kathak" className="inline-flex bg-[#F3E8E0] text-[#463F3A] px-6 py-2 rounded-full text-sm font-medium hover:bg-transparent border border-[#F3E8E0] hover:border-[#463F3A] transition-all">
                  View Details ↗
                </Link>
              </div>
              <div className="w-32 h-40 shrink-0 rounded-2xl overflow-hidden bg-[#D1B29A]">
                <img src="/class_kathak_1790074487878.png" alt="Kathak" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            {/* Bollywood Card */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#F3E8E0] flex flex-col md:flex-row items-center gap-6"
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#463F3A] mb-4">Bollywood</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Level:</span>
                    <span className="text-[#463F3A] font-medium text-right text-xs">Beginner, Intermediate<br/>Advanced</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Mode:</span>
                    <span className="text-[#463F3A] font-medium border border-[#F3E8E0] rounded-full px-3 py-1">Offline</span>
                  </div>
                </div>
                <Link to="/programs/western-dance" className="inline-flex bg-[#F3E8E0] text-[#463F3A] px-6 py-2 rounded-full text-sm font-medium hover:bg-transparent border border-[#F3E8E0] hover:border-[#463F3A] transition-all">
                  View Details ↗
                </Link>
              </div>
              <div className="w-32 h-40 shrink-0 rounded-2xl overflow-hidden bg-[#463F3A]">
                 <img src="/bollywood_dance.png" alt="Bollywood" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            {/* Free Style Card */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#F3E8E0] flex flex-col md:flex-row items-center gap-6"
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#463F3A] mb-4">Free Style</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Level:</span>
                    <span className="text-[#463F3A] font-medium text-right text-xs">Beginner, Intermediate<br/>Advanced</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Mode:</span>
                    <span className="text-[#463F3A] font-medium border border-[#F3E8E0] rounded-full px-3 py-1">Offline</span>
                  </div>
                </div>
                <Link to="/programs/free-style" className="inline-flex bg-[#F3E8E0] text-[#463F3A] px-6 py-2 rounded-full text-sm font-medium hover:bg-transparent border border-[#F3E8E0] hover:border-[#463F3A] transition-all">
                  View Details ↗
                </Link>
              </div>
              <div className="w-32 h-40 shrink-0 rounded-2xl overflow-hidden bg-[#D1B29A]">
                 <img src="/freestyle_dance.png" alt="Free Style" className="w-full h-full object-cover opacity-90" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Abstract Background Elements matching the soft pink design */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F8EAEA] rounded-full blur-3xl -z-10 opacity-70 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F3E8E0] rounded-full blur-3xl -z-10 opacity-50 transform -translate-x-1/2 translate-y-1/2"></div>
      </section>

      {/* 20+ Years Excellence Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
               <div className="aspect-[4/3] rounded-3xl overflow-hidden">
                 <img src="/masterclass_group.png" alt="Dance Excellence" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"/>
               </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#463F3A] mb-8 leading-tight">
                10+ Years of Dance,<br/>Culture & Excellence
              </h2>
              <div className="space-y-6 text-gray-600">
                <p>
                  With decades of experience, we foster an environment where tradition meets contemporary expression. Our curriculum is tailored for all ages and skill levels.
                </p>
                <ul className="space-y-4 pt-4">
                  {[
                    'Expert Teacher & Instructor Ayushi Dubey',
                    'Flexible Batch Slots',
                    'Recorded Video Materials',
                    'Certification on Completion'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[#463F3A] font-medium">
                      <CheckCircle2 className="w-5 h-5 text-[#C9A991]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (Reusing component, adding a soft pink bg wrapper) */}
      <section className="py-20 bg-[#FCF4F4]">
        <GoogleReviews />
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FCF4F4] rounded-[2.5rem] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-12 border border-[#F3E8E0] shadow-sm">
            
            <div className="md:w-1/2 w-full text-left">
              <span className="text-[#C9A991] font-bold tracking-[0.2em] uppercase text-xs mb-3 block drop-shadow-sm">Get In Touch</span>
              <h2 className="text-3xl md:text-5xl font-semibold text-[#463F3A] mb-6 leading-tight">
                Visit Our Academy
              </h2>
              <p className="text-gray-500 mb-10 max-w-md font-light leading-relaxed">
                Ready to take your first step? Reach out to us or visit our studio in Greater Noida to begin your dance journey.
              </p>
              
              <div className="space-y-6">
                 <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-[#F3E8E0]">
                    <MapPin className="w-6 h-6 text-[#C9A991]" />
                  </div>
                  <div className="pt-1">
                    <h4 className="text-lg font-bold text-[#463F3A] mb-1">Our Address</h4>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">
                      Tower No- B8, Flat No- 1804A, SuperTech Eco-Village1, Sector 1, Greater Noida, 201306
                    </p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Natya+Shakti+Academy+SuperTech+Eco-Village1+Sector+1+Greater+Noida"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-[#C9A991] hover:text-[#463F3A] transition-colors"
                    >
                      <span>📍 View on Google Maps &rarr;</span>
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-[#F3E8E0]">
                    <Phone className="w-6 h-6 text-[#C9A991]" />
                  </div>
                  <div className="pt-2">
                    <h4 className="text-lg font-bold text-[#463F3A] mb-1">Phone Number</h4>
                    <p className="text-gray-500 text-sm">
                      +91 6203053876
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-[45%] w-full">
              <div className="bg-white p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#F3E8E0] text-center">
                 <div className="w-20 h-20 rounded-full bg-[#FCF4F4] mx-auto mb-6 flex items-center justify-center">
                   <Mail className="w-8 h-8 text-[#C9A991]" />
                 </div>
                 <h3 className="text-2xl font-bold text-[#463F3A] mb-3 font-serif">Have questions?</h3>
                 <p className="text-gray-500 text-sm mb-8 px-4 font-light leading-relaxed">Whether it's about our classical batches, schedules, or pricing, our team is ready to help.</p>
                 
                 <div className="space-y-4">
                   <Link to="/contact" className="inline-block w-full bg-[#463F3A] text-white px-8 py-3.5 rounded-xl font-medium hover:bg-[#322c28] transition-colors shadow-sm">
                     Message Us Directly
                   </Link>
                   <a href="https://wa.me/916203053876" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 w-full bg-[#EADCCF] text-[#463F3A] px-8 py-3.5 rounded-xl font-medium hover:bg-[#d8c5b3] transition-colors shadow-sm">
                     <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                   </a>
                 </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Pre-footer Call to Action */}
      <section className="py-24 bg-[#EADCCF]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-semibold text-[#463F3A] mb-6">Make Your Move – Start Dancing Now!</h2>
          <p className="text-[#463F3A]/80 mb-10">
            Join our vibrant community and discover the joy of dance. Whether you're a beginner or an experienced performer, we have a class for you.
          </p>
          <Link to="/register" className="inline-block bg-[#463F3A] text-white px-10 py-4 rounded-full font-medium hover:bg-[#322c28] shadow-lg transition-transform hover:-translate-y-1">
            Enroll Now ↗
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
