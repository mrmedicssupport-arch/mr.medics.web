import { motion } from 'motion/react';
import { AnimatedNumber } from './AnimatedTypography';
import { platformStats } from '../data/content';

export default function StatsBand() {
  const stats = platformStats;

  return (
    <section className="bg-[#0A1A45] py-8 md:py-20 text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="hidden md:block absolute top-0 left-1/4 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] pointer-events-none" />
      <div className="hidden md:block absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-teal-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-10 text-center relative z-10">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-white/5 md:bg-transparent border border-white/5 md:border-none cursor-default"
          >
            <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-1 md:mb-2 health-gradient-text tracking-tight">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-[#CBD5E1] uppercase tracking-wider">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
