import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, User, Globe, Camera } from 'lucide-react';

const Footer = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/admin') || location.pathname.startsWith('/instructor') || location.pathname.startsWith('/student');

  if (isDashboard) return null;

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t-[8px] border-amber-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">

          {/* Academy Info */}
          <div className="col-span-1 md:col-span-5">
            <Link to="/" className="flex items-center text-2xl font-bold tracking-tighter text-white mb-6">
              <img src="/logo.jpg" alt="Nritya Shakti" className="w-10 h-10 rounded-full mr-3 shadow-md" />
              NRITYA<span className="text-amber-500">SHAKTI</span> ACADEMY
            </Link>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Nritya Shakti Academy is a premier institution dedicated to preserving and propagating the rich heritage of classical Indian dance. We nurture aspiring performers by instilling grace, tradition, and profound rhythmic mastery through expert choreography and immersive learning.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-amber-500 hover:text-slate-900 transition-colors">
                <Camera className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-amber-500 hover:text-slate-900 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-3">
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="hover:text-amber-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> About Us</Link></li>
              <li><Link to="/classes" className="hover:text-amber-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Class Schedule</Link></li>
              <li><Link to="/login" className="hover:text-amber-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Student Portal</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="col-span-1 md:col-span-4">
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <User className="w-5 h-5 text-amber-500 mt-1 shrink-0" />
                <div>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Organizer</p>
                  <p className="font-medium text-white">Ayushi Dubey</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-amber-500 mt-1 shrink-0" />
                <div>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Phone</p>
                  <p className="font-medium text-white">+91 6203053876</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-amber-500 mt-1 shrink-0" />
                <div>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Address</p>
                  <p className="leading-snug">B-8, 1804A, Supertech Eco-Village 1,<br />Sector 1, Noida Extension, 201306</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 text-center text-sm font-medium flex flex-col md:flex-row justify-between items-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} Nritya Shakti Academy. All Rights Reserved.</p>
          <p className="mt-2 md:mt-0">Designed by Shivam Bhardwaj</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
