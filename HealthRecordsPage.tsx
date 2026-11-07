import { Link } from 'react-router-dom';
import { 
  FileText, 
  ShieldCheck, 
  Lock, 
  Users, 
  CheckCircle2, 
  Share2, 
  CloudRain, 
  Smartphone, 
  FolderLock, 
  KeyRound, 
  History,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { config } from '../../config';
import { 
  AnimatedHeading, 
  AnimatedParagraph, 
  AnimatedBadge, 
  FadeInBlock 
} from '../../components/AnimatedTypography';

export default function HealthRecordsPage() {
  const benefits = [
    {
      icon: FolderLock,
      title: "Encrypted Cloud Vault",
      desc: "Every lab report, clinical summary, and digital prescription is stored with 256-bit AES encryption, accessible only with your biometric or OTP verification."
    },
    {
      icon: Users,
      title: "Family Health Profiles",
      desc: "Manage health timelines for up to 6 family members under one account — track elderly parents' prescriptions and children's vaccination charts."
    },
    {
      icon: Share2,
      title: "Time-Limited Doctor Sharing",
      desc: "Share your diagnostic history securely with consulting doctors using temporary access links that automatically expire after consultation."
    },
    {
      icon: History,
      title: "Automated Lifetime Timeline",
      desc: "Lab tests and teleconsultation prescriptions booked through Mr Medics are automatically filed into your digital locker with zero manual entry."
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Create Your Patient Profile",
      desc: "Sign up on Mr Medics with your mobile number to instantly establish your private medical vault."
    },
    {
      step: "02",
      title: "Automatic & Manual Archiving",
      desc: "Diagnostic reports and e-prescriptions are auto-synced, or you can photograph past physical paper records."
    },
    {
      step: "03",
      title: "Consent-Driven Access",
      desc: "You retain 100% data sovereignty. Grant and revoke doctor access permissions at any moment with one click."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFF] to-[#FFFFFF] py-8 sm:py-12 lg:py-16 border-b border-blue-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedBadge className="bg-emerald-50 text-[#0FB5A0] mb-4 border border-emerald-100" icon={Lock}>
              256-Bit Encrypted Medical Vault
            </AnimatedBadge>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A1A45] mb-4 md:mb-6 leading-tight">
              <AnimatedHeading
                text="Secure Digital Health Records for You & Your Family"
                highlightWords={["Secure", "Digital", "Health", "Records"]}
                as="span"
              />
            </h1>

            <AnimatedParagraph
              delay={0.2}
              className="text-sm sm:text-base md:text-lg text-[#475569] mb-8 leading-relaxed max-w-2xl mx-auto"
            >
              Organize doctor prescriptions, NABL diagnostic reports, and family immunization timelines in one unified, confidential locker. Always accessible when you need medical care.
            </AnimatedParagraph>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl health-gradient text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Sign in to use health records in the Mr Medics app</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/${config.WHATSAPP_NUMBER}?text=Hello%20Mr%20Medics,%20I%20have%20questions%20about%20digital%20health%20records`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-[#0A1A45] hover:bg-slate-50 font-bold text-sm shadow-sm transition-all"
              >
                Ask on WhatsApp
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-[#0FB5A0]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                DPDP Act 2023 Compliant
              </span>
              <span className="flex items-center gap-1.5">
                <KeyRound className="w-4 h-4" />
                End-to-End Encryption
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                Up to 6 Family Members
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="py-8 sm:py-12 lg:py-16 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <AnimatedBadge icon={ShieldCheck} className="bg-blue-50 text-[#1769E0] mb-3 text-xs">
            Patient Data Privacy
          </AnimatedBadge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A1A45] mb-3">
            Why Store Your Health Records With Mr Medics?
          </h2>
          <p className="text-xs sm:text-sm text-[#475569]">
            Never lose a prescription or hunt for previous diagnostic papers in an emergency.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <FadeInBlock key={idx} delay={idx * 0.1}>
                <div className="p-6 sm:p-8 rounded-2xl bg-[#F2F7FF] border border-blue-100 h-full flex flex-col justify-between hover:shadow-md transition">
                  <div>
                    <div className="w-12 h-12 rounded-xl health-gradient text-white flex items-center justify-center mb-4 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0A1A45] mb-2">{b.title}</h3>
                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              </FadeInBlock>
            );
          })}
        </div>
      </section>

      {/* How it Works Workflow */}
      <section className="py-8 sm:py-12 lg:py-16 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A1A45] mb-3">
              How Your Records Stay Safe
            </h2>
            <p className="text-xs sm:text-sm text-[#475569]">
              Built with zero-knowledge architectural principles where you control visibility.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s, idx) => (
              <div key={idx} className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm">
                <span className="text-xs font-black text-[#1769E0] bg-blue-50 px-2.5 py-1 rounded-lg inline-block mb-3">
                  Step {s.step}
                </span>
                <h3 className="text-base font-bold text-[#0A1A45] mb-2">{s.title}</h3>
                <p className="text-xs text-[#475569] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl health-gradient text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <span>Access Your Health Records</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
