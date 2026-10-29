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
    <div className="relative min-h-screen overflow-hidden bg-[#fbf8f5] pb-16 pt-24">
      
      {/* Soft Background Elements */}
      <div className="absolute -right-0 top-0 -z-10 h-[50vw] w-[50vw] translate-x-1/3 -translate-y-1/3 rounded-full bg-[#f0d9d7] blur-[100px]" />
      <div className="absolute bottom-0 left-0 -z-10 h-[40vw] w-[40vw] -translate-x-1/4 translate-y-1/3 rounded-full bg-[#eaded5] opacity-50 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-20 relative">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.3em] text-[#9b5b67]">
              Get in Touch
            </span>
            <h1 className="mb-6 font-serif text-4xl leading-tight tracking-tight text-[#2c1f2f] sm:text-5xl md:text-7xl">
              Contact <span className="font-light italic text-[#9b5b67]">Us</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl font-light leading-relaxed text-[#756b73]">
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
            <div className="rounded-[2rem] border border-[#eaded5] bg-[#fffdfb] p-6 shadow-[0_12px_35px_-24px_rgba(75,36,74,0.7)] sm:p-10">
              <h3 className="mb-8 font-serif text-3xl text-[#2c1f2f]">Academy Details</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f0d9d7]">
                    <MapPin className="h-5 w-5 text-[#9b5b67]" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-lg font-bold text-[#2c1f2f]">Our Address</h4>
                    <p className="leading-relaxed text-[#756b73]">
                      Tower No- B8, Flat No- 1804A, SuperTech Eco-Village1,<br />
                      Sector 1, Greater Noida, 201306
                    </p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Natya+Shakti+Academy+SuperTech+Eco-Village1+Sector+1+Greater+Noida"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-[#9b5b67] transition-colors hover:text-[#2c1f2f]"
                    >
                      <span>📍 View Natya Shakti Academy on Google Maps &rarr;</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f0d9d7]">
                    <Phone className="h-5 w-5 text-[#9b5b67]" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-lg font-bold text-[#2c1f2f]">Phone Number</h4>
                    <p className="leading-relaxed text-[#756b73]">
                      +91 6203053876<br />
                      <span className="text-sm text-[#a39aa0]">Available Mon-Fri, 11AM to 8PM</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f0d9d7]">
                    <Mail className="h-5 w-5 text-[#9b5b67]" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-lg font-bold text-[#2c1f2f]">Email Address</h4>
                    <p className="leading-relaxed text-[#756b73]">
                      <a href="mailto:ayushisaket82@gmail.com" className="transition-colors hover:text-[#9b5b67]">ayushisaket82@gmail.com</a><br />
                      <span className="text-sm text-[#a39aa0]">We aim to reply within 24 hours</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Tile */}
            <div className="group relative aspect-video overflow-hidden rounded-[2rem] border border-[#eaded5] shadow-sm">
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
            <form className="rounded-[2rem] border border-[#eaded5] bg-[#fffdfb] p-6 shadow-[0_12px_35px_-24px_rgba(75,36,74,0.7)] sm:p-10 md:p-12" onSubmit={(e) => {
              e.preventDefault();
              if (!name || !message) return;
              
              const text = `Hello Natya Shakti Academy,%0A%0A*New Inquiry from ${name}* (${email || 'No email provided'})%0A*Subject:* ${subject}%0A*Message:*%0A${message}`;
              window.open(`https://wa.me/916203053876?text=${text}`, '_blank');
            }}>
              <h3 className="mb-2 font-serif text-3xl text-[#2c1f2f]">Send a Message</h3>
              <p className="mb-8 font-light text-[#756b73]">Fill out the form below and our team will get back to you shortly.</p>

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#2c1f2f]">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-[#eaded5] bg-[#fbf8f5] px-5 py-3 outline-none transition-all placeholder:text-[#a39aa0] focus:border-[#c99a5a] focus:bg-white focus:ring-2 focus:ring-[#c99a5a]/30"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#2c1f2f]">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-[#eaded5] bg-[#fbf8f5] px-5 py-3 outline-none transition-all placeholder:text-[#a39aa0] focus:border-[#c99a5a] focus:bg-white focus:ring-2 focus:ring-[#c99a5a]/30"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium text-[#2c1f2f]">Subject</label>
                  <select 
                    id="subject" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-2xl border border-[#eaded5] bg-[#fbf8f5] px-5 py-3 text-[#2c1f2f] outline-none transition-all focus:border-[#c99a5a] focus:bg-white focus:ring-2 focus:ring-[#c99a5a]/30"
                  >
                    <option>Inquire about Classes</option>
                    <option>Performance Booking</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-[#2c1f2f]">Message</label>
                  <textarea 
                    id="message" 
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full resize-none rounded-2xl border border-[#eaded5] bg-[#fbf8f5] px-5 py-3 outline-none transition-all placeholder:text-[#a39aa0] focus:border-[#c99a5a] focus:bg-white focus:ring-2 focus:ring-[#c99a5a]/30"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2c1f2f] px-6 py-4 font-bold text-white shadow-sm transition-all hover:bg-[#9b5b67]"
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
