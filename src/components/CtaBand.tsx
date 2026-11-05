import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { config } from '../config';
import { AnimatedHeading, AnimatedParagraph } from './AnimatedTypography';

export default function CtaBand() {
  return (
    <section className="py-[96px] bg-white relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="health-gradient rounded-3xl p-10 sm:p-16 text-center text-white shadow-2xl relative overflow-hidden"
        >
          {/* Subtle animated floating lights */}
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute top-0 right-10 w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none" 
          />
          <motion.div 
            animate={{ scale: [1, 1.25, 1], opacity: [0.1, 0.25, 0.1] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-0 left-10 w-72 h-72 bg-white/15 rounded-full blur-3xl pointer-events-none" 
          />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Transform Your Health Journey</span>
            </span>

            <h2 className="text-[36px] sm:text-[48px] font-extrabold mb-4 tracking-tight leading-tight">
              <AnimatedHeading 
                text="Your Health, Our Priority"
                highlightWords={[]}
                className="text-white"
                as="span"
              />
            </h2>

            <AnimatedParagraph className="text-white/90 text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
              Join thousands of satisfied patients across India managing their consultations, diagnostics, and prescriptions with Mrmedics.
            </AnimatedParagraph>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.a 
                href={`${config.APP_URL}/signup`}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.25)" }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-[#1769E0] px-8 py-4 rounded-xl font-bold text-base hover:bg-slate-50 transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a 
                href="/contact"
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-base transition flex items-center justify-center cursor-pointer"
              >
                Contact Support
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
