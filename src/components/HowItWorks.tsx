import { motion } from 'motion/react';
import { AnimatedHeading, AnimatedParagraph, FadeInBlock } from './AnimatedTypography';

export default function HowItWorks() {
  const steps = [
    { step: "01", title: "Choose a Service", desc: "Select from doctor consultation, lab tests, or pharmacy delivery based on your personal health needs." },
    { step: "02", title: "Book in a Few Taps", desc: "Pick your preferred time slot, patient profile, and secure digital payment mode with instant confirmation." },
    { step: "03", title: "Get Care at Home", desc: "Experience instant HD video rooms, doorstep sample collection, and rapid medicine delivery with live tracking." },
  ];

  return (
    <section className="py-10 md:py-[96px] bg-white relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        
        {/* Animated Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-16">
          <AnimatedHeading 
            text="How Mrmedics Works for You"
            highlightWords={["Mrmedics", "Works"]}
            className="text-[24px] sm:text-[26px] md:text-[36px] font-extrabold text-[#0A1A45] mb-2 md:mb-3 block leading-tight"
          />
          <AnimatedParagraph className="text-[14px] sm:text-[16px] text-[#475569] leading-normal md:leading-relaxed">
            Get world-class healthcare delivered seamlessly in 3 simple, transparent steps.
          </AnimatedParagraph>
        </div>

        {/* Steps: Horizontal Carousel on Mobile, 3-Col Grid on Desktop */}
        <div className="flex md:grid md:grid-cols-3 gap-3 md:gap-10 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 pb-3 md:pb-0 relative">
          
          {/* Animated Glowing Connecting Line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[3px] bg-gradient-to-r from-blue-300 via-teal-300 to-blue-300 z-0 origin-left" 
          />

          {steps.map((s, idx) => (
            <div key={idx} className="w-[82vw] sm:w-[320px] md:w-auto shrink-0 snap-start h-full">
              <motion.div 
                whileHover={{ y: -6 }}
                className="relative z-10 bg-[#F2F7FF] p-5 md:p-8 rounded-2xl md:rounded-3xl border border-blue-50 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all h-full"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl health-gradient text-white flex items-center justify-center text-lg md:text-2xl font-extrabold mb-4 md:mb-6 shadow-md shadow-blue-500/20">
                  {s.step}
                </div>
                <h3 className="text-base md:text-xl font-bold text-[#0A1A45] mb-1.5 md:mb-3">{s.title}</h3>
                <p className="text-[#475569] text-xs md:text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
