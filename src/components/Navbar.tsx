import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HeartPulse, ChevronDown, Menu, X, Globe, User, ArrowRight, Stethoscope, TestTube, Pill, Sparkles, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { config } from '../config';

export default function Navbar({ language, setLanguage }: { language: string; setLanguage: (lang: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const servicesList = [
    { title: "Doctor Consultation", desc: "Video, audio & in-clinic with NMC doctors", icon: Stethoscope, path: "/services/doctor-consultation" },
    { title: "Lab Tests & Packages", desc: "Free home sample collection & fast reports", icon: TestTube, path: "/services/lab-tests" },
    { title: "Online Pharmacy", desc: "Doorstep delivery of genuine medicines", icon: Pill, path: "/services/medicines" },
    { title: "AI Symptom Checker", desc: "Instant preliminary guidance & advice", icon: Sparkles, path: "/services/ai-symptom-checker" },
    { title: "Health Records", desc: "Secure digital vault for family reports", icon: FileText, path: "/services/health-records" },
  ];

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", dropdown: true },
    { name: "Lab Tests", path: "/lab-tests" },
    { name: "Doctors", path: "/doctors" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className={`sticky top-0 z-50 h-[76px] bg-white transition-all duration-300 border-b border-[#E2E8F0] ${scrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-[1200px] h-full mx-auto px-6 flex items-center justify-between">
        
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-white p-1 rounded-xl flex items-center transition-transform group-hover:scale-105">
            <img 
              src="/assets/aistudio/file_000000003e70821192f55344a196d9e8_50f4da26.png" 
              alt="Mrmedics - Health Beyond Border" 
              className="h-10 sm:h-12 w-auto object-contain"
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
                  <button className="flex items-center gap-1.5 text-[15px] font-semibold text-[#0A1A45] hover:text-[#1769E0] transition-colors whitespace-nowrap">
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
        <div className="hidden lg:flex items-center gap-5">
          {/* Language Toggle Pill */}
          <button 
            onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F2F7FF] text-[#0A1A45] text-xs font-bold hover:bg-blue-100 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-[#1769E0]" />
            <span>{language === 'EN' ? 'EN | हिं' : 'हिं | EN'}</span>
          </button>

          <a href={`${config.APP_URL}/login`} className="text-[15px] font-semibold text-[#0A1A45] hover:text-[#1769E0] transition-colors">
            Login
          </a>

          <a 
            href={`${config.APP_URL}/signup`}
            className="h-[44px] px-6 rounded-full health-gradient text-white text-[15px] font-bold shadow-md shadow-blue-500/20 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center whitespace-nowrap"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center gap-4">
          <button 
            onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F2F7FF] text-[#0A1A45] text-xs font-bold"
          >
            <Globe className="w-3 h-3 text-[#1769E0]" />
            <span>{language}</span>
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#0A1A45] hover:text-[#1769E0]"
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
            className="fixed inset-top top-[76px] left-0 w-full h-[calc(100vh-76px)] bg-white z-50 p-6 flex flex-col justify-between overflow-y-auto lg:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <div className="bg-white p-1 rounded-xl">
                  <img 
                    src="/assets/aistudio/file_000000003e70821192f55344a196d9e8_50f4da26.png" 
                    alt="Mrmedics Logo" 
                    className="h-9 sm:h-10 w-auto object-contain"
                  />
                </div>
                <span className="text-[11px] font-bold text-slate-400">Health Beyond Border</span>
              </div>
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-[#0A1A45] py-2 border-b border-slate-100">Home</Link>
              <div className="py-2 border-b border-slate-100">
                <span className="text-xs font-bold text-[#1769E0] uppercase tracking-wider block mb-2">Services</span>
                <div className="grid gap-2 pl-2">
                  {servicesList.map((s, idx) => (
                    <Link key={idx} to={s.path} onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-[#0A1A45] py-1">{s.title}</Link>
                  ))}
                </div>
              </div>
              <Link to="/lab-tests" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-[#0A1A45] py-2 border-b border-slate-100">Lab Tests</Link>
              <Link to="/doctors" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-[#0A1A45] py-2 border-b border-slate-100">Doctors</Link>
              <Link to="/how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-[#0A1A45] py-2 border-b border-slate-100">How It Works</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-[#0A1A45] py-2 border-b border-slate-100">About Us</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-[#0A1A45] py-2 border-b border-slate-100">Contact Us</Link>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
              <a href={`${config.APP_URL}/login`} className="w-full py-3 text-center text-base font-bold text-[#0A1A45] rounded-xl bg-slate-50">Login</a>
              <a href={`${config.APP_URL}/signup`} className="w-full py-3 text-center text-base font-bold text-white rounded-xl health-gradient shadow-md">Get Started</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
