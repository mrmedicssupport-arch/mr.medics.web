import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Headphones, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import CrossPulse3D from '../components/CrossPulse3D';
import { config } from '../config';
import { AnimatedHeading, AnimatedParagraph, AnimatedBadge } from '../components/AnimatedTypography';
import { logLeadSafely } from '../lib/leads';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [whatsappLink, setWhatsappLink] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!formData.name.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setValidationError('Please enter a valid email address.');
      return;
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setValidationError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!formData.message.trim()) {
      setValidationError('Please write your message or query.');
      return;
    }

    const text = `Hello Mr Medics Support,
I have an inquiry from the website:
• Name: ${formData.name.trim()}
• Email: ${formData.email.trim()}
• Phone: ${cleanPhone}
• Subject: ${formData.subject.trim() || 'General Inquiry'}
• Message: ${formData.message.trim()}`;

    const encoded = encodeURIComponent(text);
    const link = `https://wa.me/${config.WHATSAPP_NUMBER}?text=${encoded}`;
    setWhatsappLink(link);
    setSubmitted(true);

    try {
      window.open(link, '_blank');
    } catch (e) {
      console.warn('Popup blocked, link shown in UI');
    }

    logLeadSafely({
      type: 'contact_message',
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: cleanPhone,
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    });
  };

  return (
    <div className="bg-white">
      
      {/* Hero Header with 3D CrossPulse */}
      <section className="bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFF] to-[#FFFFFF] py-8 sm:py-12 lg:py-16 border-b border-slate-100 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <AnimatedBadge icon={Headphones} className="bg-blue-50 text-[#1769E0] mb-4">
              24/7 Patient Support
            </AnimatedBadge>
            <h1 className="text-[32px] sm:text-[40px] font-extrabold text-[#0A1A45] mb-4 leading-tight">
              <AnimatedHeading 
                text="Get in Touch with Mr Medics Support"
                highlightWords={["Mr", "Medics", "Support"]}
                highlightClass="health-gradient-text"
                as="span"
              />
            </h1>
            <AnimatedParagraph className="text-base text-[#475569] leading-relaxed">
              Have questions about doctor consultations, lab tests, or pharmacy orders? Reach out to our dedicated support team in A Block, Noida Sector 62 Industrial Area.
            </AnimatedParagraph>
          </div>
          <div className="h-[350px] w-full hidden lg:block">
            <CrossPulse3D />
          </div>
        </div>
      </section>

      {/* Contact Content Grid */}
      <section className="py-8 sm:py-12 lg:py-16 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Info Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-[#F2F7FF] p-6 sm:p-8 lg:p-10 rounded-3xl border border-blue-100 flex flex-col justify-between shadow-sm w-full max-w-full min-w-0"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0A1A45] mb-6">Contact Information</h3>
              <p className="text-sm text-[#475569] mb-8 leading-relaxed font-normal break-words">
                Our support team is available 24/7 to assist you with emergency queries, report downloads, prescription questions, and partner verifications.
              </p>

              <div className="space-y-6">
                <motion.div whileHover={{ x: 4 }} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl health-gradient text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-400 uppercase">Support Email</p>
                    <a href={`mailto:${config.EMAIL}`} className="text-sm sm:text-base font-bold text-[#0A1A45] hover:text-[#1769E0] transition-colors break-words">{config.EMAIL}</a>
                  </div>
                </motion.div>

                <motion.div whileHover={{ x: 4 }} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl health-gradient text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-400 uppercase">Phone Support</p>
                    <a href={`tel:${config.PHONE}`} className="text-sm sm:text-base font-bold text-[#0A1A45] hover:text-[#1769E0] transition-colors">{config.PHONE}</a>
                  </div>
                </motion.div>

                <motion.div whileHover={{ x: 4 }} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl health-gradient text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-400 uppercase">Headquarters</p>
                    <p className="text-sm sm:text-base font-bold text-[#0A1A45] break-words">{config.ADDRESS}</p>
                    <p className="text-xs text-[#475569] mt-0.5">Founder & CEO: Praveen Verma</p>
                  </div>
                </motion.div>

                <motion.div whileHover={{ x: 4 }} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl health-gradient text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-400 uppercase">Working Hours</p>
                    <p className="text-sm sm:text-base font-bold text-[#0A1A45]">Mon - Sun: 24/7 Available</p>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-white rounded-2xl border border-slate-200 text-xs text-[#475569] shadow-sm leading-relaxed">
              <p className="font-bold text-[#0A1A45] mb-1">Medical Emergency Notice:</p>
              <p>Mr Medics does not provide emergency care. In case of a medical emergency, please dial 112 immediately or reach your nearest emergency department.</p>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white p-6 sm:p-8 lg:p-12 rounded-3xl shadow-xl border border-slate-100 w-full max-w-full min-w-0"
          >
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 sm:py-10 flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0FB5A0] flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0A1A45] mb-2">Your Message is Ready</h3>
                <p className="text-[#475569] max-w-md mx-auto mb-6 text-sm leading-relaxed">
                  We have prepared your message. For the fastest response, send it directly to our verified care coordinator on WhatsApp or give us a quick call.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mb-6">
                  <a
                    href={`https://wa.me/${config.WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      `Hello Mr Medics Team,\nMy name is ${formData.name || 'Patient'}.\nPhone: ${formData.phone || 'N/A'}\nSubject: ${formData.subject || 'General Enquiry'}\n\nMessage: ${formData.message}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition whitespace-normal break-words"
                  >
                    <span>Open in WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${config.PHONE}`}
                    className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-[#0A1A45] rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition whitespace-normal"
                  >
                    <span>Call Us</span>
                  </a>
                </div>

                <button 
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                  className="text-xs text-[#1769E0] font-semibold hover:underline"
                >
                  Send another inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <h3 className="text-xl sm:text-2xl font-bold text-[#0A1A45] mb-6">Send Us a Direct Message</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#0A1A45] uppercase mb-2">Your Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Praveen Kumar"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full min-w-0 max-w-full px-4 py-3 sm:py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1769E0] text-[#0A1A45] text-sm transition"
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
                      className="w-full min-w-0 max-w-full px-4 py-3 sm:py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1769E0] text-[#0A1A45] text-sm transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#0A1A45] uppercase mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full min-w-0 max-w-full px-4 py-3 sm:py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1769E0] text-[#0A1A45] text-sm transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0A1A45] uppercase mb-2">Subject</label>
                    <input 
                      type="text" 
                      placeholder="Booking query / Lab report"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full min-w-0 max-w-full px-4 py-3 sm:py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1769E0] text-[#0A1A45] text-sm transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0A1A45] uppercase mb-2">Message *</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="How can we help you today?"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full min-w-0 max-w-full px-4 py-3 sm:py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1769E0] text-[#0A1A45] text-sm transition"
                  />
                </div>

                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full min-w-0 max-w-full py-4 rounded-xl health-gradient text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:shadow-xl transition flex items-center justify-center gap-2 cursor-pointer whitespace-normal break-words"
                >
                  <Send className="w-5 h-5 shrink-0" />
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
