import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, AlertCircle, ArrowLeft, Loader2, Check } from 'lucide-react';
import { config } from '../config';

export default function Signup() {
  const { signup, loginWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already logged in, redirect to account
  if (user) {
    navigate('/account', { replace: true });
  }

  const formatAuthError = (err: any): string => {
    const code = err?.code || '';
    if (code.includes('email-already-in-use')) {
      return 'An account with this email address already exists. Please log in.';
    }
    if (code.includes('weak-password')) {
      return 'Password should be at least 6 characters long.';
    }
    if (code.includes('invalid-email')) {
      return 'Please enter a valid email address.';
    }
    if (code.includes('popup-closed-by-user')) {
      return 'Google sign-up popup was closed before completing.';
    }
    if (code.includes('unauthorized-domain')) {
      return 'Google sign-up is not authorized for this preview domain yet. Please sign up with email.';
    }
    return err?.message || 'Failed to create account. Please try again.';
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!agreeTerms) {
      setError('Please agree to our Terms of Service and Privacy Policy to continue.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify your password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    const cleanedPhone = phone.replace(/\D/g, '');
    if (cleanedPhone && cleanedPhone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);

    try {
      await signup(
        email.trim(),
        password,
        name.trim(),
        cleanedPhone
      );
      navigate('/account');
    } catch (err: any) {
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
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

  return (
    <div className="min-h-[100svh] flex items-center justify-center p-3 sm:p-4 bg-[#F2F7FF] relative py-8 sm:py-12 w-full max-w-full overflow-x-hidden">
      <div className="w-full max-w-lg min-w-0 bg-white rounded-3xl shadow-xl border border-slate-100 p-5 sm:p-8 lg:p-10 relative">
        <Link 
          to="/" 
          className="inline-flex items-center gap-1.5 text-xs text-[#475569] hover:text-[#1769E0] font-semibold mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>Back to Home</span>
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <img 
            src="/assets/aistudio/file_000000003e70821192f55344a196d9e8_50f4da26.png" 
            alt="Mr Medics Logo" 
            className="h-9 sm:h-10 w-auto object-contain shrink-0"
          />
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#0A1A45] truncate">Create Account</h2>
            <p className="text-xs text-[#475569] truncate">Join {config.BRAND_NAME} for healthcare at your fingertips</p>
          </div>
        </div>

        {error && (
          <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-start gap-2.5 break-words">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed min-w-0">{error}</span>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-[#0A1A45] mb-1.5">Full Name *</label>
              <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                placeholder="Praveen Kumar" 
                className="w-full min-w-0 max-w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-[#0A1A45] focus:outline-none focus:border-[#1769E0] transition" 
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0A1A45] mb-1.5">Mobile Number *</label>
              <input 
                type="tel" 
                value={phone} 
                onChange={e => setPhone(e.target.value)} 
                placeholder="9876543210" 
                maxLength={10}
                className="w-full min-w-0 max-w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-[#0A1A45] focus:outline-none focus:border-[#1769E0] transition" 
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0A1A45] mb-1.5">Email Address *</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="patient@example.com" 
              className="w-full min-w-0 max-w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-[#0A1A45] focus:outline-none focus:border-[#1769E0] transition" 
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-[#0A1A45] mb-1.5">Password *</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  placeholder="Min 6 chars" 
                  className="w-full min-w-0 max-w-full px-4 py-2.5 pr-10 rounded-xl border border-slate-200 text-sm text-[#0A1A45] focus:outline-none focus:border-[#1769E0] transition" 
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0A1A45] mb-1.5">Confirm Password *</label>
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)} 
                placeholder="Re-type password" 
                className="w-full min-w-0 max-w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-[#0A1A45] focus:outline-none focus:border-[#1769E0] transition" 
                required
              />
            </div>
          </div>

          <label className="flex items-start gap-2.5 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={e => setAgreeTerms(e.target.checked)}
              className="mt-0.5 rounded border-slate-300 text-[#1769E0] focus:ring-[#1769E0]"
            />
            <span className="text-xs text-[#475569] leading-relaxed">
              I agree to the{' '}
              <Link to="/terms" target="_blank" className="text-[#1769E0] hover:underline font-semibold">Terms of Service</Link>{' '}
              and{' '}
              <Link to="/privacy" target="_blank" className="text-[#1769E0] hover:underline font-semibold">Privacy Policy</Link>.
            </span>
          </label>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 rounded-xl health-gradient text-white font-bold text-sm shadow-md hover:shadow-lg transition min-h-[48px] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
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
          onClick={handleGoogleSignup}
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
          <span>Sign up with Google</span>
        </button>

        <p className="mt-6 text-center text-xs text-[#475569]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#1769E0] font-bold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
