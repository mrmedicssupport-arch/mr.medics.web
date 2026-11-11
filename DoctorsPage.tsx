import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Award, MapPin, Video, ShieldCheck, Sparkles, UserCheck, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import HeartPulse3D from '../components/HeartPulse3D';
import { AnimatedHeading, AnimatedParagraph, AnimatedBadge, FadeInBlock } from '../components/AnimatedTypography';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  experience: string;
  hospital: string;
  fee: string;
  available: string;
}

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const q = query(collection(db, 'users'), where('role', '==', 'doctor'), where('status', '==', 'Active'));
        const querySnapshot = await getDocs(q);
        const fetchedDoctors: Doctor[] = [];
        querySnapshot.forEach((doc) => {
          fetchedDoctors.push({ id: doc.id, ...doc.data() } as Doctor);
        });
        setDoctors(fetchedDoctors);
      } catch (error) {
        console.error("Error fetching doctors: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const specialties = ['All', 'Cardiologist', 'General Physician', 'Pediatrician', 'Dermatologist', 'Orthopedic', 'Gynaecologist'];

  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="bg-white">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFF] to-[#FFFFFF] py-8 sm:py-12 lg:py-16 border-b border-slate-100 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <AnimatedBadge icon={ShieldCheck} className="bg-blue-50 text-[#1769E0] mb-3 text-xs">
              NMC-Registered Medical Specialists
            </AnimatedBadge>
            <h1 className="text-[28px] sm:text-[36px] md:text-[50px] font-extrabold text-[#0A1A45] mb-4 md:mb-6 leading-tight">
              <AnimatedHeading 
                text="Consult Top Verified Doctors Online & In-Clinic"
                highlightWords={["Verified", "Doctors"]}
                highlightClass="health-gradient-text"
                as="span"
              />
            </h1>
            <AnimatedParagraph className="text-sm md:text-lg text-[#475569] mb-6 md:mb-8 leading-relaxed">
              Connect instantly via HD video, audio, or secure chat with experienced specialists across 50+ medical departments.
            </AnimatedParagraph>
          </div>
          <div className="h-[320px] w-full hidden lg:block">
            <HeartPulse3D />
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="py-4 md:py-8 bg-[#F2F7FF] border-b border-slate-200/60 sticky top-14 md:top-[76px] z-30 backdrop-blur-md bg-[#F2F7FF]/95">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center justify-between">
            <div className="relative w-full md:w-[380px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by doctor or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-white rounded-xl border border-slate-200 text-base md:text-sm text-[#0A1A45] font-medium shadow-sm focus:outline-none focus:border-[#1769E0] transition"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 md:pb-0 w-full md:w-auto -mx-1 px-1">
              {specialties.map((spec, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                    selectedSpecialty === spec 
                      ? 'health-gradient text-white shadow-md' 
                      : 'bg-white text-[#0A1A45] hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Doctors List */}
      <section className="py-8 sm:py-12 lg:py-16 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-16 flex flex-col items-center">
            <Loader2 className="w-8 h-8 text-[#1769E0] animate-spin mb-4" />
            <p className="text-[#475569]">Loading doctors...</p>
          </div>
        ) : filteredDoctors.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doc, idx) => (
              <FadeInBlock key={doc.id} delay={idx * 0.08}>
                <motion.div 
                  className="bg-white rounded-3xl p-6 shadow-xl shadow-blue-900/5 border border-slate-100 flex flex-col h-full"
                >
                  <h3 className="text-xl font-bold text-[#0A1A45]">{doc.name}</h3>
                  <p className="text-sm font-semibold text-[#1769E0]">{doc.specialty}</p>
                  <p className="text-xs text-[#475569]">{doc.qualification}</p>
                  <p className="text-xs text-[#475569]">{doc.experience}</p>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <p className="text-xl font-extrabold text-[#0A1A45]">{doc.fee}</p>
                    <Link to="/login" className="px-6 py-3 rounded-xl health-gradient text-white font-bold text-sm shadow-md cursor-pointer">
                      Book Consult
                    </Link>
                  </div>
                </motion.div>
              </FadeInBlock>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg font-bold text-[#0A1A45] mb-4">Doctors are being onboarded. Request a consultation on WhatsApp</p>
            <a 
              href="https://wa.me/919311601420?text=Hello%20Mr%20Medics,%20I%20need%20assistance%20with%20a%20doctor%20consultation"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow-md hover:opacity-90"
            >
              Contact on WhatsApp
            </a>
          </div>
        )}
      </section>
    </div>
  );
}
