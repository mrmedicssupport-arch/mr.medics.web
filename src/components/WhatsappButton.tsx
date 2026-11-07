import { MessageCircle } from 'lucide-react';
import { config } from '../config';

export default function WhatsappButton() {
  const whatsappUrl = `https://wa.me/${config.WHATSAPP_NUMBER}?text=Hello%20Mrmedics,%20I%20would%20like%20to%20know%20more%20about%20your%20services.`;

  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="hidden md:flex fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl items-center justify-center hover:scale-110 active:scale-95 transition-all group"
    >
      <MessageCircle className="w-8 h-8 fill-current" />
      <span className="absolute right-full mr-3 bg-white text-[#0A1A45] text-xs font-bold px-3 py-1.5 rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat with Founder
      </span>
    </a>
  );
}
