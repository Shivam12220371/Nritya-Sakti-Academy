import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Menu, X, Home } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/admin') || location.pathname.startsWith('/instructor') || location.pathname.startsWith('/student');

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  // Close mobile menu whenever location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Classes', path: '/classes' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-sm transition-all duration-200">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo & Brand - Always 100% visible under any condition */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group">
            <img
              src="/logo.jpg"
              alt="Natya Shakti Academy"
              className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full object-cover border-2 border-[#EADCCF] shadow-sm transition-transform duration-200 group-hover:scale-105"
            />
            <span className="whitespace-nowrap text-xs font-extrabold tracking-tight text-[#463F3A] sm:text-lg md:text-xl lg:text-2xl">
              NATYA <span className="text-[#C9A991]">SHAKTI</span> ACADEMY
            </span>
          </Link>

          {/* Desktop & Laptop Navigation Links - Open & visible across all laptop/desktop screens */}
          {!isDashboard && (
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-[#F7F4F1] px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border border-[#EADCCF]/60">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-2.5 md:px-3.5 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                      active
                        ? 'bg-[#463F3A] text-white shadow-sm'
                        : 'text-[#463F3A]/80 hover:text-[#463F3A] hover:bg-white/80'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Right Action Items (Desktop, Laptop & Tablet) */}
          <div className="hidden sm:flex items-center gap-2 md:gap-3 flex-shrink-0">
            {!token ? (
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 md:px-5 md:py-2.5 rounded-full font-medium transition-all shadow-sm text-xs sm:text-sm md:text-base bg-[#463F3A] hover:bg-[#322c28] text-white"
              >
                <span>Register Free</span>
                <div className="w-4 h-4 md:w-5 md:h-5 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                </div>
              </Link>
            ) : (
              <div className="flex items-center gap-2 md:gap-3">
                {isDashboard && (
                  <Link
                    to="/"
                    className="font-semibold text-xs sm:text-sm md:text-base text-[#463F3A] hover:text-[#C9A991] transition-colors whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-stone-100"
                  >
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </Link>
                )}
                {!isDashboard && (
                  <Link
                    to={user?.role === 'admin' ? '/admin' : user?.role === 'instructor' ? '/instructor' : '/student'}
                    className="font-semibold text-xs sm:text-sm md:text-base text-[#463F3A] hover:text-[#C9A991] transition-colors whitespace-nowrap"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs sm:text-sm font-medium transition-all shadow-sm"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Menu Button - only shown on mobile screens below md */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#463F3A] hover:bg-stone-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Small screens right controls */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-[#463F3A] hover:bg-stone-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile & Tablet Dropdown Menu - Shown neatly in one screen when opened */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-stone-200 shadow-xl px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
          {!isDashboard && (
            <div className="flex flex-col space-y-1 mb-4">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      active
                        ? 'bg-[#463F3A] text-white shadow-sm'
                        : 'text-[#463F3A] hover:bg-[#F7F4F1]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          )}

          <div className="pt-2 border-t border-stone-100 flex flex-col gap-2.5">
            {!token ? (
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-medium bg-[#463F3A] text-white shadow-sm text-sm"
              >
                <span>Register Free</span>
                <User className="w-4 h-4" />
              </Link>
            ) : (
              <div className="flex flex-col gap-2">
                {isDashboard && (
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold bg-[#F7F4F1] text-[#463F3A] text-sm"
                  >
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </Link>
                )}
                {!isDashboard && (
                  <Link
                    to={user?.role === 'admin' ? '/admin' : user?.role === 'instructor' ? '/instructor' : '/student'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center py-2.5 rounded-xl font-semibold bg-[#F7F4F1] text-[#463F3A] text-sm"
                  >
                    Go to Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 rounded-xl font-medium bg-red-500 text-white text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
