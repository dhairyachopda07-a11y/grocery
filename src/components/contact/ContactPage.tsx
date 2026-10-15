import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  AlertCircle,
  Send,
  HelpCircle
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const ContactPage: React.FC = () => {
  const { addToast } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Enquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // FAQ toggles
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What are the delivery slots and how fast is Express Delivery?',
      a: 'Kanchan Super Market operates four delivery slots daily: Early Morning (07:00 AM – 10:00 AM), Afternoon (01:00 PM – 04:00 PM), Evening (06:00 PM – 09:00 PM), plus 2-Hour Express Delivery on orders placed before 8:00 PM across all operational city hubs.'
    },
    {
      q: 'What is the minimum order value for free delivery?',
      a: 'All orders with a subtotal of ₹499 or above qualify for 100% Free Doorstep Delivery. For smaller orders below ₹499, a nominal delivery fee of ₹35 is applied to offset logistics and temperature-controlled cold-box transport.'
    },
    {
      q: 'What is your refund and return policy if produce arrives damaged?',
      a: 'We offer a strict No-Questions-Asked Instant Return policy. If any fruit, leafy vegetable, or dairy item does not meet your freshness expectations upon delivery, simply notify the delivery executive immediately or tap "Report Issue" in your order summary for an instant replacement or credit refund.'
    },
    {
      q: 'How does Kanchan Super Market verify that produce is naturally ripened?',
      a: 'We have a zero-tolerance policy for banned chemical ripening agents such as calcium carbide or ethylene gas overdosing. All our mangoes, bananas, and papayas are either tree-ripened or matured using traditional paddy straw bedding in temperature-monitored ripening chambers.'
    },
    {
      q: 'Are your lentils and flours unpolished and chemical-free?',
      a: 'Yes. Our whole wheat atta is stone-ground from Sharbati wheat, preserving the germ and outer fiber bran. Our dals (Toor, Moong, Chana, Urad) are strictly unpolished, retaining their natural matte golden finish, natural aroma, and high protein density.'
    }
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please provide your name';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Please provide a valid email';
    if (!message.trim() || message.trim().length < 10) errs.message = 'Please share your query (min 10 characters)';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    addToast('Your demo inquiry has been registered successfully.');
  };

  return (
    <div className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
            Customer Support & Assistance
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            We Are Here to Help You
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Have questions about an order, delivery timing, or our partner farms? Reach out through our support desk or browse frequently asked questions.
          </p>
        </div>

        {/* Demo Disclaimer Box */}
        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3 max-w-3xl mx-auto">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold">Demonstration Contact Details Notice:</strong>
            All email addresses, helpline numbers, and physical fulfillment center addresses listed on this website are placeholders created for this interactive prototype. Contact form submissions will generate simulated local confirmations.
          </div>
        </div>

        {/* Split: Contact Details & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Cards: Contact Info & Hours */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-stone-900">
                Kanchan Super Market Support Desk
              </h3>

              <div className="space-y-4 text-xs text-stone-700">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-stone-400 block font-medium">Customer Toll-Free:</span>
                    <strong className="text-stone-900 text-sm">1800-419-KANCHAN</strong>
                    <span className="text-[11px] text-stone-400 block">(Demo Helpline · 7 Days a week)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-stone-400 block font-medium">Customer Email:</span>
                    <strong className="text-stone-900 text-sm">care@kanchansupermarket.com</strong>
                    <span className="text-[11px] text-stone-400 block">Response within 2 hours guaranteed</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-stone-400 block font-medium">Central Fulfillment Hub:</span>
                    <p className="text-stone-900 font-medium leading-relaxed">
                      Plot 42, Green Agro Park, Outer Ring Road, Bellandur, Bengaluru, Karnataka 560103
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-stone-400 block font-medium">Operating Hours:</span>
                    <strong className="text-stone-900">06:00 AM – 11:00 PM IST</strong>
                    <span className="text-[11px] text-stone-400 block">Dispatching 365 Days a Year</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-sm">
            <h3 className="text-base font-bold text-stone-900 mb-1">
              Send Us a Message
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Our dispatch supervisors and dietary associates are always eager to assist.
            </p>

            {submitted ? (
              <div className="p-8 text-center space-y-4 bg-emerald-50/60 rounded-2xl border border-emerald-200">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-stone-900">Message Received!</h4>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  Thank you for testing the contact form, <strong>{name}</strong>. In production, our support team replies within 120 minutes.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-semibold"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Alok Roy"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl focus:bg-white focus:outline-none ${
                        errors.name ? 'border-rose-500' : 'border-stone-300 focus:border-emerald-600'
                      }`}
                    />
                    {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Email Address *</label>
                    <input
                      type="email"
                      placeholder="alok@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl focus:bg-white focus:outline-none ${
                        errors.email ? 'border-rose-500' : 'border-stone-300 focus:border-emerald-600'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Inquiry Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600"
                    >
                      <option value="General Enquiry">General Inquiry</option>
                      <option value="Order Tracking">Delivery Tracking</option>
                      <option value="Product Quality">Produce Quality / Feedback</option>
                      <option value="Partner Sourcing">Farmer Sourcing Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us how we can help..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl focus:bg-white focus:outline-none ${
                      errors.message ? 'border-rose-500' : 'border-stone-300 focus:border-emerald-600'
                    }`}
                  />
                  {errors.message && <p className="text-[11px] text-rose-600 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Demo Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* FAQ Accordion Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h3 className="text-xl font-bold text-stone-900">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-stone-500">
              Clear answers regarding ordering, storage, returns, and delivery standards.
            </p>
          </div>

          <div className="divide-y divide-stone-200 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left gap-4 group"
                  >
                    <span className="text-sm font-semibold text-stone-900 group-hover:text-emerald-700 transition-colors">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-emerald-700 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-400 group-hover:text-stone-700 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <p className="text-xs text-stone-600 mt-2.5 leading-relaxed animate-in fade-in">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
