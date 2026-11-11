import { ShieldCheck, TestTube, Pill, FileText, Clock, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { AnimatedHeading, AnimatedParagraph, AnimatedBadge } from './AnimatedTypography';

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Doctors",
    desc: "Consult NMC-registered doctors by video or in clinic."
  },
  {
    icon: TestTube,
    title: "Trusted Lab Tests",
    desc: "NABL-accredited labs with free home sample pickup."
  },
  {
    icon: Pill,
    title: "Genuine Medicines",
    desc: "Order from licensed pharmacies, delivered to your door."
  },
  {
    icon: FileText,
    title: "Health Records",
    desc: "Keep your prescriptions and reports safe in one place."
  },
  {
    icon: Clock,
    title: "24/7 Support",
    desc: "Reach us anytime on call or WhatsApp."
  },
  {
    icon: MapPin,
    title: "Made in India",
    desc: "Based in Noida, Uttar Pradesh. Health Beyond Border."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-8 sm:py-12 lg:py-16 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <AnimatedBadge icon={Sparkles} className="bg-blue-50 text-[#1769E0] mb-3 text-xs">
            Why Mr Medics
          </AnimatedBadge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A1A45] mb-3">
            <AnimatedHeading 
              text="Healthcare You Can Trust"
              highlightWords={["Trust"]}
              highlightClass="health-gradient-text"
              as="span"
            />
          </h2>
          <AnimatedParagraph className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Doctors, labs and pharmacy in one simple app.
          </AnimatedParagraph>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="bg-[#F2F7FF] border border-blue-100 rounded-2xl p-5 sm:p-6 transition-all shadow-sm hover:shadow-lg flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl health-gradient text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#0A1A45] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#475569] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
