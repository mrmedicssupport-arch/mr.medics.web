import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Moon, Sun, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header({ language, toggleLanguage, darkMode, toggleDarkMode }: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[--card-bg] shadow-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 mr-8 whitespace-nowrap shrink-0">
          <div className="bg-white p-1 rounded-xl flex items-center">
            <img 
              src="/assets/aistudio/file_000000003e70821192f55344a196d9e8_50f4da26.png" 
              alt="Mrmedics Logo" 
              className="h-10 w-auto object-contain"
            />
          </div>
        </Link>
        <div className="hidden 1100px:flex items-center gap-7 text-[15px] font-medium text-[--text-main]">
          <Link to="/" className="hover:text-primary transition-colors whitespace-nowrap shrink-0">Home</Link>
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-primary transition-colors whitespace-nowrap shrink-0">
              Services <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full left-0 w-64 bg-[--card-bg] shadow-xl rounded-xl p-4 opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible border border-slate-100 dark:border-slate-700">
              <Link to="/services/doctor-consultation" className="block p-2 hover:bg-[--bg-main] rounded">Doctor Consultation</Link>
              <Link to="/services/lab-tests" className="block p-2 hover:bg-[--bg-main] rounded">Lab Tests</Link>
              <Link to="/services/medicines" className="block p-2 hover:bg-[--bg-main] rounded">Medicines</Link>
              <Link to="/services/ai-symptom-checker" className="block p-2 hover:bg-[--bg-main] rounded">AI Symptom Checker</Link>
            </div>
          </div>
          <Link to="/lab-tests" className="hover:text-primary transition-colors whitespace-nowrap shrink-0">Lab Tests</Link>
          <Link to="/doctors" className="hover:text-primary transition-colors whitespace-nowrap shrink-0">Doctors</Link>
          <Link to="/about" className="hover:text-primary transition-colors whitespace-nowrap shrink-0">About Us</Link>
          <Link to="/contact" className="hover:text-primary transition-colors whitespace-nowrap shrink-0">Contact Us</Link>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <button onClick={toggleLanguage} className="text-[--text-main]"><Globe className="w-5 h-5" /></button>
          <button onClick={toggleDarkMode} className="text-[--text-main]">{darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
          <a href="#" className="text-[--text-main] whitespace-nowrap">Login</a>
          <a href="#" className="bg-gradient-to-r from-primary to-teal text-white px-5 py-2 rounded-full font-semibold hover:shadow-lg transition whitespace-nowrap">Get Started</a>
        </div>
      </nav>
    </header>
  );
}
