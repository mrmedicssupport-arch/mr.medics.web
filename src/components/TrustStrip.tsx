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
    <section className="bg-white py-16 border-b border-slate-100 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="flex items-center gap-4 p-5 rounded-2xl bg-[#F2F7FF]/70 border border-blue-50 shadow-sm hover:shadow-md transition-all cursor-default group"
            >
              <div className="w-12 h-12 rounded-xl health-gradient text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <motion.h4 
                  className="text-sm font-bold text-[#0A1A45] group-hover:text-[#1769E0] transition-colors"
                >
                  {item.title}
                </motion.h4>
                <p className="text-xs text-[#475569]">{item.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
