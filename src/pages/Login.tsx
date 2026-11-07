import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { config } from '../config';

export default function Login() {
  const { login, loginWithGoogle, resetPassword, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  // If already logged in, redirect to account
  if (user) {
    navigate('/account', { replace: true });
  }

  const formatAuthError = (err: any): string => {
    const code = err?.code || '';
    if (code.includes('user-not-found') || code.includes('wrong-password') || code.includes('invalid-credential')) {
      return 'Incorrect email or password. Please verify your details.';
    }
    if (code.includes('invalid-email')) {
      return 'Please enter a valid email address.';
    }
    if (code.includes('too-many-requests')) {
      return 'Too many unsuccessful attempts. Please try again in a few minutes or reset your password.';
    }
    if (code.includes('popup-closed-by-user')) {
      return 'Google sign-in popup was closed before completing.';
    }
    if (code.includes('unauthorized-domain')) {
      return 'Google sign-in is not authorized for this preview domain yet. Please log in with email or contact support.';
    }
    return err?.message || 'Login failed. Please check your credentials and try again.';
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email.trim(), password);
      navigate('/account');
    } catch (err: any) {
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      navigate('/account');
    } catch (err: any) {
      setError(formatAuthError(err));
    } finally {
      setGoogleLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) return;
    setResetLoading(true);
    setError(null);

    try {
      await resetPassword(resetEmail.trim());
      setResetSent(true);
    } catch (err: any) {
      setError(formatAuthError(err));
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-[100svh] flex items-center justify-center p-4 bg-[#F2F7FF] relative">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10 relative">
        <Link 
          to="/" 
          className="inline-flex items-center gap-1.5 text-xs text-[#475569] hover:text-[#1769E0] font-semibold mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <img 
            src="/assets/aistudio/file_000000003e70821192f55344a196d9e8_50f4da26.png" 
            alt="Mr Medics Logo" 
            className="h-10 w-auto object-contain"
          />
          <div>
            <h2 className="text-xl font-extrabold text-[#0A1A45]">Welcome Back</h2>
            <p className="text-xs text-[#475569]">Sign in to your {config.BRAND_NAME} account</p>
          </div>
        </div>

        {error && (
          <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0A1A45] mb-1.5">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="patient@example.com" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-[#0A1A45] focus:outline-none focus:border-[#1769E0] transition" 
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-[#0A1A45]">Password</label>
              <button
                type="button"
                onClick={() => { setShowResetModal(true); setResetEmail(email); setResetSent(false); }}
                className="text-xs text-[#1769E0] hover:underline font-semibold"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="••••••••" 
                className="w-full px-4 py-3 pr-11 rounded-xl border border-slate-200 text-sm text-[#0A1A45] focus:outline-none focus:border-[#1769E0] transition" 
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 rounded-xl health-gradient text-white font-bold text-sm shadow-md hover:shadow-lg transition min-h-[48px] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            <span>{loading ? 'Signing In...' : 'Sign In'}</span>
          </button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <span className="relative px-3 bg-white text-xs text-[#64748B] uppercase font-semibold">Or</span>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="w-full py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-[#0A1A45] font-semibold text-xs transition flex items-center justify-center gap-2.5 min-h-[46px] cursor-pointer"
        >
          {googleLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-[#1769E0]" />
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
          )}
          <span>Continue with Google</span>
        </button>

        <p className="mt-6 text-center text-xs text-[#475569]">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#1769E0] font-bold hover:underline">
            Create Free Account
          </Link>
        </p>
      </div>

      {/* Forgot Password Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-[#0A1A45] mb-2">Reset Password</h3>
            <p className="text-xs text-[#475569] mb-4">
              Enter your registered email address and we will send you a secure password reset link.
            </p>

            {resetSent ? (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs mb-4">
                Password reset link sent! Check your inbox and follow the link to set a new password.
              </div>
            ) : (
              <form onSubmit={handlePasswordReset} className="space-y-3">
                <input 
                  type="email" 
                  value={resetEmail} 
                  onChange={e => setResetEmail(e.target.value)} 
                  placeholder="your.email@example.com" 
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#0A1A45] focus:outline-none focus:border-[#1769E0]" 
                  required
                />
                <button
                  type="submit"
                  disabled={resetLoading}
                  className="w-full py-2.5 rounded-xl health-gradient text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
                >
                  {resetLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                  <span>Send Reset Link</span>
                </button>
              </form>
            )}

            <button
              onClick={() => setShowResetModal(false)}
              className="mt-4 w-full py-2 text-xs text-slate-500 hover:text-slate-800 font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
