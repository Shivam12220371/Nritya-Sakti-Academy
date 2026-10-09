import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/admin') || location.pathname.startsWith('/instructor') || location.pathname.startsWith('/student');
  const isHome = location.pathname === '/';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use transparent style only on home AND not scrolled
  const isTransparent = isHome && !isScrolled;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isTransparent ? 'bg-transparent pt-4' : 'bg-white/95 backdrop-blur-md border-b border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Make the entire container flex-wrap or allow the inner content to scroll horizontally */}
        <div className={`flex flex-col md:flex-row justify-between items-center gap-4 py-4 md:py-0 ${isTransparent ? 'md:h-16' : 'md:h-20'}`}>
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center w-full md:w-auto justify-between">
            <Link to="/" className={`flex items-center text-[0.8rem] sm:text-xl md:text-2xl font-bold tracking-tight sm:tracking-tighter ${isTransparent ? 'text-white' : 'text-[#463F3A]'}`}>
              <img src="/logo.jpg" alt="Nritya Shakti" className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full mr-2 md:mr-3 shadow-md ${isTransparent ? 'border-2 border-white/20' : 'border border-gray-200'}`} />
              <span>NRITYA<span className={isTransparent ? 'text-[#F3E8E0]' : 'text-indigo-600'}>SHAKTI</span> {isTransparent ? <span className="opacity-90">ACADEMY</span> : <span className="opacity-80">ACADEMY</span>}</span>
            </Link>
          </div>

          {/* Direct Menu - Horizontally Scrollable on Mobile, Pill Format */}
          <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            
            <div className={`flex shrink-0 space-x-1 items-center px-4 py-2 md:px-6 md:py-2.5 rounded-full ${isTransparent ? 'bg-white shadow-lg text-sm font-medium' : 'bg-transparent rounded-full border border-gray-100/50 md:border-none'}`}>
              <Link to="/" className={`px-3 py-1.5 rounded-full transition-colors ${isTransparent ? 'bg-[#463F3A] text-white' : 'text-slate-600 hover:text-indigo-600'}`}>Home</Link>
              {!isDashboard && (
                <>
                  <Link to="/about" className={`px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${isTransparent ? 'text-gray-600 hover:text-[#463F3A] hover:bg-gray-100' : 'text-slate-600 hover:text-indigo-600'}`}>About Us</Link>
                  <Link to="/classes" className={`px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${isTransparent ? 'text-gray-600 hover:text-[#463F3A] hover:bg-gray-100' : 'text-slate-600 hover:text-indigo-600'}`}>Classes</Link>
                  <Link to="/gallery" className={`px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${isTransparent ? 'text-gray-600 hover:text-[#463F3A] hover:bg-gray-100' : 'text-slate-600 hover:text-indigo-600'}`}>Gallery</Link>
                  <Link to="/contact" className={`px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${isTransparent ? 'text-gray-600 hover:text-[#463F3A] hover:bg-gray-100' : 'text-slate-600 hover:text-indigo-600'}`}>Contact Us</Link>
                </>
              )}
            </div>

            {/* Social Icons */}
            <div className={`flex shrink-0 items-center gap-3 ${isTransparent ? 'text-[#463F3A]' : 'text-slate-400'}`}>
               <a href="https://wa.me/916203053876" target="_blank" rel="noopener noreferrer" className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors ${isTransparent ? 'bg-[#EADCCF] hover:bg-white text-[#463F3A]' : 'bg-[#EADCCF] hover:bg-white text-[#463F3A]'}`}>
                 <svg className="w-4 h-4 md:w-5 md:h-5 fill-current" viewBox="0 0 24 24"><path d="M11.97 2.005c-5.52 0-9.99 4.47-9.99 9.99 0 1.95.56 3.82 1.55 5.43L2 22l4.67-1.55a9.962 9.962 0 005.3 1.54h.01c5.52 0 10-4.48 10-10S17.49 2.005 11.97 2.005zm0 16.27h-.01c-1.63 0-3.23-.42-4.66-1.22l-.33-.2-3.46 1.15 1.17-3.37-.22-.35a8.288 8.288 0 01-1.27-4.47c0-4.57 3.73-8.3 8.3-8.3 2.22 0 4.3.87 5.86 2.43 1.56 1.57 2.42 3.65 2.42 5.87 0 4.56-3.73 8.29-8.29 8.29zm4.56-6.23c-.25-.12-1.48-.73-1.71-.81-.23-.08-.4-.12-.57.12-.17.25-.65.81-.79.98-.15.17-.3.19-.55.06-1.57-.79-2.61-2-3.62-3.71-.1-.17-.01-.27.06-.37.14-.14.28-.32.41-.48.06-.06.12-.12.16-.17.15-.3.08-.57-.04-.81-.13-.25-.57-1.38-.79-1.89-.2-.5-.4-.43-.57-.44h-.48c-.17 0-.46.06-.7.32s-.92.9-.92 2.2 1.45 2.56 1.65 2.82c.2.27 1.92 2.93 4.65 4.11.65.28 1.16.45 1.56.57.65.21 1.25.18 1.72.11.53-.08 1.48-.6 1.69-1.19.21-.59.21-1.09.15-1.19-.07-.1-.23-.15-.48-.28z" /></svg>
               </a>
            </div>

            {!token ? (
              <Link to="/register" className={`flex shrink-0 items-center justify-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full font-medium transition-all shadow-md text-sm md:text-base ${isTransparent ? 'bg-[#F3E8E0] text-[#463F3A] hover:bg-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'}`}>
                Register Free <div className="w-4 h-4 md:w-5 md:h-5 bg-white rounded-full flex items-center justify-center ml-1"><User className="w-3 h-3 text-[#463F3A]"/></div>
              </Link>
            ) : (
              <div className="flex shrink-0 gap-3 md:gap-4 items-center">
                {!isDashboard && (
                  <Link to={user?.role === 'admin' ? '/admin' : user?.role === 'instructor' ? '/instructor' : '/student'} className={`font-bold hover:underline whitespace-nowrap text-sm md:text-base ${isTransparent ? 'text-[#463F3A]' : 'text-indigo-600'}`}>Dashboard</Link>
                )}
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-all shadow-md">
                  Logout
                </button>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
