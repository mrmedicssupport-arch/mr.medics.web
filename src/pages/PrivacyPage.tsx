import { config } from '../config';
import { Shield, Lock, FileText, Phone, Mail, MapPin, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPage() {
  return (
    <div className="bg-[#F2F7FF] min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100">
        
        {/* Header */}
        <div className="border-b border-slate-100 pb-8 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1769E0] text-xs font-bold mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>DPDP Act 2023 Compliant</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A1A45] mb-3">Privacy Policy</h1>
          <p className="text-xs text-[#475569]">
            Last Updated: November 2026 • Effective for all users of {config.BRAND_NAME}
          </p>
        </div>

        {/* Emergency Disclaimer Banner */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl mb-8 flex items-start gap-3 text-xs text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Important Medical Disclaimer:</strong> {config.BRAND_NAME} is a digital healthcare enablement and coordination platform. We do not provide acute emergency medical services. In any acute medical emergency, chest pain, difficulty breathing, trauma, or severe distress, please dial <strong>112</strong> immediately or reach the nearest emergency hospital.
          </p>
        </div>

        {/* Policy Content */}
        <div className="space-y-8 text-sm text-[#475569] leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-[#0A1A45] mb-2">1. Overview & Commitment</h2>
            <p>
              {config.BRAND_NAME} ("we", "us", or "our"), operating from {config.ADDRESS}, is committed to safeguarding the privacy and confidentiality of our patients, doctors, and visitors. This Privacy Policy details how we collect, process, store, and protect your digital health information and personal data under the <strong>Digital Personal Data Protection Act 2023 (DPDP Act)</strong> of India and applicable telemedicine and electronic health guidelines.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0A1A45] mb-2">2. Information We Collect</h2>
            <p className="mb-2">To provide teleconsultations, laboratory bookings, medicine deliveries, and AI health assistance, we may collect:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Contact Information:</strong> Full name, 10-digit mobile phone number, email address, and home delivery address.</li>
              <li><strong>Health & Medical Records:</strong> Symptoms described, consultation notes, prescription files, uploaded lab reports, and doctor feedback.</li>
              <li><strong>Account Credentials:</strong> Secure authentication tokens managed via Firebase Authentication (Google Identity Platform). Passwords are never stored in plaintext.</li>
              <li><strong>Technical Data:</strong> Device operating system, browser type, IP address, and anonymized diagnostic data necessary to preserve platform security.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0A1A45] mb-2">3. How We Use Your Data</h2>
            <p className="mb-2">Your personal and medical information is processed strictly for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Facilitating direct communication with verified medical practitioners and certified NABL diagnostic laboratories.</li>
              <li>Processing doorstep delivery of prescribed medicines through licensed retail partner pharmacies.</li>
              <li>Providing instant pre-consultation symptom assessments via our AI symptom guidance tool.</li>
              <li>Sending appointment alerts, order dispatch notifications, and secure digital invoices via WhatsApp and SMS.</li>
              <li>Fulfilling legal, tax, and healthcare compliance obligations under Indian law.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0A1A45] mb-2">4. Third-Party Infrastructure & Google Cloud Processing</h2>
            <p>
              We utilize secure cloud infrastructure provided by Google Cloud Platform (Firebase) hosted in India-compliant regions. Data in transit is secured using Transport Layer Security (TLS 1.3), and static data is encrypted using AES-256 standards. We do not sell, rent, or monetize your personal or health data to advertisers or third-party marketers under any circumstances.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0A1A45] mb-2">5. Data Retention & Storage</h2>
            <p>
              Patient health records and consultation records are stored securely in accordance with the National Medical Commission Telemedicine Practice Guidelines and retained for the statutory medical record retention duration. Users may request archival or deletion of voluntary inquiries at any time.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0A1A45] mb-2">6. Your Rights Under DPDP Act 2023</h2>
            <p className="mb-2">Under the Indian Digital Personal Data Protection Act, you possess the following rights:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Right to Access:</strong> You can request a summary of the personal health data processed by {config.BRAND_NAME}.</li>
              <li><strong>Right to Correction & Erasure:</strong> You can update inaccurate data or request deletion of personal information subject to medical retention statutes.</li>
              <li><strong>Right of Grievance Redressal:</strong> You can lodge inquiries or grievances regarding data handling with our Data Protection Officer.</li>
              <li><strong>Right to Nominate:</strong> You have the right to nominate an individual to exercise your privacy rights in the event of death or incapacity.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0A1A45] mb-2">7. Medical Disclaimer</h2>
            <p>
              The {config.BRAND_NAME} informational content provides educational suggestions only. They do not constitute formal medical diagnosis, clinical prognosis, or prescription therapy. Always seek the advice of your qualified physician or healthcare provider with any questions you may have regarding a medical condition.
            </p>
          </section>

          <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h2 className="text-base font-bold text-[#0A1A45] mb-3">8. Grievance Officer & Contact Information</h2>
            <p className="text-xs mb-3">
              For any questions regarding this Privacy Policy, your rights, or data protection practices, please contact:
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
            Read Terms of Service →
          </Link>
          <Link to="/" className="text-[#475569] hover:text-[#0A1A45] font-semibold">
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
