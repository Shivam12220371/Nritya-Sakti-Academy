import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaYoutube } from 'react-icons/fa';

const SocialSidebar = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const socials = [
    {
      name: 'Instagram',
      icon: <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6" />,
      link: 'https://www.instagram.com/nritya.shakti_academy?stkn=MWVqbXc1cnF4bGd2bQ==&utm_source=ig_contact_invite',
      color: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500',
    },
    {
      name: 'YouTube',
      icon: <FaYoutube className="w-5 h-5 sm:w-6 sm:h-6" />,
      link: 'https://youtube.com/@nrityashakti316?si=u9tTFUfTfSmmnt4_',
      color: 'bg-red-600',
    }
  ];

  return (
    <div className="fixed top-1/2 -translate-y-1/2 right-0 z-50 flex flex-col gap-2.5 sm:gap-3">
      {socials.map((social, idx) => {
        const isExpanded = activeIdx === idx;
        return (
          <motion.a
            key={idx}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ x: 102 }}
            animate={{ x: isExpanded ? 0 : 102 }}
            whileHover={{ x: 0 }}
            whileTap={{ x: 0 }}
            onTouchStart={() => {
              setActiveIdx(idx);
            }}
            onTouchEnd={() => {
              // Delay retracting slightly so the user can see the expanded label
              setTimeout(() => setActiveIdx(null), 1800);
            }}
            onMouseEnter={() => setActiveIdx(idx)}
            onMouseLeave={() => setActiveIdx(null)}
            className={`flex items-center w-36 sm:w-40 h-12 sm:h-14 ${social.color} text-white rounded-l-xl shadow-lg cursor-pointer border border-white/20 select-none`}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center bg-white/20 rounded-l-xl backdrop-blur-md">
              {social.icon}
            </div>
            <div className="flex-1 px-2.5 sm:px-3 font-semibold text-sm sm:text-base tracking-wide flex justify-start items-center">
              {social.name}
            </div>
          </motion.a>
        );
      })}
    </div>
  );
};

export default SocialSidebar;
