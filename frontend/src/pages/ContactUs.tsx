import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useEffect, useState } from 'react';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Inquire about Classes');
  const [message, setMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#FAFAFA] overflow-hidden relative">
      
      {/* Soft Background Elements */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#FCF4F4] rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-[#F3E8E0] rounded-full blur-[100px] -z-10 -translate-x-1/4 translate-y-1/3 opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-20 relative">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <span className="text-[#C9A991] font-bold tracking-[0.3em] uppercase text-xs mb-4 block drop-shadow-sm">
              Get in Touch
            </span>
            <h1 className="text-5xl md:text-7xl font-serif mb-6 tracking-tight text-[#463F3A] leading-tight">
              Contact <span className="italic font-light text-[#C9A991]">Us</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              Have a question about our classes or want to join the academy? We would love to hear from you.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Contact Information Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="space-y-10"
          >
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-[#F3E8E0]">
              <h3 className="text-3xl font-serif text-[#463F3A] mb-8">Academy Details</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FCF4F4] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#C9A991]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#463F3A] mb-1">Our Address</h4>
                    <p className="text-gray-500 leading-relaxed">
                      Tower No- B8, Flat No- 1804A, SuperTech Eco-Village1,<br />
                      Sector 1, Greater Noida, 201306
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FCF4F4] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#C9A991]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#463F3A] mb-1">Phone Number</h4>
                    <p className="text-gray-500 leading-relaxed">
                      +91 6203053876<br />
                      <span className="text-sm text-gray-400">Available Mon-Fri, 4PM to 8PM</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FCF4F4] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#C9A991]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#463F3A] mb-1">Email Address</h4>
                    <p className="text-gray-500 leading-relaxed">
                      XYZ<br />
                      <span className="text-sm text-gray-400">We aim to reply within 24 hours</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Tile */}
            <div className="rounded-[2rem] overflow-hidden aspect-video shadow-sm border border-[#F3E8E0] relative group">
              <img 
                src="/masterclass_group.png" 
                alt="Studio Practice" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
            </div>
          </motion.div>

          {/* Contact Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <form className="bg-white p-10 md:p-12 rounded-[2rem] shadow-sm border border-[#F3E8E0]" onSubmit={(e) => {
              e.preventDefault();
              if (!name || !message) return;
              
              const text = `Hello Nritya Shakti Academy,%0A%0A*New Inquiry from ${name}* (${email || 'No email provided'})%0A*Subject:* ${subject}%0A*Message:*%0A${message}`;
              window.open(`https://wa.me/916203053876?text=${text}`, '_blank');
            }}>
              <h3 className="text-3xl font-serif text-[#463F3A] mb-2">Send a Message</h3>
              <p className="text-gray-500 mb-8 font-light">Fill out the form below and our team will get back to you shortly.</p>

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#463F3A] mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-5 py-3 rounded-2xl border border-gray-200 bg-[#FAFAFA] focus:bg-white focus:ring-2 focus:ring-[#C9A991]/50 focus:border-[#C9A991] outline-none transition-all placeholder:text-gray-400"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#463F3A] mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-3 rounded-2xl border border-gray-200 bg-[#FAFAFA] focus:bg-white focus:ring-2 focus:ring-[#C9A991]/50 focus:border-[#C9A991] outline-none transition-all placeholder:text-gray-400"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#463F3A] mb-2">Subject</label>
                  <select 
                    id="subject" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-5 py-3 rounded-2xl border border-gray-200 bg-[#FAFAFA] focus:bg-white focus:ring-2 focus:ring-[#C9A991]/50 focus:border-[#C9A991] outline-none transition-all text-[#463F3A]"
                  >
                    <option>Inquire about Classes</option>
                    <option>Performance Booking</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#463F3A] mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full px-5 py-3 rounded-2xl border border-gray-200 bg-[#FAFAFA] focus:bg-white focus:ring-2 focus:ring-[#C9A991]/50 focus:border-[#C9A991] outline-none transition-all resize-none placeholder:text-gray-400"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full group flex items-center justify-center gap-2 bg-[#F3E8E0] text-[#463F3A] px-6 py-4 rounded-2xl font-bold hover:bg-[#C9A991] hover:text-white transition-all shadow-sm"
                >
                  Send Inquiry <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </form>
          </motion.div>
        
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
