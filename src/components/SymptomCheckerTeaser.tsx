import { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, HeartPulse, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { AnimatedHeading, AnimatedParagraph, AnimatedBadge } from './AnimatedTypography';

export default function SymptomCheckerTeaser() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      navigate('/services/ai-symptom-checker');
      return;
    }
    navigate('/services/ai-symptom-checker', { state: { prefillSymptoms: query.trim() } });
  };

  return (
    <section className="py-[96px] bg-[#F2F7FF]">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-3xl p-8 sm:p-14 shadow-xl border border-blue-100 grid lg:grid-cols-2 gap-10 items-center relative overflow-hidden"
        >
          {/* Subtle background gradient glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />

          <div>
            <AnimatedBadge icon={Sparkles} className="bg-purple-50 text-purple-600 mb-6">
              Working AI Clinical Assistant
            </AnimatedBadge>
            
            <h2 className="text-[32px] sm:text-[40px] font-extrabold text-[#0A1A45] mb-4 leading-tight">
              <AnimatedHeading 
                text="Not sure what's wrong? Try our AI Symptom Checker"
                highlightWords={["AI", "Symptom", "Checker"]}
                highlightClass="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 font-black"
                as="span"
              />
            </h2>

            <AnimatedParagraph className="text-[16px] text-[#475569] mb-8 leading-relaxed">
              Describe your symptoms, duration, and severity in plain English or Hindi. Get instant preliminary triage, recommended specialist doctors, and suggested lab tests in seconds.
            </AnimatedParagraph>

            <form onSubmit={handleQuickSubmit} className="space-y-4 max-w-lg">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                <input 
                  type="text" 
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Type symptoms (e.g. fever for 2 days, back pain)..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#F2F7FF] border border-purple-100 text-[#0A1A45] text-sm focus:outline-none focus:border-purple-600 focus:bg-white transition-all shadow-inner"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <motion.button 
                  whileHover={{ scale: 1.03 }} 
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="inline-flex items-center gap-2 h-[50px] px-8 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-lg shadow-purple-600/25 transition cursor-pointer"
                >
                  <span>Check Symptoms With AI</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <Link
                  to="/services/ai-symptom-checker"
                  className="inline-flex items-center gap-2 h-[50px] px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0A1A45] font-bold text-xs transition"
                >
                  <span>Open Full Triage Tool</span>
                </Link>
              </div>
            </form>
          </div>

          <div className="bg-[#F2F7FF] p-6 rounded-2xl border border-blue-100 flex flex-col gap-4 relative z-10 shadow-inner">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white p-4 rounded-xl shadow-sm border border-slate-100"
            >
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-bold text-slate-400">REAL-TIME SAMPLE QUERY</p>
                <span className="text-[10px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">Gemini 3.8 Flash</span>
              </div>
              <p className="text-sm font-semibold text-[#0A1A45]">"Continuous mild fever, body ache, and throat irritation for 2 days"</p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-teal-500"
            >
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-bold text-teal-600">LIVE CLINICAL TRIAGE OUTPUT</p>
                <span className="text-[10px] font-bold bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">Automated</span>
              </div>
              <p className="text-sm font-bold text-[#0A1A45]">Urgency: Moderate • Recommend General Physician</p>
              <p className="text-xs text-[#475569] mt-1">Suggested Lab Panel: Complete Blood Count (CBC) with Platelets</p>
            </motion.div>

            <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1 text-[#0FB5A0]">
                <ShieldCheck className="w-4 h-4" /> DPDP Compliant
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#1769E0]">
                <HeartPulse className="w-4 h-4" /> Verified Clinical Rules
              </span>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
