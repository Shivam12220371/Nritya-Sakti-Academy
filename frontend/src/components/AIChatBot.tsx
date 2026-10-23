import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, Volume2, VolumeX, Mic } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  role: 'user' | 'model';
  text: string;
};

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! I am Academy AI. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition. Please try using Chrome or Edge.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => prev + (prev ? ' ' : '') + transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'not-allowed') {
        alert('Microphone access blocked! Please click the camera/mic icon in your URL bar to allow microphone permissions.');
      } else {
        alert('Microphone error: ' + event.error);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const speakText = (text: string) => {
    if (!isSpeechEnabled || !window.speechSynthesis) return;
    
    // Desktop Chrome fix: cancel active speech, then delay slightly before speaking avoiding instant drop
    window.speechSynthesis.cancel(); 
    
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        // Look for Google US English first (sounds best on Chrome Desktop), then any en-US, then any en
        const voice = voices.find(v => v.name.includes("Google US English")) || 
                      voices.find(v => v.lang === 'en-US') || 
                      voices.find(v => v.lang.includes('en'));
        if (voice) utterance.voice = voice;
      }
      
      utterance.volume = 1.0;
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }, 50);
  };

  // Pre-load voices for desktop to avoid empty arrays on first interaction
  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      // Chrome desktop requires an event listener for voices to fully trigger load
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await axios.post('/api/chat', { message: userMsg });
      const replyText = response.data.reply;
      setMessages((prev) => [...prev, { role: 'model', text: replyText }]);
      speakText(replyText);
    } catch (error: any) {
      console.error('Chat error:', error);
      const errorMsg = error.response?.data?.error || 'Sorry, I am having trouble connecting right now.';
      setMessages((prev) => [...prev, { role: 'model', text: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 320, damping: 25 }}
              className="absolute bottom-16 right-0 w-[min(360px,calc(100vw-2rem))] bg-[#FAFAFA] rounded-2xl shadow-2xl border border-[#EADCCF] overflow-hidden flex flex-col"
              style={{ height: '460px', maxHeight: 'calc(100vh - 120px)' }}
            >
              {/* Header */}
              <div className="relative overflow-hidden bg-gradient-to-r from-[#463F3A] to-[#6B554A] p-3.5 text-white flex justify-between items-center">
                <img
                  src="/hero_dancing_pose.png"
                  alt=""
                  className="absolute right-14 -bottom-5 h-20 w-16 object-contain opacity-20 pointer-events-none"
                />
                <div className="relative flex items-center gap-2.5">
                  <img
                    src="/logo.jpg"
                    alt="Academy AI"
                    className="w-9 h-9 rounded-full object-cover border-2 border-[#EADCCF] shadow-sm"
                  />
                  <div>
                    <h3 className="font-semibold leading-tight">Academy AI</h3>
                    <p className="text-[11px] text-[#EADCCF]">Your dance guide</p>
                  </div>
                </div>
                <div className="relative flex items-center gap-1">
                  <button
                    onClick={() => {
                      if (isSpeechEnabled) window.speechSynthesis?.cancel();
                      setIsSpeechEnabled(!isSpeechEnabled);
                      if (!isSpeechEnabled && window.speechSynthesis) {
                        const dummy = new SpeechSynthesisUtterance(" ");
                        dummy.volume = 0;
                        window.speechSynthesis.speak(dummy);
                      }
                    }}
                    className="p-1.5 hover:bg-white/15 rounded-full transition-colors"
                    aria-label="Toggle voice"
                  >
                    {isSpeechEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-white/15 rounded-full transition-colors"
                    aria-label="Close chat"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-[#F7F4F1]">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                        msg.role === 'user'
                          ? 'bg-[#463F3A] text-white rounded-tr-sm'
                          : 'bg-white border border-[#EADCCF] text-[#463F3A] rounded-tl-sm'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-[#EADCCF] rounded-2xl rounded-tl-sm px-4 py-3">
                      <Loader2 size={16} className="animate-spin text-[#C9A991]" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 bg-white border-t border-[#EADCCF]">
                <form
                  onSubmit={handleSend}
                  className="flex items-center gap-2 bg-[#F7F4F1] rounded-full pl-4 pr-1 text-sm py-1 border border-[#EADCCF] focus-within:border-[#C9A991] focus-within:ring-1 focus-within:ring-[#C9A991] transition-all"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about classes, fees, hours..."
                    className="flex-1 bg-transparent border-none outline-none text-[#463F3A] placeholder:text-[#8D8178] py-2"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={startListening}
                    disabled={isLoading || isListening}
                    className={`p-2 rounded-full transition-colors flex-shrink-0 ${
                      isListening ? 'bg-rose-100 text-rose-600 animate-pulse' : 'text-[#8D8178] hover:bg-[#EADCCF]'
                    }`}
                    title={isListening ? "Listening..." : "Speak your message"}
                  >
                    <Mic size={18} />
                  </button>
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className={`p-2 rounded-full transition-colors flex-shrink-0 ${
                      !input.trim() || isLoading ? 'bg-[#D4C8BE] text-white cursor-not-allowed' : 'bg-[#463F3A] text-white hover:bg-[#322C28]'
                    }`}
                    title="Send message"
                  >
                    <Send size={16} className="-ml-0.5 mt-0.5" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Button Label & Button Container */}
        <div className="relative flex flex-col items-center">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className={`h-14 w-40 rounded-2xl shadow-lg flex items-center justify-between pl-4 pr-2 text-white border border-white/30 overflow-hidden ${
              isOpen
                ? 'bg-gradient-to-r from-rose-500 to-rose-600'
                : 'bg-gradient-to-r from-[#463F3A] via-[#A86E59] to-[#C9A991]'
            }`}
            aria-label={isOpen ? 'Close Academy AI' : 'Open Academy AI'}
          >
            <span className="font-semibold text-sm tracking-wide">Academy AI</span>
            <span className="h-11 w-11 rounded-xl bg-white/20 flex items-center justify-center overflow-hidden">
              <img
                src="/bharatanatyam_pose.png"
                alt=""
                className="h-12 w-12 object-contain drop-shadow-md"
              />
            </span>
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default AIChatBot;
