import { useState } from 'react';
import { Search, Star, Award, MapPin, Video, Calendar, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import HeartPulse3D from '../components/HeartPulse3D';
import { config } from '../config';
import { AnimatedHeading, AnimatedParagraph, AnimatedBadge, FadeInBlock } from '../components/AnimatedTypography';

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const specialties = ['All', 'Cardiologist', 'General Physician', 'Pediatrician', 'Dermatologist', 'Orthopedic', 'Gynaecologist'];

  const doctors = [
    {
      name: "Dr. Anjali Sharma",
      specialty: "Cardiologist",
      qualification: "MBBS, MD - Cardiology (AIIMS)",
      experience: "12 Years Experience",
      hospital: "Apollo Hospital, Noida",
      rating: 4.9,
      reviews: 142,
      languages: "English, Hindi",
      fee: "₹500",
      available: "Today, 4:00 PM"
    },
    {
      name: "Dr. Rajesh Verma",
      specialty: "General Physician",
      qualification: "MBBS, MRCP (UK)",
      experience: "15 Years Experience",
      hospital: "Mrmedics Clinic, Sector 63",
      rating: 4.8,
      reviews: 210,
      languages: "English, Hindi",
      fee: "₹400",
      available: "Available Now"
    },
    {
      name: "Dr. Priya Nair",
      specialty: "Pediatrician",
      qualification: "MBBS, DCH, DNB - Pediatrics",
      experience: "9 Years Experience",
      hospital: "Fortis Healthcare",
      rating: 4.9,
      reviews: 98,
      languages: "English, Hindi, Malayalam",
      fee: "₹450",
      available: "Tomorrow, 10:00 AM"
    },
    {
      name: "Dr. Vikram Malhotra",
      specialty: "Orthopedic",
      qualification: "MBBS, MS - Orthopedics",
      experience: "14 Years Experience",
      hospital: "Max Super Speciality",
      rating: 4.7,
      reviews: 175,
      languages: "English, Hindi, Punjabi",
      fee: "₹600",
      available: "Today, 6:00 PM"
    },
    {
      name: "Dr. Sneha Kulkarni",
      specialty: "Dermatologist",
      qualification: "MBBS, DDVL",
      experience: "8 Years Experience",
      hospital: "Skin & Laser Centre, Noida",
      rating: 4.9,
      reviews: 115,
      languages: "English, Hindi, Marathi",
      fee: "₹500",
      available: "Today, 5:30 PM"
    },
    {
      name: "Dr. Manish Gupta",
      specialty: "Gynaecologist",
      qualification: "MBBS, MS - Obstetrics & Gynaecology",
      experience: "11 Years Experience",
      hospital: "Kailash Hospital",
      rating: 4.8,
      reviews: 160,
      languages: "English, Hindi",
      fee: "₹550",
      available: "Tomorrow, 11:30 AM"
    }
  ];

  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="bg-white">
      
      {/* Hero Section with animated text and beating heart 3D */}
      <section className="bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFF] to-[#FFFFFF] py-16 border-b border-slate-100 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <AnimatedBadge icon={ShieldCheck} className="bg-blue-50 text-[#1769E0] mb-4">
              NMC-Registered Medical Specialists
            </AnimatedBadge>
            <h1 className="text-[40px] sm:text-[50px] font-extrabold text-[#0A1A45] mb-6 leading-tight">
              <AnimatedHeading 
                text="Consult Top Verified Doctors Online & In-Clinic"
                highlightWords={["Verified", "Doctors"]}
                highlightClass="health-gradient-text"
                as="span"
              />
            </h1>
            <AnimatedParagraph className="text-lg text-[#475569] mb-8 leading-relaxed">
              Connect instantly via HD video, audio, or secure chat with experienced specialists across 50+ medical departments. 100% verified medical council credentials.
            </AnimatedParagraph>
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-6"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#0FB5A0]" />
                <span className="text-sm font-bold text-[#0A1A45]">Strict Background Check</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#1769E0]" />
                <span className="text-sm font-bold text-[#0A1A45]">Average 10+ Yrs Exp</span>
              </div>
            </motion.div>
          </div>
          <div className="h-[350px] w-full hidden sm:block">
            <HeartPulse3D />
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="py-10 bg-[#F2F7FF] border-b border-slate-200/60 sticky top-[76px] z-30 backdrop-blur-md bg-[#F2F7FF]/90">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-[400px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search doctor by name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl border border-slate-200 text-[#0A1A45] font-medium shadow-sm focus:outline-none focus:border-[#1769E0] transition"
              />
            </div>

            {/* Specialty Pills with animation */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {specialties.map((spec, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${selectedSpecialty === spec ? 'health-gradient text-white shadow-md' : 'bg-white text-[#0A1A45] hover:bg-slate-100 border border-slate-200'}`}
                >
                  {spec}
                </motion.button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Doctors Grid with Stagger & 3D Hover */}
      <section className="py-16 max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-200/50">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                      {doc.available}
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

                  <div className="flex items-center gap-4 py-3 border-t border-b border-slate-100 mb-6">
                    <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-lg text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{doc.rating}</span>
                      <span className="text-slate-400 font-normal">({doc.reviews})</span>
                    </div>
                    <span className="text-xs text-[#475569] font-medium">{doc.languages}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Consultation Fee</p>
                    <p className="text-xl font-extrabold text-[#0A1A45]">{doc.fee}</p>
                  </div>
                  <motion.a 
                    href={`${config.APP_URL}/login`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-xl health-gradient text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
                  >
                    <Video className="w-4 h-4" />
                    <span>Book Consult</span>
                  </motion.a>
                </div>
              </motion.div>
            </FadeInBlock>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-lg font-bold text-[#0A1A45] mb-2">No doctors found matching your search.</p>
            <p className="text-sm text-[#475569]">Try searching with a different specialty or keyword.</p>
          </motion.div>
        )}
      </section>

    </div>
  );
}
