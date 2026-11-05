import { Stethoscope, TestTube, Pill, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { AnimatedHeading, AnimatedParagraph, FadeInBlock } from './AnimatedTypography';

export default function ServicesSection() {
  const services = [
    {
      title: "Doctor Consultation",
      desc: "Connect with verified specialists across 50+ departments instantly via video, audio, or in-clinic visits.",
      icon: Stethoscope,
      path: "/services/doctor-consultation",
      bullets: ["Video, audio & chat modes", "50+ medical specialties", "Instant digital prescription"]
    },
    {
      title: "Book Lab Tests",
      desc: "Schedule 500+ diagnostic tests and comprehensive health packages with free home sample collection.",
      icon: TestTube,
      path: "/services/lab-tests",
      bullets: ["Free home sample pickup", "NABL certified laboratories", "Accurate reports within 4 hrs"]
    },
    {
      title: "Order Medicines",
      desc: "Get authentic prescription and over-the-counter medicines delivered right to your doorstep with live tracking.",
      icon: Pill,
      path: "/services/medicines",
      bullets: ["100% genuine medicines", "Prescription verification", "Fast doorstep delivery"]
    },
  ];

  return (
    <section className="py-[96px] bg-[#F2F7FF] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header with animated typography */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <AnimatedHeading 
            text="Our Core Healthcare Services"
            highlightWords={["Core", "Healthcare"]}
            className="text-[36px] font-extrabold text-[#0A1A45] mb-3 block"
          />
          <AnimatedParagraph className="text-[16px] text-[#475569]">
            Everything you need for your family's health and wellness in one unified, patient-first platform.
          </AnimatedParagraph>
        </div>

        {/* 3 Big White Cards with Stagger and 3D Tilt */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <FadeInBlock key={idx} delay={idx * 0.15}>
                <motion.div 
                  whileHover={{ y: -10, rotateX: 2, rotateY: 2, boxShadow: "0 25px 30px -5px rgba(23, 105, 224, 0.15)" }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-8 rounded-3xl shadow-xl shadow-blue-900/5 border border-slate-100 flex flex-col justify-between group h-full"
                >
                  <div>
                    <div className="w-16 h-16 rounded-2xl health-gradient text-white flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0A1A45] mb-3 group-hover:text-[#1769E0] transition-colors">{s.title}</h3>
                    <p className="text-[#475569] text-sm mb-6 leading-relaxed">{s.desc}</p>
                    
                    <ul className="space-y-3 mb-8">
                      {s.bullets.map((b, bIdx) => (
                        <motion.li 
                          key={bIdx} 
                          whileHover={{ x: 4 }}
                          className="flex items-center gap-2.5 text-sm font-semibold text-[#0A1A45]"
                        >
                          <div className="w-5 h-5 rounded-full bg-blue-50 text-[#1769E0] flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3" />
                          </div>
                          <span>{b}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <Link 
                    to={s.path}
                    className="inline-flex items-center gap-2 text-[#1769E0] font-bold text-sm group-hover:gap-3 transition-all pt-4 border-t border-slate-100"
                  >
                    <span>Explore details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </FadeInBlock>
            );
          })}
        </div>

      </div>
    </section>
  );
}
