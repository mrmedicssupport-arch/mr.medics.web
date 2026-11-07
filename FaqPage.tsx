import FaqSection from '../components/FaqSection';
import { HelpCircle } from 'lucide-react';
import { config } from '../config';

export default function FaqPage() {
  return (
    <div className="bg-[#F2F7FF] min-h-screen">
      <div className="pt-8 sm:pt-12">
        <FaqSection 
          title={`Frequently Asked Questions | ${config.BRAND_NAME}`}
          subtitle="Everything you need to know about online doctor consultations, NABL lab tests, authentic medicine delivery, and patient data safety."
        />
      </div>
    </div>
  );
}
