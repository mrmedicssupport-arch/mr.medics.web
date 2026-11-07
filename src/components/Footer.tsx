import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { config } from '../config';

export default function Footer() {
  return (
    <footer className="bg-[#0A1A45] text-[#CBD5E1] pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 lg:pb-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 pb-10 md:pb-16 border-b border-slate-800">
          
          {/* Col 1: Brand & Contact Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block bg-white px-3.5 py-2 rounded-2xl mb-4 shadow-xl border border-slate-200 hover:scale-105 transition-all">
              <img 
                src="/assets/aistudio/file_000000003e70821192f55344a196d9e8_50f4da26.png" 
                alt="Mr Medics - Health Beyond Border" 
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white font-medium border border-slate-600 transition"
              >
                <Phone className="w-3.5 h-3.5 text-[#1769E0]" />
                <span>Call: {config.PHONE}</span>
              </a>
              <a 
                href={`https://wa.me/${config.WHATSAPP_NUMBER}?text=Hello%20Mr%20Medics,%20I%20need%20assistance`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-xs text-emerald-300 font-medium border border-[#25D366]/30 transition"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            </div>

            <p className="text-xs text-[#CBD5E1] mb-1">Founder & CEO: Praveen Verma</p>
            <p className="text-xs text-[#CBD5E1] flex items-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#94A3B8] shrink-0 mt-0.5" />
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
                <li><Link to="/services/medicines" className="hover:text-white transition-colors py-1 inline-block">Online Pharmacy</Link></li>
                <li><Link to="/services/ai-symptom-checker" className="hover:text-white transition-colors py-1 inline-block">Symptom Checker</Link></li>
                <li><Link to="/services/health-records" className="hover:text-white transition-colors py-1 inline-block">Health Records</Link></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-sm md:text-base mb-3 md:mb-6">Company & Help</h4>
              <ul className="space-y-2.5 text-xs md:text-sm">
                <li><Link to="/about" className="hover:text-white transition-colors py-1 inline-block">About Us</Link></li>
                <li><Link to="/doctors" className="hover:text-white transition-colors py-1 inline-block">Find Doctors</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white transition-colors py-1 inline-block">How It Works</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors py-1 inline-block">FAQs</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors py-1 inline-block">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          {/* Col 4: Chat on WhatsApp instead of fake newsletter */}
          <div className="md:col-span-2 lg:col-span-1">
            <h4 className="text-white font-bold text-sm md:text-base mb-3 md:mb-6">Direct Support</h4>
            <p className="text-xs text-[#CBD5E1] mb-4">Have questions about appointments, tests, or medicines? Chat directly with our team.</p>
            <a 
              href={`https://wa.me/${config.WHATSAPP_NUMBER}?text=Hello%20Mr%20Medics%20Support,%20I%20have%20an%20inquiry.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs md:text-sm font-bold shadow-md flex items-center justify-center gap-2 transition active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p className="text-center md:text-left text-[11px] md:text-xs">
            Medical Disclaimer: Mr Medics does not provide emergency care and our symptom checker is not a diagnosis. In an emergency, call 112 or visit the nearest hospital.
          </p>
          <div className="flex gap-4 sm:gap-6 whitespace-nowrap text-[11px] md:text-xs">
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
