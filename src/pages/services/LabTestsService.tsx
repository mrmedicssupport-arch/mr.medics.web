import { useState } from 'react';
import { 
  Search, 
  TestTube, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  MapPin, 
  User, 
  Phone, 
  FileCheck,
  Zap,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Hero3D from '../../components/Hero3D';
import { 
  AnimatedHeading, 
  AnimatedParagraph, 
  AnimatedBadge, 
  FadeInBlock, 
  AnimatedNumber 
} from '../../components/AnimatedTypography';

import { config } from '../../config';
import { logLeadSafely } from '../../lib/leads';

export default function LabTestsService() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [bookingModal, setBookingModal] = useState<any | null>(null);
  const [success, setSuccess] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [whatsappLink, setWhatsappLink] = useState('');
  const [patientInfo, setPatientInfo] = useState({ name: '', phone: '', address: '', date: '', time: '' });

  const categories = ['All', 'Hematology', 'Biochemistry', 'Hormones', 'Special Panels', 'Cardiology'];

  const tests = [
    { name: "Complete Blood Count (CBC)", category: "Hematology", tat: "4-6 Hours", price: "₹299", originalPrice: "₹500", popular: true, desc: "Includes 24 parameters: Hemoglobin, TLC, DLC, Platelet count, RBC indices." },
    { name: "HbA1c (Glycated Hemoglobin)", category: "Biochemistry", tat: "4 Hours", price: "₹399", originalPrice: "₹700", popular: true, desc: "Monitors average blood glucose levels over the preceding 3 months." },
    { name: "Lipid Profile Test", category: "Biochemistry", tat: "4-6 Hours", price: "₹549", originalPrice: "₹900", popular: true, desc: "Cholesterol, Triglycerides, HDL, LDL, VLDL ratio for heart health." },
    { name: "Liver Function Test (LFT)", category: "Biochemistry", tat: "4 Hours", price: "₹599", originalPrice: "₹1,000", popular: true, desc: "Bilirubin, SGOT, SGPT, Alkaline Phosphatase, Protein, Albumin." },
    { name: "Thyroid Profile (T3, T4, TSH)", category: "Hormones", tat: "4 Hours", price: "₹499", originalPrice: "₹850", popular: false, desc: "Comprehensive evaluation of thyroid gland performance and metabolic health." },
    { name: "Comprehensive Full Body Checkup", category: "Special Panels", tat: "6 Hours", price: "₹1,499", originalPrice: "₹3,500", popular: true, desc: "85+ vital parameters including CBC, LFT, KFT, Lipid, HbA1c, and Urine Analysis." },
    { name: "Kidney Function Test (KFT)", category: "Biochemistry", tat: "4 Hours", price: "₹499", originalPrice: "₹800", popular: false, desc: "Urea, Creatinine, Uric Acid, Calcium, Electrolytes for renal health." },
    { name: "Vitamin D & B12 Combo", category: "Hormones", tat: "6 Hours", price: "₹999", originalPrice: "₹2,200", popular: true, desc: "Crucial for bone density, nerve strength, energy levels, and immunity." },
    { name: "Cardiac Risk Biomarkers", category: "Cardiology", tat: "6 Hours", price: "₹1,199", originalPrice: "₹2,500", popular: false, desc: "hs-CRP, Homocysteine, Apolipoproteins for early cardiovascular risk detection." },
  ];

  const filteredTests = tests.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || t.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    
    if (!patientInfo.name.trim()) {
      setValidationError('Please enter patient full name.');
      return;
    }
    const cleanPhone = patientInfo.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setValidationError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!patientInfo.address.trim()) {
      setValidationError('Please enter home collection address.');
      return;
    }

    const message = `Hello Mr Medics,
I would like to request a Lab Test Booking:
• Test: ${bookingModal.name} (${bookingModal.price})
• Patient: ${patientInfo.name.trim()}
• Phone: ${cleanPhone}
• Address: ${patientInfo.address.trim()}
• Preferred Slot: ${patientInfo.date || 'Earliest'} at ${patientInfo.time || 'Morning'}
Please confirm my booking.`;

    const encoded = encodeURIComponent(message);
    const link = `https://wa.me/${config.WHATSAPP_NUMBER}?text=${encoded}`;
    setWhatsappLink(link);
    setSuccess(true);

    // Open WhatsApp
    try {
      window.open(link, '_blank');
    } catch (e) {
      console.warn('Popup blocked, link shown in UI');
    }

    // Log lead safely in Firestore
    logLeadSafely({
      type: 'lab_test',
      testName: bookingModal.name,
      price: bookingModal.price,
      patientName: patientInfo.name.trim(),
      phone: cleanPhone,
      address: patientInfo.address.trim(),
      slotDate: patientInfo.date,
      slotTime: patientInfo.time,
    });
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFF] to-[#FFFFFF] py-20 border-b border-blue-50">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <AnimatedBadge className="bg-teal-50 text-[#0FB5A0] mb-5 border border-teal-100" icon={ShieldCheck}>
              NABL & ICMR Accredited Laboratories
            </AnimatedBadge>

            <AnimatedHeading
              text="Precise Diagnostic Tests With Free Home Sample Collection"
              highlightWords={["Precise", "Diagnostic", "Tests", "Free", "Home", "Sample"]}
              className="text-[38px] sm:text-[50px] font-extrabold text-[#0A1A45] mb-6 leading-[1.15]"
              as="h1"
            />

            <AnimatedParagraph
              delay={0.2}
              className="text-lg text-[#475569] mb-8 leading-relaxed max-w-xl"
            >
              Certified, vaccinated phlebotomists collect blood & urine samples right at your doorstep. Verified digital reports are delivered directly via app and WhatsApp in just 4 hours.
            </AnimatedParagraph>

            <FadeInBlock delay={0.3} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-3.5 bg-white rounded-2xl border border-blue-100 shadow-sm">
                <div className="text-2xl font-extrabold text-[#1769E0]">
                  <AnimatedNumber value={500} suffix="+" />
                </div>
                <div className="text-xs font-semibold text-[#475569]">Certified Tests</div>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-blue-100 shadow-sm">
                <div className="text-2xl font-extrabold text-[#0FB5A0]">
                  <AnimatedNumber value={4} suffix=" Hours" />
                </div>
                <div className="text-xs font-semibold text-[#475569]">Fast Turnaround</div>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-blue-100 shadow-sm col-span-2 sm:col-span-1">
                <div className="text-2xl font-extrabold text-[#0A1A45]">
                  <span>₹0 Fee</span>
                </div>
                <div className="text-xs font-semibold text-[#475569]">Home Pickup</div>
              </div>
            </FadeInBlock>
          </div>

          <div className="h-[380px] w-full hidden sm:block relative">
            <Hero3D />
          </div>
        </div>
      </section>

      {/* Catalogue & Search */}
      <section className="py-16 max-w-[1200px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <AnimatedBadge className="bg-blue-50 text-[#1769E0] mb-3" icon={TestTube}>
            Instant Test Search
          </AnimatedBadge>
          <AnimatedHeading
            text="Find Blood Tests & Wellness Profiles"
            highlightWords={["Find", "Blood", "Tests"]}
            className="text-3xl sm:text-4xl font-extrabold text-[#0A1A45] mb-3"
          />
          <AnimatedParagraph className="text-sm text-[#475569]">
            Search by test name, body organ, or health condition to book your certified home collection slot.
          </AnimatedParagraph>
        </div>

        {/* Search & Categories Bar */}
        <FadeInBlock delay={0.15} className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
          <div className="relative w-full md:w-[420px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search tests (e.g. CBC, Thyroid, Glucose, KFT)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-[#F2F7FF] rounded-2xl border border-blue-100 text-[#0A1A45] font-medium text-sm focus:outline-none focus:border-[#1769E0] focus:bg-white shadow-inner transition-all"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 scrollbar-none">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                    ? 'health-gradient text-white shadow-md shadow-blue-900/10 scale-105' 
                    : 'bg-[#F2F7FF] text-[#0A1A45] border border-blue-100 hover:bg-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeInBlock>

        {/* Tests Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTests.map((test, idx) => (
            <FadeInBlock key={idx} delay={idx * 0.05}>
              <div className="bg-[#F2F7FF] p-7 rounded-3xl border border-blue-100 shadow-lg shadow-blue-900/5 hover:shadow-xl hover:border-blue-300 transition-all flex flex-col justify-between h-full group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#1769E0] uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-lg">
                      {test.category}
                    </span>
                    {test.popular && (
                      <span className="flex items-center gap-1 text-[11px] font-extrabold text-white bg-amber-500 px-2.5 py-0.5 rounded-full shadow-sm">
                        <Sparkles className="w-3 h-3" /> Most Booked
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-[#0A1A45] mb-2 group-hover:text-[#1769E0] transition-colors">
                    {test.name}
                  </h3>

                  <p className="text-xs text-[#475569] mb-4 leading-relaxed">
                    {test.desc}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-6">
                    <span className="flex items-center gap-1 font-semibold text-[#0FB5A0]">
                      <Clock className="w-3.5 h-3.5" /> Reports in {test.tat}
                    </span>
                    <span>•</span>
                    <span className="font-semibold text-slate-600">Home Pickup</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-blue-100">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold text-[#0A1A45]">{test.price}</span>
                      <span className="text-xs text-slate-400 line-through">{test.originalPrice}</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#0FB5A0] uppercase">Free Home Visit</span>
                  </div>

                  <button 
                    onClick={() => { 
                      setBookingModal(test); 
                      setSuccess(false); 
                    }}
                    className="px-5 py-2.5 rounded-xl health-gradient text-white font-bold text-xs shadow-md shadow-blue-900/15 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <span>Book Test</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </FadeInBlock>
          ))}
        </div>
      </section>

      {/* Booking Modal with Smooth Animation */}
      <AnimatePresence>
        {bookingModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative border border-blue-100"
            >
              <button 
                onClick={() => setBookingModal(null)} 
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center transition-colors"
              >
                ✕
              </button>
              
              {success ? (
                <div className="text-center py-6">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="w-16 h-16 rounded-full bg-emerald-100 text-[#0FB5A0] flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[#0A1A45] mb-2">Your Request is Ready</h3>
                  <p className="text-sm text-[#475569] mb-6">
                    Send it on WhatsApp so our team can confirm your booking.
                  </p>
                  <div className="p-4 bg-blue-50 rounded-2xl text-left text-xs space-y-1 mb-6 text-slate-600">
                    <div><span className="font-bold">Test:</span> {bookingModal.name} ({bookingModal.price})</div>
                    <div><span className="font-bold">Patient:</span> {patientInfo.name}</div>
                    <div><span className="font-bold">Address:</span> {patientInfo.address}</div>
                    <div><span className="font-bold">Slot:</span> {patientInfo.date || 'Earliest available'} {patientInfo.time ? `at ${patientInfo.time}` : ''}</div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a 
                      href={whatsappLink} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-95"
                    >
                      <span>Open WhatsApp</span>
                    </a>
                    <a 
                      href={`tel:${config.PHONE}`} 
                      className="px-6 py-3 rounded-xl border border-slate-300 text-[#0A1A45] hover:bg-slate-50 font-bold text-sm flex items-center justify-center gap-2 active:scale-95"
                    >
                      <Phone className="w-4 h-4 text-[#1769E0]" />
                      <span>Call Us</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBook} className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-[#1769E0] uppercase tracking-wider block mb-1">
                      Schedule Home Phlebotomy
                    </span>
                    <h3 className="text-xl font-bold text-[#0A1A45]">{bookingModal.name}</h3>
                    <p className="text-sm font-extrabold text-[#0FB5A0] mt-1">{bookingModal.price} <span className="text-xs text-slate-400 font-normal line-through">{bookingModal.originalPrice}</span> • Free Home Collection</p>
                  </div>

                  {validationError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold">
                      {validationError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-[#0A1A45] uppercase mb-1">Patient Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Praveen Kumar"
                        value={patientInfo.name}
                        onChange={e => setPatientInfo({ ...patientInfo, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1769E0]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0A1A45] uppercase mb-1">Mobile Number (10 digits) *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input 
                        type="tel" 
                        required 
                        maxLength={10}
                        placeholder="9311601420"
                        value={patientInfo.phone}
                        onChange={e => setPatientInfo({ ...patientInfo, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1769E0]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0A1A45] uppercase mb-1">Home Collection Address *</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <textarea 
                        required 
                        rows={2}
                        placeholder="House / Flat No., Society / Street, Landmark, Noida / City"
                        value={patientInfo.address}
                        onChange={e => setPatientInfo({ ...patientInfo, address: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1769E0]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0A1A45] uppercase mb-1">Preferred Date *</label>
                      <input 
                        type="date" 
                        required 
                        value={patientInfo.date}
                        onChange={e => setPatientInfo({ ...patientInfo, date: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1769E0]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0A1A45] uppercase mb-1">Time Slot *</label>
                      <input 
                        type="time" 
                        required 
                        value={patientInfo.time}
                        onChange={e => setPatientInfo({ ...patientInfo, time: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1769E0]"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3.5 rounded-xl health-gradient text-white font-bold text-sm shadow-lg shadow-blue-900/20 hover:scale-[1.01] transition-transform mt-3"
                  >
                    Request Sample Collection on WhatsApp
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
