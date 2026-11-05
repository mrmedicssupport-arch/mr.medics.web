import { Quote, Award, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { AnimatedHeading, AnimatedParagraph, AnimatedBadge } from './AnimatedTypography';

export default function FounderSection() {
  return (
    <section className="py-[96px] bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-[#F2F7FF] rounded-3xl p-8 sm:p-14 border border-blue-100 shadow-xl grid lg:grid-cols-12 gap-12 items-center"
        >
          
          {/* Founder Photo with smooth parallax and floating badge */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-3xl health-gradient rotate-3 scale-105 opacity-30 blur-sm" />
              <img 
                src="/assets/aistudio/WhatsApp_Image_2026-10-18_at_5.30.08_PM_d24be501.jpeg" 
                alt="Praveen Verma - Founder & CEO" 
                className="relative z-10 w-[300px] sm:w-[340px] h-[400px] object-cover rounded-3xl shadow-2xl border-4 border-white"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-4 -right-4 z-20 bg-white py-2.5 px-4 rounded-2xl shadow-xl border border-blue-50 flex items-center gap-2"
              >
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-[#0A1A45]">Active Visionary</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Founder Bio */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <AnimatedBadge icon={Award} className="bg-blue-50 text-[#1769E0] mb-6">
              Leadership & Vision
            </AnimatedBadge>

            <h2 className="text-[32px] sm:text-[40px] font-extrabold text-[#0A1A45] mb-2 leading-tight">
              <AnimatedHeading 
                text="Meet Our Founder & CEO"
                highlightWords={["Founder", "CEO"]}
                as="span"
              />
            </h2>
            <motion.h3 
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl font-extrabold text-[#1769E0] mb-6"
            >
              Praveen Verma
            </motion.h3>

            <div className="relative mb-8 text-[#475569] text-base leading-relaxed space-y-4">
              <Quote className="w-10 h-10 text-blue-200 absolute -top-4 -left-6 -z-10 opacity-60" />
              <AnimatedParagraph delay={0.25}>
                "Our mission at Mrmedics is to bridge the healthcare accessibility gap in India by bringing NMC-registered doctors, NABL diagnostics, and licensed pharmacies onto one secure, seamless platform."
              </AnimatedParagraph>
              <AnimatedParagraph delay={0.35}>
                Headquartered in A Block, Noida Sector 62 Industrial Area, Uttar Pradesh, we are committed to upholding the highest standards of trust, data privacy, and affordable patient care under our motto <strong>'Health Beyond Border'</strong>.
              </AnimatedParagraph>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
              className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-200 w-full"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#1769E0]" />
                <span className="text-sm font-semibold text-[#0A1A45]">Noida Sector 62, UP</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0FB5A0] animate-pulse" />
                <span className="text-sm font-semibold text-[#0A1A45]">Verified Enterprise</span>
              </div>
            </motion.div>

          </div>

        </motion.div>
      </div>
    </section>
  );
}
