import { useEffect, lazy, Suspense } from 'react';
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


function App() {
  const { loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center font-bold text-slate-500">Loading App...</div>;
  }

  return (
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
  );
}

export default App;
