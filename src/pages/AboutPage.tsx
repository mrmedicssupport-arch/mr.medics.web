import { config } from '../config';
import FounderSection from '../components/FounderSection';
import StatsBand from '../components/StatsBand';
import { ShieldCheck, HeartPulse, Stethoscope, FlaskConical, Pill, CheckCircle2, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="bg-[#F2F7FF] min-h-screen">
      
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-[#F2F7FF] border-b border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1769E0] text-xs font-bold mb-4">
            <HeartPulse className="w-4 h-4 text-[#0FB5A0]" />
            <span>Health Beyond Border</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0A1A45] tracking-tight mb-4">
            About {config.BRAND_NAME}
          </h1>
          <p className="text-base sm:text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed">
            Delivering accessible, reliable, and integrated digital healthcare across India from our clinical operations center in Noida Sector 62, Uttar Pradesh.
          </p>
        </div>
      </section>

      {/* Core Mission Section */}
      <section className="py-12 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center bg-white p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-sm">
          <div>
            <span className="text-xs font-bold text-[#1769E0] uppercase tracking-wider">Our Mission</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A1A45] mt-1 mb-4">
              Healthcare Without Geographical Friction
            </h2>
            <p className="text-sm text-[#475569] leading-relaxed mb-4">
              At {config.BRAND_NAME}, our mission is to eliminate healthcare barriers by combining trusted clinicians, certified pathology networks, genuine pharmaceutical delivery, and helpful AI clinical tools into one transparent ecosystem.
            </p>
            <p className="text-sm text-[#475569] leading-relaxed">
              Whether you are consulting from Noida, Delhi NCR, or remote towns across India, {config.BRAND_NAME} ensures verified medical expertise is always one click away.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#F2F7FF] p-5 rounded-2xl border border-blue-50">
              <Stethoscope className="w-8 h-8 text-[#1769E0] mb-2" />
              <h3 className="font-bold text-sm text-[#0A1A45]">Verified Doctors</h3>
              <p className="text-xs text-[#475569] mt-1">Licensed specialists practicing NMC telemedicine guidelines.</p>
            </div>
            <div className="bg-[#F2F7FF] p-5 rounded-2xl border border-teal-50">
              <FlaskConical className="w-8 h-8 text-[#0FB5A0] mb-2" />
              <h3 className="font-bold text-sm text-[#0A1A45]">NABL Lab Tests</h3>
              <p className="text-xs text-[#475569] mt-1">Painless home sample collection and digital reports.</p>
            </div>
            <div className="bg-[#F2F7FF] p-5 rounded-2xl border border-indigo-50">
              <Pill className="w-8 h-8 text-indigo-600 mb-2" />
              <h3 className="font-bold text-sm text-[#0A1A45]">Genuine Medicines</h3>
              <p className="text-xs text-[#475569] mt-1">Dispensed by licensed pharmacies with batch verification.</p>
            </div>
            <div className="bg-[#F2F7FF] p-5 rounded-2xl border border-sky-50">
              <ShieldCheck className="w-8 h-8 text-sky-600 mb-2" />
              <h3 className="font-bold text-sm text-[#0A1A45]">DPDP Compliant</h3>
              <p className="text-xs text-[#475569] mt-1">Complete encryption and privacy for medical records.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Stats */}
      <StatsBand />

      {/* Founder Section */}
      <FounderSection />

      {/* Headquarters and Contact Banner */}
      <section className="py-12 px-4 sm:px-6 max-w-4xl mx-auto mb-12">
        <div className="bg-[#0A1A45] text-white p-8 sm:p-10 rounded-3xl text-center">
          <h2 className="text-2xl font-bold mb-2">Visit Our Operations Hub</h2>
          <p className="text-xs text-slate-300 max-w-lg mx-auto mb-6">
            Our central coordination and patient support center is based in Noida Sector 62. Feel free to connect directly with our care coordinators.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>{config.ADDRESS}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>{config.PHONE}</span>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-3">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition"
            >
              Contact Support
            </Link>
            <Link
              to="/doctors"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition"
            >
              View Specialists
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
