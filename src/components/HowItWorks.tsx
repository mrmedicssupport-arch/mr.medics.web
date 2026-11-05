import { motion } from 'motion/react';
import { AnimatedHeading, AnimatedParagraph, FadeInBlock } from './AnimatedTypography';

export default function HowItWorks() {
  const steps = [
    { step: "01", title: "Choose a Service", desc: "Select from doctor consultation, lab tests, or pharmacy delivery based on your personal health needs." },
    { step: "02", title: "Book in a Few Taps", desc: "Pick your preferred time slot, patient profile, and secure digital payment mode with instant confirmation." },
    { step: "03", title: "Get Care at Home", desc: "Experience instant HD video rooms, doorstep sample collection, and rapid medicine delivery with live tracking." },
  ];

  return (
    <section className="py-[96px] bg-white relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Animated Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <AnimatedHeading 
            text="How Mrmedics Works for You"
            highlightWords={["Mrmedics", "Works"]}
            className="text-[36px] font-extrabold text-[#0A1A45] mb-3 block"
          />
          <AnimatedParagraph className="text-[16px] text-[#475569]">
            Get world-class healthcare delivered seamlessly in 3 simple, transparent steps.
          </AnimatedParagraph>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-10 relative">
          
          {/* Animated Glowing Connecting Line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[3px] bg-gradient-to-r from-blue-300 via-teal-300 to-blue-300 z-0 origin-left" 
          />

          {steps.map((s, idx) => (
            <FadeInBlock key={idx} delay={idx * 0.2}>
              <motion.div 
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative z-10 bg-[#F2F7FF] p-8 rounded-3xl border border-blue-50 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all h-full"
              >
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                  className="w-16 h-16 rounded-2xl health-gradient text-white flex items-center justify-center text-2xl font-extrabold mb-6 shadow-lg shadow-blue-500/20 cursor-pointer"
                >
                  {s.step}
                </motion.div>
                <h3 className="text-xl font-bold text-[#0A1A45] mb-3">{s.title}</h3>
                <p className="text-[#475569] text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            </FadeInBlock>
          ))}
        </div>

      </div>
    </section>
  );
}
