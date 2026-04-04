import { useState, useEffect } from 'react';
import { Menu, X, LogOut, User as UserIcon, Package, ShoppingBag } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Footer } from './components/Footer';
import { WaitlistModal } from './components/WaitlistModal';
import { AuthModal } from './components/AuthModal';
import { CartDrawer } from './components/CartDrawer';
import { useCart } from './context/CartContext';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from './lib/firebase';
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
import { AccountDashboard } from './pages/AccountDashboard';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Layout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();
  const { cartItems, toggleCart } = useCart();
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

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

          <div className="flex justify-end items-center gap-3 lg:gap-5">
            {user ? (
              <div className="relative group hidden md:block">
                <button
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 border border-gray-200 text-wayo-dark hover:bg-gray-200 transition-colors"
                  title="Account"
                >
                  <UserIcon className="w-5 h-5" />
                </button>
                <div className="absolute top-full right-0 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all w-64 z-50">
                  <div className="bg-white rounded-[1.25rem] shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 py-2 flex flex-col font-sans">
                    <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-wayo-dark text-white flex items-center justify-center font-bold text-sm">
                        {user.email?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">Signed In</span>
                        <span className="text-sm font-bold text-wayo-dark truncate w-full" title={user.email || ''}>{user.email}</span>
                      </div>
                    </div>
                    <div className="py-2">
                      <Link to="/account" className="px-5 py-2.5 hover:bg-gray-50 text-[15px] font-bold text-gray-700 hover:text-wayo-dark transition-colors flex items-center gap-3"><UserIcon className="w-4 h-4 text-gray-400"/> Profile</Link>
                      <Link to="/account" className="px-5 py-2.5 hover:bg-gray-50 text-[15px] font-bold text-gray-700 hover:text-wayo-dark transition-colors flex items-center gap-3"><Package className="w-4 h-4 text-gray-400"/> Orders</Link>
                    </div>
                    <div className="border-t border-gray-50 py-2">
                      <button onClick={handleLogout} className="w-full px-5 py-2 hover:bg-red-50 text-left text-[14px] font-bold text-red-600 transition-colors flex items-center gap-3"><LogOut className="w-4 h-4"/> Sign out</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden md:flex items-center gap-2 text-gray-500 hover:text-wayo-dark font-bold text-sm transition-colors"
                title="Sign In"
              >
                <UserIcon className="w-5 h-5" />
              </button>
            )}
            
            <button
              onClick={toggleCart}
              className="relative hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-wayo-cream border-2 border-transparent hover:border-gray-200 text-wayo-dark transition-colors"
              title="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-wayo-coral text-white text-[10px] font-extrabold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm transition-transform animate-in zoom-in">
                  {cartItemCount}
                </span>
              )}
            </button>

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
          <div className="flex flex-col flex-grow text-wayo-dark pb-20 overflow-y-auto">
            
            {user && (
              <div className="bg-white border-b border-gray-100 p-6 flex flex-col gap-1 items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-wayo-dark text-white flex items-center justify-center font-bold text-2xl mb-2">
                  {user.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Logged In</span>
                <span className="font-bold text-wayo-dark">{user.email}</span>
                
                <div className="flex gap-4 mt-6">
                  <Link to="/account" onClick={() => setIsMobileMenuOpen(false)} className="bg-wayo-cream text-wayo-dark px-6 py-2 rounded-full font-bold text-sm">Account</Link>
                  <button onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }} className="bg-gray-100 text-gray-600 px-6 py-2 rounded-full font-bold text-sm">Sign out</button>
                </div>
              </div>
            )}

            <div className="flex flex-col items-center justify-center gap-8 text-2xl font-bold flex-grow pt-8">
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

              {!user && (
              <>
                <div className="w-16 h-px bg-gray-200 my-2"></div>
                <button onClick={() => { setIsMobileMenuOpen(false); setIsAuthModalOpen(true); }} className="flex items-center gap-2 text-xl text-wayo-dark">
                  <UserIcon className="w-6 h-6" /> Sign In
                </button>
              </>
            )}
            <div className="w-16 h-px bg-gray-200 my-2"></div>
            <button onClick={() => { setIsMobileMenuOpen(false); toggleCart(); }} className="flex items-center gap-2 text-xl text-wayo-dark">
              <div className="relative">
                <ShoppingBag className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-wayo-coral text-white text-[10px] font-extrabold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {cartItemCount}
                  </span>
                )}
              </div>
              Your Cart
            </button>
          </div>
          </div>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home onOpenWaitlist={openModal} />} />
        <Route path="/account" element={<AccountDashboard />} />
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
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <CartDrawer />
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
