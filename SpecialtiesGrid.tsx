import { useState } from 'react';
import { Stethoscope, Heart, Activity, Baby, Bone, UserCheck, Eye, Brain, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { AnimatedHeading, AnimatedParagraph } from './AnimatedTypography';

export default function SpecialtiesGrid() {
  const [showAll, setShowAll] = useState(false);

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
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-16">
          <AnimatedHeading 
            text="Consult Verified Medical Specialists"
            highlightWords={["Medical", "Specialists"]}
            className="text-[24px] sm:text-[26px] md:text-[36px] font-extrabold text-[#0A1A45] mb-2 md:mb-3 block leading-tight"
          />
          <AnimatedParagraph className="text-[14px] sm:text-[16px] text-[#475569] leading-normal md:leading-relaxed">
            Instant appointments with experienced, NMC-registered doctors across 50+ specialized fields.
          </AnimatedParagraph>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
          {specialties.map((spec, idx) => {
            const Icon = spec.icon;
            const isHiddenOnMobile = !showAll && idx >= 4;

            return (
              <div 
                key={idx} 
                className={`${isHiddenOnMobile ? 'hidden sm:block' : 'block'} h-full`}
              >
                <Link 
                  to="/doctors"
                  className="block h-full"
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-[#F2F7FF] p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl border border-blue-50 text-center flex flex-col items-center hover:bg-blue-50 hover:border-blue-200 transition-all group h-full"
                  >
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl health-gradient text-white flex items-center justify-center mb-2.5 sm:mb-4 shadow-sm shadow-blue-500/20">
                      <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                    </div>
                    <h3 className="text-xs sm:text-base font-bold text-[#0A1A45] mb-0.5 sm:mb-1 group-hover:text-[#1769E0] transition-colors leading-snug">{spec.name}</h3>
                    <p className="text-[10px] sm:text-xs text-[#475569]">{spec.count}</p>
                  </motion.div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* View All Toggle on Mobile */}
        <div className="mt-4 text-center sm:hidden">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 text-[#0A1A45] font-bold text-xs"
          >
            <span>{showAll ? 'Show Fewer' : 'View All Specialties (8)'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAll ? 'rotate-180' : ''}`} />
          </button>
        </div>

      </div>
    </section>
  );
}
