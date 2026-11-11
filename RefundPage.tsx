import { config } from '../config';
import { RotateCcw, AlertTriangle, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RefundPage() {
  return (
    <div className="bg-[#F2F7FF] min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100">
        
        {/* Header */}
        <div className="border-b border-slate-100 pb-8 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1769E0] text-xs font-bold mb-3">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Fair & Transparent Policy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A1A45] mb-3">Cancellation & Refund Policy</h1>
          <p className="text-xs text-[#475569]">
            Last Updated: November 2026 • Applicable to all bookings on {config.BRAND_NAME}
          </p>
        </div>

        {/* Emergency Notice */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl mb-8 flex items-start gap-3 text-xs text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Emergency Disclaimer:</strong> Mr Medics does not provide emergency services. In an emergency call 112 or visit the nearest hospital.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-sm text-[#475569] leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-[#0A1A45] mb-2">1. Overview</h2>
            <p>
              At {config.BRAND_NAME}, we strive to provide seamless teleconsultations, NABL laboratory tests, and medicine deliveries. We maintain a transparent cancellation and refund policy to protect our patients while ensuring fair compensation for our medical practitioners and diagnostic partners.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0A1A45] mb-2">2. Doctor Consultations</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Full Refund:</strong> Cancellations made at least 2 hours prior to the scheduled consultation slot or if the consulting doctor is unavailable.</li>
              <li><strong>No Refund:</strong> Cancellations made less than 2 hours before the consultation slot or failure to join the video room within 15 minutes of appointment start time.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0A1A45] mb-2">3. Laboratory Tests & Home Sample Collection</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Full Refund:</strong> Cancellations made before the phlebotomist is dispatched to your address, or if a sample is compromised during laboratory transit.</li>
              <li><strong>Non-Refundable:</strong> Once the phlebotomist arrives at your location and sample collection commences.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0A1A45] mb-2">4. Medicine Deliveries</h2>
            <p>
              Prescription medicines in sealed, tamper-proof packaging can be returned within 48 hours of delivery in case of incorrect items, damaged packaging, or near-expiry batches. Refunds are credited within 5-7 business days to the original source.
            </p>
          </section>

          <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h2 className="text-base font-bold text-[#0A1A45] mb-3">5. Refund Contact & Support</h2>
            <p className="text-xs mb-3">
              For any refund requests or queries, please contact our support desk:
            </p>
            <div className="space-y-1.5 text-xs text-[#0A1A45]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#1769E0]" />
                <span>{config.ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#1769E0]" />
                <span>{config.EMAIL}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#1769E0]" />
                <span>{config.PHONE}</span>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between text-xs">
          <Link to="/terms" className="text-[#1769E0] font-bold hover:underline">
            ← Terms of Service
          </Link>
          <Link to="/" className="text-[#475569] hover:text-[#0A1A45] font-semibold">
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
