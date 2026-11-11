import { useState, useEffect, useMemo } from 'react';
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
  ShoppingBag
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
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const LOCAL_STORAGE_CART_KEY = 'mrmedics_lab_cart_items';

export default function LabTestsService() {
  const { user } = useAuth();
  const categories = getCategories();

  // Search & Filter state
  const [searchInput, setSearchInput] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(24);

  // Cart state stored in localStorage with try/catch
  const [cart, setCart] = useState<LabItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Could not read cart from localStorage:', e);
      return [];
    }
  });

  // UI Drawer / Modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [whatsappLink, setWhatsappLink] = useState('');

  // Booking Form fields
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    phone: '',
    address: '',
    date: '',
    time: 'Morning (07:00 AM - 11:00 AM)',
    notes: ''
  });
  const [formValidation, setFormValidation] = useState<string | null>(null);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchInput.trim().toLowerCase());
      setVisibleCount(24);
    }, 250);
    return () => clearTimeout(handler);
  }, [searchInput]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart to localStorage:', e);
    }
  }, [cart]);

  // Reset pagination when category changes
  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setVisibleCount(24);
  };

  // Filter items based on category & search query
  const filteredItems = useMemo(() => {
    return labTests.filter((item) => {
      // Category filter
      let matchesCategory = true;
      if (selectedCategory === 'Health Packages') {
        matchesCategory = item.type === 'package';
      } else if (selectedCategory !== 'All') {
        matchesCategory = item.category === selectedCategory;
      }

      // Search filter
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

  // Order items: Packages first when in "All" view
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

  // Cart operations
  const isInCart = (id: string) => cart.some(item => item.id === id);

  const toggleCartItem = (item: LabItem) => {
    if (isInCart(item.id)) {
      setCart(prev => prev.filter(i => i.id !== item.id));
    } else {
      setCart(prev => [...prev, item]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Pricing calculations
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + getPatientPrice(item), 0);
  }, [cart]);

  const homeFee = LAB_PRICING.homeCollectionFee || 0;
  const totalPrice = subtotal + homeFee;

  // Form Submit Handler
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormValidation(null);
    setBookingError(null);

    if (cart.length === 0) {
      setFormValidation('Your cart is empty. Please select at least one test or package.');
      return;
    }
    if (!patientInfo.name.trim()) {
      setFormValidation('Please enter patient full name.');
      return;
    }
    const cleanPhone = patientInfo.phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setFormValidation('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!patientInfo.address.trim()) {
      setFormValidation('Please enter complete home collection address.');
      return;
    }
    if (!patientInfo.date) {
      setFormValidation('Please select a preferred collection date.');
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingData = {
        patientName: patientInfo.name.trim(),
        phone: cleanPhone,
        address: patientInfo.address.trim(),
        slotDate: patientInfo.date,
        slotTime: patientInfo.time,
        notes: patientInfo.notes.trim() || '',
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: getPatientPrice(item),
          category: item.category,
          type: item.type
        })),
        totalAmount: totalPrice,
        homeCollectionFee: homeFee,
        status: 'Pending',
        createdAt: serverTimestamp(),
        userId: user?.uid || null,
        userEmail: user?.email || null,
      };

      // Save to Firestore collection "labBookings"
      await addDoc(collection(db, 'labBookings'), bookingData);

      // Build WhatsApp prefilled message
      const itemsListText = cart
        .map(i => `• ${i.name} - ₹${getPatientPrice(i)}`)
        .join('\n');

      const message = `Hello Mr Medics,
I have requested a Lab Test / Health Package Booking:

📋 *Selected Items:*
${itemsListText}

💰 *Total Amount:* ₹${totalPrice}${homeFee > 0 ? ` (Includes ₹${homeFee} Home Pickup)` : ' (Free Home Collection)'}

👤 *Patient Details:*
• Name: ${patientInfo.name.trim()}
• Mobile: ${cleanPhone}
• Address: ${patientInfo.address.trim()}
• Preferred Slot: ${patientInfo.date} at ${patientInfo.time}
${patientInfo.notes.trim() ? `• Notes: ${patientInfo.notes.trim()}` : ''}

Please confirm my home collection booking slot.`;

      const encodedMsg = encodeURIComponent(message);
      const link = `https://wa.me/${config.WHATSAPP_NUMBER}?text=${encodedMsg}`;
      setWhatsappLink(link);

      setBookingSuccess(true);
      clearCart();

      // Open WhatsApp safely
      try {
        window.open(link, '_blank');
      } catch (err) {
        console.warn('Popup blocked, link shown in UI');
      }
    } catch (err: any) {
      console.error('Error saving lab booking to Firestore:', err);
      setBookingError('Unable to save your booking request. Please check your network connection or tap "Send on WhatsApp" directly.');
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
              140 Certified Tests & Health Packages
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
              Order blood & urine tests online. Certified phlebotomists collect samples from your doorstep with 100% safety protocols. Fast digital report delivery on WhatsApp & App.
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
                <div className="text-xs font-semibold text-[#475569]">Doorstep Pickup</div>
              </div>
            </div>
          </div>

          <div className="h-[320px] sm:h-[380px] w-full hidden lg:block relative">
            <Hero3D />
          </div>
        </div>
      </section>

      {/* Main Catalogue Section */}
      <section className="py-6 sm:py-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Important Patient Notes Banner */}
        <div className="mb-6 p-3.5 bg-blue-50/80 rounded-2xl border border-blue-100 text-xs text-[#475569] space-y-1">
          <p className="flex items-center gap-1.5 font-semibold text-[#0A1A45]">
            <CheckCircle2 className="w-4 h-4 text-[#1769E0] shrink-0" />
            <span>Prices are inclusive of lab charges. Final price is confirmed on WhatsApp/call.</span>
          </p>
          <p className="flex items-center gap-1.5 font-semibold text-[#0A1A45]">
            <CheckCircle2 className="w-4 h-4 text-[#0FB5A0] shrink-0" />
            <span>Fasting may be required for some tests; our care team will guide you after booking.</span>
          </p>
        </div>

        {/* Search & Category Controls */}
        <div className="space-y-4 mb-8">
          
          {/* Search Bar */}
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
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-full"
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
            <span>Showing {displayedItems.length} of {filteredItems.length} items</span>
            {cart.length > 0 && (
              <button 
                onClick={() => setIsCartOpen(true)}
                className="text-[#1769E0] font-bold hover:underline flex items-center gap-1"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>View Cart ({cart.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="bg-[#F2F7FF] border border-blue-100 rounded-3xl p-8 sm:p-12 text-center my-8">
            <TestTube className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#0A1A45] mb-1">No Tests or Packages Found</h3>
            <p className="text-xs text-[#475569] mb-4 max-w-md mx-auto">
              We couldn't find any test matching "{searchInput}". Try checking your spelling or search for common terms like "Blood", "Sugar", "Thyroid", or "CBC".
            </p>
            <button
              onClick={() => { setSearchInput(''); setSelectedCategory('All'); }}
              className="min-h-[44px] px-6 py-2.5 rounded-xl health-gradient text-white font-bold text-xs shadow-md"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Tests & Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {displayedItems.map((item) => {
            const isPkg = item.type === 'package';
            const price = getPatientPrice(item);
            const added = isInCart(item.id);
            const includesList = item.includes ? item.includes.split(',').map(s => s.trim()) : [];

            if (isPkg) {
              // Highlighted Package Card
              return (
                <div 
                  key={item.id}
                  className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-blue-200 shadow-md shadow-blue-900/5 flex flex-col justify-between h-full relative overflow-hidden group hover:border-[#1769E0] transition"
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

                    <h3 className="text-lg sm:text-xl font-bold text-[#0A1A45] leading-snug group-hover:text-[#1769E0] transition-colors break-words">
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
      </section>

      {/* Sticky Bottom Bar on Mobile */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0A1A45] text-white p-3 sm:p-4 shadow-2xl border-t border-blue-900 flex items-center justify-between max-w-full">
          <div className="min-w-0 pr-2">
            <span className="text-xs text-blue-200 block truncate">
              {cart.length} {cart.length === 1 ? 'test selected' : 'tests selected'}
            </span>
            <span className="text-lg sm:text-xl font-extrabold text-white">
              Total: ₹{totalPrice}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsCartOpen(true)}
              className="min-h-[44px] px-3.5 py-2.5 rounded-xl bg-blue-900/80 hover:bg-blue-800 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
            </button>

            <button
              onClick={() => { setIsBookingOpen(true); setBookingSuccess(false); }}
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm shadow-lg transition cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </div>
      )}

      {/* Cart Drawer Modal */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="bg-white rounded-t-3xl sm:rounded-3xl p-5 sm:p-7 max-w-md w-full min-w-0 max-h-[85vh] overflow-y-auto shadow-2xl relative border border-slate-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#1769E0]" />
                  <h3 className="text-lg font-bold text-[#0A1A45]">Selected Tests ({cart.length})</h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center font-bold transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <p className="text-sm font-semibold mb-3">Your cart is empty.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="min-h-[44px] px-4 py-2 bg-blue-50 text-[#1769E0] font-bold text-xs rounded-xl"
                  >
                    Browse Tests
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-[#F2F7FF] rounded-xl text-xs border border-blue-100 gap-2">
                        <div className="min-w-0">
                          <span className="font-bold text-[#0A1A45] block truncate">{item.name}</span>
                          <span className="text-[10px] text-slate-500">{item.category}</span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="font-extrabold text-[#1769E0]">₹{getPatientPrice(item)}</span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-red-500 p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-2xl space-y-1.5 text-xs text-[#475569]">
                    <div className="flex justify-between">
                      <span>Tests Subtotal:</span>
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
                    <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-[#0A1A45]">
                      <span>Total Amount:</span>
                      <span className="text-[#1769E0]">₹{totalPrice}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={clearCart}
                      className="min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-bold text-xs hover:bg-slate-50 transition"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => { setIsCartOpen(false); setIsBookingOpen(true); setBookingSuccess(false); }}
                      className="flex-1 min-h-[44px] py-2.5 rounded-xl health-gradient text-white font-bold text-xs shadow-md hover:opacity-95 transition"
                    >
                      Proceed to Book
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Booking Form Sheet / Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-t-3xl sm:rounded-3xl p-5 sm:p-8 max-w-lg w-full min-w-0 max-h-[90vh] overflow-y-auto shadow-2xl relative border border-slate-200 my-auto"
            >
              <button
                onClick={() => setIsBookingOpen(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center transition z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {bookingSuccess ? (
                <div className="text-center py-4">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="w-16 h-16 rounded-full bg-emerald-100 text-[#0FB5A0] flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#0A1A45] mb-2">Booking Request Submitted</h3>
                  <p className="text-xs sm:text-sm text-[#475569] mb-6 leading-relaxed">
                    Your lab booking has been saved. Please tap below to send the details on WhatsApp for instant slot confirmation.
                  </p>

                  <div className="p-4 bg-blue-50 rounded-2xl text-left text-xs space-y-1.5 mb-6 text-slate-700 break-words">
                    <div><span className="font-bold">Patient Name:</span> {patientInfo.name}</div>
                    <div><span className="font-bold">Mobile:</span> {patientInfo.phone}</div>
                    <div><span className="font-bold">Collection Address:</span> {patientInfo.address}</div>
                    <div><span className="font-bold">Slot:</span> {patientInfo.date} ({patientInfo.time})</div>
                    <div><span className="font-bold">Total Amount:</span> ₹{totalPrice}</div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-h-[44px] px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition"
                    >
                      <span>Send on WhatsApp</span>
                    </a>
                    <button
                      onClick={() => setIsBookingOpen(false)}
                      className="min-h-[44px] px-5 py-3 rounded-xl border border-slate-300 text-[#0A1A45] hover:bg-slate-50 font-bold text-sm"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4 text-left">
                  <div className="pr-8">
                    <span className="text-xs font-bold text-[#1769E0] uppercase tracking-wider block mb-1">
                      Home Sample Collection
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0A1A45]">Book Lab Tests & Packages</h3>
                    <p className="text-xs text-[#475569] mt-0.5">
                      {cart.length} {cart.length === 1 ? 'item' : 'items'} selected · Total: <span className="font-bold text-[#1769E0]">₹{totalPrice}</span>
                    </p>
                  </div>

                  {formValidation && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold flex items-start gap-2 break-words">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{formValidation}</span>
                    </div>
                  )}

                  {bookingError && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 font-semibold break-words">
                      {bookingError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-[#0A1A45] uppercase mb-1">Patient Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Praveen Kumar"
                        value={patientInfo.name}
                        onChange={e => setPatientInfo({ ...patientInfo, name: e.target.value })}
                        className="w-full min-h-[44px] pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-[#1769E0]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0A1A45] uppercase mb-1">Mobile Number (10 digits) *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input 
                        type="tel"
                        inputMode="tel"
                        required 
                        maxLength={10}
                        placeholder="9311601420"
                        value={patientInfo.phone}
                        onChange={e => setPatientInfo({ ...patientInfo, phone: e.target.value })}
                        className="w-full min-h-[44px] pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-[#1769E0]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0A1A45] uppercase mb-1">Home Collection Address *</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                      <textarea 
                        required 
                        rows={2}
                        placeholder="House / Flat No., Street, Landmark, City & Pincode"
                        value={patientInfo.address}
                        onChange={e => setPatientInfo({ ...patientInfo, address: e.target.value })}
                        className="w-full min-h-[44px] pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-[#1769E0]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#0A1A45] uppercase mb-1">Preferred Date *</label>
                      <input 
                        type="date" 
                        required 
                        value={patientInfo.date}
                        onChange={e => setPatientInfo({ ...patientInfo, date: e.target.value })}
                        className="w-full min-h-[44px] px-3 py-2.5 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-[#1769E0]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0A1A45] uppercase mb-1">Time Slot *</label>
                      <select
                        value={patientInfo.time}
                        onChange={e => setPatientInfo({ ...patientInfo, time: e.target.value })}
                        className="w-full min-h-[44px] px-3 py-2.5 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-[#1769E0] bg-white"
                      >
                        <option value="Morning (07:00 AM - 11:00 AM)">Morning (07:00 AM - 11:00 AM)</option>
                        <option value="Midday (11:00 AM - 02:00 PM)">Midday (11:00 AM - 02:00 PM)</option>
                        <option value="Afternoon (02:00 PM - 05:00 PM)">Afternoon (02:00 PM - 05:00 PM)</option>
                        <option value="Evening (05:00 PM - 08:00 PM)">Evening (05:00 PM - 08:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0A1A45] uppercase mb-1">Notes / Medical History (Optional)</label>
                    <div className="relative">
                      <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                      <textarea 
                        rows={2}
                        placeholder="Any fasting status, special instructions or symptoms..."
                        value={patientInfo.notes}
                        onChange={e => setPatientInfo({ ...patientInfo, notes: e.target.value })}
                        className="w-full min-h-[44px] pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-[#1769E0]"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full min-h-[48px] py-3.5 rounded-xl health-gradient text-white font-bold text-sm shadow-lg hover:opacity-95 transition mt-3 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving Booking...</span>
                      </>
                    ) : (
                      <span>Confirm & Request Sample Collection</span>
                    )}
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
