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
    <section className="py-10 md:py-[96px] bg-[#F2F7FF] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        
        {/* Section Header with animated typography */}
        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-16">
          <AnimatedHeading 
            text="Our Core Healthcare Services"
            highlightWords={["Core", "Healthcare"]}
            className="text-[24px] sm:text-[26px] md:text-[36px] font-extrabold text-[#0A1A45] mb-2 md:mb-3 block leading-tight"
          />
          <AnimatedParagraph className="text-[14px] sm:text-[16px] text-[#475569] leading-normal md:leading-relaxed">
            Everything you need for your family's health and wellness in one unified, patient-first platform.
          </AnimatedParagraph>
        </div>

        {/* 3 Cards: Horizontal Swipeable Carousel on Mobile, 3-Col Grid on Desktop */}
        <div className="flex md:grid md:grid-cols-3 gap-3 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 pb-3 md:pb-0">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="w-[82vw] sm:w-[320px] md:w-auto shrink-0 snap-start h-full">
                <motion.div 
                  whileHover={{ y: -6 }}
                  className="bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-md md:shadow-xl shadow-blue-900/5 border border-slate-100 flex flex-col justify-between group h-full"
                >
                  <div>
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl health-gradient text-white flex items-center justify-center mb-4 md:mb-6 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <h3 className="text-lg md:text-2xl font-bold text-[#0A1A45] mb-2 md:mb-3 group-hover:text-[#1769E0] transition-colors">{s.title}</h3>
                    <p className="text-[#475569] text-xs md:text-sm mb-4 md:mb-6 leading-relaxed line-clamp-2 md:line-clamp-none">{s.desc}</p>
                    
                    <ul className="space-y-2 md:space-y-3 mb-5 md:mb-8">
                      {s.bullets.map((b, bIdx) => (
                        <li 
                          key={bIdx} 
                          className="flex items-center gap-2 text-xs md:text-sm font-semibold text-[#0A1A45]"
                        >
                          <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-blue-50 text-[#1769E0] flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 md:w-3 md:h-3" />
                          </div>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link 
                    to={s.path}
                    className="inline-flex items-center gap-1.5 md:gap-2 text-[#1769E0] font-bold text-xs md:text-sm pt-3 md:pt-4 border-t border-slate-100"
                  >
                    <span>Explore details</span>
                    <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </Link>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
