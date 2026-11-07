import { useState } from 'react';
import { 
  Search, 
  Pill, 
  Upload, 
  CheckCircle2, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Plus,
  BadgePercent
} from 'lucide-react';
import { motion } from 'motion/react';
import Hero3D from '../../components/Hero3D';
import { 
  AnimatedHeading, 
  AnimatedParagraph, 
  AnimatedBadge, 
  FadeInBlock, 
  AnimatedNumber 
} from '../../components/AnimatedTypography';
import FaqSection from '../../components/FaqSection';

import { config } from '../../config';
import { logLeadSafely } from '../../lib/leads';

export default function MedicinesService() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<any[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [whatsappLink, setWhatsappLink] = useState('');
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' });

  const medicines = [
    { name: "Paracetamol 650mg (Dolo)", category: "Pain Relief", mrp: "₹35", price: "₹28", rx: false, discount: "20% OFF", desc: "Fast-acting relief from fever and mild to moderate pain." },
    { name: "Azithromycin 500mg", category: "Antibiotics", mrp: "₹120", price: "₹96", rx: true, discount: "20% OFF", desc: "Broad-spectrum antibiotic for respiratory and skin bacterial infections." },
    { name: "Multivitamin & Zinc Chelate", category: "Daily Wellness", mrp: "₹250", price: "₹199", rx: false, discount: "20% OFF", desc: "Immunity support, antioxidant defense, and energy revitalization." },
    { name: "Pantoprazole 40mg DSR", category: "Digestive Care", mrp: "₹110", price: "₹88", rx: true, discount: "20% OFF", desc: "Acid reflux, GERD, and gastrointestinal protection." },
    { name: "Metformin 500mg SR", category: "Diabetes Care", mrp: "₹60", price: "₹48", rx: true, discount: "20% OFF", desc: "Maintains optimal glycemic control for Type 2 diabetes." },
    { name: "Telmisartan 40mg", category: "Cardiac Health", mrp: "₹95", price: "₹76", rx: true, discount: "20% OFF", desc: "Blood pressure management and cardiovascular support." },
  ];

  const filteredMeds = medicines.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (med: any) => {
    setCart(prev => [...prev, med]);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + parseInt(item.price.replace('₹', '')), 0);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!customer.name.trim()) {
      setValidationError('Please enter patient full name.');
      return;
    }
    const cleanPhone = customer.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setValidationError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!customer.address.trim()) {
      setValidationError('Please enter delivery address.');
      return;
    }

    const itemsSummary = cart.map(item => `• ${item.name} (${item.price})`).join('\n');
    const total = calculateTotal();

    const message = `Hello Mr Medics,
I would like to place a Medicine Order:
${itemsSummary}
• Estimated Total: ₹${total}
• Patient: ${customer.name.trim()}
• Phone: ${cleanPhone}
• Delivery Address: ${customer.address.trim()}
Please verify prescription and confirm my medicine delivery.`;

    const encoded = encodeURIComponent(message);
    const link = `https://wa.me/${config.WHATSAPP_NUMBER}?text=${encoded}`;
    setWhatsappLink(link);
    setOrderPlaced(true);

    try {
      window.open(link, '_blank');
    } catch (e) {
      console.warn('Popup blocked, link shown in UI');
    }

    logLeadSafely({
      type: 'pharmacy_order',
      items: cart.map(i => i.name),
      totalAmount: total,
      patientName: customer.name.trim(),
      phone: cleanPhone,
      deliveryAddress: customer.address.trim(),
    });
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFF] to-[#FFFFFF] py-8 sm:py-12 lg:py-16 border-b border-blue-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <AnimatedBadge className="bg-emerald-50 text-[#0FB5A0] mb-5 border border-emerald-100" icon={ShieldCheck}>
              100% Genuine Certified Pharmacy
            </AnimatedBadge>

            <AnimatedHeading
              text="Online Pharmacy With Fast Doorstep Delivery & Verified Prescriptions"
              highlightWords={["Online", "Pharmacy", "Doorstep", "Delivery", "Verified"]}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A1A45] mb-6 leading-[1.15]"
              as="h1"
            />

            <AnimatedParagraph
              delay={0.2}
              className="text-base text-[#475569] mb-8 leading-relaxed max-w-xl"
            >
              Order all chronic and acute medications with licensed pharmacist verification. Enjoy up to 20% savings, tamper-proof temperature-controlled delivery, and auto-refill reminders.
            </AnimatedParagraph>

            <FadeInBlock delay={0.3} className="flex items-center gap-6">
              <div className="flex items-center gap-2.5">
                <Truck className="w-5 h-5 text-[#0FB5A0]" />
                <span className="text-sm font-bold text-[#0A1A45]">Doorstep Express Delivery</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#1769E0]" />
                <span className="text-sm font-bold text-[#0A1A45]">{cart.length} In Cart</span>
              </div>
            </FadeInBlock>
          </div>

          <div className="h-[380px] w-full hidden lg:block relative">
            <Hero3D />
          </div>
        </div>
      </section>

      {/* Catalogue & Prescription Upload */}
      <section className="py-8 sm:py-12 lg:py-16 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Catalogue */}
          <div className="lg:col-span-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <AnimatedHeading
                  text="Genuine Medicines & Healthcare Essentials"
                  highlightWords={["Genuine", "Medicines"]}
                  className="text-2xl font-extrabold text-[#0A1A45]"
                />
                <AnimatedParagraph className="text-xs text-[#475569] mt-0.5">
                  Showing {filteredMeds.length} verified products available for instant order
                </AnimatedParagraph>
              </div>

              <div className="relative w-full sm:w-[320px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search tablet, syrup, brand..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-[#F2F7FF] rounded-2xl border border-blue-100 text-[#0A1A45] font-medium text-xs focus:outline-none focus:border-[#1769E0] focus:bg-white transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {filteredMeds.map((med, idx) => (
                <FadeInBlock key={idx} delay={idx * 0.06}>
                  <div className="bg-[#F2F7FF] p-6 rounded-3xl border border-blue-100 shadow-md shadow-blue-900/5 hover:shadow-xl hover:border-blue-300 transition-all flex flex-col justify-between h-full group">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-[#1769E0] bg-blue-50 px-2.5 py-1 rounded-lg">
                          {med.category}
                        </span>
                        {med.rx ? (
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                            Rx Required
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            OTC
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-[#0A1A45] mb-1 group-hover:text-[#1769E0] transition-colors">
                        {med.name}
                      </h3>
                      
                      <p className="text-xs text-[#475569] mb-4 leading-relaxed">
                        {med.desc}
                      </p>

                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-2xl font-extrabold text-[#0A1A45]">{med.price}</span>
                        <span className="text-xs text-slate-400 line-through">{med.mrp}</span>
                        <span className="text-xs font-extrabold text-[#0FB5A0] bg-emerald-50 px-2 py-0.5 rounded">
                          {med.discount}
                        </span>
                      </div>
                    </div>

                    <button 
                      onClick={() => addToCart(med)}
                      className="w-full py-2.5 rounded-xl health-gradient text-white font-bold text-xs shadow-md shadow-blue-900/15 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to Medicine Bag</span>
                    </button>
                  </div>
                </FadeInBlock>
              ))}
            </div>
          </div>

          {/* Rx Upload & Cart Summary */}
          <div className="lg:col-span-4 space-y-8 sticky top-28">
            
            {/* Prescription Upload Card */}
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-blue-100">
              <span className="text-[11px] font-bold text-[#1769E0] uppercase tracking-wider block mb-1">
                Direct Pharmacy WhatsApp
              </span>
              <h3 className="text-lg font-extrabold text-[#0A1A45] mb-2">Order Via Prescription</h3>
              <p className="text-xs text-[#475569] mb-4">Send your physical prescription photo directly to our licensed pharmacist on WhatsApp.</p>
              
              <a 
                href={`https://wa.me/${config.WHATSAPP_NUMBER}?text=Hello%20Mr%20Medics%20Pharmacy,%20I%20would%20like%20to%20share%20my%20prescription%20photo%20for%20medicine%20delivery.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
              >
                <Upload className="w-4 h-4" />
                <span>Send Prescription on WhatsApp</span>
              </a>
            </div>

            {/* Cart Summary Card */}
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-blue-100">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <h3 className="text-lg font-bold text-[#0A1A45]">Cart Summary</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1769E0] text-xs font-bold">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              {cart.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400">
                  <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  <span>Your medicine cart is empty.</span>
                </div>
              ) : (
                <div className="space-y-3 mb-6 max-h-[220px] overflow-y-auto pr-1">
                  {cart.map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-xs p-2 rounded-xl bg-slate-50">
                      <div>
                        <span className="font-bold text-[#0A1A45] block">{item.name}</span>
                        <span className="text-[10px] text-slate-400">{item.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-[#1769E0]">{item.price}</span>
                        <button 
                          onClick={() => removeFromCart(i)}
                          className="text-slate-400 hover:text-red-500 text-xs px-1"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="pt-3 border-t border-slate-200 flex justify-between font-extrabold text-sm text-[#0A1A45]">
                    <span>Total Estimated</span>
                    <span className="text-[#1769E0]">₹{calculateTotal()}</span>
                  </div>
                </div>
              )}

              {orderPlaced ? (
                <div className="p-4 bg-[#F2F7FF] rounded-2xl text-center text-xs border border-blue-100">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#0FB5A0] flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-[#0A1A45] mb-1">Your Request is Ready</h4>
                  <p className="text-xs text-[#475569] mb-4">
                    Send it on WhatsApp so our pharmacy team can verify your prescription and confirm delivery.
                  </p>
                  <div className="flex flex-col gap-2">
                    <a 
                      href={whatsappLink} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 active:scale-95"
                    >
                      <span>Open WhatsApp</span>
                    </a>
                    <a 
                      href={`tel:${config.PHONE}`} 
                      className="w-full py-2.5 rounded-xl border border-slate-300 text-[#0A1A45] hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-2 active:scale-95"
                    >
                      <span>Call Us: {config.PHONE}</span>
                    </a>
                  </div>
                </div>
              ) : showCheckout ? (
                <form onSubmit={handlePlaceOrder} className="space-y-3 pt-2">
                  {validationError && (
                    <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold">
                      {validationError}
                    </div>
                  )}
                  <div>
                    <label className="block text-[11px] font-bold text-[#0A1A45] uppercase mb-1">Patient Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Praveen Kumar"
                      value={customer.name}
                      onChange={e => setCustomer({ ...customer, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#1769E0]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#0A1A45] uppercase mb-1">Mobile (10 digits) *</label>
                    <input 
                      type="tel" 
                      required 
                      maxLength={10}
                      placeholder="9311601420"
                      value={customer.phone}
                      onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#1769E0]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#0A1A45] uppercase mb-1">Delivery Address *</label>
                    <textarea 
                      required 
                      rows={2}
                      placeholder="Flat / House no, Landmark, Noida / City"
                      value={customer.address}
                      onChange={e => setCustomer({ ...customer, address: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#1769E0]"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-3 rounded-xl health-gradient text-white font-bold text-xs shadow-md hover:scale-[1.01] transition-transform"
                  >
                    Send Medicine Order on WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCheckout(false)}
                    className="w-full py-1 text-slate-400 text-xs hover:text-slate-600"
                  >
                    Back to Cart
                  </button>
                </form>
              ) : (
                <button 
                  onClick={() => setShowCheckout(true)}
                  disabled={cart.length === 0}
                  className="w-full py-3.5 rounded-xl health-gradient text-white font-bold text-sm shadow-lg shadow-blue-900/15 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.01] transition-transform"
                >
                  Proceed to Checkout ({cart.length} {cart.length === 1 ? 'item' : 'items'})
                </button>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* Interactive FAQ for Pharmacy & Medicines */}
      <FaqSection 
        initialCategory="pharmacy"
        title="Pharmacy & Medicine Delivery FAQs"
        subtitle="Quick answers on prescription verification, express 2-4 hour delivery, cold-chain handling, and genuine medicine guarantee."
      />
    </div>
  );
}
