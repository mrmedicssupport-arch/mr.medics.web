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

export default function MedicinesService() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<any[]>([]);
  const [rxUploaded, setRxUploaded] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

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

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + parseInt(item.price.replace('₹', '')), 0);
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFF] to-[#FFFFFF] py-20 border-b border-blue-50">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <AnimatedBadge className="bg-emerald-50 text-[#0FB5A0] mb-5 border border-emerald-100" icon={ShieldCheck}>
              100% Genuine Certified Pharmacy
            </AnimatedBadge>

            <AnimatedHeading
              text="Online Pharmacy With Fast Doorstep Delivery & Verified Prescriptions"
              highlightWords={["Online", "Pharmacy", "Doorstep", "Delivery", "Verified"]}
              className="text-[38px] sm:text-[50px] font-extrabold text-[#0A1A45] mb-6 leading-[1.15]"
              as="h1"
            />

            <AnimatedParagraph
              delay={0.2}
              className="text-lg text-[#475569] mb-8 leading-relaxed max-w-xl"
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

          <div className="h-[380px] w-full hidden sm:block relative">
            <Hero3D />
          </div>
        </div>
      </section>

      {/* Catalogue & Prescription Upload */}
      <section className="py-16 max-w-[1200px] mx-auto px-6">
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
                Quick Order Via Prescription
              </span>
              <h3 className="text-lg font-extrabold text-[#0A1A45] mb-2">Upload Doctor's Rx</h3>
              <p className="text-xs text-[#475569] mb-4">Our pharmacist will read your prescription and prepare your order automatically.</p>
              
              {rxUploaded ? (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-3 text-emerald-800 text-xs font-bold">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-[#0FB5A0]" />
                  <span>Prescription uploaded! Verified by licensed pharmacist.</span>
                </div>
              ) : (
                <label className="border-2 border-dashed border-blue-200 hover:border-[#1769E0] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-[#F2F7FF] hover:bg-blue-50/50 transition-all text-center">
                  <Upload className="w-8 h-8 text-[#1769E0] mb-2" />
                  <span className="text-xs font-bold text-[#0A1A45]">Click to upload prescription</span>
                  <span className="text-[10px] text-slate-400 mt-1">Supports JPG, PNG, PDF (Max 10MB)</span>
                  <input type="file" onChange={() => setRxUploaded(true)} className="hidden" />
                </label>
              )}
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
                      <span className="font-extrabold text-[#1769E0]">{item.price}</span>
                    </div>
                  ))}

                  <div className="pt-3 border-t border-slate-200 flex justify-between font-extrabold text-sm text-[#0A1A45]">
                    <span>Total Amount</span>
                    <span className="text-[#1769E0]">₹{calculateTotal()}</span>
                  </div>
                </div>
              )}

              {orderPlaced ? (
                <div className="p-4 bg-emerald-50 rounded-2xl text-center text-emerald-800 text-xs font-bold">
                  <CheckCircle2 className="w-6 h-6 text-[#0FB5A0] mx-auto mb-1" />
                  Order confirmed! Out for door-delivery with real-time tracking.
                </div>
              ) : (
                <button 
                  onClick={() => { if (cart.length > 0) setOrderPlaced(true); }}
                  disabled={cart.length === 0}
                  className="w-full py-3.5 rounded-xl health-gradient text-white font-bold text-sm shadow-lg shadow-blue-900/15 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.01] transition-transform"
                >
                  Place Order for Doorstep Delivery
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
