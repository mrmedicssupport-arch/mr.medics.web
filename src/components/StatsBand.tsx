import { motion } from 'motion/react';
import { AnimatedNumber } from './AnimatedTypography';

export default function StatsBand() {
  const stats = [
    { value: 50, suffix: "+", label: "Medical Specialties" },
    { value: 500, suffix: "+", label: "Lab Tests & Packages" },
    { value: 100, suffix: "k+", label: "Happy Patients" },
    { value: 4, suffix: " hrs", label: "Fast Reports" },
  ];

  return (
    <section className="bg-[#0A1A45] py-20 text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-teal-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center relative z-10">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.12 }}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center cursor-default"
          >
            <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-2 health-gradient-text tracking-tight">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="text-sm font-semibold text-[#CBD5E1] uppercase tracking-wider">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
