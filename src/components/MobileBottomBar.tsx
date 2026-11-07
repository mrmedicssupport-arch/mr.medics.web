import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { config } from '../config';

export default function MobileBottomBar() {
  const whatsappUrl = `https://wa.me/${config.WHATSAPP_NUMBER}?text=Hello%20Mr%20Medics,%20I%20would%20like%20to%20know%20more%20about%20your%20services.`;

  return (
    <aside 
      aria-label="Quick mobile contact actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(10,26,69,0.08)] pb-safe"
    >
      <div className="h-[56px] px-3 flex items-center justify-between gap-2 max-w-md mx-auto">
        {/* Call Action */}
        <a 
          href={`tel:${config.PHONE}`}
          className="flex-1 min-h-[44px] px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0A1A45] flex items-center justify-center gap-1.5 text-xs font-bold transition-all active:scale-95"
        >
          <Phone className="w-4 h-4 text-[#1769E0]" />
          <span>Call</span>
        </a>

        {/* WhatsApp Action */}
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[44px] px-2 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] flex items-center justify-center gap-1.5 text-xs font-bold transition-all active:scale-95 border border-[#25D366]/30"
        >
          <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
          <span>WhatsApp</span>
        </a>

        {/* Book / Get Started CTA */}
        <Link 
          to="/signup"
          className="flex-[1.4] min-h-[44px] px-3 rounded-xl health-gradient text-white flex items-center justify-center gap-1.5 text-xs font-bold shadow-md shadow-blue-500/20 transition-all active:scale-95"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Consult</span>
        </Link>
      </div>
    </aside>
  );
}
