import { config } from '../config';
import { FileCheck, AlertTriangle, ShieldAlert, Scale, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsPage() {
  return (
    <div className="bg-[#F2F7FF] min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100">
        
        {/* Header */}
        <div className="border-b border-slate-100 pb-8 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1769E0] text-xs font-bold mb-3">
            <Scale className="w-3.5 h-3.5" />
            <span>Governing Law: India</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A1A45] mb-3">Terms of Service</h1>
          <p className="text-xs text-[#475569]">
            Last Updated: November 2026 • Welcome to {config.BRAND_NAME}
          </p>
        </div>

        {/* Emergency Notice */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl mb-8 flex items-start gap-3 text-xs text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Emergency Care Disclaimer:</strong> {config.BRAND_NAME} is NOT an emergency response provider. If you or a family member is facing life-threatening distress, severe chest discomfort, uncontrolled bleeding, poisoning, or acute respiratory distress, please call <strong>112</strong> or proceed to the closest emergency room immediately.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-sm text-[#475569] leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-[#0A1A45] mb-2">1. Agreement to Terms</h2>
            <p>
              These Terms of Service constitute a legally binding agreement between you and <strong>{config.BRAND_NAME}</strong>, having its operating address at {config.ADDRESS}. By accessing our website, booking doctor consultations, scheduling laboratory tests, ordering pharmaceutical products, or utilizing our AI symptom checker, you acknowledge that you have read, understood, and agreed to these terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0A1A45] mb-2">2. Nature of Services & Facilitation</h2>
            <p className="mb-2">
              {config.BRAND_NAME} operates as an integrated digital healthcare facilitator and coordination platform connecting patients with:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Independent Registered Medical Practitioners:</strong> Licensed physicians practicing under the National Medical Commission (NMC) Telemedicine Practice Guidelines.</li>
              <li><strong>Certified Diagnostic Laboratories:</strong> Independent NABL-accredited diagnostic centers responsible for pathology sample analysis and verified reporting.</li>
              <li><strong>Licensed Retail Pharmacies:</strong> Licensed chemists and dispensaries who dispense verified, schedule-compliant medicines based on valid doctor prescriptions.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0A1A45] mb-2">3. Teleconsultations & Doctor-Patient Relationship</h2>
            <p>
              Teleconsultations facilitated via audio, video, or chat are subject to the professional discretion of the consulting physician. If the doctor determines that an in-person physical examination is medically required, you must follow the practitioner's advice and schedule an in-clinic visit. Doctors maintain independent medical liability for their clinical opinions and prescribed regimens.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0A1A45] mb-2">4. AI Health Guidance</h2>
            <p>
              Our AI symptom checker tool is powered by computational clinical algorithms designed solely for preliminary health awareness and triage education. It does not generate medical diagnoses or recommend prescription pharmaceuticals. Reliance on any algorithmic information is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0A1A45] mb-2">5. Payments, Cancellations & Refund Policy</h2>
            <div className="space-y-2">
              <p>
                <strong>Consultations:</strong> Full refunds will be credited if a scheduled doctor consultation is cancelled at least 2 hours before the appointment slot or if the doctor is unable to attend.
              </p>
              <p>
                <strong>Lab Tests:</strong> Full refunds are provided if a home collection request is cancelled before the phlebotomist is dispatched, or if a sample is compromised during transit and cannot be analyzed.
              </p>
              <p>
                <strong>Medicines:</strong> Prescribed medicines in sealed condition can be returned within 48 hours of doorstep delivery in case of damaged packaging or incorrect items delivered.
              </p>
              <p>
                Refunds are processed to the original payment source within 5–7 business days.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0A1A45] mb-2">6. User Responsibilities & Accurate Information</h2>
            <p>
              You agree to provide true, current, and complete health history, allergies, current medications, and contact information. You may not misrepresent identity or use prescription drugs without a genuine doctor's prescription.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0A1A45] mb-2">7. Governing Law & Dispute Resolution</h2>
            <p>
              These Terms are governed by and construed in accordance with the substantive laws of the Republic of India. Any legal dispute, controversy, or claim arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts in <strong>Gautam Buddha Nagar (Noida), Uttar Pradesh, India</strong>.
            </p>
          </section>

          <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h2 className="text-base font-bold text-[#0A1A45] mb-3">8. Contact Us Regarding Terms</h2>
            <p className="text-xs mb-3">
              If you have any questions or concerns regarding our terms or service agreements:
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
          <Link to="/privacy" className="text-[#1769E0] font-bold hover:underline">
            ← Read Privacy Policy
          </Link>
          <Link to="/" className="text-[#475569] hover:text-[#0A1A45] font-semibold">
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
