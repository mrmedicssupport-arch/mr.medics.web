import { Quote, Award, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { AnimatedHeading, AnimatedParagraph, AnimatedBadge } from './AnimatedTypography';

export default function FounderSection() {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#F2F7FF] rounded-2xl sm:rounded-3xl p-5 sm:p-14 border border-blue-100 shadow-md sm:shadow-xl grid lg:grid-cols-12 gap-6 sm:gap-12 items-center"
        >
          
          {/* Founder Photo - Compact on mobile */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative flex items-center gap-4 sm:block">
              <div className="hidden sm:block absolute inset-0 rounded-3xl health-gradient rotate-3 scale-105 opacity-30 blur-sm" />
              <img 
                src="/assets/aistudio/WhatsApp_Image_2026-10-18_at_5.30.08_PM_d24be501.jpeg" 
                alt="Praveen Verma - Founder & CEO" 
                className="relative z-10 w-24 sm:w-44 lg:w-[300px] aspect-[3/4] h-auto object-cover object-top rounded-2xl sm:rounded-3xl shadow-md sm:shadow-2xl border-2 sm:border-4 border-white shrink-0"
              />
              <div className="sm:hidden">
                <span className="text-[11px] font-bold text-[#1769E0] uppercase tracking-wider block">Leadership</span>
                <h3 className="text-base font-extrabold text-[#0A1A45]">Praveen Verma</h3>
                <p className="text-xs text-[#475569]">Founder & CEO, Mr Medics</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[10px] font-bold text-[#0A1A45]">Active Visionary</span>
                </div>
              </div>

              <div className="hidden sm:flex absolute -bottom-4 -right-4 z-20 bg-white py-2.5 px-4 rounded-2xl shadow-xl border border-blue-50 items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-[#0A1A45]">Active Visionary</span>
              </div>
            </div>
          </div>

          {/* Founder Bio */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="hidden sm:block">
              <AnimatedBadge icon={Award} className="bg-blue-50 text-[#1769E0] mb-4">
                Leadership & Vision
              </AnimatedBadge>
            </div>

            <h2 className="text-[22px] sm:text-[26px] md:text-[40px] font-extrabold text-[#0A1A45] mb-2 leading-tight">
              <AnimatedHeading 
                text="Meet Our Founder & CEO"
                highlightWords={["Founder", "CEO"]}
                as="span"
              />
            </h2>
            <div className="hidden sm:block text-xl font-extrabold text-[#1769E0] mb-4">
              Praveen Verma
            </div>

            <div className="relative mb-4 sm:mb-6 text-[#475569] text-xs sm:text-base leading-relaxed space-y-2 sm:space-y-4">
              <Quote className="hidden sm:block w-8 h-8 text-blue-200 absolute -top-4 -left-6 -z-10 opacity-60" />
              <p>
                "Our mission at Mr Medics is to bridge the healthcare accessibility gap in India by bringing NMC-registered doctors, NABL diagnostics, and licensed pharmacies onto one secure, seamless platform."
              </p>
              <p className="text-xs sm:text-sm text-slate-500">
                Headquartered in A Block, Noida Sector 62 Industrial Area, UP, under our motto <strong>'Health Beyond Border'</strong>.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 sm:pt-6 border-t border-slate-200 w-full text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <MapPin className="w-4 h-4 text-[#1769E0]" />
                <span className="font-semibold text-[#0A1A45]">Noida Sector 62, UP</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0FB5A0] animate-pulse" />
                <span className="font-semibold text-[#0A1A45]">Verified Enterprise</span>
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </section>
  );
}
