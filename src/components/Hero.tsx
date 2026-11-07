import { Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, Video, FileText, Clock, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { config } from '../config';
import { i18n } from '../i18n';
import { AnimatedHeading, AnimatedParagraph, AnimatedBadge } from './AnimatedTypography';

export default function Hero({ language }: { language: string }) {
  const t = i18n[language as keyof typeof i18n];

  return (
    <section className="relative min-h-[calc(100svh-56px)] md:min-h-[calc(100vh-76px)] bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFF] to-[#FFFFFF] overflow-hidden flex items-center py-6 sm:py-10 md:py-16">
      
      {/* Background Decorative Pulsing Blurred Circles - Hidden on mobile to save performance */}
      <motion.div 
        animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="hidden md:block absolute top-10 left-[-100px] w-[450px] h-[450px] rounded-full bg-blue-500/15 blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
        className="hidden md:block absolute bottom-10 right-[-100px] w-[500px] h-[500px] rounded-full bg-teal-400/15 blur-[130px] pointer-events-none" 
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-12 gap-6 md:gap-12 items-center relative z-10">
        
        {/* Left Column (Text & CTAs) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Animated Pill Badge */}
          <AnimatedBadge icon={ShieldCheck} className="bg-[#E6F0FF] text-[#1769E0] mb-3 md:mb-6 text-[11px] sm:text-xs">
            {t.heroBadge}
          </AnimatedBadge>

          {/* Animated H1 Headline with Word Splitting and Gradient Effect */}
          <div className="mb-2 sm:mb-4 md:mb-6">
            <h1 className="text-[30px] sm:text-[34px] md:text-[52px] lg:text-[64px] font-extrabold text-[#0A1A45] leading-[1.15] tracking-tight">
              <AnimatedHeading 
                text={`${t.heroTitle1} ${t.heroTitle2}`}
                highlightWords={[t.heroTitle2, "One", "App", "ऐप", "में"]}
                highlightClass="health-gradient-text drop-shadow-sm font-black"
                as="span"
              />
            </h1>
          </div>

          {/* Animated Paragraph with Smooth Fade & Reveal */}
          <AnimatedParagraph className="text-[15px] sm:text-[16px] md:text-[18px] text-[#475569] max-w-[540px] mb-4 sm:mb-6 md:mb-8 leading-normal sm:leading-relaxed font-normal" delay={0.25}>
            {t.heroDesc}
          </AnimatedParagraph>

          {/* Action Buttons with Micro-interactions */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 mb-4 sm:mb-6 md:mb-10 w-full sm:w-auto"
          >
            <Link 
              to="/signup"
              className="h-[48px] sm:h-[54px] px-6 sm:px-8 rounded-xl health-gradient text-white text-[15px] sm:text-[16px] font-bold shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>{t.getStarted}</span>
              <motion.span 
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </Link>
            <Link 
              to="/services/lab-tests"
              className="h-[48px] sm:h-[54px] px-6 sm:px-8 rounded-xl border-2 border-[#0A1A45] text-[#0A1A45] text-[15px] sm:text-[16px] font-bold transition-all flex items-center justify-center cursor-pointer hover:bg-[#0A1A45] hover:text-white"
            >
              {t.bookLabTest}
            </Link>
          </motion.div>

          {/* 3 Animated Trust Items - Compact on mobile */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-6 pt-3 sm:pt-6 border-t border-slate-200/80 w-full"
          >
            {[t.trust1, t.trust2, t.trust3].map((item, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ scale: 1.04 }}
                className="flex items-center gap-1.5 sm:gap-2 cursor-default"
              >
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-teal-50 flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0FB5A0] shrink-0" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#0A1A45]">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Column (CSS-3D Phone Mockup & Floating Animated Cards) */}
        <div className="lg:col-span-5 relative flex items-center justify-center py-2 sm:py-6 md:py-10">
          
          {/* Floating Cards: Hidden on Mobile to avoid screen clutter */}
          <motion.div 
            animate={{ y: [-10, 10, -10], rotate: [-1, 1, -1] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            whileHover={{ scale: 1.1, zIndex: 30 }}
            className="hidden md:flex absolute -top-4 left-0 sm:left-2 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-blue-50 items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl health-gradient text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0A1A45]">Video Consult</p>
              <p className="text-[11px] text-[#475569]">50+ Specialties Live</p>
            </div>
          </motion.div>

          {/* Floating Card 2: Home Sample Collection */}
          <motion.div 
            animate={{ y: [10, -10, 10], rotate: [1, -1, 1] }}
            transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut", delay: 0.8 }}
            whileHover={{ scale: 1.1, zIndex: 30 }}
            className="hidden md:flex absolute bottom-6 -left-6 sm:left-[-20px] z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-teal-50 items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0FB5A0] to-emerald-500 text-white flex items-center justify-center font-bold shadow-md shadow-teal-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0A1A45]">Free Home Sample</p>
              <p className="text-[11px] text-[#475569]">100% NABL Accredited</p>
            </div>
          </motion.div>

          {/* Floating Card 3: Fast Reports */}
          <motion.div 
            animate={{ y: [-8, 8, -8], rotate: [-1, 1, -1] }}
            transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 1.5 }}
            whileHover={{ scale: 1.1, zIndex: 30 }}
            className="hidden md:flex absolute top-1/2 -right-4 sm:right-[-12px] z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-purple-50 items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-purple-500/20">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0A1A45]">Fast Reports</p>
              <p className="text-[11px] text-[#475569]">Delivered in 4 Hours</p>
            </div>
          </motion.div>

          {/* CSS-3D Phone Mockup Container - Compact on mobile */}
          <motion.div 
            animate={{ y: [-4, 4, -4], rotateY: [-8, -4, -8], rotateX: [3, 5, 3] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative w-[240px] sm:w-[280px] md:w-[315px] h-[360px] sm:h-[440px] md:h-[585px] max-h-[290px] sm:max-h-[360px] md:max-h-none bg-[#0A1A45] rounded-[32px] sm:rounded-[42px] p-2.5 sm:p-3 shadow-xl md:shadow-2xl shadow-blue-900/30 border border-slate-700/40 overflow-hidden"
            style={{ 
              transform: 'perspective(1200px) rotateY(-8deg) rotateX(4deg)',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Phone Screen Inner */}
            <div className="w-full h-full bg-slate-50 rounded-[34px] overflow-hidden flex flex-col p-4 relative shadow-inner">
              
              {/* Phone Status Bar / Notch */}
              <div className="w-full flex items-center justify-between pb-4 pt-1">
                <span className="text-xs font-bold text-[#0A1A45]">9:41</span>
                <div className="w-20 h-4 bg-slate-200 rounded-full" />
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                  <span className="text-[10px] font-bold text-slate-500">5G</span>
                </div>
              </div>

              {/* Mini App UI: Header with Logo */}
              <div className="bg-white p-2 rounded-2xl shadow-sm mb-3 flex items-center justify-between border border-slate-200">
                <div className="flex items-center gap-2">
                  <img 
                    src="/assets/aistudio/file_000000003e70821192f55344a196d9e8_50f4da26.png" 
                    alt="Mr Medics Logo" 
                    className="h-7 sm:h-8 w-auto object-contain"
                  />
                </div>
                <div className="w-7 h-7 rounded-full health-gradient text-white flex items-center justify-center font-bold text-[10px]">
                  PV
                </div>
              </div>

              {/* Mini App UI: Doctor Card */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white p-3.5 rounded-2xl shadow-sm mb-3 border border-slate-100"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1769E0] flex items-center justify-center font-bold text-xs">
                    Dr
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#0A1A45]">Dr. Anjali Sharma</h5>
                    <p className="text-[10px] text-[#475569]">Cardiologist • 12 yrs exp</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-[10px] text-green-600 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Available Now
                  </span>
                  <span className="text-xs font-extrabold text-[#1769E0]">₹500</span>
                </div>
              </motion.div>

              {/* Mini App UI: Lab Test Card */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100 mb-3"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#0A1A45]">Complete Blood Count (CBC)</span>
                  <span className="text-xs font-extrabold text-[#1769E0]">₹300</span>
                </div>
                <p className="text-[10px] text-[#475569] mb-2">Free Home Sample Collection</p>
                <div className="w-full py-1.5 bg-[#F2F7FF] text-[#1769E0] text-[10px] font-bold rounded-lg text-center flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#0FB5A0]" />
                  <span>Reports in 4 hrs</span>
                </div>
              </motion.div>

              {/* Bottom Nav Bar in Phone */}
              <div className="mt-auto bg-white p-2.5 rounded-2xl shadow-sm flex justify-around items-center border border-slate-100">
                <div className="w-7 h-7 rounded-lg health-gradient text-white flex items-center justify-center text-xs font-bold">H</div>
                <div className="w-7 h-7 rounded-lg text-slate-400 flex items-center justify-center text-xs font-bold hover:bg-slate-50">D</div>
                <div className="w-7 h-7 rounded-lg text-slate-400 flex items-center justify-center text-xs font-bold hover:bg-slate-50">T</div>
                <div className="w-7 h-7 rounded-lg text-slate-400 flex items-center justify-center text-xs font-bold hover:bg-slate-50">P</div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>

    </section>
  );
}
