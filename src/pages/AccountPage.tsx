import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { config } from '../config';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  LogOut, 
  ShieldCheck, 
  Stethoscope, 
  FlaskConical, 
  Pill, 
  Sparkles, 
  MessageSquare, 
  ExternalLink,
  ChevronRight,
  Clock
} from 'lucide-react';

export default function AccountPage() {
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{
    name?: string;
    phone?: string;
    role?: string;
    status?: string;
    walletBalance?: number;
  } | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function loadUserProfile() {
      if (!user) {
        setFetching(false);
        return;
      }
      try {
        setFetching(true);
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProfile(snap.data() as any);
        }
      } catch (err) {
        console.warn('Could not load user profile document:', err);
      } finally {
        setFetching(false);
      }
    }
    if (!authLoading) {
      loadUserProfile();
    }
  }, [user, authLoading]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Loading Skeleton State
  if (authLoading || (user && fetching)) {
    return (
      <div className="min-h-[85vh] bg-[#F2F7FF] py-10 px-4 sm:px-6 animate-pulse">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header Skeleton */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-200 shrink-0" />
              <div className="space-y-2">
                <div className="h-6 w-48 bg-slate-200 rounded-lg" />
                <div className="h-4 w-64 bg-slate-200 rounded-lg" />
              </div>
            </div>
            <div className="h-10 w-28 bg-slate-200 rounded-xl hidden sm:block" />
          </div>

          {/* Quick Actions Skeleton */}
          <div>
            <div className="h-4 w-40 bg-slate-200 rounded mb-3" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 h-40 flex flex-col justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 mb-3" />
                  <div className="space-y-2">
                    <div className="h-4 w-3/4 bg-slate-200 rounded" />
                    <div className="h-3 w-full bg-slate-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Grid Skeleton */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-200 rounded-3xl h-64" />
            <div className="bg-white rounded-3xl p-7 border border-slate-100 h-64 space-y-4">
              <div className="h-5 w-48 bg-slate-200 rounded" />
              <div className="h-4 w-full bg-slate-200 rounded" />
              <div className="h-4 w-5/6 bg-slate-200 rounded" />
              <div className="h-4 w-2/3 bg-slate-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#F2F7FF]">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center shadow-xl border border-slate-100">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-[#1769E0] flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-[#0A1A45] mb-2">Sign in to Your Account</h2>
          <p className="text-sm text-[#475569] mb-6">
            Access your patient profile, book priority consultations, and manage orders with {config.BRAND_NAME}.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/login"
              className="flex-1 py-3 px-4 rounded-xl health-gradient text-white font-bold text-sm shadow-md hover:shadow-lg transition text-center"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-[#0A1A45] hover:bg-slate-50 font-bold text-sm transition text-center"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const displayName = profile?.name || user.displayName || user.email?.split('@')[0] || 'Patient';
  const displayPhone = profile?.phone || user.phoneNumber || 'Not linked';

  return (
    <div className="min-h-[85vh] bg-[#F2F7FF] py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0A1A45] to-[#1769E0] text-white flex items-center justify-center text-2xl font-black shadow-md shrink-0">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-extrabold text-[#0A1A45]">{displayName}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Verified Patient
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#475569] mt-1.5">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {user.email}
                </span>
                {displayPhone !== 'Not linked' && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    +91 {displayPhone}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold flex items-center gap-2 transition cursor-pointer self-stretch md:self-auto justify-center"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Quick Health Actions Grid */}
        <div>
          <h2 className="text-sm font-bold text-[#0A1A45] uppercase tracking-wider mb-3">Healthcare Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/services/doctor-consultation"
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1769E0] flex items-center justify-center mb-3 group-hover:scale-110 transition">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#0A1A45] mb-1">Doctor Consultation</h3>
                <p className="text-xs text-[#475569]">Connect with general physicians and specialists via video or in-clinic.</p>
              </div>
              <div className="mt-4 flex items-center text-xs font-bold text-[#1769E0] gap-1">
                <span>Book Doctor</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              to="/services/lab-tests"
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-teal-200 transition group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0FB5A0] flex items-center justify-center mb-3 group-hover:scale-110 transition">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#0A1A45] mb-1">Book Lab Tests</h3>
                <p className="text-xs text-[#475569]">NABL accredited labs with free home sample collection in Noida & Delhi NCR.</p>
              </div>
              <div className="mt-4 flex items-center text-xs font-bold text-[#0FB5A0] gap-1">
                <span>Book Test</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              to="/services/medicines"
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-110 transition">
                  <Pill className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#0A1A45] mb-1">Order Medicines</h3>
                <p className="text-xs text-[#475569]">100% genuine medicines delivered with cold-chain tracking.</p>
              </div>
              <div className="mt-4 flex items-center text-xs font-bold text-indigo-600 gap-1">
                <span>Order Now</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </div>

        {/* Support & Hub Card */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-[#0A1A45] to-[#122b68] rounded-3xl p-6 sm:p-7 text-white flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold mb-4">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>24/7 Priority Care Coordinator</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Direct Patient Assistance</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Have an urgent prescription query, lab report question, or want to schedule home nursing? Connect directly with our clinical coordinators in Noida Sector 62.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/${config.WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Hello Mr Medics Team,\nI am signed in as ${displayName} (${user.email}). I need assistance with my healthcare.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href={`tel:${config.PHONE}`}
                className="py-2.5 px-4 bg-white/15 hover:bg-white/20 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <Phone className="w-4 h-4" />
                <span>Call {config.PHONE}</span>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-[#0A1A45] mb-2">Digital Health Records & Compliance</h3>
              <p className="text-xs text-[#475569] leading-relaxed mb-4">
                Your medical consultations and orders are encrypted and stored in strict accordance with the Digital Personal Data Protection Act 2023 (DPDP Act).
              </p>
              <ul className="text-xs text-[#475569] space-y-2 mb-4">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>256-bit encryption for electronic health records</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Right to access, rectify, and delete personal data</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Noida Sector 62, Uttar Pradesh operating headquarters</span>
                </li>
              </ul>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-slate-100 text-xs">
              <Link to="/privacy" className="text-[#1769E0] font-semibold hover:underline">
                Privacy Policy
              </Link>
              <span className="text-slate-300">•</span>
              <Link to="/terms" className="text-[#1769E0] font-semibold hover:underline">
                Terms of Service
              </Link>
              {config.APP_URL && (
                <>
                  <span className="text-slate-300">•</span>
                  <a href={config.APP_URL} target="_blank" rel="noopener noreferrer" className="text-[#1769E0] font-semibold hover:underline flex items-center gap-1">
                    <span>Web Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
