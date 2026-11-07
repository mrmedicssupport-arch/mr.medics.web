import { useState, useMemo } from 'react';
import { config } from '../config';
import { 
  ChevronDown, 
  HelpCircle, 
  Search, 
  X, 
  Stethoscope, 
  Pill, 
  FlaskConical, 
  ShieldCheck, 
  MessageCircle, 
  PhoneCall, 
  ThumbsUp, 
  ThumbsDown,
  Sparkles,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedHeading, AnimatedParagraph, AnimatedBadge } from './AnimatedTypography';

export type FaqCategory = 'all' | 'consultation' | 'pharmacy' | 'diagnostics' | 'safety';

export interface FaqItem {
  id: string;
  category: 'consultation' | 'pharmacy' | 'diagnostics' | 'safety';
  question: string;
  answer: string;
  badge?: string;
  popular?: boolean;
}

const FAQ_DATA: FaqItem[] = [
  // Doctor Consultation
  {
    id: 'consult-1',
    category: 'consultation',
    popular: true,
    badge: 'Video & Audio',
    question: 'How do online doctor consultations work on Mr Medics?',
    answer: 'Select your medical concern or specialty, choose an NMC-registered doctor and a suitable time slot. Once confirmed, you can join the private encrypted video or audio consultation directly from your browser or smartphone with one click—no software downloads required. After the consultation, your certified digital prescription is immediately available in your health records.'
  },
  {
    id: 'consult-2',
    category: 'consultation',
    popular: true,
    badge: '100% Verified',
    question: 'Are doctors on Mr Medics verified and qualified?',
    answer: 'Yes. Every doctor on Mr Medics undergoes a rigorous multi-step credentialing process. We verify their National Medical Commission (NMC) registration number, state medical council licenses, degrees from accredited institutions (like AIIMS, PGI, CMC), and clinical experience. Our specialists possess an average of 10+ years of active hospital and clinical practice.'
  },
  {
    id: 'consult-3',
    category: 'consultation',
    badge: 'Digital Rx',
    question: 'Is the online digital prescription legally valid at pharmacies?',
    answer: 'Absolutely. Prescriptions generated on Mr Medics strictly comply with the Telemedicine Practice Guidelines issued by the Ministry of Health and Family Welfare and NMC. They contain the doctor’s official digital signature, NMC registration number, diagnosis summary, and recommended drug dosage, making them 100% valid across all licensed pharmacies in India.'
  },
  {
    id: 'consult-4',
    category: 'consultation',
    popular: true,
    badge: 'Free Follow-up',
    question: 'Do I get a free follow-up after my consultation?',
    answer: 'Yes! Every paid consultation comes with a complimentary 7-day follow-up window. You can ask follow-up questions, share newly generated lab test reports, or report symptom progress with your consulting physician at zero additional cost.'
  },
  {
    id: 'consult-5',
    category: 'consultation',
    badge: 'Flexibility',
    question: 'What happens if I need to reschedule or cancel my doctor appointment?',
    answer: 'You can reschedule your appointment free of charge up to 30 minutes before your scheduled slot directly from your dashboard. If you cancel prior to this window, a 100% instant refund is credited back to your original payment method or health wallet.'
  },
  {
    id: 'consult-6',
    category: 'consultation',
    badge: 'Languages',
    question: 'Can I consult doctors in Hindi, English, or regional languages?',
    answer: 'Yes, Mr Medics connects you with multi-lingual healthcare specialists. You can filter doctors based on language preference including Hindi, English, Bengali, Marathi, Telugu, Tamil, and more to comfortably describe your symptoms.'
  },

  // Pharmacy & Medicines
  {
    id: 'pharm-1',
    category: 'pharmacy',
    popular: true,
    badge: 'Prescription Upload',
    question: 'How do I order prescription medicines on Mr Medics?',
    answer: 'You can simply snap a clear photo or upload a PDF of your doctor’s prescription. Our registered clinical pharmacists review and verify the dosage within 10 minutes, automatically prepare your cart with required medicines, apply available discounts (up to 20%), and send you a payment confirmation link.'
  },
  {
    id: 'pharm-2',
    category: 'pharmacy',
    popular: true,
    badge: 'Express Delivery',
    question: 'How fast will my medicines be delivered?',
    answer: 'We provide Express Delivery within 2 to 4 hours in Delhi NCR and major metropolitan hubs. For other tier-1 and tier-2 pin codes across India, standard delivery takes 24 to 48 hours. You receive live SMS and WhatsApp tracking links at each stage of transit.'
  },
  {
    id: 'pharm-3',
    category: 'pharmacy',
    badge: 'Authenticity Guarantee',
    question: 'Are all medicines 100% authentic and genuine?',
    answer: 'All medicines delivered through Mr Medics are sourced exclusively from licensed pharmaceutical manufacturers and authorized distributors. Every order is inspected for batch numbers, expiry dates, and tamper-evident packaging before dispatch from our GMP-certified fulfillment hubs.'
  },
  {
    id: 'pharm-4',
    category: 'pharmacy',
    popular: true,
    badge: 'Cold Chain',
    question: 'How are temperature-sensitive medicines like Insulin and vaccines handled?',
    answer: 'Temperature-sensitive pharmaceuticals (e.g., Insulin vials, biological injections, vaccines) are packed in specialized insulated cold-chain boxes with medical-grade gel cooling packs and electronic temperature loggers to ensure they remain between 2°C to 8°C right until your doorstep.'
  },
  {
    id: 'pharm-5',
    category: 'pharmacy',
    badge: 'Returns & Refunds',
    question: 'What is your return and exchange policy for medicines?',
    answer: 'If you receive damaged, unsealed, or incorrect medicines, or if an item is within 3 months of expiration, you can initiate a hassle-free return within 48 hours of delivery. A replacement or 100% refund will be processed immediately upon verification.'
  },
  {
    id: 'pharm-6',
    category: 'pharmacy',
    badge: 'Generic Savings',
    question: 'Can I switch to affordable generic medicine substitutes?',
    answer: 'Yes! For chronic maintenance medications (like hypertension, diabetes, or cholesterol), our licensed pharmacists can recommend high-quality, bio-equivalent generic brands from reputed Indian pharma leaders, helping you save up to 60% to 80% on recurring monthly medical bills.'
  },

  // Lab Diagnostics
  {
    id: 'diag-1',
    category: 'diagnostics',
    popular: true,
    badge: 'Free Sample Pickup',
    question: 'How does free home sample collection work?',
    answer: 'Book your required blood test or whole-body health checkup, select your preferred home address and morning time slot. A certified, vaccinated phlebotomist will arrive equipped with single-use sterile needles, vacuum-sealed barcoded vials, and ice kits. Collection is 100% free with no hidden convenience fees.'
  },
  {
    id: 'diag-2',
    category: 'diagnostics',
    badge: 'Rapid Reports',
    question: 'When will I receive my diagnostic test reports?',
    answer: 'Routine blood tests (such as CBC, Thyroid Profile, Lipid Profile, HbA1c) are processed within 6 to 12 hours. Advanced molecular or culture tests take 24 to 48 hours. All reports are NABL & CAP accredited and delivered directly to your WhatsApp and digital health vault with physician analysis.'
  },

  // Safety, Privacy & Payments
  {
    id: 'safe-1',
    category: 'safety',
    popular: true,
    badge: '256-Bit Encryption',
    question: 'Is my medical history and consultation confidential?',
    answer: 'Your health privacy is our highest priority. All video calls, medical history records, and prescriptions are safeguarded using bank-grade 256-bit AES encryption compliant with Indian Digital Information Security in Healthcare Act (DISHA) and international HIPAA privacy standards. Only your assigned doctor has access during your session.'
  },
  {
    id: 'safe-2',
    category: 'safety',
    badge: 'Multiple Modes',
    question: 'What payment options are supported?',
    answer: 'We support all major Indian and international payment methods including UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards (Visa, MasterCard, RuPay), NetBanking across 50+ banks, and Cash on Delivery (COD) for physical pharmacy orders.'
  }
];

