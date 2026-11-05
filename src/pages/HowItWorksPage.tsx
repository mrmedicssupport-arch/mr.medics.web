import { useState } from 'react';
import { CheckCircle2, ShieldCheck, Stethoscope, TestTube, Pill, ArrowRight, UserCheck, Award, HeartPulse, Clock, Lock, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import Hero3D from '../components/Hero3D';
import { config } from '../config';
import { AnimatedHeading, AnimatedParagraph, AnimatedBadge, FadeInBlock } from '../components/AnimatedTypography';

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState<'patient' | 'partner'>('patient');

  const detailedPatientSteps = [
    {
      num: "01",
      title: "Discover & Choose Your Care",
      desc: "Browse through 50+ medical specialties, 500+ diagnostic lab tests, or upload prescriptions for genuine medicines. Our intuitive platform helps you find the right care instantly.",
      icon: Stethoscope
    },
    {
      num: "02",
      title: "Transparent Booking & Scheduling",
      desc: "Pick your convenient time slot, select online video/audio or in-clinic visit, and enjoy transparent pricing with zero hidden charges.",
      icon: Clock
    },
    {
      num: "03",
      title: "Seamless Delivery & Consultation",
      desc: "Connect via secure HD video rooms with NMC doctors, get free home sample collection by NABL phlebotomists, and receive rapid medicine delivery.",
      icon: TestTube
    },
    {
      num: "04",
      title: "Secure Lifetime Health Vault",
      desc: "All your digital prescriptions, lab reports, and family health profiles are securely stored with 256-bit encryption for effortless future access.",
      icon: Lock
    }
  ];

  const partnerSteps = [
    {
      num: "01",
      title: "Professional Application",
      desc: "Doctors, diagnostic laboratories, and pharmacies submit their credentials, NMC registration numbers, NABL certificates, and drug licences.",
      icon: UserCheck
    },
    {
      num: "02",
      title: "Rigorous Admin Verification",
      desc: "Our quality and compliance team thoroughly verifies every medical credential, background history, and establishment licence before approval.",
      icon: ShieldCheck
    },
    {
      num: "03",
      title: "Activation & Practice Growth",
      desc: "Partners go live on the platform to receive verified patient appointments, manage digital queues, upload diagnostic reports, and fulfil orders.",
      icon: Award
    }
  ];

  return (
    <div className="bg-white">
      
      {/* Hero with Animated Typography & 3D DNA Helix */}
      <section className="bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFF] to-[#FFFFFF] py-16 border-b border-slate-100 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <AnimatedBadge icon={Sparkles} className="bg-blue-50 text-[#1769E0] mb-4">
              Our Vision & Operational Excellence
            </AnimatedBadge>
            <h1 className="text-[40px] sm:text-[50px] font-extrabold text-[#0A1A45] mb-6 leading-tight">
              <AnimatedHeading 
                text="How Mrmedics Delivers Superior Healthcare"
                highlightWords={["Mrmedics", "Superior"]}
                highlightClass="health-gradient-text"
                as="span"
              />
            </h1>
            <AnimatedParagraph className="text-lg text-[#475569] mb-8 leading-relaxed font-normal">
              We are on a mission to redefine digital healthcare under our motto <strong className="text-[#0A1A45]">"Health Beyond Border"</strong> — connecting patients with verified medical excellence and effortless home care.
            </AnimatedParagraph>
            <div className="flex items-center gap-3 p-1.5 bg-slate-100 rounded-2xl w-fit">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab('patient')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'patient' ? 'bg-white text-[#0A1A45] shadow-md' : 'text-[#475569] hover:text-[#0A1A45]'}`}
              >
                Patient Journey
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab('partner')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'partner' ? 'bg-white text-[#0A1A45] shadow-md' : 'text-[#475569] hover:text-[#0A1A45]'}`}
              >
                Partner Onboarding
              </motion.button>
            </div>
          </div>
          <div className="h-[350px] w-full hidden sm:block">
            <Hero3D />
          </div>
        </div>
      </section>

      {/* Vision & Philosophy Section */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <AnimatedHeading 
              text="Why Patients Trust Mrmedics"
              highlightWords={["Trust"]}
              className="text-[32px] font-extrabold text-[#0A1A45] mb-6 block"
            />
            <AnimatedParagraph className="text-base text-[#475569] mb-6 leading-relaxed">
              Traditional healthcare is often fragmented, opaque, and hard to navigate. Mrmedics integrates <strong>Doctor Consultation, NABL Diagnostics, and Licensed Pharmacies</strong> into a single unified ecosystem.
            </AnimatedParagraph>
            <ul className="space-y-4">
              {[
                "100% Vetted Professionals: Every doctor and lab partner is rigorously verified by NMC/NABL.",
                "Zero Hassle Home Collection: Free sample pickups by certified phlebotomists at your door.",
                "Complete Transparency: Clear pricing with no hidden consultation or report fees.",
                "DPDP-Compliant Privacy: Your medical data remains strictly confidential and 256-bit secure."
              ].map((item, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 6 }}
                  className="flex items-start gap-3 text-sm font-bold text-[#0A1A45] cursor-default"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#0FB5A0] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-[#F2F7FF] p-8 sm:p-10 rounded-3xl border border-blue-100 shadow-xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-white px-3 py-2 rounded-xl shadow-sm border border-slate-200">
                <img 
                  src="/assets/aistudio/file_000000003e70821192f55344a196d9e8_50f4da26.png" 
                  alt="Mrmedics Logo" 
                  className="h-10 sm:h-11 w-auto object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0A1A45]">Our Core Promise</h3>
                <p className="text-xs text-[#1769E0]">Health Beyond Border • Your Health, Our Priority</p>
              </div>
            </div>
            <p className="text-sm text-[#475569] leading-relaxed mb-6 font-normal">
              "We believe quality healthcare is a fundamental right. By leveraging advanced technology and trusted medical expertise, we ensure that every patient receives prompt, accurate, and affordable care without borders."
            </p>
            <p className="text-xs font-bold text-[#0A1A45]">— Praveen Verma, Founder & CEO</p>
          </motion.div>
        </div>
      </section>

      {/* Steps Content with Stagger & Animation */}
      <section className="py-[96px] max-w-[1200px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <AnimatedHeading 
            text={activeTab === 'patient' ? "The 4-Step Patient Journey" : "3-Step Partner Verification"}
            highlightWords={["Patient", "Journey", "Partner"]}
            className="text-[36px] font-extrabold text-[#0A1A45] mb-3 block"
          />
          <AnimatedParagraph className="text-[16px] text-[#475569]">
            {activeTab === 'patient' ? 'How we ensure an effortless healthcare experience from booking to recovery.' : 'Our strict compliance protocol ensuring top-tier medical standards.'}
          </AnimatedParagraph>
        </div>

        <div className={`grid ${activeTab === 'patient' ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'} gap-8`}>
          {(activeTab === 'patient' ? detailedPatientSteps : partnerSteps).map((step, idx) => {
            const IconComp = step.icon;
            return (
              <FadeInBlock key={idx} delay={idx * 0.12}>
                <motion.div 
                  whileHover={{ y: -8, scale: 1.03, boxShadow: "0 20px 25px -5px rgba(23, 105, 224, 0.12)" }}
                  className="bg-[#F2F7FF] p-8 rounded-3xl border border-blue-100 flex flex-col justify-between h-full group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl health-gradient text-white flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform">
                        <IconComp className="w-7 h-7" />
                      </div>
                      <span className="text-4xl font-extrabold text-blue-200 group-hover:text-blue-300 transition-colors">{step.num}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#0A1A45] mb-3 group-hover:text-[#1769E0] transition-colors">{step.title}</h3>
                    <p className="text-sm text-[#475569] leading-relaxed mb-6 font-normal">{step.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1769E0] pt-4 border-t border-blue-100">
                    <span>Phase {step.num}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </FadeInBlock>
            );
          })}
        </div>
      </section>

    </div>
  );
}
