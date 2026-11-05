import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Headphones } from 'lucide-react';
import { motion } from 'motion/react';
import CrossPulse3D from '../components/CrossPulse3D';
import { config } from '../config';
import { AnimatedHeading, AnimatedParagraph, AnimatedBadge } from '../components/AnimatedTypography';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-white">
      
      {/* Hero Header with 3D CrossPulse */}
      <section className="bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFF] to-[#FFFFFF] py-16 border-b border-slate-100 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <AnimatedBadge icon={Headphones} className="bg-blue-50 text-[#1769E0] mb-4">
              24/7 Patient Support
            </AnimatedBadge>
            <h1 className="text-[40px] sm:text-[50px] font-extrabold text-[#0A1A45] mb-4 leading-tight">
              <AnimatedHeading 
                text="Get in Touch with Mrmedics Support"
                highlightWords={["Mrmedics", "Support"]}
                highlightClass="health-gradient-text"
                as="span"
              />
            </h1>
            <AnimatedParagraph className="text-lg text-[#475569] leading-relaxed">
              Have questions about doctor consultations, lab tests, or pharmacy orders? Reach out to our dedicated support team in A Block, Noida Sector 62 Industrial Area.
            </AnimatedParagraph>
          </div>
          <div className="h-[350px] w-full hidden sm:block">
            <CrossPulse3D />
          </div>
        </div>
      </section>

      {/* Contact Content Grid */}
      <section className="py-16 max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Info Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-[#F2F7FF] p-8 sm:p-10 rounded-3xl border border-blue-100 flex flex-col justify-between shadow-sm"
          >
            <div>
              <h3 className="text-2xl font-bold text-[#0A1A45] mb-6">Contact Information</h3>
              <p className="text-sm text-[#475569] mb-8 leading-relaxed font-normal">
                Our support team is available 24/7 to assist you with emergency queries, report downloads, prescription questions, and partner verifications.
              </p>

              <div className="space-y-6">
                <motion.div whileHover={{ x: 4 }} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl health-gradient text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Support Email</p>
                    <a href={`mailto:${config.EMAIL}`} className="text-base font-bold text-[#0A1A45] hover:text-[#1769E0] transition-colors">{config.EMAIL}</a>
                  </div>
                </motion.div>

                <motion.div whileHover={{ x: 4 }} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl health-gradient text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Phone Support</p>
                    <a href={`tel:${config.PHONE}`} className="text-base font-bold text-[#0A1A45] hover:text-[#1769E0] transition-colors">{config.PHONE}</a>
                  </div>
                </motion.div>

                <motion.div whileHover={{ x: 4 }} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl health-gradient text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Headquarters</p>
                    <p className="text-base font-bold text-[#0A1A45]">{config.ADDRESS}</p>
                    <p className="text-xs text-[#475569] mt-0.5">Founder & CEO: Praveen Verma</p>
                  </div>
                </motion.div>

                <motion.div whileHover={{ x: 4 }} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl health-gradient text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Working Hours</p>
                    <p className="text-base font-bold text-[#0A1A45]">Mon - Sun: 24/7 Available</p>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="mt-10 p-4 bg-white rounded-2xl border border-slate-200 text-xs text-[#475569] shadow-sm">
              <p className="font-bold text-[#0A1A45] mb-1">Medical Emergency Notice:</p>
              <p>Mrmedics does not replace emergency care. In case of emergency, please dial your local emergency number immediately.</p>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-slate-100"
          >
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#0A1A45] mb-2">Message Sent Successfully!</h3>
                <p className="text-[#475569] max-w-md mx-auto mb-8 font-normal">
                  Thank you for reaching out. Our support team in Noida Sector 62 has received your query and will get back to you within 2–4 hours.
                </p>
                <motion.button 
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                  className="px-6 py-3 rounded-xl health-gradient text-white font-bold text-sm shadow-md"
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold text-[#0A1A45] mb-6">Send Us a Direct Message</h3>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#0A1A45] uppercase mb-2">Your Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Praveen Kumar"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1769E0] text-[#0A1A45] text-sm transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0A1A45] uppercase mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="praveen@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1769E0] text-[#0A1A45] text-sm transition"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#0A1A45] uppercase mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1769E0] text-[#0A1A45] text-sm transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0A1A45] uppercase mb-2">Subject</label>
                    <input 
                      type="text" 
                      placeholder="Booking query / Lab report"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1769E0] text-[#0A1A45] text-sm transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0A1A45] uppercase mb-2">Message *</label>
                  <textarea 
                    required
                    rows={5}
                    placeholder="How can we help you today?"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1769E0] text-[#0A1A45] text-sm transition"
                  />
                </div>

                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl health-gradient text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:shadow-xl transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </motion.button>
              </form>
            )}
          </motion.div>

        </div>
      </section>

    </div>
  );
}
