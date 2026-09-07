import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loginState: (userData: User, tokenData: string) => void;
  logout: () => void;
  loading: boolean;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load from local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      // Set default auth header for all future axios requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    setLoading(false);
  }, []);

  // Timeouts to ensure session limits
  useEffect(() => {
    if (!token) return;

    let inactiveTimeoutId: ReturnType<typeof setTimeout>;
    let absoluteTimeoutId: ReturnType<typeof setTimeout>;

    const executeLogout = (reason: string) => {
      setUser(null);
      setToken(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      
      // Delay alert slightly so context unmount doesn't kill it immediately if relying on standard routing
      setTimeout(() => {
          toast.error(`Session Expired: ${reason}. Please login again.`, { icon: '⚠️', duration: 5000 });
      }, 500);

      window.location.href = '/login';
    };

    const resetInactiveTimeout = () => {
      clearTimeout(inactiveTimeoutId);
      // 10 minutes of inactivity
      inactiveTimeoutId = setTimeout(() => {
        executeLogout('Inactive for 10 minutes');
      }, 10 * 60 * 1000);
    };

    // 15 minutes absolute max session limit
    absoluteTimeoutId = setTimeout(() => {
      executeLogout('15 minutes maximum session limit reached');
    }, 15 * 60 * 1000);

    resetInactiveTimeout();

    const handleActivity = () => resetInactiveTimeout();
    
    // Also consider immediately logging out if minimized for a period or on visibility change as requested
    const handleVisibility = () => {
        if (document.visibilityState === 'hidden') {
            // When minimized, some browsers throttle timeouts. 
            // We just ensure the inactive timeout is running.
        } else {
            resetInactiveTimeout();
        }
    };

    const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    activityEvents.forEach(evt => document.addEventListener(evt, handleActivity));
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearTimeout(inactiveTimeoutId);
      clearTimeout(absoluteTimeoutId);
      activityEvents.forEach(evt => document.removeEventListener(evt, handleActivity));
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [token]);

  const loginState = (userData: User, tokenData: string) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', tokenData);
    axios.defaults.headers.common['Authorization'] = `Bearer ${tokenData}`;
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, loginState, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
