import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader2, Volume2, VolumeX, Mic, MicOff } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  role: 'user' | 'model';
  text: string;
};

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! I am the Nritya Shakti Academy AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
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
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const speakText = (text: string) => {
    if (!isSpeechEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel(); // Stop any current speech
    const utterance = new SpeechSynthesisUtterance(text);
    // Optional: pick a specific voice or tweak rate
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

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
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col"
              style={{ height: '500px', maxHeight: 'calc(100vh - 120px)' }}
            >
              {/* Header */}
              <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Bot size={24} />
                  <h3 className="font-semibold">Academy AI Assist</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (isSpeechEnabled) window.speechSynthesis?.cancel();
                      setIsSpeechEnabled(!isSpeechEnabled);
                    }}
                    className="p-1 hover:bg-indigo-700 rounded-full transition-colors"
                    aria-label="Toggle voice"
                  >
                    {isSpeechEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-indigo-700 rounded-full transition-colors"
                    aria-label="Close chat"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/50">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                        msg.role === 'user'
                          ? 'bg-indigo-600 text-white rounded-tr-sm'
                          : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-tl-sm'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tl-sm px-4 py-3">
                      <Loader2 size={16} className="animate-spin text-indigo-600" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <form
                  onSubmit={handleSend}
                  className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-full pl-4 pr-1 text-sm py-1 border border-slate-200 dark:border-slate-700 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about classes, fees, hours..."
                    className="flex-1 bg-transparent border-none outline-none dark:text-white dark:placeholder-slate-400 py-2"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={startListening}
                    disabled={isLoading || isListening}
                    className={`p-2 rounded-full transition-colors flex-shrink-0 ${
                      isListening ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                    title="Speak your message"
                  >
                    {isListening ? <MicOff size={18} className="animate-pulse" /> : <Mic size={18} />}
                  </button>
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
          {/* Label Tooltip */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute -top-12 right-0 whitespace-nowrap bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 px-4 py-2 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 font-medium text-sm flex items-center gap-2"
              >
                Nritya Shakti AI Chatbot
                <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white dark:bg-slate-800 border-b border-r border-slate-200 dark:border-slate-700 transform rotate-45"></div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`h-14 w-14 rounded-full shadow-lg flex items-center justify-center text-white transition-all transform hover:scale-105 active:scale-95 ${
              isOpen ? 'bg-rose-500 hover:bg-rose-600' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
            aria-label="Toggle AI Chat"
          >
            {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
          </button>
        </div>
      </div>
    </>
  );
};

export default AIChatBot;
