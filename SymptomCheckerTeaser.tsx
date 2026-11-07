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
    <section className="py-10 md:py-[96px] bg-[#F2F7FF]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-14 shadow-md sm:shadow-xl border border-blue-100 grid lg:grid-cols-2 gap-6 sm:gap-10 items-center relative overflow-hidden"
        >
          {/* Subtle background gradient glow */}
          <div className="hidden sm:block absolute top-0 right-0 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="hidden sm:block">
              <AnimatedBadge icon={Sparkles} className="bg-purple-50 text-purple-600 mb-4">
                Working AI Clinical Assistant
              </AnimatedBadge>
            </div>
            
            <h2 className="text-[22px] sm:text-[26px] md:text-[40px] font-extrabold text-[#0A1A45] mb-2 sm:mb-4 leading-tight">
              <AnimatedHeading 
                text="Not sure what's wrong? Try our AI Symptom Checker"
                highlightWords={["AI", "Symptom", "Checker"]}
                highlightClass="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 font-black"
                as="span"
              />
            </h2>

            <AnimatedParagraph className="text-[14px] sm:text-[16px] text-[#475569] mb-4 sm:mb-8 leading-normal sm:leading-relaxed">
              Describe your symptoms in plain English or Hindi. Get instant preliminary triage, recommended specialist doctors, and suggested lab tests in seconds.
            </AnimatedParagraph>

            <form onSubmit={handleQuickSubmit} className="space-y-3 sm:space-y-4 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                <input 
                  type="text" 
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Type symptoms (e.g. fever, headache)..."
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-[#F2F7FF] border border-purple-100 text-[#0A1A45] text-base focus:outline-none focus:border-purple-600 focus:bg-white transition-all shadow-inner"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <button 
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 h-[48px] px-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md shadow-purple-600/25 transition active:scale-95 cursor-pointer w-full sm:w-auto"
                >
                  <span>Check Symptoms With AI</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  to="/services/ai-symptom-checker"
                  className="inline-flex items-center justify-center gap-2 h-[48px] px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0A1A45] font-bold text-xs transition active:scale-95 w-full sm:w-auto"
                >
                  <span>Open Full Triage Tool</span>
                </Link>
              </div>
            </form>
          </div>

          {/* Secondary card preview - Visible on tablet/desktop */}
          <div className="hidden lg:flex bg-[#F2F7FF] p-6 rounded-2xl border border-blue-100 flex-col gap-4 relative z-10 shadow-inner">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-bold text-slate-400">REAL-TIME SAMPLE QUERY</p>
                <span className="text-[10px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">Gemini 3.8 Flash</span>
              </div>
              <p className="text-sm font-semibold text-[#0A1A45]">"Continuous mild fever, body ache, and throat irritation for 2 days"</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-teal-500">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-bold text-teal-600">LIVE CLINICAL TRIAGE OUTPUT</p>
                <span className="text-[10px] font-bold bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">Automated</span>
              </div>
              <p className="text-sm font-bold text-[#0A1A45]">Urgency: Moderate • Recommend General Physician</p>
              <p className="text-xs text-[#475569] mt-1">Suggested Lab Panel: Complete Blood Count (CBC) with Platelets</p>
            </div>

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
