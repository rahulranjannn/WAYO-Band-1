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
import { TermsPage } from './pages/TermsPage';
import { ContactPage } from './pages/ContactPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { ProductPage } from './pages/ProductPage';
import { ShopPage } from './pages/ShopPage';
import { ClipProductPage } from './pages/ClipProductPage';

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
              aria-label="Open navigation menu"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-7 h-7" />
            </button>
            <div className="hidden md:flex h-20 lg:h-24 items-center shrink-0">
              <Link to="/" className="h-full block">
                <img src="/logo2.webp" alt="WAYO" width="160" height="48" className="h-full w-auto object-contain" />
              </Link>
            </div>
          </div>

          <div className="flex justify-center flex-grow whitespace-nowrap">
            <div className="md:hidden h-16 sm:h-20 flex items-center shrink-0">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="h-full block">
                <img src="/logo2.webp" alt="WAYO" width="160" height="48" className="h-full w-auto object-contain" />
              </Link>
            </div>
            <div className="hidden md:flex justify-center gap-6 lg:gap-8 text-wayo-dark font-medium text-sm lg:text-base items-center">
              <div className="relative group">
                <button className={`font-medium flex items-center gap-1 transition-colors ${(isActive('/product') || isActive('/product/clip') || isActive('/shop')) ? 'font-bold text-wayo-dark' : 'text-[#4B5563] hover:text-wayo-dark'}`}>
                  Shop
                  <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all">
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 py-3 flex flex-col w-56 relative z-50">
                    <Link to="/product" className="px-5 py-2.5 hover:bg-gray-50 flex flex-col">
                      <span className="font-bold text-wayo-dark text-[15px]">WAYO Band</span>
                      <span className="text-xs text-gray-500 font-medium">Child Safety Wearable</span>
                    </Link>
                    <Link to="/product/clip" className="px-5 py-2.5 hover:bg-gray-50 flex flex-col">
                      <span className="font-bold text-wayo-dark text-[15px]">WAYO Clip</span>
                      <span className="text-xs text-gray-500 font-medium">Smart Luggage Protection</span>
                    </Link>
                    <div className="mx-4 my-2 border-t border-gray-100"></div>
                    <Link to="/shop" className="px-5 py-2 flex items-center justify-between group/link hover:bg-gray-50">
                      <span className="font-bold text-wayo-coral text-[14px]">All Products</span>
                      <span className="text-wayo-coral opacity-0 group-hover/link:opacity-100 transition-opacity transform translate-x-0 group-hover/link:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </div>
              
              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors ${isActive(link.path)
                    ? 'font-bold text-wayo-dark'
                    : 'text-[#4B5563] hover:text-wayo-dark'
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
            <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close navigation menu" className="p-2 -ml-2 text-wayo-dark">
              <X className="w-7 h-7" />
            </button>
            <div className="h-10 flex items-center">
              <img src="/logo2.webp" alt="WAYO" width="160" height="48" className="h-full w-auto object-contain" />
            </div>
            <div className="w-11" />
          </div>
          <div className="flex flex-col items-center justify-center flex-grow gap-8 text-2xl font-bold text-wayo-dark pb-20 overflow-y-auto">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={isActive('/') ? 'text-wayo-coral' : ''}>Home</Link>
            
            <div className="flex flex-col items-center gap-4 bg-wayo-dark/5 w-full py-6">
              <span className="text-[#4B5563] text-sm opacity-60 mb-2 uppercase tracking-widest font-semibold">Shop</span>
              <Link to="/product" onClick={() => setIsMobileMenuOpen(false)} className={`text-xl ${isActive('/product') ? 'text-wayo-coral' : ''}`}>WAYO Band</Link>
              <Link to="/product/clip" onClick={() => setIsMobileMenuOpen(false)} className={`text-xl ${isActive('/product/clip') ? 'text-wayo-coral' : ''}`}>WAYO Clip</Link>
              <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg text-wayo-coral mt-2 font-medium`}>View All Products →</Link>
            </div>

            {navLinks.slice(1).map((link) => (
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
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product/clip" element={<ClipProductPage onOpenWaitlist={openModal} />} />
        <Route path="/how-it-works" element={<HowItWorksPage onOpenWaitlist={openModal} />} />
        <Route path="/features" element={<FeaturesPage onOpenWaitlist={openModal} />} />
        <Route path="/about" element={<AboutPage onOpenWaitlist={openModal} />} />
        <Route path="/faq" element={<FAQPage onOpenWaitlist={openModal} />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
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
