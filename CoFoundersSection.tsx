import { motion } from 'motion/react';
import { Users, ShieldCheck } from 'lucide-react';
import { AnimatedHeading, AnimatedBadge } from './AnimatedTypography';

interface CoFounder {
  name: string;
  role: string;
  company: string;
  image: string;
  initials: string;
  vision: string;
  mission: string;
  accent: string;
  labelColor: string;
}

const CO_FOUNDERS: CoFounder[] = [
  {
    name: "Dev Maan",
    role: "Co-Founder",
    company: "Mr Medics",
    image: "/assets/cofounders/dev-maan.jpg",
    initials: "DM",
    vision: "Dev believes that good healthcare should never depend on where a person lives. His vision is a India where a family in a small town gets the same easy access to trusted doctors, diagnostic labs and pharmacies as someone living next to a big hospital, with technology doing the hard work in the background.",
    mission: "At Mr Medics, Dev focuses on building a platform that is fast, reliable and simple to use. His mission is to bring consultations, lab tests and medicines together in one secure place, so that patients spend less time searching and more time getting better.",
    accent: "#1769E0",
    labelColor: "#93C5FD"
  },
  {
    name: "Babita Bharti",
    role: "Co-Founder",
    company: "Mr Medics",
    image: "/assets/cofounders/babita-bharti.jpg",
    initials: "BB",
    vision: "Babita believes that every patient deserves to feel heard, respected and cared for, not just treated. Her vision is a healthcare experience built around people, where patients feel supported from the first question to the final follow-up.",
    mission: "At Mr Medics, Babita works to make quality care clear, transparent and affordable for every family. Her mission is to build trust with patients and with the doctors and partners who serve them, so that care feels honest and personal at every step.",
    accent: "#0FB5A0",
    labelColor: "#5EEAD4"
  }
];

export default function CoFoundersSection() {
  return (
    <section className="py-8 sm:py-12 lg:py-14 bg-[#F2F7FF] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex justify-center mb-3">
            <AnimatedBadge icon={Users} className="bg-white text-[#0A1A45]">
              Our Visionary Leadership
            </AnimatedBadge>
          </div>
          
          <AnimatedHeading 
            text="Meet Our Co-Founders"
            highlightWords={["Co-Founders"]}
            highlightClass="health-gradient-text"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A1A45] tracking-tight"
            as="h2"
          />
        </div>

        {/* Content Layout */}
        <div className="flex flex-col gap-4 sm:gap-6 max-w-4xl mx-auto">
          
          {CO_FOUNDERS.map((founder, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className={`group flex flex-col md:flex-row ${idx === 1 ? 'md:flex-row-reverse' : ''} 
                          items-center rounded-3xl shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden bg-[#0A1A45] p-4 sm:p-6 lg:p-8 gap-4 sm:gap-6`}
            >
              {/* Photo Panel */}
              <div className="w-[180px] sm:w-[200px] md:w-[220px] lg:w-[240px] xl:w-[260px] aspect-[4/5] max-h-[320px] bg-white rounded-2xl overflow-hidden shrink-0 mx-auto md:mx-0 relative">
                <img 
                  src={founder.image} 
                  alt={`${founder.name}, Co-Founder of Mr Medics`}
                  width={900}
                  height={1125}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1769E0] to-[#0FB5A0] text-white text-4xl font-bold">
                        ${founder.initials}
                      </div>
                    `;
                  }}
                />
                <div style={{ backgroundColor: founder.accent }} className="absolute bottom-0 left-0 right-0 h-1" />
              </div>
              
              {/* Details Panel */}
              <div className="flex-1 min-w-0 text-left">
                <div style={{ backgroundColor: founder.accent }} className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3">
                  {founder.role}
                </div>
                
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">{founder.name}</h3>
                
                <div className="flex items-center gap-1.5 text-sm text-[#BFDBFE] mb-4">
                  <ShieldCheck size={16} />
                  <span>{founder.company}</span>
                </div>
                
                <div className="h-px w-full bg-[#1E3A8A] mb-4" />
                
                <div className="flex flex-col gap-4">
                  <div>
                    <h4 style={{ color: founder.labelColor }} className="text-xs font-bold tracking-wide uppercase mb-1">Vision</h4>
                    <p className="text-sm sm:text-[15px] leading-relaxed text-[#E2E8F0]">{founder.vision}</p>
                  </div>
                  <div>
                    <h4 style={{ color: founder.labelColor }} className="text-xs font-bold tracking-wide uppercase mb-1">Mission</h4>
                    <p className="text-sm sm:text-[15px] leading-relaxed text-[#E2E8F0]">{founder.mission}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Text */}
        <div className="text-center mt-10 text-sm sm:text-base text-[#475569]">
          Together, we are building a healthcare platform where trust, care and access come first. Health Beyond Border.
        </div>

      </div>
    </section>
  );
}
