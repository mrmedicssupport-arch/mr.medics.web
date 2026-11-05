import { useState } from 'react';
import { 
  FileText, 
  Upload, 
  ShieldCheck, 
  Download, 
  Trash2, 
  CheckCircle2, 
  Lock, 
  Users, 
  Share2 
} from 'lucide-react';
import { motion } from 'motion/react';
import Hero3D from '../../components/Hero3D';
import { 
  AnimatedHeading, 
  AnimatedParagraph, 
  AnimatedBadge, 
  FadeInBlock 
} from '../../components/AnimatedTypography';

export default function HealthRecordsPage() {
  const [records, setRecords] = useState([
    { title: "CBC Comprehensive Lab Report", date: "24 Oct 2026", type: "Diagnostic Report", doctor: "NABL Certified Lab", size: "1.4 MB" },
    { title: "Cardiology Prescription & ECG", date: "15 Oct 2026", type: "Digital Prescription", doctor: "Dr. Anjali Sharma", size: "850 KB" },
    { title: "HbA1c & Diabetes Tracking Panel", date: "02 Sep 2026", type: "Lab Test", doctor: "Thyrocare Partner Lab", size: "1.1 MB" }
  ]);
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setRecords([
      { title: "Recent Medical Scan / Record", date: "Today", type: "Self Uploaded Document", doctor: "Patient Vault", size: "2.3 MB" },
      ...records
    ]);
    setUploaded(true);
    setTimeout(() => setUploaded(false), 3500);
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFF] to-[#FFFFFF] py-20 border-b border-blue-50">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <AnimatedBadge className="bg-emerald-50 text-[#0FB5A0] mb-5 border border-emerald-100" icon={Lock}>
              256-Bit Encrypted Medical Vault
            </AnimatedBadge>

            <AnimatedHeading
              text="Secure Digital Health Records & Family Profile Management"
              highlightWords={["Secure", "Digital", "Health", "Records", "Family", "Profiles"]}
              className="text-[38px] sm:text-[50px] font-extrabold text-[#0A1A45] mb-6 leading-[1.15]"
              as="h1"
            />

            <AnimatedParagraph
              delay={0.2}
              className="text-lg text-[#475569] mb-8 leading-relaxed max-w-xl"
            >
              Organize doctor prescriptions, NABL diagnostic reports, and immunization timelines in one unified locker. Share with specialists with one-tap consent.
            </AnimatedParagraph>

            <FadeInBlock delay={0.3} className="flex items-center gap-2 text-sm font-bold text-[#0FB5A0]">
              <ShieldCheck className="w-5 h-5" />
              <span>DPDP Act 2023 Compliant • End-to-End Encrypted</span>
            </FadeInBlock>
          </div>

          <div className="h-[380px] w-full hidden sm:block relative">
            <Hero3D />
          </div>
        </div>
      </section>

      {/* Records Manager */}
      <section className="py-16 max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Records List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <AnimatedHeading
                  text="Your Medical Documents"
                  highlightWords={["Medical", "Documents"]}
                  className="text-2xl font-extrabold text-[#0A1A45]"
                />
                <AnimatedParagraph className="text-xs text-[#475569] mt-0.5">
                  {records.length} records securely synchronized in your vault
                </AnimatedParagraph>
              </div>
            </div>

            <div className="space-y-3">
              {records.map((rec, idx) => (
                <FadeInBlock key={idx} delay={idx * 0.08}>
                  <div className="bg-[#F2F7FF] p-5 sm:p-6 rounded-2xl border border-blue-100 flex items-center justify-between hover:shadow-md hover:border-blue-200 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl health-gradient text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-[#0A1A45] group-hover:text-[#1769E0] transition-colors">{rec.title}</h4>
                        <p className="text-xs text-[#475569] mt-0.5">{rec.type} • {rec.doctor} • {rec.date} ({rec.size})</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        title="Download Document"
                        onClick={() => alert(`Downloading ${rec.title}`)}
                        className="p-2.5 bg-white rounded-xl text-[#1769E0] border border-blue-100 shadow-sm hover:bg-blue-50 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        title="Share with Doctor"
                        onClick={() => alert(`Sharing link generated for ${rec.title}`)}
                        className="p-2.5 bg-white rounded-xl text-[#0FB5A0] border border-blue-100 shadow-sm hover:bg-emerald-50 transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </FadeInBlock>
              ))}
            </div>
          </div>

          {/* Upload Card */}
          <div className="lg:col-span-4 bg-white p-8 rounded-3xl shadow-xl border border-blue-100 sticky top-28">
            <span className="text-[11px] font-bold text-[#1769E0] uppercase tracking-wider block mb-1">
              Instant Cloud Sync
            </span>
            <h3 className="text-xl font-extrabold text-[#0A1A45] mb-2">Upload Medical File</h3>
            <p className="text-xs text-[#475569] mb-5">Upload your past lab reports, discharge summaries, or physical prescriptions.</p>
            
            {uploaded && (
              <div className="mb-4 p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0FB5A0]" />
                <span>Document safely encrypted and stored in vault!</span>
              </div>
            )}

            <form onSubmit={handleUpload} className="space-y-4">
              <label className="border-2 border-dashed border-blue-200 hover:border-[#1769E0] rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer bg-[#F2F7FF] hover:bg-blue-50/50 transition-all text-center">
                <Upload className="w-8 h-8 text-[#1769E0] mb-2" />
                <span className="text-xs font-bold text-[#0A1A45]">Choose document to upload</span>
                <span className="text-[10px] text-slate-400 mt-1">PDF, JPG, PNG up to 15MB</span>
                <input type="file" required onChange={handleUpload} className="hidden" />
              </label>

              <div className="p-3 bg-blue-50/60 rounded-xl text-[11px] text-slate-600 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#1769E0] shrink-0" />
                <span>You can link up to 6 family members under this vault.</span>
              </div>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
}
