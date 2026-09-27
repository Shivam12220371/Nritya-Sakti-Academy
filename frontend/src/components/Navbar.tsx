import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/admin') || location.pathname.startsWith('/instructor') || location.pathname.startsWith('/student');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center text-2xl font-bold tracking-tighter text-indigo-600 dark:text-indigo-400">
              <img src="/logo.jpg" alt="Nritya Shakti" className="w-12 h-12 rounded-full mr-3 shadow-md" />
              <span className="hidden sm:block">NRITYA<span className="text-slate-900 dark:text-white">SHAKTI</span> ACADEMY</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="relative text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors font-medium group py-2">
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-indigo-600 dark:bg-indigo-400 transition-all duration-300 group-hover:w-full rounded-full pointer-events-none"></span>
              Home
            </Link>
            {!isDashboard && (
              <>
                <div className="relative group">
                  <button className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors font-medium cursor-default py-2">
                    <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-indigo-600 dark:bg-indigo-400 transition-all duration-300 group-hover:w-full rounded-full pointer-events-none"></span>
                    Programs
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-gradient-to-b from-white to-indigo-50/80 dark:from-slate-900 dark:to-indigo-950/80 backdrop-blur-xl border border-indigo-100 dark:border-indigo-800/50 rounded-2xl shadow-[0_20px_40px_-15px_rgba(99,102,241,0.3)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 overflow-hidden flex flex-col py-3 z-50">
                    <Link to="/programs/kathak" className="px-5 py-2.5 text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-100/50 dark:text-slate-200 dark:hover:bg-indigo-900/40 transition-all duration-300 hover:translate-x-2 border-l-2 border-transparent hover:border-indigo-500">Kathak</Link>
                    <Link to="/programs/bharatanatyam" className="px-5 py-2.5 text-sm font-semibold text-slate-700 hover:text-rose-600 hover:bg-rose-100/50 dark:text-slate-200 dark:hover:bg-rose-900/40 transition-all duration-300 hover:translate-x-2 border-l-2 border-transparent hover:border-rose-500">Bharatanatyam</Link>
                    <Link to="/programs/western-dance" className="px-5 py-2.5 text-sm font-semibold text-slate-700 hover:text-amber-600 hover:bg-amber-100/50 dark:text-slate-200 dark:hover:bg-amber-900/40 transition-all duration-300 hover:translate-x-2 border-l-2 border-transparent hover:border-amber-500">Western Dance</Link>
                    <Link to="/programs/zumba" className="px-5 py-2.5 text-sm font-semibold text-slate-700 hover:text-emerald-600 hover:bg-emerald-100/50 dark:text-slate-200 dark:hover:bg-emerald-900/40 transition-all duration-300 hover:translate-x-2 border-l-2 border-transparent hover:border-emerald-500">Zumba</Link>
                    <Link to="/programs/free-style" className="px-5 py-2.5 text-sm font-semibold text-slate-700 hover:text-fuchsia-600 hover:bg-fuchsia-100/50 dark:text-slate-200 dark:hover:bg-fuchsia-900/40 transition-all duration-300 hover:translate-x-2 border-l-2 border-transparent hover:border-fuchsia-500">Free Style</Link>
                  </div>
                </div>
                <Link to="/classes" className="relative text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors font-medium group py-2">
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-indigo-600 dark:bg-indigo-400 transition-all duration-300 group-hover:w-full rounded-full pointer-events-none"></span>
                  Classes
                </Link>
                <Link to="/about" className="relative text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors font-medium group py-2">
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-indigo-600 dark:bg-indigo-400 transition-all duration-300 group-hover:w-full rounded-full pointer-events-none"></span>
                  About
                </Link>
              </>
            )}
            
            {!token ? (
              <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
                Register
              </Link>
            ) : (
              <div className="flex gap-4 items-center">
                {!isDashboard && (
                  <Link to={user?.role === 'admin' ? '/admin' : user?.role === 'instructor' ? '/instructor' : '/student'} className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Dashboard</Link>
                )}
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-full font-medium transition-all">
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 text-center flex flex-col">
            <Link to="/" className="block px-3 py-3 text-slate-600 dark:text-slate-300 hover:text-indigo-600 font-medium text-lg" onClick={() => setIsOpen(false)}>Home</Link>
            {!isDashboard && (
              <>
                <div className="flex flex-col border-y border-slate-100 dark:border-slate-800/50 my-2 py-2">
                  <div className="text-slate-400 dark:text-slate-500 font-bold px-3 py-2 uppercase text-xs tracking-widest text-center">Programs</div>
                  <Link to="/programs/kathak" className="block px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 font-medium" onClick={() => setIsOpen(false)}>Kathak</Link>
                  <Link to="/programs/bharatanatyam" className="block px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 font-medium" onClick={() => setIsOpen(false)}>Bharatanatyam</Link>
                  <Link to="/programs/western-dance" className="block px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 font-medium" onClick={() => setIsOpen(false)}>Western Dance</Link>
                  <Link to="/programs/zumba" className="block px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 font-medium" onClick={() => setIsOpen(false)}>Zumba</Link>
                  <Link to="/programs/free-style" className="block px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 font-medium" onClick={() => setIsOpen(false)}>Free Style</Link>
                </div>
                <Link to="/classes" className="block px-3 py-3 text-slate-600 dark:text-slate-300 hover:text-indigo-600 font-medium text-lg" onClick={() => setIsOpen(false)}>Classes</Link>
                <Link to="/about" className="block px-3 py-3 text-slate-600 dark:text-slate-300 hover:text-indigo-600 font-medium text-lg" onClick={() => setIsOpen(false)}>About</Link>
              </>
            )}
            
            {!token ? (
              <Link to="/register" className="block px-3 py-3 mt-4 mx-4 bg-indigo-600 text-white rounded-full font-medium shadow-md text-center" onClick={() => setIsOpen(false)}>Register</Link>
            ) : (
              <>
                {!isDashboard && (
                  <Link to={user?.role === 'admin' ? '/admin' : user?.role === 'instructor' ? '/instructor' : '/student'} className="block px-3 py-3 text-indigo-600 dark:text-indigo-400 font-bold text-lg" onClick={() => setIsOpen(false)}>Dashboard</Link>
                )}
                <button onClick={handleLogout} className="block w-[calc(100%-2rem)] text-center py-3 mt-2 mx-4 bg-red-500 text-white rounded-full font-medium shadow-md">Logout</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
