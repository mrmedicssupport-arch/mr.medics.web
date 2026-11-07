import { Award, ShieldCheck, CheckCircle, HeartHandshake } from 'lucide-react';
import { motion } from 'motion/react';

export default function TrustStrip() {
  const items = [
    { title: "NMC-Registered Doctors", desc: "Verified medical council records", icon: Award },
    { title: "NABL-Accredited Labs", desc: "100% precise diagnostic testing", icon: ShieldCheck },
    { title: "Licensed Pharmacies", desc: "Certified medicine retailers", icon: CheckCircle },
    { title: "100% Genuine Medicines", desc: "Sourced directly from manufacturers", icon: HeartHandshake },
  ];

  return (
    <section className="bg-white py-6 md:py-16 border-b border-slate-100 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              whileHover={{ y: -4 }}
              className="flex items-center gap-2.5 sm:gap-4 p-3 sm:p-5 rounded-2xl bg-[#F2F7FF]/70 border border-blue-50 shadow-sm transition-all cursor-default group"
            >
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl health-gradient text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/20">
                <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-[#0A1A45] group-hover:text-[#1769E0] transition-colors truncate sm:whitespace-normal">
                  {item.title}
                </h4>
                <p className="text-[10px] sm:text-xs text-[#475569] truncate sm:whitespace-normal">{item.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
