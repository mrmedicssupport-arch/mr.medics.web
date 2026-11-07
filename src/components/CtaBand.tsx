import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { config } from '../config';
import { AnimatedHeading, AnimatedParagraph } from './AnimatedTypography';

export default function CtaBand() {
  return (
    <section className="py-8 md:py-[96px] bg-white relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="health-gradient rounded-2xl sm:rounded-3xl p-6 sm:p-16 text-center text-white shadow-xl sm:shadow-2xl relative overflow-hidden"
        >
          {/* Subtle animated floating lights - Hidden on mobile */}
          <div className="hidden md:block absolute top-0 right-10 w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none" />
          <div className="hidden md:block absolute bottom-0 left-10 w-72 h-72 bg-white/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/20 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3 sm:mb-6">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Transform Your Health Journey</span>
            </span>

            <h2 className="text-[24px] sm:text-[32px] md:text-[48px] font-extrabold mb-2 sm:mb-4 tracking-tight leading-tight">
              <AnimatedHeading 
                text="Your Health, Our Priority"
                highlightWords={[]}
                className="text-white"
                as="span"
              />
            </h2>

            <AnimatedParagraph className="text-white/90 text-xs sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-10 leading-normal sm:leading-relaxed font-normal">
              Join thousands of patients across India managing their consultations, diagnostics, and prescriptions with Mr Medics.
            </AnimatedParagraph>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link 
                to="/signup"
                className="bg-white text-[#1769E0] px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base hover:bg-slate-50 transition shadow-md flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/contact"
                className="border-2 border-white text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition flex items-center justify-center active:scale-95 hover:bg-white hover:text-[#0A1A45]"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
