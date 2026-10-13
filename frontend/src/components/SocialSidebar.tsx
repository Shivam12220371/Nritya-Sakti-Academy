import { FaInstagram, FaYoutube } from 'react-icons/fa';

const SocialSidebar = () => {
  const socials = [
    {
      name: 'Instagram',
      icon: <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6" />,
      link: 'https://www.instagram.com/nritya.shakti_academy/',
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
    <div className="fixed top-1/2 -translate-y-1/2 right-0 z-40 flex flex-col items-end gap-2.5 sm:gap-3 pointer-events-none select-none">
      {socials.map((social, idx) => (
        <a
          key={idx}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`pointer-events-auto flex items-center h-11 sm:h-14 w-11 sm:w-14 sm:hover:w-40 ${social.color} text-white rounded-l-xl shadow-lg cursor-pointer border border-white/20 overflow-hidden transition-all duration-300 ease-out group active:scale-95 touch-manipulation`}
        >
          <div className="w-11 h-11 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center bg-white/20 rounded-l-xl backdrop-blur-md">
            {social.icon}
          </div>
          <div className="hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 font-semibold text-sm sm:text-base tracking-wide whitespace-nowrap">
            {social.name}
          </div>
        </a>
      ))}
    </div>
  );
};

export default SocialSidebar;
