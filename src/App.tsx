import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Footer } from './components/Footer';
import { WaitlistModal } from './components/WaitlistModal';
import { Home } from './pages/Home';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { AboutPage } from './pages/AboutPage';
import { FAQPage } from './pages/FAQPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { ContactPage } from './pages/ContactPage';
import { FeaturesPage } from './pages/FeaturesPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Layout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'How it Works', path: '/how-it-works' },
    { name: 'Features', path: '/features' },
    { name: 'FAQ', path: '/faq' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-wayo-cream font-sans selection:bg-wayo-coral selection:text-white pb-24 md:pb-0">
      <ScrollToTop />
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="bg-wayo-yellow text-yellow-900 text-center py-2 text-xs sm:text-sm font-bold tracking-widest uppercase shadow-sm">
          LAUNCHING APRIL 2026
        </div>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 grid grid-cols-3 md:grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="flex justify-start items-center">
            <button
              className="md:hidden p-2 -ml-2 text-wayo-dark"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-7 h-7" />
            </button>
            <div className="hidden md:flex h-20 lg:h-24 items-center shrink-0">
              <Link to="/" className="h-full block">
                <img src="/logo2.png" alt="Wayo" className="h-full w-auto object-contain" />
              </Link>
            </div>
          </div>

          <div className="flex justify-center flex-grow whitespace-nowrap">
            <div className="md:hidden h-16 sm:h-20 flex items-center shrink-0">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="h-full block">
                <img src="/logo2.png" alt="Wayo" className="h-full w-auto object-contain" />
              </Link>
            </div>
            <div className="hidden md:flex justify-center gap-6 lg:gap-8 text-wayo-dark font-medium text-sm lg:text-base">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors ${isActive(link.path)
                    ? 'font-bold text-wayo-dark'
                    : 'text-gray-600 hover:text-wayo-dark'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={openModal}
              className="hidden md:block bg-wayo-dark text-white hover:bg-gray-800 px-6 py-2.5 rounded-full font-bold transition-all text-sm shadow-md"
            >
              Get Early Access
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-wayo-cream flex flex-col md:hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="px-4 py-4 flex justify-between items-center border-b border-gray-200">
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -ml-2 text-wayo-dark">
              <X className="w-7 h-7" />
            </button>
            <div className="h-10 flex items-center">
              <img src="/logo2.png" alt="Wayo" className="h-full w-auto object-contain" />
            </div>
            <div className="w-11" />
          </div>
          <div className="flex flex-col items-center justify-center flex-grow gap-8 text-2xl font-bold text-wayo-dark pb-20">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={isActive(link.path) ? 'text-wayo-coral' : ''}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home onOpenWaitlist={openModal} />} />
        <Route path="/how-it-works" element={<HowItWorksPage onOpenWaitlist={openModal} />} />
        <Route path="/features" element={<FeaturesPage onOpenWaitlist={openModal} />} />
        <Route path="/about" element={<AboutPage onOpenWaitlist={openModal} />} />
        <Route path="/faq" element={<FAQPage onOpenWaitlist={openModal} />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <Footer onOpenWaitlist={openModal} />

      {/* Floating Mobile CTA */}
      <div className="md:hidden fixed bottom-6 left-0 right-0 z-40 px-4 pointer-events-none flex justify-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
        <button
          onClick={openModal}
          className="w-[95%] max-w-sm bg-wayo-coral text-white py-4 rounded-[2rem] font-bold text-lg pointer-events-auto shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex items-center justify-center gap-2 transform active:scale-95 transition-transform"
        >
          Get Early Access
        </button>
      </div>

      <WaitlistModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
