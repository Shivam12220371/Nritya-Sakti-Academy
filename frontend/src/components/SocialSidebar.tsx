import { motion } from 'framer-motion';
import { FaInstagram, FaYoutube } from 'react-icons/fa';

const SocialSidebar = () => {
  const socials = [
    {
      name: 'Instagram',
      icon: <FaInstagram size={24} />,
      link: 'https://www.instagram.com/nritya.shakti_academy?stkn=MWVqbXc1cnF4bGd2bQ==&utm_source=ig_contact_invite',
      color: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500',
    },
    {
      name: 'YouTube',
      icon: <FaYoutube size={24} />,
      link: '#',
      color: 'bg-red-600',
    }
  ];

  return (
    <div className="fixed top-1/2 -translate-y-1/2 right-0 z-50 flex flex-col gap-3">
      {socials.map((social, idx) => (
        <motion.a
          key={idx}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ x: 104 }}
          animate={{ x: 104 }}
          whileHover={{ x: 0 }}
          className={`flex items-center w-40 h-14 ${social.color} text-white rounded-l-xl shadow-lg cursor-pointer transition-colors border border-white/20`}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >

          <div className="w-14 h-14 shrink-0 flex items-center justify-center bg-white/20 rounded-l-xl backdrop-blur-md">
            {social.icon}
          </div>
          <div className="flex-1 px-3 font-semibold text-base tracking-wide flex justify-start items-center ml-2">
            {social.name}
          </div>
        </motion.a>
      ))}
    </div>
  );
};

export default SocialSidebar;
