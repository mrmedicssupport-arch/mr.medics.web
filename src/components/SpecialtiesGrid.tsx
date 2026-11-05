import { Stethoscope, Heart, Activity, Baby, Bone, UserCheck, Eye, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { AnimatedHeading, AnimatedParagraph, FadeInBlock } from './AnimatedTypography';

export default function SpecialtiesGrid() {
  const specialties = [
    { name: "General Physician", icon: Stethoscope, count: "50+ Doctors" },
    { name: "Cardiologist", icon: Heart, count: "25+ Doctors" },
    { name: "Diabetologist", icon: Activity, count: "30+ Doctors" },
    { name: "Pediatrician", icon: Baby, count: "40+ Doctors" },
    { name: "Orthopedic", icon: Bone, count: "35+ Doctors" },
    { name: "Gynaecologist", icon: UserCheck, count: "45+ Doctors" },
    { name: "ENT Specialist", icon: Eye, count: "20+ Doctors" },
    { name: "Neurologist", icon: Brain, count: "15+ Doctors" },
  ];

  return (
    <section className="py-[96px] bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <AnimatedHeading 
            text="Consult Verified Medical Specialists"
            highlightWords={["Medical", "Specialists"]}
            className="text-[36px] font-extrabold text-[#0A1A45] mb-3 block"
          />
          <AnimatedParagraph className="text-[16px] text-[#475569]">
            Instant appointments with experienced, NMC-registered doctors across 50+ specialized fields.
          </AnimatedParagraph>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {specialties.map((spec, idx) => {
            const Icon = spec.icon;
            return (
              <FadeInBlock key={idx} delay={idx * 0.08}>
                <Link 
                  to="/doctors"
                  className="block h-full"
                >
                  <motion.div
                    whileHover={{ y: -8, scale: 1.04, boxShadow: "0 15px 25px -5px rgba(23, 105, 224, 0.12)" }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#F2F7FF] p-6 rounded-3xl border border-blue-50 text-center flex flex-col items-center hover:bg-blue-50 hover:border-blue-200 transition-all group h-full"
                  >
                    <motion.div 
                      whileHover={{ rotate: 12, scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-14 h-14 rounded-2xl health-gradient text-white flex items-center justify-center mb-4 shadow-md shadow-blue-500/20"
                    >
                      <Icon className="w-7 h-7" />
                    </motion.div>
                    <h3 className="text-base font-bold text-[#0A1A45] mb-1 group-hover:text-[#1769E0] transition-colors">{spec.name}</h3>
                    <p className="text-xs text-[#475569]">{spec.count}</p>
                  </motion.div>
                </Link>
              </FadeInBlock>
            );
          })}
        </div>

      </div>
    </section>
  );
}
