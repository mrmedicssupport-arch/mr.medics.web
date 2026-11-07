import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { AnimatedHeading, AnimatedParagraph, FadeInBlock } from './AnimatedTypography';

export default function HealthPackages() {
  const packages = [
    { name: "Comprehensive Full Body Checkup", tests: "75+ Tests Included", price: "₹1,499", originalPrice: "₹3,000", discount: "50% OFF", popular: true },
    { name: "Advanced Heart Health Panel", tests: "45+ Cardiac Tests", price: "₹1,199", originalPrice: "₹2,400", discount: "50% OFF", popular: false },
    { name: "Diabetes Care & Sugar Profile", tests: "30+ Metabolic Tests", price: "₹899", originalPrice: "₹1,800", discount: "50% OFF", popular: false },
    { name: "Women's Wellness Executive Panel", tests: "60+ Essential Tests", price: "₹1,299", originalPrice: "₹2,600", discount: "50% OFF", popular: true },
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-[#F2F7FF]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-16">
          <AnimatedHeading 
            text="Popular Preventive Health Packages"
            highlightWords={["Popular", "Health", "Packages"]}
            className="text-[24px] sm:text-[26px] md:text-[36px] font-extrabold text-[#0A1A45] mb-2 md:mb-3 block leading-tight"
          />
          <AnimatedParagraph className="text-[14px] sm:text-[16px] text-[#475569] leading-normal md:leading-relaxed">
            Comprehensive diagnostic checkups designed to detect early risks and safeguard your whole family.
          </AnimatedParagraph>
        </div>

        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 pb-3 sm:pb-0">
          {packages.map((pkg, idx) => (
            <div key={idx} className="w-[80vw] sm:w-auto shrink-0 snap-start h-full">
              <motion.div 
                whileHover={{ y: -6 }}
                className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-md sm:shadow-xl shadow-blue-900/5 border border-slate-100 flex flex-col justify-between relative overflow-hidden h-full group"
              >
                {pkg.popular && (
                  <span className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white text-[9px] sm:text-[10px] font-extrabold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Popular</span>
                  </span>
                )}
                <div>
                  <span className="text-[11px] sm:text-xs font-bold text-[#1769E0] block mb-1 sm:mb-2">{pkg.tests}</span>
                  <h3 className="text-base sm:text-lg font-bold text-[#0A1A45] mb-3 group-hover:text-[#1769E0] transition-colors leading-snug">{pkg.name}</h3>
                  <div className="flex items-baseline gap-2 mb-1.5 sm:mb-2">
                    <span className="text-xl sm:text-2xl font-extrabold text-[#0A1A45]">{pkg.price}</span>
                    <span className="text-xs text-slate-400 line-through">{pkg.originalPrice}</span>
                    <span className="text-[10px] sm:text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-md">{pkg.discount}</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#475569] mb-4 sm:mb-6">✓ Free Home Sample Collection included</p>
                </div>

                <Link 
                  to="/services/lab-tests"
                  className="w-full py-2.5 sm:py-3 rounded-xl health-gradient text-white font-bold text-xs sm:text-sm text-center shadow-sm hover:shadow-md transition block"
                >
                  Book Package
                </Link>
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
