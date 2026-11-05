import { Smartphone, Download, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { config } from '../config';
import { AnimatedHeading, AnimatedParagraph, AnimatedBadge } from './AnimatedTypography';

export default function AppDownloadSection() {
  return (
    <section className="py-[96px] bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="health-gradient rounded-3xl p-8 sm:p-14 text-white grid lg:grid-cols-2 gap-10 items-center shadow-2xl relative">
          
          <div className="relative z-10">
            <AnimatedBadge className="bg-white/20 text-white mb-6 backdrop-blur-sm" icon={Sparkles}>
              Download Mrmedics Mobile App
            </AnimatedBadge>

            <AnimatedHeading
              text="Healthcare in your pocket, anytime, anywhere."
              highlightWords={["Healthcare", "pocket,", "anywhere."]}
              highlightClass="text-cyan-200"
              className="text-[32px] sm:text-[44px] font-extrabold mb-4 leading-tight text-white block"
              as="h2"
            />

            <AnimatedParagraph className="text-white/85 text-base mb-8 leading-relaxed max-w-lg">
              Book doctor consultations, access lifetime encrypted digital health records, track doorstep medicine deliveries, and get instant 4-hour lab reports right on your smartphone.
            </AnimatedParagraph>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={config.PLAY_STORE_URL} 
                className="bg-black text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-3 hover:bg-slate-900 transition shadow-lg"
              >
                <Smartphone className="w-6 h-6 text-cyan-400" />
                <div className="text-left">
                  <p className="text-[10px] text-slate-300 uppercase tracking-wider">GET IT ON</p>
                  <p className="text-sm font-extrabold">Google Play</p>
                </div>
              </motion.a>

              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={config.APP_STORE_URL} 
                className="bg-black text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-3 hover:bg-slate-900 transition shadow-lg"
              >
                <Download className="w-6 h-6 text-teal-400" />
                <div className="text-left">
                  <p className="text-[10px] text-slate-300 uppercase tracking-wider">Download on the</p>
                  <p className="text-sm font-extrabold">App Store</p>
                </div>
              </motion.a>
            </motion.div>
          </div>

          {/* Floating Phone Mockup with HealthPilot Logo Animation */}
          <div className="flex justify-center relative">
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
                      alt="Mrmedics Logo" 
                      className="h-11 sm:h-12 w-auto object-contain mx-auto"
                    />
                  </motion.div>
                  <span className="text-xs font-extrabold text-[#0A1A45] tracking-tight">Health Beyond Border</span>
                  <span className="text-[10px] font-semibold text-[#1769E0] mt-0.5">Your Health, Our Priority</span>

                  {/* Micro Quick Actions */}
                  <div className="grid grid-cols-2 gap-2 w-full mt-4">
                    <div className="p-2 bg-blue-50 rounded-xl text-left border border-blue-100">
                      <div className="text-[9px] font-extrabold text-[#1769E0]">50+ Doctors</div>
                      <div className="text-[8px] text-slate-500">Live Video</div>
                    </div>
                    <div className="p-2 bg-teal-50 rounded-xl text-left border border-teal-100">
                      <div className="text-[9px] font-extrabold text-[#0FB5A0]">500+ Tests</div>
                      <div className="text-[8px] text-slate-500">Free Home Visit</div>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 bg-[#F2F7FF] rounded-2xl text-center border border-blue-100 shadow-sm">
                  <p className="text-[11px] font-extrabold text-[#0A1A45]">★ 4.9 App Store Rating</p>
                  <p className="text-[9px] text-[#475569] font-medium">Trusted by 100k+ Patients</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
