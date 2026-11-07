import { Smartphone, Download, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { config } from '../config';
import { AnimatedHeading, AnimatedParagraph, AnimatedBadge } from './AnimatedTypography';

export default function AppDownloadSection() {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="health-gradient rounded-2xl sm:rounded-3xl p-6 sm:p-14 text-white grid lg:grid-cols-2 gap-6 sm:gap-10 items-center shadow-xl sm:shadow-2xl relative">
          
          <div className="relative z-10">
            <div className="hidden sm:block">
              <AnimatedBadge className="bg-white/20 text-white mb-4 backdrop-blur-sm" icon={Sparkles}>
                Download Mr Medics Mobile App
              </AnimatedBadge>
            </div>

            <AnimatedHeading
              text="Healthcare in your pocket, anytime, anywhere."
              highlightWords={["Healthcare", "pocket,", "anywhere."]}
              highlightClass="text-cyan-200"
              className="text-[22px] sm:text-[26px] md:text-[44px] font-extrabold mb-2 sm:mb-4 leading-tight text-white block"
              as="h2"
            />

            <AnimatedParagraph className="text-white/85 text-xs sm:text-base mb-5 sm:mb-8 leading-normal sm:leading-relaxed max-w-lg">
              Book doctor consultations, access lifetime encrypted digital health records, track doorstep medicine deliveries, and get instant 4-hour lab reports right on your smartphone.
            </AnimatedParagraph>

            {config.PLAY_STORE_URL || config.APP_STORE_URL ? (
              <div className="flex flex-col sm:flex-row gap-3">
                {config.PLAY_STORE_URL && (
                  <a 
                    href={config.PLAY_STORE_URL} 
                    className="bg-black text-white px-5 py-3 rounded-xl font-bold flex items-center justify-center sm:justify-start gap-3 hover:bg-slate-900 transition shadow-md active:scale-95"
                  >
                    <Smartphone className="w-5 h-5 text-cyan-400 shrink-0" />
                    <div className="text-left">
                      <p className="text-[9px] text-slate-300 uppercase tracking-wider">GET IT ON</p>
                      <p className="text-xs sm:text-sm font-extrabold">Google Play</p>
                    </div>
                  </a>
                )}

                {config.APP_STORE_URL && (
                  <a 
                    href={config.APP_STORE_URL} 
                    className="bg-black text-white px-5 py-3 rounded-xl font-bold flex items-center justify-center sm:justify-start gap-3 hover:bg-slate-900 transition shadow-md active:scale-95"
                  >
                    <Download className="w-5 h-5 text-teal-400 shrink-0" />
                    <div className="text-left">
                      <p className="text-[9px] text-slate-300 uppercase tracking-wider">Download on the</p>
                      <p className="text-xs sm:text-sm font-extrabold">App Store</p>
                    </div>
                  </a>
                )}
              </div>
            ) : (
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-white shadow-lg">
                <Smartphone className="w-5 h-5 text-cyan-300 shrink-0" />
                <div>
                  <span className="text-xs sm:text-sm font-extrabold block">Mobile App Coming Soon</span>
                  <span className="text-[11px] text-white/80 block">Native iOS & Android apps currently in private review</span>
                </div>
              </div>
            )}
          </div>

          {/* Floating Phone Mockup - Visible on Desktop only */}
          <div className="hidden lg:flex justify-center relative">
            <motion.div 
              animate={{ 
                y: [0, -12, 0],
                rotate: [0, 1, 0, -1, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 6, 
                ease: "easeInOut" 
              }}
              className="w-[250px] h-[490px] bg-[#0A1A45] rounded-[38px] p-3 shadow-2xl border-4 border-white/20 relative"
            >
              <div className="w-full h-full bg-white rounded-[30px] p-4 flex flex-col justify-between text-[#0A1A45] shadow-inner relative overflow-hidden">
                {/* Speaker pill notch */}
                <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-900/60 ml-auto mr-1.5" />
                </div>
                
                {/* Mobile App Screen Content with Official Logo */}
                <div className="flex flex-col items-center text-center my-auto py-2">
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="bg-white p-2 rounded-2xl mb-3 shadow-md border border-slate-100 flex items-center justify-center"
                  >
                    <img 
                      src="/assets/aistudio/file_000000003e70821192f55344a196d9e8_50f4da26.png" 
                      alt="Mr Medics Logo" 
                      className="h-11 sm:h-12 w-auto object-contain mx-auto"
                    />
                  </motion.div>
                  <span className="text-xs font-extrabold text-[#0A1A45] tracking-tight">Health Beyond Border</span>
                  <span className="text-[10px] font-semibold text-[#1769E0] mt-0.5">Your Health, Our Priority</span>

                  {/* Micro Quick Actions */}
                  <div className="grid grid-cols-2 gap-2 w-full mt-4">
                    <div className="p-2 bg-blue-50 rounded-xl text-left border border-blue-100">
                      <div className="text-[9px] font-extrabold text-[#1769E0]">Specialists</div>
                      <div className="text-[8px] text-slate-500">Live Video</div>
                    </div>
                    <div className="p-2 bg-teal-50 rounded-xl text-left border border-teal-100">
                      <div className="text-[9px] font-extrabold text-[#0FB5A0]">Lab Tests</div>
                      <div className="text-[8px] text-slate-500">Home Visit</div>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 bg-[#F2F7FF] rounded-2xl text-center border border-blue-100 shadow-sm">
                  <p className="text-[11px] font-extrabold text-[#0A1A45]">Complete Healthcare</p>
                  <p className="text-[9px] text-[#475569] font-medium">NMC Doctors & NABL Labs</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
