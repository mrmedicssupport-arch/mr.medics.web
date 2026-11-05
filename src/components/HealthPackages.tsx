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
    <section className="py-[96px] bg-[#F2F7FF]">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <AnimatedHeading 
            text="Popular Preventive Health Packages"
            highlightWords={["Popular", "Health", "Packages"]}
            className="text-[36px] font-extrabold text-[#0A1A45] mb-3 block"
          />
          <AnimatedParagraph className="text-[16px] text-[#475569]">
            Comprehensive diagnostic checkups designed to detect early risks and safeguard your whole family.
          </AnimatedParagraph>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg, idx) => (
            <FadeInBlock key={idx} delay={idx * 0.12}>
              <motion.div 
                whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 25px -5px rgba(23, 105, 224, 0.12)" }}
                className="bg-white p-6 rounded-3xl shadow-xl shadow-blue-900/5 border border-slate-100 flex flex-col justify-between relative overflow-hidden h-full group"
              >
                {pkg.popular && (
                  <motion.span 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1"
                  >
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Popular</span>
                  </motion.span>
                )}
                <div>
                  <span className="text-xs font-bold text-[#1769E0] block mb-2">{pkg.tests}</span>
                  <h3 className="text-lg font-bold text-[#0A1A45] mb-4 group-hover:text-[#1769E0] transition-colors">{pkg.name}</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-2xl font-extrabold text-[#0A1A45]">{pkg.price}</span>
                    <span className="text-xs text-slate-400 line-through">{pkg.originalPrice}</span>
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">{pkg.discount}</span>
                  </div>
                  <p className="text-[11px] text-[#475569] mb-6">✓ Free Home Sample Collection included</p>
                </div>

                <Link 
                  to="/services/lab-tests"
                  className="w-full py-3 rounded-xl health-gradient text-white font-bold text-sm text-center shadow-md hover:shadow-lg transition block hover:scale-[1.02] active:scale-[0.98]"
                >
                  Book Package
                </Link>
              </motion.div>
            </FadeInBlock>
          ))}
        </div>

      </div>
    </section>
  );
}
