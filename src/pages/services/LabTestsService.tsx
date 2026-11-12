import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
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
  Sparkles, 
  Plus, 
  Check, 
  Trash2, 
  FileText, 
  AlertCircle, 
  Loader2, 
  X, 
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Hero3D from '../../components/Hero3D';
import { 
  AnimatedHeading, 
  AnimatedParagraph, 
  AnimatedBadge 
} from '../../components/AnimatedTypography';
import { config, LAB_PRICING } from '../../config';
import { labTests, getPatientPrice, getCategories, LabItem } from '../../data/labTests';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface ConfirmedBooking {
  bookingRef: string;
  items: {
    id: string;
    name: string;
    price: number;
    category?: string;
    type?: string;
    sample?: string;
    turnaround?: string;
  }[];
  total: number;
  homeCollectionFee: number;
  patient: {
    name: string;
    phone: string;
    address: string;
    pincode: string;
  };
  slotDate: string;
  slotLabel: string;
  notes?: string;
}

const getTodayString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getMaxDateString = () => {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function LabTestsService() {
  const { user } = useAuth();
  const { 
    cart, 
    toggleCartItem, 
    removeFromCart, 
    isInCart, 
    clearCart, 
    subtotal, 
    homeFee, 
    totalPrice,
    isCartOpen,
    setIsCartOpen
  } = useCart();

  const categories = getCategories();

  // Search & Filter state
  const [searchInput, setSearchInput] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(24);

  // Booking Form & Flow State
  // Step 1: Cart, Step 2: Details Form, Step 3: Confirmation
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [whatsappLink, setWhatsappLink] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);

  // Form Fields & Validation
  const todayStr = getTodayString();
  const maxDateStr = getMaxDateString();

  const [patientInfo, setPatientInfo] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
    date: todayStr,
    time: 'Morning (07:00 AM - 11:00 AM)',
    notes: ''
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchInput.trim().toLowerCase());
      setVisibleCount(24);
    }, 250);
    return () => clearTimeout(handler);
  }, [searchInput]);

  // Lock body scroll when cart/booking sheet is open on mobile/desktop
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.overscrollBehavior = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.overscrollBehavior = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.overscrollBehavior = '';
    };
  }, [isCartOpen]);

  // Reset category pagination
  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setVisibleCount(24);
  };

  // Filter items based on category & search query
  const filteredItems = useMemo(() => {
    return labTests.filter((item) => {
      let matchesCategory = true;
      if (selectedCategory === 'Health Packages') {
        matchesCategory = item.type === 'package';
      } else if (selectedCategory !== 'All') {
        matchesCategory = item.category === selectedCategory;
      }

      let matchesSearch = true;
      if (debouncedQuery) {
        const nameMatch = item.name.toLowerCase().includes(debouncedQuery);
        const catMatch = item.category.toLowerCase().includes(debouncedQuery);
        const sampleMatch = item.sample.toLowerCase().includes(debouncedQuery);
        const includesMatch = item.includes ? item.includes.toLowerCase().includes(debouncedQuery) : false;
        matchesSearch = nameMatch || catMatch || sampleMatch || includesMatch;
      }

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, debouncedQuery]);

  // Packages shown first in 'All' view
  const sortedAndFiltered = useMemo(() => {
    if (selectedCategory === 'All') {
      const packages = filteredItems.filter(i => i.type === 'package');
      const tests = filteredItems.filter(i => i.type === 'test');
      return [...packages, ...tests];
    }
    return filteredItems;
  }, [filteredItems, selectedCategory]);

  const displayedItems = useMemo(() => {
    return sortedAndFiltered.slice(0, visibleCount);
  }, [sortedAndFiltered, visibleCount]);

  // Open booking flow at Step 1 or Step 2
  const handleOpenBooking = (step: 1 | 2 = 1) => {
    setActiveStep(step);
    setBookingError(null);
    setFieldErrors({});
    setIsCartOpen(true);
  };

  // Close and reset modal flow
  const handleCloseModal = () => {
    setIsCartOpen(false);
    setConfirmedBooking(null);
    setActiveStep(1);
    setPatientInfo({
      name: '',
      phone: '',
      address: '',
      pincode: '',
      date: getTodayString(),
      time: 'Morning (07:00 AM - 11:00 AM)',
      notes: ''
    });
    setFieldErrors({});
    setBookingError(null);
  };

  // Validate Step 2 details form
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (patientInfo.name.trim().length < 2) {
      errors.name = 'Enter full name (min 2 letters).';
    }

    const cleanPhone = patientInfo.phone.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errors.phone = 'Enter a valid 10-digit mobile number starting with 6-9.';
    }

    if (patientInfo.address.trim().length < 10) {
      errors.address = 'Enter complete home address (min 10 characters).';
    }

    const cleanPincode = patientInfo.pincode.replace(/\D/g, '');
    if (!/^\d{6}$/.test(cleanPincode)) {
      errors.pincode = 'Enter a valid 6-digit pincode.';
    }

    if (!patientInfo.date) {
      errors.date = 'Select preferred collection date.';
    } else {
      const today = getTodayString();
      const maxDate = getMaxDateString();
      if (patientInfo.date < today || patientInfo.date > maxDate) {
        errors.date = 'Date must be today or within the next 30 days.';
      }
    }

    if (!patientInfo.time) {
      errors.time = 'Select preferred time slot.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit Booking Form to Firestore
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError(null);

    if (cart.length === 0 || totalPrice <= 0) {
      setBookingError('Your cart is empty. Add a test first.');
      setActiveStep(1);
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const cleanPhone = patientInfo.phone.replace(/\D/g, '');
    const cleanPincode = patientInfo.pincode.replace(/\D/g, '');
    const generatedRef = `LB-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      // 1) Build immutable order snapshot FIRST
      const snapshotItems = cart.map(item => ({
        id: item.id,
        name: item.name,
        price: getPatientPrice(item),
        category: item.category || undefined,
        type: item.type || undefined,
        sample: item.sample || undefined,
        turnaround: item.turnaround || undefined,
      }));

      const computedSubtotal = snapshotItems.reduce((acc, i) => acc + i.price, 0);
      const computedTotal = computedSubtotal + homeFee;

      const orderSnapshot: ConfirmedBooking = {
        bookingRef: generatedRef,
        items: snapshotItems,
        total: computedTotal,
        homeCollectionFee: homeFee,
        patient: {
          name: patientInfo.name.trim(),
          phone: cleanPhone,
          address: patientInfo.address.trim(),
          pincode: cleanPincode,
        },
        slotDate: patientInfo.date,
        slotLabel: patientInfo.time,
        notes: patientInfo.notes.trim() || undefined,
      };

      // 2) Prepare exact Firestore payload (never write undefined)
      const firestorePayload = {
        bookingRef: generatedRef,
        bookingId: generatedRef,
        items: snapshotItems.map(i => ({
          id: i.id,
          name: i.name,
          price: i.price,
          category: i.category || null,
          type: i.type || null,
          sample: i.sample || null,
          turnaround: i.turnaround || null,
        })),
        totalAmount: computedTotal,
        homeCollectionFee: homeFee,
        patientName: orderSnapshot.patient.name,
        phone: orderSnapshot.patient.phone,
        address: orderSnapshot.patient.address,
        pincode: orderSnapshot.patient.pincode,
        slotDate: orderSnapshot.slotDate,
        slotTime: orderSnapshot.slotLabel,
        notes: orderSnapshot.notes || null,
        status: 'Pending',
        createdAt: serverTimestamp(),
        userId: user?.uid || null,
        userEmail: user?.email || null,
      };

      // Save to Firestore labBookings collection
      await addDoc(collection(db, 'labBookings'), firestorePayload);

      // 3) Only AFTER write succeeds: set confirmedBooking and build WhatsApp message from snapshot
      setConfirmedBooking(orderSnapshot);
      setBookingId(generatedRef);

      const testItemsStr = orderSnapshot.items
        .map((item, idx) => `${idx + 1}) ${item.name} ₹${item.price}`)
        .join(', ');

      const whatsappMessage = `Hello Mr Medics, I want to book a lab test.
Ref: ${orderSnapshot.bookingRef}
Name: ${orderSnapshot.patient.name}, Mobile: ${orderSnapshot.patient.phone}
Address: ${orderSnapshot.patient.address}, Pincode: ${orderSnapshot.patient.pincode}
Slot: ${orderSnapshot.slotDate} (${orderSnapshot.slotLabel})
Tests: ${testItemsStr}
Total: ₹${orderSnapshot.total}`;

      const encodedMsg = encodeURIComponent(whatsappMessage);
      const link = `https://wa.me/${config.WHATSAPP_NUMBER}?text=${encodedMsg}`;
      setWhatsappLink(link);

      // Clear cart ONLY AFTER successful write & snapshot saving
      clearCart();
      setActiveStep(3);

      try {
        window.open(link, '_blank');
      } catch (err) {
        console.warn('Popup blocked, link presented in UI');
      }
    } catch (err: any) {
      console.error('Error saving lab booking:', err);
      setBookingError('Unable to complete booking right now. Please check your network or try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-[100svh] w-full max-w-full overflow-x-hidden pb-24 sm:pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFF] to-[#FFFFFF] py-8 sm:py-12 border-b border-blue-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <AnimatedBadge className="bg-teal-50 text-[#0FB5A0] mb-4 border border-teal-100" icon={ShieldCheck}>
              140 NABL & ICMR Accredited Tests
            </AnimatedBadge>

            <AnimatedHeading
              text="Diagnostic Lab Tests With Free Doorstep Sample Collection"
              highlightWords={["Diagnostic", "Lab", "Tests", "Doorstep", "Sample"]}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A1A45] mb-4 leading-tight"
              as="h1"
            />

            <AnimatedParagraph
              delay={0.2}
              className="text-sm sm:text-base text-[#475569] mb-6 leading-relaxed max-w-xl"
            >
              Order certified blood & urine tests online. Certified phlebotomists collect samples right from your doorstep. Digital reports on WhatsApp & App within hours.
            </AnimatedParagraph>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-white rounded-2xl border border-blue-100 shadow-sm">
                <div className="text-xl sm:text-2xl font-extrabold text-[#1769E0]">140+</div>
                <div className="text-xs font-semibold text-[#475569]">Certified Tests</div>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-blue-100 shadow-sm">
                <div className="text-xl sm:text-2xl font-extrabold text-[#0FB5A0]">Up to 6h</div>
                <div className="text-xs font-semibold text-[#475569]">Fast Turnaround</div>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-blue-100 shadow-sm col-span-2 sm:col-span-1">
                <div className="text-xl sm:text-2xl font-extrabold text-[#0A1A45]">₹0 Fee</div>
                <div className="text-xs font-semibold text-[#475569]">Home Pickup</div>
              </div>
            </div>
          </div>

          <div className="h-[320px] sm:h-[380px] w-full hidden lg:block relative">
            <Hero3D />
          </div>
        </div>
      </section>

      {/* Main Grid Section with Desktop Cart Panel */}
      <section className="py-6 sm:py-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Important Patient Notes Banner */}
        <div className="mb-6 p-4 bg-blue-50/80 rounded-2xl border border-blue-100 text-xs text-[#475569] space-y-1.5">
          <p className="flex items-center gap-1.5 font-semibold text-[#0A1A45]">
            <CheckCircle2 className="w-4 h-4 text-[#1769E0] shrink-0" />
            <span>Prices are inclusive of lab charges. Final price is confirmed on WhatsApp/call.</span>
          </p>
          <p className="flex items-center gap-1.5 font-semibold text-[#0A1A45]">
            <CheckCircle2 className="w-4 h-4 text-[#0FB5A0] shrink-0" />
            <span>Fasting may be required for some tests; our care team will guide you after booking.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Search, Categories & Test Cards */}
          <div className="lg:col-span-8 min-w-0 w-full">
            
            {/* Search Bar */}
            <div className="space-y-4 mb-8">
              <div className="relative w-full max-w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                <input 
                  type="text" 
                  placeholder="Search 140+ tests or packages (e.g. CBC, HbA1c, Thyroid, Lipid, Akshaya)..."
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  className="w-full min-h-[48px] pl-12 pr-10 py-3 bg-[#F2F7FF] rounded-2xl border border-blue-100 text-[#0A1A45] font-medium text-base focus:outline-none focus:border-[#1769E0] focus:bg-white shadow-inner transition"
                />
                {searchInput && (
                  <button 
                    onClick={() => setSearchInput('')} 
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-full cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Horizontally Scrollable Category Chips */}
              <div className="flex items-center gap-2 overflow-x-auto w-full min-w-0 max-w-full pb-2 scrollbar-none">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => handleSelectCategory(cat)}
                      className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                        isActive 
                          ? 'health-gradient text-white shadow-md scale-105' 
                          : 'bg-[#F2F7FF] text-[#0A1A45] border border-blue-100 hover:bg-white'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Results Summary Bar */}
              <div className="flex items-center justify-between text-xs font-semibold text-[#475569] pt-2 border-t border-slate-100">
                <span>Showing {displayedItems.length} of {filteredItems.length} tests</span>
                {cart.length > 0 && (
                  <button 
                    onClick={() => handleOpenBooking(1)}
                    className="text-[#1769E0] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>View Cart ({cart.length})</span>
                  </button>
                )}
              </div>
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
              <div className="bg-[#F2F7FF] border border-blue-100 rounded-3xl p-8 sm:p-12 text-center my-6">
                <TestTube className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-[#0A1A45] mb-1">No Tests Found</h3>
                <p className="text-xs text-[#475569] mb-4 max-w-md mx-auto">
                  We couldn't find any test matching "{searchInput}". Try searching for common tests like "CBC", "Lipid", "HbA1c", or "Sugar".
                </p>
                <button
                  onClick={() => { setSearchInput(''); setSelectedCategory('All'); }}
                  className="min-h-[44px] px-6 py-2.5 rounded-xl health-gradient text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Tests & Packages Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {displayedItems.map((item) => {
                const isPkg = item.type === 'package';
                const price = getPatientPrice(item);
                const added = isInCart(item.id);
                const includesList = item.includes ? item.includes.split(',').map(s => s.trim()) : [];

                if (isPkg) {
                  // Package Card
                  return (
                    <div 
                      key={item.id}
                      className="bg-white rounded-3xl p-5 border-2 border-blue-200 shadow-md flex flex-col justify-between h-full relative overflow-hidden group hover:border-[#1769E0] transition"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-extrabold uppercase tracking-wider bg-blue-100 text-[#1769E0] px-2.5 py-0.5 rounded-md">
                            {item.category}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] font-extrabold text-white bg-amber-500 px-2 py-0.5 rounded-full shadow-sm shrink-0">
                            <Sparkles className="w-3 h-3" /> Health Package
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-[#0A1A45] leading-snug group-hover:text-[#1769E0] transition-colors break-words">
                          {item.name}
                        </h3>

                        {includesList.length > 0 && (
                          <div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase mb-1.5">Includes {includesList.length} Tests:</p>
                            <div className="flex flex-wrap gap-1">
                              {includesList.map((inc, i) => (
                                <span key={i} className="text-[11px] bg-blue-50 text-[#1769E0] font-semibold px-2 py-0.5 rounded border border-blue-100">
                                  {inc}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-xs text-[#475569]">
                          <Clock className="w-3.5 h-3.5 text-[#0FB5A0] shrink-0" />
                          <span>Reports in {item.turnaround}</span>
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                        <div>
                          <div className="text-2xl font-extrabold text-[#0A1A45]">₹{price}</div>
                          <span className="text-[10px] font-extrabold text-[#0FB5A0] uppercase block">Free Home Pickup</span>
                        </div>

                        <button
                          onClick={() => toggleCartItem(item)}
                          className={`min-h-[44px] px-5 py-2.5 rounded-xl font-bold text-xs shadow-sm transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                            added
                              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                              : 'health-gradient text-white hover:opacity-95'
                          }`}
                        >
                          {added ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                          <span>{added ? 'Added' : 'Add'}</span>
                        </button>
                      </div>
                    </div>
                  );
                }

                // Standard Test Card
                return (
                  <div 
                    key={item.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between h-full group hover:border-blue-300 hover:shadow-md transition"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-bold text-[#1769E0] bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider truncate">
                          {item.category}
                        </span>
                        {item.sample && (
                          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded shrink-0">
                            Sample: {item.sample}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-[#0A1A45] mb-2 leading-snug group-hover:text-[#1769E0] transition-colors break-words">
                        {item.name}
                      </h3>

                      <div className="flex items-center gap-1.5 text-xs text-[#475569] mb-4">
                        <Clock className="w-3.5 h-3.5 text-[#0FB5A0] shrink-0" />
                        <span>Reports in {item.turnaround}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-xl font-extrabold text-[#0A1A45]">₹{price}</span>
                      </div>

                      <button
                        onClick={() => toggleCartItem(item)}
                        className={`min-h-[44px] px-4 py-2 rounded-xl font-bold text-xs shadow-sm transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                          added
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'bg-[#F2F7FF] text-[#1769E0] border border-blue-200 hover:bg-[#1769E0] hover:text-white'
                        }`}
                      >
                        {added ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        <span>{added ? 'Added' : 'Add'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More Button */}
            {visibleCount < sortedAndFiltered.length && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setVisibleCount(prev => prev + 24)}
                  className="min-h-[48px] px-8 py-3 rounded-2xl health-gradient text-white font-bold text-sm shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  Load More Tests ({sortedAndFiltered.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Desktop Sticky Cart Panel (lg:sticky lg:top-28 w-[360px]) */}
          <div className="hidden lg:block lg:col-span-4 w-full">
            <div className="lg:sticky lg:top-28 bg-white rounded-3xl border border-slate-200 p-6 shadow-xl w-full">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#1769E0]" />
                  <h3 className="text-lg font-bold text-[#0A1A45]">
                    {cart.length > 0 ? `Your Cart (${cart.length})` : 'Your Cart'}
                  </h3>
                </div>
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-slate-400 hover:text-rose-600 font-semibold cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              {cart.length === 0 ? (
                <div className="py-10 text-center text-slate-500 space-y-2">
                  <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-[#475569]">Your cart is empty.</p>
                  <p className="text-xs text-slate-400">Add tests to book.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Item Rows */}
                  <div className="space-y-2.5 max-h-[280px] overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-[#F2F7FF] rounded-xl border border-blue-100 gap-2">
                        <div className="min-w-0">
                          <span className="font-bold text-[#0A1A45] text-xs block truncate">{item.name}</span>
                          <span className="text-[10px] text-[#475569]">{item.sample ? `Sample: ${item.sample}` : item.category}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-extrabold text-[#1769E0] text-xs">₹{getPatientPrice(item)}</span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-red-600 cursor-pointer"
                            title="Remove test"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 bg-slate-50 rounded-2xl space-y-2 text-xs text-[#475569]">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="font-bold text-[#0A1A45]">₹{subtotal}</span>
                    </div>

                    {homeFee > 0 ? (
                      <div className="flex justify-between text-teal-700">
                        <span>Home Sample Collection:</span>
                        <span className="font-bold">₹{homeFee}</span>
                      </div>
                    ) : (
                      <div className="flex justify-between text-emerald-700 font-semibold">
                        <span>Home Sample Collection:</span>
                        <span>FREE</span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-extrabold text-[#0A1A45]">
                      <span>Total Amount:</span>
                      <span className="text-[#1769E0]">₹{totalPrice}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenBooking(2)}
                    className="min-h-[48px] w-full rounded-2xl health-gradient text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Book Now (₹{totalPrice})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Mobile Sticky Cart Bar (fixed above bottom navigation bar) */}
      {cart.length > 0 && (
        <div 
          style={{ bottom: 'calc(64px + env(safe-area-inset-bottom, 0px))' }}
          className="lg:hidden fixed left-3 right-3 z-50 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2.5 sm:p-3 flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              <ShoppingBag className="w-6 h-6 text-[#1769E0]" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#1769E0] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow">
                {cart.length}
              </span>
            </div>
            <div className="min-w-0">
              <span className="text-xs text-[#475569] block truncate font-medium">
                {cart.length} {cart.length === 1 ? 'test' : 'tests'}
              </span>
              <span className="text-base font-extrabold text-[#0A1A45] leading-none">
                ₹{totalPrice}
              </span>
            </div>
          </div>

          <button
            onClick={() => handleOpenBooking(1)}
            className="min-h-[44px] h-[44px] px-5 rounded-xl bg-[#1769E0] hover:bg-[#1255b8] text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition flex items-center justify-center shrink-0 cursor-pointer"
          >
            View Cart
          </button>
        </div>
      )}

      {/* Cart Sheet (Mobile) & Booking Modal (Desktop) */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end lg:items-center justify-center p-0 lg:p-4">
            
            {/* Backdrop click to close */}
            <div 
              className="absolute inset-0" 
              onClick={() => setIsCartOpen(false)} 
            />

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-white rounded-t-3xl lg:rounded-3xl p-5 sm:p-7 max-w-lg w-full max-h-[85svh] lg:max-h-[90vh] overflow-y-auto shadow-2xl relative border border-slate-200 z-10 flex flex-col justify-between my-auto"
            >
              {/* Mobile Drag Handle */}
              <div className="lg:hidden w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-3 shrink-0" />

              {/* Close (X) Button */}
              <button
                onClick={() => setIsCartOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center transition shrink-0 cursor-pointer min-h-[44px] min-w-[44px]"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Progress Hint */}
              <div className="pb-4 mb-4 border-b border-slate-100 pr-8">
                <div className="flex items-center justify-between gap-1 text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-2">
                  <span className={activeStep === 1 ? 'text-[#1769E0]' : 'text-slate-400'}>
                    Step 1: Your Cart
                  </span>
                  <span>•</span>
                  <span className={activeStep === 2 ? 'text-[#1769E0]' : 'text-slate-400'}>
                    Step 2: Details
                  </span>
                  <span>•</span>
                  <span className={activeStep === 3 ? 'text-emerald-600' : 'text-slate-400'}>
                    Step 3: Confirm
                  </span>
                </div>
              </div>

              {/* STEP 1: CART ITEMS REVIEW */}
              {activeStep === 1 && (
                <div className="space-y-4 flex-1">
                  <h3 className="text-lg font-bold text-[#0A1A45]">
                    {cart.length > 0 ? `Selected Tests (${cart.length})` : 'Your Cart is Empty'}
                  </h3>

                  {cart.length === 0 ? (
                    <div className="py-8 text-center text-slate-500 space-y-3">
                      <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                      <p className="text-sm font-semibold text-[#475569]">Add a test first.</p>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="min-h-[44px] px-6 py-2.5 bg-blue-50 text-[#1769E0] font-bold text-xs rounded-xl hover:bg-blue-100 cursor-pointer"
                      >
                        Back to Tests List
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Item list */}
                      <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-3 bg-[#F2F7FF] rounded-xl text-xs border border-blue-100 gap-2">
                            <div className="min-w-0">
                              <span className="font-bold text-[#0A1A45] text-sm block truncate">{item.name}</span>
                              <span className="text-[11px] text-[#475569]">
                                {item.sample ? `Sample: ${item.sample} • ` : ''}Reports in {item.turnaround}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <span className="font-extrabold text-[#1769E0] text-sm">₹{getPatientPrice(item)}</span>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-red-600 cursor-pointer"
                                title="Remove test"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Summary */}
                      <div className="p-4 bg-slate-50 rounded-2xl space-y-2 text-xs text-[#475569]">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span className="font-bold text-[#0A1A45]">₹{subtotal}</span>
                        </div>

                        {homeFee > 0 ? (
                          <div className="flex justify-between text-teal-700">
                            <span>Home Sample Collection:</span>
                            <span className="font-bold">₹{homeFee}</span>
                          </div>
                        ) : (
                          <div className="flex justify-between text-emerald-700 font-semibold">
                            <span>Home Sample Collection:</span>
                            <span>FREE</span>
                          </div>
                        )}

                        <div className="pt-2 border-t border-slate-200 flex justify-between text-lg font-extrabold text-[#0A1A45]">
                          <span>Total:</span>
                          <span className="text-[#1769E0]">₹{totalPrice}</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => setActiveStep(2)}
                        className="min-h-[48px] w-full rounded-2xl health-gradient text-white font-bold text-base shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer mt-2"
                      >
                        <span>Continue to Booking (₹{totalPrice})</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* STEP 2: PATIENT DETAILS FORM */}
              {activeStep === 2 && (
                <div className="space-y-4 flex-1">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setActiveStep(1)}
                      className="text-xs text-[#1769E0] font-bold flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Cart</span>
                    </button>
                    <span className="text-xs font-bold text-[#0A1A45]">Total: ₹{totalPrice}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0A1A45]">Enter Patient Details</h3>

                  {bookingError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold flex items-start gap-2 break-words">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        <p>{bookingError}</p>
                        <button
                          onClick={handleBookingSubmit}
                          className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-[11px] font-bold"
                        >
                          Retry Booking
                        </button>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleBookingSubmit} className="space-y-3.5">
                    {/* Patient Name */}
                    <div>
                      <label className="block text-xs font-bold text-[#0A1A45] mb-1">Full Name *</label>
                      <input 
                        type="text"
                        required
                        placeholder="e.g. Praveen Kumar"
                        value={patientInfo.name}
                        onChange={e => setPatientInfo({ ...patientInfo, name: e.target.value })}
                        className="w-full min-h-[44px] min-w-0 max-w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[16px] text-[#0A1A45] focus:outline-none focus:border-[#1769E0]"
                      />
                      {fieldErrors.name && (
                        <p className="text-xs text-red-600 font-semibold mt-1">{fieldErrors.name}</p>
                      )}
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="block text-xs font-bold text-[#0A1A45] mb-1">Mobile Number (10 digits) *</label>
                      <input 
                        type="tel"
                        inputMode="tel"
                        required
                        maxLength={10}
                        placeholder="9311601420"
                        value={patientInfo.phone}
                        onChange={e => setPatientInfo({ ...patientInfo, phone: e.target.value })}
                        className="w-full min-h-[44px] min-w-0 max-w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[16px] text-[#0A1A45] focus:outline-none focus:border-[#1769E0]"
                      />
                      {fieldErrors.phone && (
                        <p className="text-xs text-red-600 font-semibold mt-1">{fieldErrors.phone}</p>
                      )}
                    </div>

                    {/* Collection Address */}
                    <div>
                      <label className="block text-xs font-bold text-[#0A1A45] mb-1">Home Collection Address *</label>
                      <textarea 
                        required
                        rows={2}
                        placeholder="House / Flat No., Street, Landmark"
                        value={patientInfo.address}
                        onChange={e => setPatientInfo({ ...patientInfo, address: e.target.value })}
                        className="w-full min-h-[44px] min-w-0 max-w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[16px] text-[#0A1A45] focus:outline-none focus:border-[#1769E0]"
                      />
                      {fieldErrors.address && (
                        <p className="text-xs text-red-600 font-semibold mt-1">{fieldErrors.address}</p>
                      )}
                    </div>

                    {/* Area / Pincode */}
                    <div>
                      <label className="block text-xs font-bold text-[#0A1A45] mb-1">Area / Pincode *</label>
                      <input 
                        type="text"
                        required
                        placeholder="e.g. Sector 62, Noida - 201309"
                        value={patientInfo.pincode}
                        onChange={e => setPatientInfo({ ...patientInfo, pincode: e.target.value })}
                        className="w-full min-h-[44px] min-w-0 max-w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[16px] text-[#0A1A45] focus:outline-none focus:border-[#1769E0]"
                      />
                      {fieldErrors.pincode && (
                        <p className="text-xs text-red-600 font-semibold mt-1">{fieldErrors.pincode}</p>
                      )}
                    </div>

                    {/* Date and Time Slot Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[#0A1A45] mb-1">Preferred Date *</label>
                        <input 
                          type="date"
                          required
                          min={todayStr}
                          max={maxDateStr}
                          value={patientInfo.date}
                          onChange={e => setPatientInfo({ ...patientInfo, date: e.target.value })}
                          className="w-full min-h-[44px] min-w-0 max-w-full px-3 py-2.5 rounded-xl border border-slate-200 text-[16px] text-[#0A1A45] focus:outline-none focus:border-[#1769E0]"
                        />
                        {fieldErrors.date && (
                          <p className="text-xs text-red-600 font-semibold mt-1">{fieldErrors.date}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0A1A45] mb-1">Time Slot *</label>
                        <select
                          value={patientInfo.time}
                          onChange={e => setPatientInfo({ ...patientInfo, time: e.target.value })}
                          className="w-full min-h-[44px] min-w-0 max-w-full px-3 py-2.5 rounded-xl border border-slate-200 text-[16px] text-[#0A1A45] focus:outline-none focus:border-[#1769E0] bg-white"
                        >
                          <option value="Morning (07:00 AM - 11:00 AM)">Morning (07:00 AM - 11:00 AM)</option>
                          <option value="Afternoon (12:00 PM - 04:00 PM)">Afternoon (12:00 PM - 04:00 PM)</option>
                          <option value="Evening (05:00 PM - 08:00 PM)">Evening (05:00 PM - 08:00 PM)</option>
                        </select>
                        {fieldErrors.time && (
                          <p className="text-xs text-red-600 font-semibold mt-1">{fieldErrors.time}</p>
                        )}
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-xs font-bold text-[#0A1A45] mb-1">Notes / Symptoms (Optional)</label>
                      <textarea 
                        rows={2}
                        placeholder="Fasting status, medical conditions or special instructions..."
                        value={patientInfo.notes}
                        onChange={e => setPatientInfo({ ...patientInfo, notes: e.target.value })}
                        className="w-full min-h-[44px] min-w-0 max-w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[16px] text-[#0A1A45] focus:outline-none focus:border-[#1769E0]"
                      />
                    </div>

                    {/* Sticky Submit Button */}
                    <div className="pt-2 sticky bottom-0 bg-white">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="min-h-[48px] w-full rounded-2xl health-gradient text-white font-bold text-base shadow-lg hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Confirming Booking...</span>
                          </>
                        ) : (
                          <span>Complete Booking (₹{totalPrice})</span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* STEP 3: CONFIRMATION SCREEN (Reads ONLY from confirmedBooking) */}
              {activeStep === 3 && confirmedBooking && (
                <div className="text-center py-2 space-y-4">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2"
                  >
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </motion.div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0A1A45]">Booking Request Received</h3>
                  <p className="text-xs text-[#475569] font-bold">
                    Booking Ref: <span className="text-[#1769E0] font-extrabold">{confirmedBooking.bookingRef}</span>
                  </p>

                  <div className="p-4 bg-blue-50/80 rounded-2xl text-left text-xs space-y-3 border border-blue-100 text-[#0A1A45]">
                    <div>
                      <span className="font-extrabold uppercase text-[10px] tracking-wider text-slate-500 block mb-1">Patient Details</span>
                      <p className="font-bold text-sm text-[#0A1A45]">{confirmedBooking.patient.name}</p>
                      <p className="text-[#475569]">Mobile: {confirmedBooking.patient.phone}</p>
                      <p className="text-[#475569] break-words">Address: {confirmedBooking.patient.address}, Pincode: {confirmedBooking.patient.pincode}</p>
                      <p className="text-[#1769E0] font-semibold mt-1">Slot: {confirmedBooking.slotDate} ({confirmedBooking.slotLabel})</p>
                    </div>

                    <div className="pt-2 border-t border-blue-100">
                      <span className="font-extrabold uppercase text-[10px] tracking-wider text-slate-500 block mb-1">Booked Tests ({confirmedBooking.items.length})</span>
                      <div className="space-y-1.5 max-h-36 overflow-y-auto">
                        {confirmedBooking.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs">
                            <span className="text-[#0A1A45] font-medium truncate">{idx + 1}. {item.name}</span>
                            <span className="font-bold text-[#0A1A45] shrink-0">₹{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-blue-100 space-y-1">
                      {confirmedBooking.homeCollectionFee > 0 ? (
                        <div className="flex justify-between text-[#475569]">
                          <span>Home Collection Fee:</span>
                          <span>₹{confirmedBooking.homeCollectionFee}</span>
                        </div>
                      ) : (
                        <div className="flex justify-between text-emerald-700 font-semibold">
                          <span>Home Sample Collection:</span>
                          <span>FREE</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm font-extrabold text-[#0A1A45] pt-1 border-t border-blue-200">
                        <span>Total:</span>
                        <span className="text-[#1769E0]">₹{confirmedBooking.total}</span>
                      </div>
                    </div>
                  </div>

                  {whatsappLink && (
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[48px] w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <MessageSquare className="w-5 h-5" />
                      <span>Send on WhatsApp</span>
                    </a>
                  )}

                  {!user && (
                    <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-center space-y-1.5">
                      <p className="text-xs text-amber-900 font-semibold">Create an account to track your bookings</p>
                      <Link
                        to="/signup"
                        onClick={handleCloseModal}
                        className="inline-block px-4 py-2 bg-[#1769E0] text-white text-xs font-bold rounded-xl shadow-sm hover:bg-blue-700 transition"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}

                  <button
                    onClick={handleCloseModal}
                    className="min-h-[44px] w-full rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0A1A45] font-bold text-xs transition cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
