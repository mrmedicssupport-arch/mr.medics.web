import { useState } from 'react';
import { 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Stethoscope, 
  TestTube,
  ShieldAlert,
  BrainCircuit,
  Clock,
  HeartPulse,
  Home,
  RefreshCw,
  AlertTriangle,
  Info,
  Calendar,
  PhoneCall,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import Hero3D from '../../components/Hero3D';
import { 
  AnimatedHeading, 
  AnimatedParagraph, 
  AnimatedBadge, 
  FadeInBlock 
} from '../../components/AnimatedTypography';

interface Condition {
  name: string;
  likelihood: string;
  description: string;
}

interface Specialist {
  specialty: string;
  reason: string;
  bookingLink?: string;
}

interface LabTest {
  testName: string;
  purpose: string;
  tat?: string;
}

interface SymptomResult {
  urgencyLevel: 'Emergency' | 'High' | 'Moderate' | 'Low';
  urgencyColor?: string;
  summaryAssessment: string;
  possibleConditions: Condition[];
  recommendedSpecialist: Specialist;
  recommendedTests: LabTest[];
  immediateHomeCare: string[];
  redFlags: string[];
  clinicalDisclaimer?: string;
}

export default function AiSymptomCheckerPage() {
  const location = useLocation();
  const prefill = (location.state as any)?.prefillSymptoms || '';
  const [symptoms, setSymptoms] = useState(prefill);
  const [duration, setDuration] = useState('1–3 days');
  const [severity, setSeverity] = useState('Moderate');
  const [ageGroup, setAgeGroup] = useState('Adult (18-60)');
  const [existingConditions, setExistingConditions] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SymptomResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const quickSymptoms = [
    "Fever, shivering and body ache",
    "Continuous throbbing headache and eye strain",
    "Dry cough, sore throat and mild chest tightness",
    "Sharp stomach pain, bloating and nausea",
    "Skin redness, allergic itching and rash",
    "Knee joint pain and stiffness while walking"
  ];

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/symptom-checker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptoms: symptoms.trim(),
          duration,
          severity,
          ageGroup,
          existingConditions: existingConditions.trim() || undefined,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success && data.data) {
        setResult(data.data);
      } else {
        throw new Error(data.error || 'Failed to complete symptom analysis.');
      }
    } catch (err: any) {
      console.error('Symptom analysis error:', err);
      setErrorMsg('Could not complete request. Please verify symptoms and try again.');
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyBadge = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'emergency':
        return {
          bg: 'bg-red-100 text-red-700 border-red-300',
          title: 'Emergency Medical Urgency',
          desc: 'Immediate emergency hospital attention is strongly advised.',
          icon: AlertTriangle,
        };
      case 'high':
        return {
          bg: 'bg-amber-100 text-amber-800 border-amber-300',
          title: 'High Priority Urgency',
          desc: 'Consult a specialist doctor within 12–24 hours.',
          icon: AlertCircle,
        };
      case 'low':
        return {
          bg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          title: 'Low Urgency / Routine',
          desc: 'Conservative home care with routine medical check-up.',
          icon: CheckCircle2,
        };
      case 'moderate':
      default:
        return {
          bg: 'bg-blue-100 text-[#1769E0] border-blue-200',
          title: 'Moderate Urgency',
          desc: 'Medical consultation recommended within 24–48 hours.',
          icon: Info,
        };
    }
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFF] to-[#FFFFFF] py-20 border-b border-blue-50">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <AnimatedBadge className="bg-purple-50 text-purple-700 mb-5 border border-purple-100" icon={BrainCircuit}>
              Clinical-Grade Intelligent Triage
            </AnimatedBadge>

            <AnimatedHeading
              text="Intelligent AI Symptom Checker & Clinical Guidance"
              highlightWords={["Intelligent", "AI", "Symptom", "Checker", "Clinical"]}
              className="text-[38px] sm:text-[50px] font-extrabold text-[#0A1A45] mb-6 leading-[1.15]"
              as="h1"
            />

            <AnimatedParagraph
              delay={0.2}
              className="text-lg text-[#475569] mb-8 leading-relaxed max-w-xl"
            >
              Describe your symptoms in your own words (English or Hindi). Our verified clinical AI evaluates your urgency level, recommends specialist doctors, and suggests vital diagnostic tests in seconds.
            </AnimatedParagraph>

            <FadeInBlock delay={0.3} className="flex flex-wrap gap-4 text-xs font-bold text-[#0A1A45]">
              <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-blue-100 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-[#0FB5A0]" />
                <span>Instant Clinical Triage</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-blue-100 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-[#1769E0]" />
                <span>Direct Doctor Booking</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-blue-100 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <span>100% Free & Private</span>
              </div>
            </FadeInBlock>
          </div>

          <div className="h-[380px] w-full hidden sm:block relative">
            <Hero3D />
          </div>
        </div>
      </section>

      {/* Main Checker Section */}
      <section className="py-16 max-w-[1000px] mx-auto px-6">
        <div className="bg-[#F2F7FF] rounded-3xl p-6 sm:p-12 border border-blue-100 shadow-xl">
          
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.form 
                key="input-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                onSubmit={handleAnalyze} 
                className="space-y-6"
              >
                <div>
                  <span className="text-xs font-bold text-[#1769E0] uppercase tracking-wider block mb-1">
                    Free AI Medical Triage
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A1A45]">
                    Tell Us What You Are Experiencing
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475569] mt-1">
                    You can type in English or Hindi (e.g. "fever for 2 days with headache" or "2 din se sar dard aur bukhar hai").
                  </p>
                </div>

                {/* Quick Symptom Chips */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                    Quick Select Common Symptoms:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {quickSymptoms.map((chip, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setSymptoms(chip)}
                        className="text-xs font-medium px-3.5 py-2 rounded-xl bg-white border border-blue-100 text-[#0A1A45] hover:border-[#1769E0] hover:bg-blue-50/50 hover:text-[#1769E0] transition-all text-left shadow-sm"
                      >
                        + {chip}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Symptoms Textarea */}
                <div>
                  <label className="block text-xs font-bold text-[#0A1A45] uppercase mb-2">
                    Describe Your Symptoms in Detail *
                  </label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="e.g. Since yesterday morning I have a continuous dry cough, mild temperature around 100°F, throat irritation, and low energy..."
                    value={symptoms}
                    onChange={e => setSymptoms(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-white border border-slate-200 text-[#0A1A45] text-sm focus:outline-none focus:border-[#1769E0] focus:ring-2 focus:ring-blue-100 transition-all shadow-inner"
                  />
                </div>

                {/* Clinical Metadata Selectors */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0A1A45] uppercase mb-2">
                      Duration
                    </label>
                    <select 
                      value={duration}
                      onChange={e => setDuration(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl bg-white border border-slate-200 text-[#0A1A45] text-xs font-medium focus:outline-none focus:border-[#1769E0]"
                    >
                      <option>Less than 24 hours</option>
                      <option>1–3 days</option>
                      <option>4–7 days</option>
                      <option>1–2 weeks</option>
                      <option>More than 2 weeks</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0A1A45] uppercase mb-2">
                      Current Severity
                    </label>
                    <select 
                      value={severity}
                      onChange={e => setSeverity(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl bg-white border border-slate-200 text-[#0A1A45] text-xs font-medium focus:outline-none focus:border-[#1769E0]"
                    >
                      <option>Mild - Manageable at home</option>
                      <option>Moderate - Significant discomfort</option>
                      <option>Severe - Intolerable / Disruptive</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0A1A45] uppercase mb-2">
                      Age Group
                    </label>
                    <select 
                      value={ageGroup}
                      onChange={e => setAgeGroup(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl bg-white border border-slate-200 text-[#0A1A45] text-xs font-medium focus:outline-none focus:border-[#1769E0]"
                    >
                      <option>Child (Under 12)</option>
                      <option>Teen (13–17)</option>
                      <option>Adult (18–60)</option>
                      <option>Senior (60+)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0A1A45] uppercase mb-1">
                    Any Existing Health Conditions (Optional)
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Diabetes, Hypertension, Asthma, Thyroid (Leave blank if none)"
                    value={existingConditions}
                    onChange={e => setExistingConditions(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-[#0A1A45] focus:outline-none focus:border-[#1769E0]"
                  />
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-bold">
                    {errorMsg}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={loading || !symptoms.trim()}
                  className="w-full py-4 rounded-2xl health-gradient text-white font-bold text-base shadow-lg shadow-blue-900/20 hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2.5"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Analyzing Symptoms with Clinical Engine...</span>
                    </div>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Run Instant AI Clinical Triage</span>
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="results-card"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-8"
              >
                {/* Header Strip with Urgency Indicator */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-blue-200/80">
                  <div>
                    {(() => {
                      const badge = getUrgencyBadge(result.urgencyLevel);
                      const Icon = badge.icon;
                      return (
                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold border shadow-sm ${badge.bg}`}>
                          <Icon className="w-4 h-4" />
                          <span>{badge.title}</span>
                        </div>
                      );
                    })()}
                    <h3 className="text-2xl font-extrabold text-[#0A1A45] mt-2">
                      Clinical Triage Evaluation
                    </h3>
                    <p className="text-xs text-[#475569]">
                      Patient input: "{symptoms}" • {duration} • {severity}
                    </p>
                  </div>

                  <button 
                    onClick={() => {
                      setResult(null);
                      setSymptoms('');
                    }}
                    className="px-4 py-2 rounded-xl bg-white border border-blue-200 text-[#1769E0] text-xs font-bold shadow-sm hover:bg-blue-50 transition-colors flex items-center gap-1.5 w-fit"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Check New Symptoms</span>
                  </button>
                </div>

                {/* Summary Assessment */}
                <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm">
                  <span className="text-xs font-extrabold text-[#1769E0] uppercase tracking-wider block mb-1">
                    Physician Overview
                  </span>
                  <p className="text-base text-[#0A1A45] font-semibold leading-relaxed">
                    {result.summaryAssessment}
                  </p>
                </div>

                {/* Possible Conditions */}
                {result.possibleConditions && result.possibleConditions.length > 0 && (
                  <div>
                    <h4 className="text-base font-extrabold text-[#0A1A45] mb-3 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-[#1769E0]" />
                      <span>Potential Differential Considerations</span>
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {result.possibleConditions.map((cond, i) => (
                        <div key={i} className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-bold text-sm text-[#0A1A45]">{cond.name}</span>
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-50 text-[#1769E0] border border-blue-100">
                              {cond.likelihood} Match
                            </span>
                          </div>
                          <p className="text-xs text-[#475569] leading-relaxed">
                            {cond.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommended Specialist & Diagnostic Tests Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Doctor recommendation */}
                  <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-md flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-2xl health-gradient text-white flex items-center justify-center mb-4 shadow-md">
                        <Stethoscope className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-extrabold text-[#1769E0] uppercase tracking-wider block mb-1">
                        Recommended Consultation
                      </span>
                      <h4 className="text-xl font-extrabold text-[#0A1A45] mb-2">
                        {result.recommendedSpecialist.specialty}
                      </h4>
                      <p className="text-xs text-[#475569] leading-relaxed mb-6">
                        {result.recommendedSpecialist.reason}
                      </p>
                    </div>

                    <Link 
                      to="/services/doctor-consultation"
                      className="w-full py-3 rounded-xl health-gradient text-white font-bold text-xs shadow-md shadow-blue-900/15 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                    >
                      <span>Book {result.recommendedSpecialist.specialty}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Diagnostic Tests recommendation */}
                  <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-md flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-teal-500 text-white flex items-center justify-center mb-4 shadow-md">
                        <TestTube className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-extrabold text-[#0FB5A0] uppercase tracking-wider block mb-1">
                        Suggested Laboratory Panel
                      </span>
                      <div className="space-y-3 mb-6">
                        {result.recommendedTests.map((t, i) => (
                          <div key={i} className="p-3 bg-teal-50/50 rounded-xl border border-teal-100/60">
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="text-xs font-extrabold text-[#0A1A45]">{t.testName}</span>
                              {t.tat && (
                                <span className="text-[10px] font-bold text-[#0FB5A0] flex items-center gap-1">
                                  <Clock className="w-3 h-3" /> {t.tat}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#475569]">{t.purpose}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link 
                      to="/services/lab-tests"
                      className="w-full py-3 rounded-xl bg-white border border-teal-500 text-teal-700 hover:bg-teal-50 font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Book Free Home Collection</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Home Care & Red Flags */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Immediate Home Comfort Care */}
                  {result.immediateHomeCare && result.immediateHomeCare.length > 0 && (
                    <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm">
                      <h4 className="text-sm font-extrabold text-[#0A1A45] mb-3 flex items-center gap-2">
                        <Home className="w-4 h-4 text-[#1769E0]" />
                        <span>Immediate Home Comfort Steps</span>
                      </h4>
                      <ul className="space-y-2">
                        {result.immediateHomeCare.map((care, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-[#475569] leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-[#0FB5A0] shrink-0 mt-0.5" />
                            <span>{care}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Red Flags / Emergency Warnings */}
                  {result.redFlags && result.redFlags.length > 0 && (
                    <div className="bg-red-50/80 p-6 rounded-2xl border border-red-200 shadow-sm">
                      <h4 className="text-sm font-extrabold text-red-900 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span>Red Flag Emergency Signs</span>
                      </h4>
                      <ul className="space-y-2">
                        {result.redFlags.map((flag, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-red-800 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0 mt-1.5" />
                            <span>{flag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Clinical Disclaimer */}
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
                  <ShieldAlert className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
                  <p>
                    <strong>Medical Protocol Notice:</strong> {result.clinicalDisclaimer || 'This AI evaluation serves as educational preliminary triage and does not establish a doctor-patient relationship. In life-threatening emergencies, call your local ambulance or visit the nearest hospital emergency department immediately.'}
                  </p>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>
    </div>
  );
}
