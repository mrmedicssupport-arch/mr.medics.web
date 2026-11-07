import { useState } from 'react';
import { 
  Video, 
  Mic, 
  MessageSquare, 
  MapPin, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Star, 
  ShieldCheck, 
  Award,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { motion } from 'motion/react';
import HeartPulse3D from '../../components/HeartPulse3D';
import { 
  AnimatedHeading, 
  AnimatedParagraph, 
  AnimatedBadge, 
  FadeInBlock, 
  AnimatedNumber 
} from '../../components/AnimatedTypography';
import FaqSection from '../../components/FaqSection';

import { config } from '../../config';
import { sampleDoctors } from '../../data/content';
import { logLeadSafely } from '../../lib/leads';

export default function DoctorConsultation() {
  const [selectedMode, setSelectedMode] = useState<'video' | 'audio' | 'chat' | 'clinic'>('video');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [booked, setBooked] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [whatsappLink, setWhatsappLink] = useState('');
  const [bookingDetails, setBookingDetails] = useState({ name: '', phone: '', date: '', time: '', doctor: 'Dr. Anjali Sharma' });

  const specialties = ['All', 'Cardiologist', 'General Physician', 'Pediatrician', 'Orthopedic', 'Dermatologist', 'Gynaecologist'];

  const doctors = sampleDoctors;

  const filteredDoctors = doctors.filter(doc => 
    selectedSpecialty === 'All' || doc.specialty === selectedSpecialty
  );

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!bookingDetails.name.trim()) {
      setValidationError('Please enter patient full name.');
      return;
    }
    const cleanPhone = bookingDetails.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setValidationError('Please enter a valid 10-digit mobile number.');
      return;
    }

    const message = `Hello Mr Medics,
I would like to request a Doctor Consultation:
• Doctor: ${bookingDetails.doctor}
• Mode: ${selectedMode.toUpperCase()} Consultation
• Patient: ${bookingDetails.name.trim()}
• Phone: ${cleanPhone}
• Preferred Slot: ${bookingDetails.date || 'Today'} at ${bookingDetails.time || 'Earliest slot'}
Please confirm doctor availability.`;

    const encoded = encodeURIComponent(message);
    const link = `https://wa.me/${config.WHATSAPP_NUMBER}?text=${encoded}`;
    setWhatsappLink(link);
    setBooked(true);

    try {
      window.open(link, '_blank');
    } catch (e) {
      console.warn('Popup blocked, link displayed in UI');
    }

    logLeadSafely({
      type: 'doctor_consultation',
      doctor: bookingDetails.doctor,
      mode: selectedMode,
      patientName: bookingDetails.name.trim(),
      phone: cleanPhone,
      slotDate: bookingDetails.date,
      slotTime: bookingDetails.time,
    });
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFF] to-[#FFFFFF] py-8 sm:py-12 lg:py-16 border-b border-blue-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <AnimatedBadge className="bg-blue-100/80 text-[#1769E0] mb-5" icon={UserCheck}>
              Verified NMC-Registered Specialists
            </AnimatedBadge>

            <AnimatedHeading
              text="Instant Online Doctor Consultation & Digital Prescriptions"
              highlightWords={["Online", "Doctor", "Consultation", "Digital", "Prescriptions"]}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A1A45] mb-6 leading-[1.15]"
              as="h1"
            />

            <AnimatedParagraph
              delay={0.2}
              className="text-base text-[#475569] mb-8 leading-relaxed max-w-xl"
            >
              Consult India's top doctors across 50+ medical specialties within 15 minutes. Secure end-to-end encrypted consultations with downloadable digital prescriptions.
            </AnimatedParagraph>

            {/* Consultation Mode Selector */}
            <FadeInBlock delay={0.3} className="flex flex-wrap gap-3">
              {[
                { id: 'video', label: 'HD Video Call', icon: Video },
                { id: 'audio', label: 'Audio Consultation', icon: Mic },
                { id: 'chat', label: 'Instant Chat', icon: MessageSquare },
                { id: 'clinic', label: 'In-Clinic Visit', icon: MapPin },
              ].map(mode => {
                const Icon = mode.icon;
                const active = selectedMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setSelectedMode(mode.id as any)}
                    className={`px-4 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all ${
                      active
                        ? 'health-gradient text-white shadow-lg shadow-blue-900/15 scale-105'
                        : 'bg-white text-[#0A1A45] border border-blue-100 hover:border-[#1769E0]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{mode.label}</span>
                  </button>
                );
              })}
            </FadeInBlock>
          </div>

          <div className="h-[380px] w-full hidden lg:block relative">
            <HeartPulse3D />
          </div>
        </div>
      </section>

      {/* Main Consultation Section */}
      <section className="py-8 sm:py-12 lg:py-16 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Doctors Listing */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <AnimatedHeading
                  text="Select Your Specialist"
                  highlightWords={["Specialist"]}
                  className="text-2xl font-extrabold text-[#0A1A45]"
                />
                <AnimatedParagraph className="text-xs text-[#475569] mt-0.5">
                  Showing {filteredDoctors.length} verified doctors available right now
                </AnimatedParagraph>
              </div>
            </div>

            {/* Specialty Filter Buttons */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {specialties.map((spec, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedSpecialty === spec 
                      ? 'health-gradient text-white shadow-md' 
                      : 'bg-[#F2F7FF] text-[#0A1A45] border border-blue-100 hover:bg-white'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredDoctors.map((doc, idx) => (
                <FadeInBlock key={idx} delay={idx * 0.08}>
                  <div className="bg-[#F2F7FF] p-5 sm:p-6 rounded-3xl border border-blue-100 shadow-md shadow-blue-900/5 hover:shadow-xl hover:border-blue-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 group">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl health-gradient text-white flex items-center justify-center text-lg sm:text-xl font-extrabold shrink-0 shadow-md group-hover:scale-105 transition-transform">
                        {doc.name.split(' ')[1]?.[0] || 'Dr'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base sm:text-lg font-bold text-[#0A1A45] group-hover:text-[#1769E0] transition-colors">{doc.name}</h3>
                          <span className="text-[10px] font-bold text-[#1769E0] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                            Sample Profile
                          </span>
                        </div>
                        <p className="text-xs font-bold text-[#1769E0]">{doc.specialty}</p>
                        <p className="text-xs text-[#475569] mt-0.5">{doc.qualification} • {doc.experience}</p>
                        
                        <div className="flex items-center gap-3 mt-2 text-xs">
                          <span className="text-[#0FB5A0] font-semibold text-[11px]">
                            Next: {doc.available}
                          </span>
                          <span className="text-slate-400 text-[11px]">• NMC Verified</span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-blue-100">
                      <span className="text-xl sm:text-2xl font-extrabold text-[#0A1A45] mb-2">{doc.fee}</span>
                      <button 
                        onClick={() => {
                          setBookingDetails(prev => ({ ...prev, doctor: doc.name }));
                          const elem = document.getElementById('booking-card');
                          elem?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-5 py-2.5 rounded-xl health-gradient text-white text-xs font-bold shadow-md shadow-blue-900/15 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                      >
                        <span>Select Doctor</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </FadeInBlock>
              ))}
            </div>
          </div>

          {/* Booking Card */}
          <div id="booking-card" className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-blue-100 sticky top-28">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-[#1769E0] uppercase tracking-wider block">
                  Quick Appointment
                </span>
                <h3 className="text-xl font-extrabold text-[#0A1A45]">Consultation Request</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#0FB5A0] text-xs font-bold border border-emerald-100">
                Live Verification
              </span>
            </div>

            {booked ? (
              <div className="text-center py-6">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="w-16 h-16 rounded-full bg-emerald-100 text-[#0FB5A0] flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle2 className="w-10 h-10" />
                </motion.div>
                <h4 className="text-xl font-bold text-[#0A1A45] mb-2">Your Request is Ready</h4>
                <p className="text-xs text-[#475569] mb-4">
                  Send it on WhatsApp so our team can confirm your consultation slot with <span className="font-bold text-[#0A1A45]">{bookingDetails.doctor}</span>.
                </p>
                <div className="p-4 bg-[#F2F7FF] rounded-2xl text-xs space-y-1 mb-6 text-slate-600 text-left">
                  <div><span className="font-bold">Doctor:</span> {bookingDetails.doctor}</div>
                  <div><span className="font-bold">Mode:</span> {selectedMode.toUpperCase()} Consultation</div>
                  <div><span className="font-bold">Patient:</span> {bookingDetails.name}</div>
                  <div><span className="font-bold">Slot:</span> {bookingDetails.date || 'Today'} at {bookingDetails.time || 'Earliest available'}</div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a 
                    href={whatsappLink} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>Open WhatsApp</span>
                  </a>
                  <a 
                    href={`tel:${config.PHONE}`} 
                    className="px-6 py-3 rounded-xl border border-slate-300 text-[#0A1A45] hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>Call Us</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-4">
                {validationError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold">
                    {validationError}
                  </div>
                )}
                <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Consulting With</span>
                    <span className="font-bold text-[#0A1A45]">{bookingDetails.doctor}</span>
                  </div>
                  <span className="font-extrabold text-[#1769E0]">Mode: {selectedMode}</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0A1A45] uppercase mb-1.5">Patient Full Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Praveen Kumar"
                    value={bookingDetails.name}
                    onChange={e => setBookingDetails({ ...bookingDetails, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-[#0A1A45] focus:outline-none focus:border-[#1769E0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0A1A45] uppercase mb-1.5">Phone Number (For Video Call Link) *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+91 93116 01420"
                    value={bookingDetails.phone}
                    onChange={e => setBookingDetails({ ...bookingDetails, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-[#0A1A45] focus:outline-none focus:border-[#1769E0]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0A1A45] uppercase mb-1.5">Date *</label>
                    <input 
                      type="date" 
                      required
                      value={bookingDetails.date}
                      onChange={e => setBookingDetails({ ...bookingDetails, date: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-[#0A1A45] focus:outline-none focus:border-[#1769E0]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0A1A45] uppercase mb-1.5">Time Slot *</label>
                    <input 
                      type="time" 
                      required
                      value={bookingDetails.time}
                      onChange={e => setBookingDetails({ ...bookingDetails, time: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-[#0A1A45] focus:outline-none focus:border-[#1769E0]"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 rounded-xl health-gradient text-white font-bold text-sm shadow-lg shadow-blue-500/20 hover:scale-[1.01] transition-transform mt-3"
                >
                  Confirm & Join Video Room
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Interactive FAQ for Doctor Consultation */}
      <FaqSection 
        initialCategory="consultation"
        title="Doctor Consultation FAQs"
        subtitle="Common questions about booking verified specialists, consultation duration, follow-ups, and digital prescriptions."
      />
    </div>
  );
}
