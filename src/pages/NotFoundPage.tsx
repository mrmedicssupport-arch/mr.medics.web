import { Link } from 'react-router-dom';
import { Home, Stethoscope, FlaskConical, Pill, ArrowLeft, HelpCircle } from 'lucide-react';
import { config } from '../config';

export default function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#F2F7FF]">
      <div className="max-w-lg w-full bg-white rounded-3xl p-8 sm:p-12 text-center shadow-xl border border-slate-100">
        
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-50 text-[#1769E0] mb-6 font-black text-3xl">
          404
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A1A45] mb-2">Page Not Found</h1>
        <p className="text-sm text-[#475569] mb-8 leading-relaxed">
          The healthcare page or resource you are looking for doesn't exist or has moved. Explore our core medical services below.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-8 text-left">
          <Link
            to="/services/doctor-consultation"
            className="p-3.5 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/40 transition group"
          >
            <Stethoscope className="w-4 h-4 text-[#1769E0] mb-1.5 group-hover:scale-110 transition" />
            <p className="text-xs font-bold text-[#0A1A45]">Consult Doctor</p>
            <p className="text-[11px] text-[#64748B]">Video & In-Clinic</p>
          </Link>

          <Link
            to="/services/lab-tests"
            className="p-3.5 rounded-xl border border-slate-100 hover:border-teal-200 hover:bg-teal-50/40 transition group"
          >
            <FlaskConical className="w-4 h-4 text-[#0FB5A0] mb-1.5 group-hover:scale-110 transition" />
            <p className="text-xs font-bold text-[#0A1A45]">Lab Tests</p>
            <p className="text-[11px] text-[#64748B]">Home sample pickup</p>
          </Link>

          <Link
            to="/services/medicines"
            className="p-3.5 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/40 transition group"
          >
            <Pill className="w-4 h-4 text-indigo-600 mb-1.5 group-hover:scale-110 transition" />
            <p className="text-xs font-bold text-[#0A1A45]">Medicines</p>
            <p className="text-[11px] text-[#64748B]">Doorstep delivery</p>
          </Link>

          <Link
            to="/faq"
            className="p-3.5 rounded-xl border border-slate-100 hover:border-sky-200 hover:bg-sky-50/40 transition group"
          >
            <HelpCircle className="w-4 h-4 text-sky-600 mb-1.5 group-hover:scale-110 transition" />
            <p className="text-xs font-bold text-[#0A1A45]">Help & FAQs</p>
            <p className="text-[11px] text-[#64748B]">Common questions</p>
          </Link>
        </div>

        <Link
          to="/"
          className="w-full py-3.5 px-6 rounded-xl health-gradient text-white font-bold text-sm shadow-md hover:shadow-lg transition inline-flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>

      </div>
    </div>
  );
}