interface FaqSectionProps {
  initialCategory?: FaqCategory;
  showCategories?: boolean;
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function FaqSection({
  initialCategory = 'all',
  showCategories = true,
  className = '',
  title = 'Frequently Asked Questions',
  subtitle = 'Find quick answers about doctor video consultations, prescription validity, express medicine delivery, and safety.'
}: FaqSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [showMore, setShowMore] = useState(false);
  const [feedbackState, setFeedbackState] = useState<Record<string, 'helpful' | 'unhelpful'>>({});

  const categories: { id: FaqCategory; label: string; icon: any; count: number }[] = useMemo(() => [
    { id: 'all', label: 'All Questions', icon: Layers, count: FAQ_DATA.length },
    { id: 'consultation', label: 'Doctor Consultation', icon: Stethoscope, count: FAQ_DATA.filter(f => f.category === 'consultation').length },
    { id: 'pharmacy', label: 'Pharmacy & Medicines', icon: Pill, count: FAQ_DATA.filter(f => f.category === 'pharmacy').length },
    { id: 'diagnostics', label: 'Lab Tests & Reports', icon: FlaskConical, count: FAQ_DATA.filter(f => f.category === 'diagnostics').length },
    { id: 'safety', label: 'Privacy & Payments', icon: ShieldCheck, count: FAQ_DATA.filter(f => f.category === 'safety').length }
  ], []);

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch = 
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const displayedFaqs = useMemo(() => {
    return showMore || searchQuery ? filteredFaqs : filteredFaqs.slice(0, 5);
  }, [filteredFaqs, showMore, searchQuery]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleExpandAll = () => {
    const allOpen: Record<string, boolean> = {};
    displayedFaqs.forEach(item => {
      allOpen[item.id] = true;
    });
    setOpenItems(allOpen);
  };

  const handleCollapseAll = () => {
    setOpenItems({});
  };

  const areAllExpanded = displayedFaqs.length > 0 && displayedFaqs.every(item => openItems[item.id]);

  const handleFeedback = (id: string, type: 'helpful' | 'unhelpful') => {
    setFeedbackState(prev => ({ ...prev, [id]: type }));
  };

  return (
    <section className={`py-10 md:py-24 bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFF] to-[#FFFFFF] relative overflow-hidden ${className}`}>
      {/* Background Decorative Rings */}
      <div className="hidden md:block absolute top-1/4 -left-48 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden md:block absolute bottom-1/4 -right-48 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[960px] mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-14">
          <div className="hidden sm:block">
            <AnimatedBadge icon={HelpCircle} className="bg-blue-100/80 text-[#1769E0] mb-3">
              Patient Help Center & FAQs
            </AnimatedBadge>
          </div>
          
          <AnimatedHeading 
            text={title}
            highlightWords={["Frequently", "Questions", "Doctor", "Pharmacy"]}
            className="text-[24px] sm:text-[26px] md:text-[40px] font-extrabold text-[#0A1A45] mb-2 md:mb-4 leading-tight tracking-tight"
            as="h2"
          />
          
          <AnimatedParagraph className="text-[15px] sm:text-[17px] text-[#475569] max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </AnimatedParagraph>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-8">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search consultation, prescriptions, express medicine delivery..."
              className="w-full pl-12 pr-10 py-3.5 bg-white rounded-2xl border border-slate-200 text-sm text-[#0A1A45] placeholder-slate-400 focus:outline-none focus:border-[#1769E0] focus:ring-4 focus:ring-blue-500/10 shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-xs text-slate-500 mt-2 px-2 flex items-center justify-between">
              <span>Found <strong>{filteredFaqs.length}</strong> matching questions for &ldquo;{searchQuery}&rdquo;</span>
              <button 
                onClick={() => setSearchQuery('')}
                className="text-[#1769E0] hover:underline font-semibold"
              >
                Clear filter
              </button>
            </p>
          )}
        </div>

        {/* Category Pills */}
        {showCategories && (
          <div className="flex items-center gap-2 mb-6 md:mb-8 overflow-x-auto scrollbar-none pb-2 justify-start sm:justify-center -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setShowMore(false);
                  }}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                    isActive
                      ? 'bg-[#1769E0] text-white shadow-md shadow-blue-500/20'
                      : 'bg-white text-slate-600 hover:text-[#0A1A45] border border-slate-200/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] sm:text-[11px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* List Header / Controls */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-3 px-1">
          <span>
            Showing <strong className="text-[#0A1A45]">{displayedFaqs.length}</strong> of {filteredFaqs.length} questions
          </span>
          {displayedFaqs.length > 0 && (
            <button
              onClick={areAllExpanded ? handleCollapseAll : handleExpandAll}
              className="text-[#1769E0] font-bold hover:underline transition-colors"
            >
              {areAllExpanded ? 'Collapse All' : 'Expand All'}
            </button>
          )}
        </div>

        {/* Accordion List */}
        <div className="space-y-2.5 sm:space-y-3.5">
          {displayedFaqs.map((faq, idx) => {
            const isOpen = !!openItems[faq.id];
            const feedback = feedbackState[faq.id];

            return (
              <motion.div 
                key={faq.id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.03 }}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm ${
                  isOpen 
                    ? 'border-blue-300 ring-2 ring-blue-500/10 shadow-md' 
                    : 'border-slate-200/80 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {/* Question Trigger */}
                <button 
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-4 sm:p-6 text-left flex items-start sm:items-center justify-between gap-3 sm:gap-4 font-bold text-[#0A1A45] text-[14px] sm:text-base hover:text-[#1769E0] transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 flex-1">
                    <div className="flex items-center gap-1.5">
                      {faq.popular && (
                        <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-md border border-amber-200/60 shrink-0">
                          <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                          Popular
                        </span>
                      )}
                      {faq.badge && (
                        <span className="text-[10px] sm:text-[11px] font-semibold text-[#1769E0] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 shrink-0">
                          {faq.badge}
                        </span>
                      )}
                    </div>
                    <span className="leading-snug">{faq.question}</span>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="p-1 rounded-full bg-slate-50 text-[#1769E0] shrink-0 mt-0.5 sm:mt-0"
                  >
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                </button>

                {/* Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div 
                      key={`content-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-1 sm:pt-2 border-t border-slate-100">
                        <p className="text-xs sm:text-[15px] text-[#475569] leading-relaxed font-normal">
                          {faq.answer}
                        </p>

                        {/* Interactive Helpful Poll */}
                        <div className="mt-3 pt-2.5 border-t border-slate-100/80 flex items-center justify-between text-[11px] sm:text-xs text-slate-400">
                          <span className="text-slate-500">Was this answer helpful?</span>
                          {feedback ? (
                            <span className="text-emerald-600 font-semibold flex items-center gap-1">
                              ✓ Thanks for your feedback!
                            </span>
                          ) : (
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <button
                                onClick={() => handleFeedback(faq.id, 'helpful')}
                                className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-slate-200 hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                              >
                                <ThumbsUp className="w-3 h-3" />
                                <span>Yes</span>
                              </button>
                              <button
                                onClick={() => handleFeedback(faq.id, 'unhelpful')}
                                className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-slate-200 hover:border-rose-400 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                              >
                                <ThumbsDown className="w-3 h-3" />
                                <span>No</span>
                              </button>
                            </div>
                          )}
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* Show More Questions Toggle */}
          {!showMore && !searchQuery && filteredFaqs.length > 5 && (
            <div className="text-center pt-3">
              <button
                onClick={() => setShowMore(true)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-blue-200 text-[#1769E0] font-bold text-xs sm:text-sm hover:bg-blue-50 transition-all shadow-sm"
              >
                Show More Questions ({filteredFaqs.length - 5} more)
              </button>
            </div>
          )}

          {/* Empty Search Fallback */}
          {filteredFaqs.length === 0 && (
            <div className="text-center py-10 px-4 bg-white rounded-2xl border border-dashed border-slate-300">
              <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h3 className="text-sm sm:text-base font-bold text-[#0A1A45] mb-1">No matching questions found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
                We couldn&apos;t find any FAQs matching &ldquo;{searchQuery}&rdquo;. Try another keyword or reach out directly to our 24/7 care team.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#1769E0] bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  Reset Search
                </button>
                <a
                  href={`https://wa.me/${config.WHATSAPP_NUMBER}?text=Hi%20Mr%20Medics%20Support,%20I%20have%20a%20question%20regarding%20healthcare%20services`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors inline-flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Support Callout Card */}
        <div className="mt-8 sm:mt-12 p-5 sm:p-8 bg-gradient-to-r from-[#0A1A45] to-[#0E2E72] rounded-2xl sm:rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
          <div>
            <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-blue-300 mb-1 block">
              Still have questions?
            </span>
            <h4 className="text-base sm:text-xl font-bold text-white mb-1.5 sm:mb-2">
              Speak directly with our Medical Care Coordinator
            </h4>
            <p className="text-xs sm:text-sm text-blue-100/90 max-w-lg leading-relaxed">
              Our registered medical team is available 24/7 to help you book appointments, explain prescription details, or expedite urgent medicine delivery.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
            <a
              href={`https://wa.me/${config.WHATSAPP_NUMBER}?text=Hello%20Mr%20Medics,%20I%20need%20assistance%20with%20doctor%20consultation%20or%20medicine%20delivery`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Support</span>
            </a>

            <a
              href={`tel:${config.PHONE}`}
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm transition-all active:scale-95"
            >
              <PhoneCall className="w-4 h-4 text-blue-300" />
              <span>{config.PHONE}</span>
            </a>
        </div>
      </div>

    </div>
  </section>
);
}
