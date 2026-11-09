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
  Clock,
  Menu,
  X,
  Home as HomeIcon,
  FileText,
  ShoppingBag,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'appointments' | 'reports' | 'orders' | 'profile'>('home');

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
      <div className="min-h-[100svh] w-full max-w-full overflow-x-hidden bg-[#F2F7FF] py-10 px-3 sm:px-4 lg:px-8 animate-pulse">
        <div className="max-w-[1200px] mx-auto space-y-6 min-w-0">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-16 h-16 rounded-2xl bg-slate-200 shrink-0" />
              <div className="space-y-2 min-w-0">
                <div className="h-6 w-48 bg-slate-200 rounded-lg" />
                <div className="h-4 w-64 bg-slate-200 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[100svh] w-full max-w-full overflow-x-hidden flex items-center justify-center px-4 py-16 bg-[#F2F7FF]">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center shadow-xl border border-slate-100 min-w-0">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-[#1769E0] flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0A1A45] mb-2 break-words">Sign in to Your Account</h2>
          <p className="text-sm text-[#475569] mb-6 break-words">
            Access your patient profile, book priority consultations, and manage orders with {config.BRAND_NAME}.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/login"
              className="flex-1 py-3.5 px-4 rounded-xl health-gradient text-white font-bold text-sm shadow-md transition text-center min-h-[44px] flex items-center justify-center"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="flex-1 py-3.5 px-4 rounded-xl border border-slate-200 text-[#0A1A45] hover:bg-slate-50 font-bold text-sm transition text-center min-h-[44px] flex items-center justify-center"
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
  const userRole = profile?.role || 'patient';

  const sidebarNavItems = [
    { id: 'home', label: 'Dashboard', icon: HomeIcon },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'reports', label: 'Lab Reports', icon: FlaskConical },
    { id: 'orders', label: 'Pharmacy Orders', icon: ShoppingBag },
    { id: 'profile', label: 'Profile & Settings', icon: User },
  ];

  return (
    <div className="min-h-[100svh] w-full max-w-full overflow-x-hidden bg-[#F2F7FF] flex flex-col relative pb-20 sm:pb-8">
      
      {/* Mobile Top Header Bar (below lg) */}
      <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-14 md:top-[76px] z-30">
        <div className="flex items-center gap-3 min-w-0">
          <button 
            onClick={() => setMobileDrawerOpen(true)}
            className="p-2 rounded-xl bg-blue-50 text-[#0A1A45] min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Open menu drawer"
          >
            <Menu className="w-5 h-5 text-[#1769E0]" />
          </button>
          <div className="min-w-0">
            <h1 className="text-base font-extrabold text-[#0A1A45] truncate">{displayName}</h1>
            <p className="text-[11px] text-[#475569] uppercase font-bold tracking-wider">{userRole} Dashboard</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl min-h-[44px] min-w-[44px] flex items-center justify-center"
          title="Sign Out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileDrawerOpen(false)}
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-y-0 left-0 w-[80%] max-w-[300px] bg-white shadow-2xl p-6 flex flex-col justify-between z-10"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl health-gradient text-white font-extrabold flex items-center justify-center shrink-0 text-base">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-[#0A1A45] truncate">{displayName}</h3>
                      <p className="text-[10px] text-[#475569] truncate">{user.email}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setMobileDrawerOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1.5">
                  {sidebarNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => { setActiveTab(item.id as any); setMobileDrawerOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition min-h-[48px] ${
                          isActive ? 'health-gradient text-white shadow-md' : 'text-[#0A1A45] hover:bg-slate-100'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <button
                onClick={() => { setMobileDrawerOpen(false); handleLogout(); }}
                className="w-full py-3 px-4 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold flex items-center justify-center gap-2 transition min-h-[44px]"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-[1200px] w-full mx-auto px-3 sm:px-4 lg:px-8 py-6 flex-1 min-w-0 flex gap-8 items-start">
        
        {/* Desktop Sidebar (lg and up) */}
        <aside className="hidden lg:block w-64 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 shrink-0 sticky top-28">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 min-w-0">
            <div className="w-12 h-12 rounded-2xl health-gradient text-white text-xl font-black flex items-center justify-center shrink-0 shadow-md">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-bold text-[#0A1A45] truncate">{displayName}</h2>
              <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#1769E0] uppercase tracking-wider">
                {userRole}
              </span>
            </div>
          </div>

          <nav className="space-y-1.5">
            {sidebarNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition min-h-[46px] cursor-pointer ${
                    isActive ? 'health-gradient text-white shadow-md' : 'text-[#0A1A45] hover:bg-blue-50/60'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <button
              onClick={handleLogout}
              className="w-full py-3 px-4 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold flex items-center justify-center gap-2 transition min-h-[44px] cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 space-y-6">
          
          {/* Profile Header Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 min-w-0">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0A1A45] to-[#1769E0] text-white flex items-center justify-center text-2xl font-black shadow-md shrink-0">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap min-w-0">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-[#0A1A45] truncate">{displayName}</h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700 flex items-center gap-1 shrink-0">
                    <ShieldCheck className="w-3 h-3" />
                    Verified {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#475569] mt-1.5 min-w-0">
                  <span className="flex items-center gap-1 truncate break-all">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    {user.email}
                  </span>
                  {displayPhone !== 'Not linked' && (
                    <span className="flex items-center gap-1 shrink-0">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      +91 {displayPhone}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="hidden md:block shrink-0">
              <button
                onClick={handleLogout}
                className="px-4 py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold flex items-center gap-2 transition cursor-pointer min-h-[44px]"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Quick Health Actions / Dashboard Section */}
          <div className="min-w-0">
            <h2 className="text-sm font-bold text-[#0A1A45] uppercase tracking-wider mb-3">Healthcare Services & Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-w-0">
              <Link
                to="/services/doctor-consultation"
                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition group flex flex-col justify-between min-w-0"
              >
                <div className="min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1769E0] flex items-center justify-center mb-3 group-hover:scale-110 transition shrink-0">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-[#0A1A45] mb-1 truncate">Doctor Consultation</h3>
                  <p className="text-xs text-[#475569] break-words">Connect with general physicians and specialists via video or in-clinic.</p>
                </div>
                <div className="mt-4 flex items-center text-xs font-bold text-[#1769E0] gap-1 shrink-0">
                  <span>Book Doctor</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              <Link
                to="/services/lab-tests"
                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-teal-200 transition group flex flex-col justify-between min-w-0"
              >
                <div className="min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0FB5A0] flex items-center justify-center mb-3 group-hover:scale-110 transition shrink-0">
                    <FlaskConical className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-[#0A1A45] mb-1 truncate">Book Lab Tests</h3>
                  <p className="text-xs text-[#475569] break-words">NABL accredited labs with free home sample collection in Noida & Delhi NCR.</p>
                </div>
                <div className="mt-4 flex items-center text-xs font-bold text-[#0FB5A0] gap-1 shrink-0">
                  <span>Book Test</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              <Link
                to="/services/medicines"
                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition group flex flex-col justify-between min-w-0 sm:col-span-2 lg:col-span-1"
              >
                <div className="min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-110 transition shrink-0">
                    <Pill className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-[#0A1A45] mb-1 truncate">Order Medicines</h3>
                  <p className="text-xs text-[#475569] break-words">100% genuine medicines delivered with cold-chain tracking.</p>
                </div>
                <div className="mt-4 flex items-center text-xs font-bold text-indigo-600 gap-1 shrink-0">
                  <span>Order Now</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </div>

          {/* Support & Hub Cards */}
          <div className="grid md:grid-cols-2 gap-4 min-w-0">
            <div className="bg-gradient-to-br from-[#0A1A45] to-[#122b68] rounded-3xl p-6 sm:p-7 text-white flex flex-col justify-between min-w-0">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold mb-4">
                  <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">24/7 Priority Care Coordinator</span>
                </div>
                <h3 className="text-lg font-bold mb-2 truncate">Direct Patient Assistance</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6 break-words">
                  Have an urgent prescription query, lab report question, or want to schedule home nursing? Connect directly with our clinical coordinators in Noida Sector 62.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 min-w-0 flex-wrap">
                <a
                  href={`https://wa.me/${config.WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `Hello Mr Medics Team,\nI am signed in as ${displayName} (${user.email}). I need assistance with my healthcare.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition min-h-[44px] flex-1 min-w-[140px]"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span className="truncate">Chat on WhatsApp</span>
                </a>
                <a
                  href={`tel:${config.PHONE}`}
                  className="py-3 px-4 bg-white/15 hover:bg-white/20 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition min-h-[44px] flex-1 min-w-[120px]"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span className="truncate">Call {config.PHONE}</span>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm flex flex-col justify-between min-w-0">
              <div className="min-w-0">
                <h3 className="text-base font-bold text-[#0A1A45] mb-2 truncate">Digital Health Records & Compliance</h3>
                <p className="text-xs text-[#475569] leading-relaxed mb-4 break-words">
                  Your medical consultations and orders are encrypted and stored in strict accordance with the Digital Personal Data Protection Act 2023 (DPDP Act).
                </p>
                <ul className="text-xs text-[#475569] space-y-2 mb-4 min-w-0">
                  <li className="flex items-center gap-2 min-w-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="break-words">256-bit encryption for electronic health records</span>
                  </li>
                  <li className="flex items-center gap-2 min-w-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="break-words">Right to access, rectify, and delete personal data</span>
                  </li>
                  <li className="flex items-center gap-2 min-w-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="break-words">Noida Sector 62, Uttar Pradesh operating headquarters</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-slate-100 text-xs flex-wrap min-w-0">
                <Link to="/privacy" className="text-[#1769E0] font-semibold hover:underline truncate">
                  Privacy Policy
                </Link>
                <span className="text-slate-300">•</span>
                <Link to="/terms" className="text-[#1769E0] font-semibold hover:underline truncate">
                  Terms of Service
                </Link>
                {config.APP_URL && (
                  <>
                    <span className="text-slate-300">•</span>
                    <a href={config.APP_URL} target="_blank" rel="noopener noreferrer" className="text-[#1769E0] font-semibold hover:underline flex items-center gap-1 truncate">
                      <span>Web Portal</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

        </main>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full h-14 bg-white border-t border-slate-200 flex items-center justify-around z-40 pb-[env(safe-area-inset-bottom)] shadow-lg">
        {[
          { id: 'home', label: 'Home', icon: HomeIcon, path: '/' },
          { id: 'appointments', label: 'Appointments', icon: Calendar, path: '/services/doctor-consultation' },
          { id: 'reports', label: 'Reports', icon: FlaskConical, path: '/services/lab-tests' },
          { id: 'orders', label: 'Orders', icon: ShoppingBag, path: '/services/medicines' },
          { id: 'profile', label: 'Profile', icon: User, path: '/account' },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <Link
              key={tab.id}
              to={tab.path}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex flex-col items-center justify-center flex-1 h-full min-h-[44px] transition ${
                isActive ? 'text-[#1769E0] font-bold' : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="text-[10px] mt-0.5 truncate">{tab.label}</span>
            </Link>
          );
        })}
      </div>

    </div>
  );
}
