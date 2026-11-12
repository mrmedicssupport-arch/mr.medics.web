import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X, Globe, User, Stethoscope, TestTube, Pill, FileText, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { config } from '../config';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar({ language, setLanguage }: { language: string; setLanguage: (lang: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cart, setIsCartOpen } = useCart();

  const handleOpenCart = () => {
    if (location.pathname.includes('/lab-tests')) {
      setIsCartOpen(true);
    } else {
      navigate('/services/lab-tests');
      setTimeout(() => setIsCartOpen(true), 100);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.overscrollBehavior = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.overscrollBehavior = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.overscrollBehavior = '';
    };
  }, [mobileMenuOpen]);

  const servicesList = [
    { title: "Doctor Consultation", desc: "Video, audio & in-clinic with NMC doctors", icon: Stethoscope, path: "/services/doctor-consultation" },
    { title: "Lab Tests & Packages", desc: "Free home sample collection & fast reports", icon: TestTube, path: "/services/lab-tests" },
    { title: "Online Pharmacy", desc: "Doorstep delivery of genuine medicines", icon: Pill, path: "/services/medicines" },
    { title: "Health Records", desc: "Secure digital vault for family reports", icon: FileText, path: "/services/health-records" },
  ];

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", dropdown: true },
    { name: "Lab Tests", path: "/services/lab-tests" },
    { name: "Doctors", path: "/doctors" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className={`sticky top-0 z-50 h-[56px] md:h-[76px] bg-white transition-all duration-300 border-b border-[#E2E8F0] ${scrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-[1200px] h-full mx-auto px-4 md:px-6 flex items-center justify-between">
        
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2 md:gap-3 group">
          <div className="bg-white p-0.5 rounded-lg flex items-center transition-transform group-hover:scale-105">
            <img 
              src="/assets/aistudio/file_000000003e70821192f55344a196d9e8_50f4da26.png" 
              alt="Mr Medics - Health Beyond Border" 
              className="h-8 sm:h-9 md:h-12 w-auto object-contain"
            />
          </div>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link, idx) => {
            if (link.dropdown) {
              return (
                <div 
                  key={idx} 
                  className="relative py-2"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button className="flex items-center gap-1.5 text-[15px] font-semibold text-[#0A1A45] hover:text-[#1769E0] transition-colors whitespace-nowrap cursor-pointer">
                    Services <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-[-80px] w-[360px] bg-white rounded-2xl shadow-xl border border-slate-100 p-3 grid gap-1 z-50"
                      >
                        {servicesList.map((s, sIdx) => {
                          const IconComp = s.icon;
                          return (
                            <Link 
                              key={sIdx} 
                              to={s.path}
                              onClick={() => setServicesOpen(false)}
                              className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#F2F7FF] transition-colors group/item"
                            >
                              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1769E0] flex items-center justify-center shrink-0 group-hover/item:health-gradient group-hover/item:text-white transition-all">
                                <IconComp className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-[#0A1A45] group-hover/item:text-[#1769E0] transition-colors">{s.title}</h4>
                                <p className="text-xs text-[#475569]">{s.desc}</p>
                              </div>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={idx} 
                to={link.path || '#'}
                className={`relative text-[15px] font-semibold text-[#0A1A45] hover:text-[#1769E0] transition-colors whitespace-nowrap py-2 ${isActive ? 'text-[#1769E0]' : ''}`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] health-gradient rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Cart Icon Button */}
          <button
            onClick={handleOpenCart}
            className="relative p-2 rounded-full hover:bg-[#F2F7FF] text-[#0A1A45] hover:text-[#1769E0] transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="View Cart"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#1769E0] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>

          {/* Language Toggle Pill */}
          <button 
            onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F2F7FF] text-[#0A1A45] text-xs font-bold hover:bg-blue-100 transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-[#1769E0]" />
            <span>{language === 'EN' ? 'EN | हिं' : 'हिं | EN'}</span>
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/account"
                className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#F2F7FF] hover:bg-blue-100 text-[#0A1A45] text-xs font-bold transition"
              >
                <User className="w-3.5 h-3.5 text-[#1769E0]" />
                <span>My Account</span>
              </Link>
              <button
                onClick={logout}
                className="text-xs text-rose-600 hover:text-rose-700 font-semibold transition cursor-pointer"
                title="Sign out"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-[15px] font-semibold text-[#0A1A45] hover:text-[#1769E0] transition-colors">
                Login
              </Link>
              <Link 
                to="/signup"
                className="h-[44px] px-6 rounded-full health-gradient text-white text-[15px] font-bold shadow-md shadow-blue-500/20 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center whitespace-nowrap"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger & Actions */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Mobile Cart Button */}
          <button
            onClick={handleOpenCart}
            className="relative p-2 rounded-full hover:bg-[#F2F7FF] text-[#0A1A45] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-5 h-5 text-[#0A1A45]" />
            {cart.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#1769E0] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>

          <button 
            onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#F2F7FF] text-[#0A1A45] text-xs font-bold min-h-[36px]"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-[#1769E0]" />
            <span>{language}</span>
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-11 h-11 flex items-center justify-center text-[#0A1A45] hover:text-[#1769E0] active:scale-95 transition-all rounded-lg"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Full-Height Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-top top-[56px] md:top-[76px] left-0 w-full h-[calc(100dvh-56px)] md:h-[calc(100dvh-76px)] bg-white z-50 p-5 flex flex-col justify-between overflow-y-auto lg:hidden shadow-2xl pb-safe"
          >
            <div className="flex flex-col gap-2">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <div className="bg-white p-1 rounded-xl">
                  <img 
                    src="/assets/aistudio/file_000000003e70821192f55344a196d9e8_50f4da26.png" 
                    alt="Mr Medics Logo" 
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <span className="text-[11px] font-bold text-slate-400">Health Beyond Border</span>
              </div>
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-base font-bold text-[#0A1A45] min-h-[48px] flex items-center border-b border-slate-100 active:text-[#1769E0]">Home</Link>
              <div className="py-2 border-b border-slate-100">
                <span className="text-[11px] font-bold text-[#1769E0] uppercase tracking-wider block mb-1">Services</span>
                <div className="grid gap-1 pl-2">
                  {servicesList.map((s, idx) => (
                    <Link key={idx} to={s.path} onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-[#0A1A45] min-h-[44px] flex items-center active:text-[#1769E0]">{s.title}</Link>
                  ))}
                </div>
              </div>
              <Link to="/services/lab-tests" onClick={() => setMobileMenuOpen(false)} className="text-base font-bold text-[#0A1A45] min-h-[48px] flex items-center border-b border-slate-100 active:text-[#1769E0]">Lab Tests</Link>
              <Link to="/doctors" onClick={() => setMobileMenuOpen(false)} className="text-base font-bold text-[#0A1A45] min-h-[48px] flex items-center border-b border-slate-100 active:text-[#1769E0]">Doctors</Link>
              <Link to="/how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-base font-bold text-[#0A1A45] min-h-[48px] flex items-center border-b border-slate-100 active:text-[#1769E0]">How It Works</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-base font-bold text-[#0A1A45] min-h-[48px] flex items-center border-b border-slate-100 active:text-[#1769E0]">About Us</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-base font-bold text-[#0A1A45] min-h-[48px] flex items-center border-b border-slate-100 active:text-[#1769E0]">Contact Us</Link>
              <Link to="/faq" onClick={() => setMobileMenuOpen(false)} className="text-base font-bold text-[#0A1A45] min-h-[48px] flex items-center border-b border-slate-100 active:text-[#1769E0]">FAQs</Link>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5 mt-auto">
              {user ? (
                <>
                  <Link 
                    to="/account" 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="w-full min-h-[48px] flex items-center justify-center text-center text-sm font-bold text-[#0A1A45] rounded-xl bg-blue-50 border border-blue-200"
                  >
                    My Account ({user.displayName || user.email?.split('@')[0]})
                  </Link>
                  <button 
                    onClick={() => { logout(); setMobileMenuOpen(false); }} 
                    className="w-full min-h-[48px] flex items-center justify-center text-center text-sm font-bold text-rose-600 rounded-xl bg-rose-50 border border-rose-200"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full min-h-[48px] flex items-center justify-center text-center text-sm font-bold text-[#0A1A45] rounded-xl bg-slate-50 border border-slate-200">
                    Login
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full min-h-[48px] flex items-center justify-center text-center text-sm font-bold text-white rounded-xl health-gradient shadow-md">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
