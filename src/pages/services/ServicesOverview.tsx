import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  TestTube, 
  Pill, 
  Sparkles, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Award,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';
import Hero3D from '../../components/Hero3D';
import { 
  AnimatedHeading, 
  AnimatedParagraph, 
  AnimatedBadge, 
  FadeInBlock, 
  AnimatedNumber 
} from '../../components/AnimatedTypography';

export default function ServicesOverview() {
  const services = [
    { 
      title: "Doctor Consultation", 
      path: "/services/doctor-consultation", 
      desc: "Connect with verified NMC-registered doctors across 50+ specialties via HD video, audio call, instant chat, or clinic visits.",
      icon: Stethoscope,
      badge: "50+ Specialties",
      stats: "Under 15 Mins Response",
      accent: "from-blue-600 to-cyan-500"
    },
    { 
      title: "Lab Tests & Diagnostics", 
      path: "/services/lab-tests", 
      desc: "500+ tests and comprehensive health packages with certified phlebotomists collecting samples at home. Reports in 4 hrs.",
      icon: TestTube,
      badge: "Free Home Collection",
      stats: "4-Hour Fast Reports",
      accent: "from-teal-600 to-emerald-500"
    },
    { 
      title: "Online Pharmacy", 
      path: "/services/medicines", 
      desc: "100% genuine medicines delivered directly to your doorstep. Prescription verification, automated refill alerts, and savings.",
      icon: Pill,
      badge: "Genuine Medicines",
      stats: "Up to 20% Off",
      accent: "from-blue-600 to-indigo-600"
    },
    { 
      title: "AI Symptom Checker", 
      path: "/services/ai-symptom-checker", 
      desc: "Describe your symptoms to receive instant clinical-grade triage, suggested specialist consultations, and recommended diagnostic tests.",
      icon: Sparkles,
      badge: "Instant Clinical AI",
      stats: "Free 24/7 Access",
      accent: "from-purple-600 to-pink-500"
    },
    { 
      title: "Health Records Vault", 
      path: "/services/health-records", 
      desc: "256-bit encrypted digital vault for all prescriptions, lab reports, and vitals. Manage your entire family's health under one account.",
      icon: FileText,
      badge: "256-Bit Encrypted",
      stats: "DPDP Compliant",
      accent: "from-cyan-600 to-blue-600"
    },
  ];

  const highlights = [
    { label: "Medical Specialties", value: 50, suffix: "+", icon: Award },
    { label: "Lab Tests Available", value: 500, suffix: "+", icon: TestTube },
    { label: "Happy Patients Served", value: 100, suffix: "k+", icon: ShieldCheck },
    { label: "Fast Report Turnaround", value: 4, suffix: " Hours", icon: Clock },
  ];

  return (
    <div className="bg-white">
      {/* Hero with DNA Helix background */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFF] to-[#FFFFFF] py-8 sm:py-12 lg:py-16 border-b border-blue-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative z-10">
            <AnimatedBadge className="bg-blue-100/80 text-[#1769E0] mb-5" icon={Zap}>
              Complete Healthcare Ecosystem
            </AnimatedBadge>

            <AnimatedHeading
              text="Explore Our Full Spectrum of Clinical Services"
              highlightWords={["Full", "Spectrum", "Clinical", "Services"]}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A1A45] mb-6 leading-[1.15]"
              as="h1"
            />

            <AnimatedParagraph
              delay={0.2}
              className="text-base text-[#475569] leading-relaxed mb-8 max-w-xl"
            >
              From prompt doctor consultations and NABL diagnostics to doorstep medicine delivery and AI guidance — Mr Medics unifies every health requirement into a single, intuitive patient platform.
            </AnimatedParagraph>

            <FadeInBlock delay={0.35} className="flex flex-wrap items-center gap-4">
              <Link
                to="/services/doctor-consultation"
                className="px-6 py-3.5 rounded-2xl health-gradient text-white font-bold text-sm shadow-lg shadow-blue-900/20 hover:scale-[1.02] transition-transform flex items-center gap-2"
              >
                <span>Consult a Doctor</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services/lab-tests"
                className="px-6 py-3.5 rounded-2xl bg-white border border-blue-200 text-[#0A1A45] font-bold text-sm hover:border-[#1769E0] hover:bg-blue-50/50 transition-all flex items-center gap-2"
              >
                <span>Book Lab Test</span>
                <TestTube className="w-4 h-4 text-[#0FB5A0]" />
              </Link>
            </FadeInBlock>
          </div>

          <div className="h-[380px] w-full hidden lg:block relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-50/50 to-transparent pointer-events-none" />
            <Hero3D />
          </div>
        </div>
      </section>

      {/* Metrics Strip */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <FadeInBlock
                  key={i}
                  delay={0.1 * i}
                  className="bg-[#F2F7FF] p-6 rounded-2xl border border-blue-100/80 flex items-center gap-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl health-gradient text-white flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#0A1A45]">
                      <AnimatedNumber value={h.value} suffix={h.suffix} />
                    </div>
                    <div className="text-xs font-semibold text-[#475569]">{h.label}</div>
                  </div>
                </FadeInBlock>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-8 sm:py-12 lg:py-16 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <AnimatedBadge className="bg-emerald-50 text-[#0FB5A0] mb-3" icon={ShieldCheck}>
            Patient-Centric Care
          </AnimatedBadge>
          <AnimatedHeading
            text="Choose What You Need Today"
            highlightWords={["Need", "Today"]}
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A1A45] mb-4"
          />
          <AnimatedParagraph className="text-base text-[#475569]">
            Click any service to view comprehensive features, instant pricing, and seamless one-tap booking.
          </AnimatedParagraph>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <FadeInBlock key={s.path} delay={idx * 0.1}>
                <Link 
                  to={s.path} 
                  className="h-full p-8 bg-[#F2F7FF] rounded-3xl border border-blue-100 shadow-lg shadow-blue-900/5 hover:shadow-2xl hover:border-blue-300 hover:-translate-y-1.5 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl health-gradient text-white flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="px-3.5 py-1.5 bg-white rounded-full text-xs font-bold text-[#1769E0] shadow-sm border border-blue-50">
                        {s.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#0A1A45] mb-3 group-hover:text-[#1769E0] transition-colors">
                      {s.title}
                    </h3>
                    
                    <p className="text-sm text-[#475569] mb-6 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#0FB5A0] mb-4">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{s.stats}</span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-200/70 text-sm font-bold text-[#1769E0] group-hover:text-[#0A1A45] transition-colors">
                      <span>Explore service details</span>
                      <motion.div 
                        className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm"
                        whileHover={{ x: 4 }}
                      >
                        <ArrowRight className="w-4 h-4 text-[#1769E0]" />
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </FadeInBlock>
            );
          })}
        </div>
      </section>

      {/* Assurance Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-[#F2F7FF] to-white border-t border-blue-100/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-blue-100 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-xs font-extrabold tracking-wider uppercase text-[#1769E0] mb-2 block">
                Mr Medics Standard of Care
              </span>
              <AnimatedHeading
                text="100% NABL Accredited & NMC Certified Providers"
                highlightWords={["NABL", "Accredited", "NMC", "Certified"]}
                className="text-2xl sm:text-3xl font-extrabold text-[#0A1A45] mb-3"
              />
              <AnimatedParagraph className="text-sm text-[#475569] leading-relaxed">
                Every consultation, diagnostic test, and prescription through Mr Medics meets strict regulatory protocols, ensuring unmatched safety, accuracy, and patient trust.
              </AnimatedParagraph>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <Link
                to="/contact"
                className="px-6 py-3.5 rounded-2xl health-gradient text-white font-bold text-sm shadow-md hover:scale-105 transition-transform"
              >
                Contact Care Desk
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
