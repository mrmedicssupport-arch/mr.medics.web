import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        role: 'patient',
        status: 'Active'
      });
      navigate('/patient');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-[100svh] flex items-center justify-center p-4 bg-[#F2F7FF]">
      <form onSubmit={handleSignup} className="p-6 sm:p-8 bg-white rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
        <h2 className="text-2xl font-bold mb-1 text-[#0A1A45]">Create Account</h2>
        <p className="text-xs text-[#475569] mb-6">Join Mrmedics for complete digital healthcare</p>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0A1A45] mb-1">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="name@example.com" 
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-base text-[#0A1A45] focus:outline-none focus:border-[#1769E0]" 
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#0A1A45] mb-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="••••••••" 
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-base text-[#0A1A45] focus:outline-none focus:border-[#1769E0]" 
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-3.5 rounded-xl health-gradient text-white font-bold text-sm shadow-md hover:shadow-lg transition min-h-[48px]"
          >
            Create Account
          </button>
        </div>
        <p className="mt-5 text-center text-xs text-[#475569]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#1769E0] font-bold hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
