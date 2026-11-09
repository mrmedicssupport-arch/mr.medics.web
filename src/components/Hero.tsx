import { Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, Video, FileText, Clock, Sparkles, Stethoscope, TestTube, Pill, Home, User } from 'lucide-react';
import { motion } from 'motion/react';
import { config } from '../config';
import { i18n } from '../i18n';
import { AnimatedHeading, AnimatedParagraph, AnimatedBadge } from './AnimatedTypography';

export default function Hero({ language }: { language: string }) {
  const t = i18n[language as keyof typeof i18n];

  return (
    <section className="relative min-h-[calc(100svh-56px)] md:min-h-0 bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFF] to-[#FFFFFF] overflow-hidden flex items-center py-8 sm:py-12 lg:py-16">
      
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-12 gap-6 md:gap-12 items-center relative z-10">
        
        {/* Left Column (Text & CTAs) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          <AnimatedBadge icon={ShieldCheck} className="bg-[#E6F0FF] text-[#1769E0] mb-3 md:mb-6 text-[11px] sm:text-xs">
            {t.heroBadge}
          </AnimatedBadge>

          <div className="mb-2 sm:mb-4 md:mb-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A1A45] leading-[1.15] tracking-tight">
              <AnimatedHeading 
                text={`${t.heroTitle1} ${t.heroTitle2}`}
                highlightWords={[t.heroTitle2, "One", "App", "ऐप", "में"]}
                highlightClass="health-gradient-text drop-shadow-sm font-black"
                as="span"
              />
            </h1>
          </div>

          <AnimatedParagraph className="text-[15px] sm:text-[16px] md:text-[18px] text-[#475569] max-w-[540px] mb-4 sm:mb-6 md:mb-8 leading-normal sm:leading-relaxed font-normal" delay={0.25}>
            {t.heroDesc}
          </AnimatedParagraph>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 mb-4 sm:mb-6 md:mb-10 w-full sm:w-auto"
          >
            <Link 
              to="/signup"
              className="min-h-[48px] sm:h-[54px] px-6 sm:px-8 rounded-xl health-gradient text-white text-[15px] sm:text-[16px] font-bold shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>{t.getStarted}</span>
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                →
              </motion.span>
            </Link>
            <Link 
              to="/services/lab-tests"
              className="min-h-[48px] sm:h-[54px] px-6 sm:px-8 rounded-xl border-2 border-[#0A1A45] text-[#0A1A45] text-[15px] sm:text-[16px] font-bold transition-all flex items-center justify-center cursor-pointer hover:bg-[#0A1A45] hover:text-white"
            >
              {t.bookLabTest}
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-6 pt-3 sm:pt-6 border-t border-slate-200/80 w-full"
          >
            {[t.trust1, t.trust2, t.trust3].map((item, idx) => (
              <motion.div 
                key={idx} 
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

        {/* Right Column */}
        <div className="lg:col-span-5 relative flex items-center justify-center py-4 lg:py-0">
          <motion.div 
            animate={{ y: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative w-[220px] sm:w-[250px] lg:w-[290px] aspect-[9/19] bg-[#0A1A45] rounded-[32px] sm:rounded-[42px] p-2 sm:p-3 shadow-xl border border-slate-700/40 overflow-hidden max-h-[560px]"
          >
            {/* Screen Content */}
            <div className="w-full h-full bg-white rounded-[28px] sm:rounded-[36px] overflow-hidden flex flex-col shadow-inner relative">
              {/* Status Bar */}
              <div className="w-full flex items-center justify-between px-5 pt-3 pb-2">
                <span className="text-[10px] font-bold text-[#0A1A45]">9:41</span>
                <div className="flex gap-1">
                  <div className="w-3 h-2 bg-[#0A1A45] rounded-sm" />
                  <div className="w-3 h-2 bg-[#0A1A45] rounded-sm" />
                </div>
              </div>

              {/* App Header */}
              <div className="px-4 py-3">
                <div className="flex items-center gap-2 mb-1">
                   <div className="w-6 h-6 bg-[#0A1A45] rounded-full flex items-center justify-center">
                    <span className="text-[10px] text-white font-bold">M</span>
                   </div>
                   <span className="text-[11px] font-bold text-[#0A1A45]">Mr Medics</span>
                </div>
                <h2 className="text-[13px] font-extrabold text-[#0A1A45]">Complete Healthcare in One App</h2>
              </div>

              {/* Service Grid */}
              <div className="grid grid-cols-2 gap-2 px-4 mb-4">
                {[
                  { icon: Stethoscope, title: "Consult Doctor", desc: "Video & clinic visits", color: "bg-[#1769E0]" },
                  { icon: TestTube, title: "Lab Tests", desc: "Free home sample pickup", color: "bg-[#0FB5A0]" },
                  { icon: Pill, title: "Medicines", desc: "Genuine pharmacies", color: "bg-[#16A34A]" },
                  { icon: FileText, title: "Health Records", desc: "All reports in one place", color: "bg-[#7C3AED]" },
                ].map((item, i) => (
                  <div key={i} className="bg-[#F2F7FF] border border-blue-100 p-2.5 rounded-xl">
                    <div className={`${item.color} w-7 h-7 rounded-full flex items-center justify-center mb-2`}>
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-[11px] sm:text-xs font-bold text-[#0A1A45]">{item.title}</h3>
                    <p className="text-[9px] text-[#475569] leading-tight mt-0.5">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Get Started */}
              <div className="px-4 mt-auto mb-4">
                <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#1769E0] to-[#1e40af] text-white text-[12px] font-bold">Get Started</button>
                <p className="text-[10px] text-[#475569] text-center mt-2">Health Beyond Border</p>
              </div>

              {/* Bottom Nav */}
              <div className="border-t border-slate-100 px-4 py-3 flex justify-between items-center bg-white">
                <div className="flex flex-col items-center text-[#1769E0]"><Home className="w-4 h-4"/><span className="text-[8px] mt-0.5">Home</span></div>
                <div className="flex flex-col items-center text-slate-400"><User className="w-4 h-4"/><span className="text-[8px] mt-0.5">Doctors</span></div>
                <div className="flex flex-col items-center text-slate-400"><FileText className="w-4 h-4"/><span className="text-[8px] mt-0.5">Tests</span></div>
                <div className="flex flex-col items-center text-slate-400"><User className="w-4 h-4"/><span className="text-[8px] mt-0.5">Profile</span></div>
              </div>
            </div>
          </motion.div>

          {/* Floating Tags (lg and up) */}
          <div className="hidden lg:flex flex-col gap-3 absolute -right-16 top-1/2 -translate-y-1/2">
            {[
              { icon: ShieldCheck, text: "NMC-registered doctors" },
              { icon: FileText, text: "NABL-accredited labs" },
              { icon: Pill, text: "Licensed pharmacies" },
            ].map((tag, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="bg-white shadow-lg rounded-full px-4 py-2 flex items-center gap-2 border border-slate-100"
              >
                <tag.icon className="w-4 h-4 text-[#1769E0]" />
                <span className="text-xs font-bold text-[#0A1A45]">{tag.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
