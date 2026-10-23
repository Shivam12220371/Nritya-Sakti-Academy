import { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProgramDetails from './pages/ProgramDetails';
import AboutUs from './pages/AboutUs';
import DanceClasses from './pages/DanceClasses';
import AuthPage from './pages/AuthPage';
import VerificationPage from './pages/VerificationPage';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';
import SocialSidebar from './components/SocialSidebar';
import GalleryPage from './pages/GalleryPage';
import ContactUs from './pages/ContactUs';

// ─── Lazy-loaded heavy bundles ──────────────────────────────────────────────
// These are only fetched when the user navigates to those routes / the chatbot
// mounts — cutting the initial JS bundle significantly.
const StudentDashboard   = lazy(() => import('./pages/StudentDashboard'));
const AdminDashboard     = lazy(() => import('./pages/AdminDashboard'));
const InstructorDashboard = lazy(() => import('./pages/InstructorDashboard'));
const LiveMeetingRoom    = lazy(() => import('./pages/LiveMeetingRoom'));
const AIChatBot          = lazy(() => import('./components/AIChatBot'));

// Simple fallback shown while a lazy chunk is loading
const PageLoader = () => (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
      <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Loading…</p>
    </div>
  </div>
);

const StartupLoader = ({ isReady }: { isReady: boolean }) => {
  const [progress, setProgress] = useState(1);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const progressTimer = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 90) return current;
        return Math.min(90, current + Math.ceil(Math.random() * 3));
      });
    }, 45);

    return () => window.clearInterval(progressTimer);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    setProgress(100);
    const hideTimer = window.setTimeout(() => setIsVisible(false), 450);
    return () => window.clearTimeout(hideTimer);
  }, [isReady]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#463F3A]">
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#C9A991]/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-[#EADCCF]/15 blur-3xl" />
      <div className="relative w-[min(360px,calc(100vw-3rem))] text-center text-white">
        <div className="mx-auto mb-5 h-20 w-20 overflow-hidden rounded-full border-4 border-[#EADCCF]/70 bg-[#FAFAFA] shadow-2xl">
          <img src="/logo.jpg" alt="Natya Shakti Academy" className="h-full w-full object-cover" />
        </div>
        <h1 className="text-xl font-semibold tracking-wide">Natya Shakti Academy</h1>
        <p className="mt-1 text-sm text-[#EADCCF]">Preparing your dance experience</p>
        <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#EADCCF] via-[#C9A991] to-amber-300 transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-[#EADCCF]">
          <span>Loading...</span>
          <span className="font-semibold text-white">{progress}%</span>
        </div>
      </div>
    </div>
  );
};


function App() {
  const { loading } = useAuth();
  const [documentReady, setDocumentReady] = useState(document.readyState === 'complete');

  useEffect(() => {
    if (documentReady) return;

    const handleLoad = () => setDocumentReady(true);
    window.addEventListener('load', handleLoad, { once: true });
    return () => window.removeEventListener('load', handleLoad);
  }, [documentReady]);

  const startupReady = documentReady && !loading;

  return (
    <>
      <Router>
        <Toaster position="top-center" />
        <div className="min-h-screen overflow-x-hidden bg-slate-50 dark:bg-slate-950 font-sans selection:bg-indigo-500/30">
          <ScrollToTop />
          <Navbar />
          <SocialSidebar />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/programs/:programId" element={<ProgramDetails />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/classes" element={<DanceClasses />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/register" element={<AuthPage />} />
              <Route path="/verify/:certificateId" element={<VerificationPage />} />

              {/* Protected Routes (Dashboard) — lazy loaded */}
              <Route path="/student/*" element={<StudentDashboard />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
              <Route path="/instructor/*" element={<InstructorDashboard />} />
              <Route path="/live/:roomId" element={<LiveMeetingRoom />} />
            </Routes>
          </Suspense>
          <Footer />
          {/* AIChatBot loads async — does not block initial render */}
          <Suspense fallback={null}>
            <AIChatBot />
          </Suspense>
        </div>
      </Router>
      <StartupLoader isReady={startupReady} />
    </>
  );
}

export default App;
