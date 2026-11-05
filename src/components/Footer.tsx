import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { config } from '../config';

export default function Footer() {
  return (
    <footer className="bg-[#0A1A45] text-[#CBD5E1] pt-20 pb-12">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-slate-800">
        
        {/* Col 1: Brand & Bio */}
        <div className="lg:col-span-2">
          <Link to="/" className="inline-block bg-white px-4 py-2.5 rounded-2xl mb-6 shadow-xl border border-slate-200 hover:scale-105 transition-all">
            <img 
              src="/assets/aistudio/file_000000003e70821192f55344a196d9e8_50f4da26.png" 
              alt="Mrmedics - Health Beyond Border" 
              className="h-12 sm:h-14 w-auto object-contain"
            />
          </Link>
          <p className="text-sm text-[#CBD5E1] mb-6 max-w-sm leading-relaxed">
            Your Health, Our Priority. Complete healthcare in one app — connecting patients with NMC-registered doctors, NABL labs, and licensed pharmacies.
          </p>
          <p className="text-xs text-slate-400 mb-2">Founder & CEO: Praveen Verma</p>
          <p className="text-xs text-slate-400">Location: {config.ADDRESS}</p>
        </div>

        {/* Col 2: Services */}
        <div>
          <h4 className="text-white font-bold text-base mb-6">Services</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/services/doctor-consultation" className="hover:text-white transition-colors">Doctor Consultation</Link></li>
            <li><Link to="/services/lab-tests" className="hover:text-white transition-colors">Lab Tests & Packages</Link></li>
            <li><Link to="/services/medicines" className="hover:text-white transition-colors">Online Pharmacy</Link></li>
            <li><Link to="/services/ai-symptom-checker" className="hover:text-white transition-colors">AI Symptom Checker</Link></li>
            <li><Link to="/services/health-records" className="hover:text-white transition-colors">Health Records</Link></li>
          </ul>
        </div>

        {/* Col 3: Quick Links */}
        <div>
          <h4 className="text-white font-bold text-base mb-6">Company</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/doctors" className="hover:text-white transition-colors">Find Doctors</Link></li>
            <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
            <li><Link to="/for-partners" className="hover:text-white transition-colors">Partner With Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Col 4: Newsletter & Legal */}
        <div>
          <h4 className="text-white font-bold text-base mb-6">Stay Updated</h4>
          <p className="text-xs text-[#CBD5E1] mb-4">Subscribe to our health tips and wellness updates.</p>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
            />
            <button type="submit" className="w-full py-2.5 rounded-xl health-gradient text-white text-sm font-bold shadow-md">
              Subscribe
            </button>
          </form>
        </div>

      </div>

      <div className="max-w-[1200px] mx-auto px-6 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <p className="text-center md:text-left">
          Medical Disclaimer: Mrmedics does not replace emergency care. In an emergency, call your local emergency number immediately.
        </p>
        <div className="flex gap-6 whitespace-nowrap">
          <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link to="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
        </div>
      </div>
    </footer>
  );
}
