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
            <Link to="/" className="text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors font-medium">Home</Link>
            {!isDashboard && (
              <>
                <Link to="/classes" className="text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors font-medium">Classes</Link>
                <Link to="/about" className="text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors font-medium">About</Link>
              </>
            )}
            
            {!token ? (
              <Link to="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
                Login
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
                <Link to="/classes" className="block px-3 py-3 text-slate-600 dark:text-slate-300 hover:text-indigo-600 font-medium text-lg" onClick={() => setIsOpen(false)}>Classes</Link>
                <Link to="/about" className="block px-3 py-3 text-slate-600 dark:text-slate-300 hover:text-indigo-600 font-medium text-lg" onClick={() => setIsOpen(false)}>About</Link>
              </>
            )}
            
            {!token ? (
              <Link to="/login" className="block px-3 py-3 mt-4 mx-4 bg-indigo-600 text-white rounded-full font-medium shadow-md" onClick={() => setIsOpen(false)}>Login</Link>
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
