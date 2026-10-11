import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, User, Globe, Camera } from 'lucide-react';

const Footer = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/admin') || location.pathname.startsWith('/instructor') || location.pathname.startsWith('/student');
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isDashboard || isAuthPage) return null;

  return (
    <footer className="bg-[#463F3A] pt-20 pb-10 border-t border-[#3c3531]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12 mb-12">

          {/* Academy Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-5 min-w-0 pr-0 lg:pr-6">
            <Link to="/" className="inline-flex items-center gap-3 text-white text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight mb-6 group">
              <img src="/logo.jpg" alt="Natya Shakti Academy" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-md border-2 border-[#C9A991]/40 flex-shrink-0" />
              <span className="whitespace-nowrap">
                NATYA <span className="text-[#C9A991]">SHAKTI</span> ACADEMY
              </span>
            </Link>
            <p className="text-gray-300 mb-8 leading-relaxed font-light text-sm sm:text-base max-w-md">
              Natya Shakti Academy is a premier institution dedicated to preserving and propagating the rich heritage of classical Indian dance. We nurture aspiring performers by instilling grace, tradition, and profound rhythmic mastery through expert choreography and immersive learning.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#C9A991] hover:text-white transition-all shadow-sm">
                <Camera className="w-5 h-5" />
              </a>
              <a href="#" className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#C9A991] hover:text-white transition-all shadow-sm">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-1 lg:col-span-3 min-w-0">
            <h3 className="text-white font-bold mb-6 uppercase tracking-[0.15em] text-sm">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-gray-300 hover:text-[#C9A991] transition-colors flex items-center gap-3 font-medium text-sm sm:text-base"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A991]"></span> About Us</Link></li>
              <li><Link to="/classes" className="text-gray-300 hover:text-[#C9A991] transition-colors flex items-center gap-3 font-medium text-sm sm:text-base"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A991]"></span> Class Schedule</Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-[#C9A991] transition-colors flex items-center gap-3 font-medium text-sm sm:text-base"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A991]"></span> Gallery</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-[#C9A991] transition-colors flex items-center gap-3 font-medium text-sm sm:text-base"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A991]"></span> Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="col-span-1 md:col-span-1 lg:col-span-4 min-w-0">
            <h3 className="text-white font-bold mb-6 uppercase tracking-[0.15em] text-sm">Contact Us</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-[#C9A991]" />
                </div>
                <div className="pt-1.5">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Organizer</p>
                  <p className="font-semibold text-white text-sm sm:text-base">Ayushi Dubey</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#C9A991]" />
                </div>
                <div className="pt-1.5">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Phone</p>
                  <p className="font-semibold text-white text-sm sm:text-base">+91 6203053876</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#C9A991]" />
                </div>
                <div className="pt-1.5">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Address</p>
                  <p className="font-medium text-gray-200 leading-snug text-sm sm:text-base">Tower No- B8, Flat No- 1804A,<br />Supertech Eco-Village 1,<br />Sector 1, Greater Noida, 201306</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 text-center text-sm font-medium flex flex-col justify-center items-center text-gray-400 gap-1.5">
          <p>&copy; {new Date().getFullYear()} Natya Shakti Academy. All Rights Reserved.</p>
          <p className="text-[#C9A991]">Designed by Er.Shivam Bhardwaj</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
