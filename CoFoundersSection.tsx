import { motion } from 'motion/react';
import { Users, ShieldCheck } from 'lucide-react';
import { AnimatedHeading, AnimatedParagraph, AnimatedBadge } from './AnimatedTypography';

interface CoFounder {
  name: string;
  role: string;
  company: string;
  image: string;
  bio: string;
}

const CO_FOUNDERS: CoFounder[] = [
  {
    name: "Dev Man",
    role: "Co-Founder",
    company: "Mr Medics",
    image: "/assets/dev.jpg",
    bio: "Dedicated to modernizing India's healthcare infrastructure through technology, ensuring accessible and efficient medical solutions for every citizen."
  },
  {
    name: "Babita Bharti",
    role: "Co-Founder",
    company: "Mr Medics",
    image: "/assets/babita.jpg",
    bio: "Championing a patient-first approach, focused on delivering compassionate, quality, and transparent healthcare services to all families."
  }
];

export default function CoFoundersSection() {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-white via-[#F8FAFF] to-[#F2F7FF] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <AnimatedBadge icon={Users} className="bg-blue-50 text-[#1769E0] mb-3">
            Leadership Team
          </AnimatedBadge>
          
          <AnimatedHeading 
            text="Meet Our Co-Founders"
            highlightWords={["Co-Founders"]}
            highlightClass="health-gradient-text"
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A1A45] mb-3 tracking-tight"
            as="h2"
          />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Individual Co-Founder Cards */}
          {CO_FOUNDERS.map((founder, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-blue-100 shadow-md hover:shadow-lg transition flex flex-col items-center text-center h-full"
            >
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-slate-100 shadow-inner">
                <img 
                  src={founder.image} 
                  alt={founder.name} 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              
              <div className="flex items-center gap-1.5 mb-1">
                <h3 className="text-xl font-bold text-[#0A1A45]">{founder.name}</h3>
                <ShieldCheck className="w-5 h-5 text-[#0FB5A0]" />
              </div>
              <p className="text-sm font-bold text-[#1769E0] mb-4">{founder.role} • {founder.company}</p>
              
              <div className="mt-auto bg-blue-50/50 p-4 rounded-2xl border border-blue-100 italic text-sm text-[#475569] leading-relaxed">
                "{founder.bio}"
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
