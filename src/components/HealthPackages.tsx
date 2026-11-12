import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { AnimatedHeading, AnimatedParagraph } from './AnimatedTypography';
import { getPopularPackages, getPatientPrice } from '../data/labTests';

export default function HealthPackages() {
  const popularPackages = getPopularPackages(4);

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-[#F2F7FF]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-12">
          <AnimatedHeading 
            text="Popular Preventive Health Packages"
            highlightWords={["Popular", "Health", "Packages"]}
            className="text-[24px] sm:text-[26px] md:text-[36px] font-extrabold text-[#0A1A45] mb-2 md:mb-3 block leading-tight"
          />
          <AnimatedParagraph className="text-[14px] sm:text-[16px] text-[#475569] leading-normal md:leading-relaxed">
            Comprehensive diagnostic checkups designed to detect early risks and safeguard your whole family.
          </AnimatedParagraph>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {popularPackages.map((pkg, idx) => {
            const price = getPatientPrice(pkg);
            const includesList = pkg.includes ? pkg.includes.split(',').map(s => s.trim()) : [];

            return (
              <motion.div 
                key={pkg.id}
                whileHover={{ y: -4 }}
                className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between relative overflow-hidden h-full group"
              >
                {idx === 0 && (
                  <span className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Most Popular</span>
                  </span>
                )}
                <div>
                  <span className="text-xs font-bold text-[#1769E0] block mb-1 uppercase tracking-wider">
                    {pkg.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#0A1A45] mb-2 group-hover:text-[#1769E0] transition-colors leading-snug">
                    {pkg.name}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl font-extrabold text-[#0A1A45]">₹{price}</span>
                    <span className="text-xs font-semibold text-[#0FB5A0] bg-teal-50 px-2 py-0.5 rounded-md">
                      Free Home Collection
                    </span>
                  </div>

                  {includesList.length > 0 && (
                    <div className="mb-4">
                      <p className="text-[11px] font-bold text-slate-400 uppercase mb-1.5">Includes {includesList.length} Tests:</p>
                      <div className="flex flex-wrap gap-1">
                        {includesList.slice(0, 5).map((inc, i) => (
                          <span key={i} className="text-[11px] bg-blue-50 text-[#1769E0] font-medium px-2 py-0.5 rounded border border-blue-100">
                            {inc}
                          </span>
                        ))}
                        {includesList.length > 5 && (
                          <span className="text-[11px] text-slate-500 font-medium px-1 py-0.5">
                            +{includesList.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-[#475569] mb-4 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-[#0FB5A0]" />
                    <span>Reports in {pkg.turnaround}</span>
                  </p>
                </div>

                <Link 
                  to="/services/lab-tests"
                  className="w-full min-h-[44px] py-2.5 rounded-xl health-gradient text-white font-bold text-xs sm:text-sm text-center shadow-md hover:shadow-lg transition flex items-center justify-center gap-1.5"
                >
                  <span>Book Package</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
