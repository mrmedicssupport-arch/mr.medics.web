import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { config } from '../config';

export default function Footer() {
  return (
    <footer className="bg-[#0A1A45] text-[#CBD5E1] pt-10 md:pt-20 pb-8 md:pb-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 pb-10 md:pb-16 border-b border-slate-800">
          
          {/* Col 1: Brand & Contact Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block bg-white px-3.5 py-2 rounded-2xl mb-4 shadow-xl border border-slate-200 hover:scale-105 transition-all">
              <img 
                src="/assets/aistudio/file_000000003e70821192f55344a196d9e8_50f4da26.png" 
                alt="Mrmedics - Health Beyond Border" 
                className="h-10 sm:h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-[#CBD5E1] mb-4 max-w-sm leading-relaxed">
              Your Health, Our Priority. Complete healthcare in one app — connecting patients with NMC-registered doctors, NABL labs, and licensed pharmacies.
            </p>
            
            {/* Quick Contact Chips on Mobile & Desktop */}
            <div className="flex flex-wrap gap-2.5 mb-4">
              <a 
                href={`tel:${config.PHONE}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs text-white font-medium border border-slate-700 transition"
              >
                <Phone className="w-3.5 h-3.5 text-[#1769E0]" />
                <span>Call: {config.PHONE}</span>
              </a>
              <a 
                href={`https://wa.me/${config.WHATSAPP_NUMBER.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-xs text-emerald-300 font-medium border border-[#25D366]/30 transition"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            </div>

            <p className="text-xs text-slate-400 mb-1">Founder & CEO: Praveen Verma</p>
            <p className="text-xs text-slate-400 flex items-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>Location: {config.ADDRESS}</span>
            </p>
          </div>

          {/* Col 2 & 3: Compact 2-column on mobile */}
          <div className="grid grid-cols-2 gap-6 lg:contents">
            {/* Services */}
            <div>
              <h4 className="text-white font-bold text-sm md:text-base mb-3 md:mb-6">Services</h4>
              <ul className="space-y-2.5 text-xs md:text-sm">
                <li><Link to="/services/doctor-consultation" className="hover:text-white transition-colors py-1 inline-block">Consult Doctors</Link></li>
                <li><Link to="/services/lab-tests" className="hover:text-white transition-colors py-1 inline-block">Lab Tests</Link></li>
                <li><Link to="/services/medicines" className="hover:text-white transition-colors py-1 inline-block">Pharmacy</Link></li>
                <li><Link to="/services/ai-symptom-checker" className="hover:text-white transition-colors py-1 inline-block">Symptom Checker</Link></li>
                <li><Link to="/services/health-records" className="hover:text-white transition-colors py-1 inline-block">Health Records</Link></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-sm md:text-base mb-3 md:mb-6">Company</h4>
              <ul className="space-y-2.5 text-xs md:text-sm">
                <li><Link to="/about" className="hover:text-white transition-colors py-1 inline-block">About Us</Link></li>
                <li><Link to="/doctors" className="hover:text-white transition-colors py-1 inline-block">Find Doctors</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white transition-colors py-1 inline-block">How It Works</Link></li>
                <li><Link to="/for-partners" className="hover:text-white transition-colors py-1 inline-block">Partners</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors py-1 inline-block">Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div className="md:col-span-2 lg:col-span-1">
            <h4 className="text-white font-bold text-sm md:text-base mb-3 md:mb-6">Stay Updated</h4>
            <p className="text-xs text-[#CBD5E1] mb-3">Subscribe to health tips and wellness updates.</p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2.5">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
              />
              <button type="submit" className="w-full py-2.5 rounded-xl health-gradient text-white text-sm font-bold shadow-md">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p className="text-center md:text-left text-[11px] md:text-xs">
            Medical Disclaimer: Mrmedics does not replace emergency care. In an emergency, call your local emergency number immediately.
          </p>
          <div className="flex gap-4 sm:gap-6 whitespace-nowrap text-[11px] md:text-xs">
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/refund-policy" className="hover:text-white transition-colors">Refund</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
