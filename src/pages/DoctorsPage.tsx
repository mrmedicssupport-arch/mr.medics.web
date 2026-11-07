import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Award, MapPin, Video, Calendar, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';
import HeartPulse3D from '../components/HeartPulse3D';
import { config } from '../config';
import { AnimatedHeading, AnimatedParagraph, AnimatedBadge, FadeInBlock } from '../components/AnimatedTypography';
import { sampleDoctors } from '../data/content';

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [showAllMobile, setShowAllMobile] = useState(false);

  const specialties = ['All', 'Cardiologist', 'General Physician', 'Pediatrician', 'Dermatologist', 'Orthopedic', 'Gynaecologist'];

  const doctors = sampleDoctors;

  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const displayedDoctors = showAllMobile ? filteredDoctors : filteredDoctors.slice(0, 4);

  return (
    <div className="bg-white">
      
      {/* Hero Section with animated text and beating heart 3D */}
      <section className="bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFF] to-[#FFFFFF] py-8 md:py-16 border-b border-slate-100 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
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
              Connect instantly via HD video, audio, or secure chat with experienced specialists across 50+ medical departments. 100% verified medical council credentials.
            </AnimatedParagraph>
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 sm:gap-6"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-[#0FB5A0]" />
                <span className="text-xs md:text-sm font-bold text-[#0A1A45]">Strict Background Check</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 md:w-5 md:h-5 text-[#1769E0]" />
                <span className="text-xs md:text-sm font-bold text-[#0A1A45]">Average 10+ Yrs Exp</span>
              </div>
            </motion.div>
          </div>
          <div className="h-[320px] w-full hidden lg:block">
            <HeartPulse3D />
          </div>
        </div>
      </section>

      {/* Search & Filter Bar - Sticky */}
      <section className="py-4 md:py-8 bg-[#F2F7FF] border-b border-slate-200/60 sticky top-14 md:top-[76px] z-30 backdrop-blur-md bg-[#F2F7FF]/95">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center justify-between">
            
            {/* Search Input */}
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

            {/* Specialty Filter Chips - Horizontally scrollable on mobile */}
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
      <section className="py-8 md:py-16 max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Mobile View: Single-column compact card */}
        <div className="md:hidden space-y-3">
          {displayedDoctors.map((doc, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-sm flex items-center gap-3"
            >
              <div className="w-14 h-14 rounded-xl health-gradient text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                {doc.name.split(' ')[1]?.[0] || 'Dr'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <h3 className="text-sm font-bold text-[#0A1A45] truncate">{doc.name}</h3>
                  <span className="text-[11px] font-extrabold text-[#1769E0] shrink-0">{doc.fee}</span>
                </div>
                <p className="text-xs text-[#1769E0] font-semibold truncate">{doc.specialty} • {doc.experience.replace(' Experience', '')}</p>
                <div className="flex items-center justify-between gap-2 mt-1.5">
                  <div className="flex items-center gap-1 text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-bold border border-blue-100">
                    <UserCheck className="w-3 h-3 text-[#1769E0]" />
                    <span>Sample Profile</span>
                  </div>
                  <Link 
                    to="/login"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg health-gradient text-white font-bold text-xs shadow-sm hover:opacity-95"
                  >
                    <Video className="w-3 h-3" />
                    <span>Book</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Lazy Load More for Mobile */}
          {filteredDoctors.length > 4 && (
            <div className="text-center pt-2">
              <button
                onClick={() => setShowAllMobile(!showAllMobile)}
                className="w-full py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-[#1769E0] font-bold text-xs hover:bg-slate-100 transition"
              >
                {showAllMobile ? 'Show Fewer Doctors' : `Load More Doctors (${filteredDoctors.length - 4} more)`}
              </button>
            </div>
          )}
        </div>

        {/* Desktop View: Multi-column full cards */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doc, idx) => (
            <FadeInBlock key={idx} delay={idx * 0.08}>
              <motion.div 
                whileHover={{ y: -8, scale: 1.02, boxShadow: "0 25px 30px -5px rgba(23, 105, 224, 0.12)" }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-6 shadow-xl shadow-blue-900/5 border border-slate-100 flex flex-col justify-between hover:border-blue-100 transition-all h-full group"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 rounded-2xl health-gradient text-white flex items-center justify-center font-extrabold text-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                      {doc.name.split(' ')[1]?.[0] || 'Dr'}
                    </div>
                    <span className="inline-flex items-center gap-1.5 bg-blue-50 text-[#1769E0] text-xs font-bold px-3 py-1 rounded-full border border-blue-200/50">
                      <UserCheck className="w-3.5 h-3.5 text-[#1769E0]" />
                      Sample Profile
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0A1A45] mb-1 group-hover:text-[#1769E0] transition-colors">{doc.name}</h3>
                  <p className="text-sm font-semibold text-[#1769E0] mb-2">{doc.specialty}</p>
                  <p className="text-xs text-[#475569] mb-1">{doc.qualification}</p>
                  <p className="text-xs text-[#475569] mb-4">{doc.experience}</p>

                  <div className="flex items-center gap-2 text-xs text-[#475569] mb-4">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{doc.hospital}</span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-t border-b border-slate-100 mb-6 text-xs text-slate-500 font-medium">
                    <span>Slots: {doc.available}</span>
                    <span className="text-[#0FB5A0] font-bold">NMC Verified</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Consultation Fee</p>
                    <p className="text-xl font-extrabold text-[#0A1A45]">{doc.fee}</p>
                  </div>
                  <Link 
                    to="/login"
                    className="px-6 py-3 rounded-xl health-gradient text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Video className="w-4 h-4" />
                    <span>Book Consult</span>
                  </Link>
                </div>
              </motion.div>
            </FadeInBlock>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-base md:text-lg font-bold text-[#0A1A45] mb-2">No doctors found matching your search.</p>
            <p className="text-xs md:text-sm text-[#475569]">Try searching with a different specialty or keyword.</p>
          </motion.div>
        )}
      </section>

    </div>
  );
}
