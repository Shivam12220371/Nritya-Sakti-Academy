import { FaInstagram, FaYoutube } from 'react-icons/fa';

const SocialSidebar = () => {
  const socials = [
    {
      name: 'Instagram',
      icon: <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6" />,
      link: 'https://www.instagram.com/natya.shakti_academy?exln=MWVqbXc1cnF4bGd2bQ%3D%3D',
      color: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500',
    },
    {
      name: 'YouTube',
      icon: <FaYoutube className="w-5 h-5 sm:w-6 sm:h-6" />,
      link: 'https://youtube.com/@nrityashakti316?si=u9tTFUfTfSmmnt4_',
      color: 'bg-red-600',
    }
  ];

  const handleOpen = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="pointer-events-none fixed right-2 top-1/2 z-40 flex -translate-y-1/2 flex-col items-end gap-2.5 select-none sm:right-0 sm:gap-3">
      {socials.map((social, idx) => (
        <button
          key={idx}
          onClick={() => handleOpen(social.link)}
          aria-label={`Open ${social.name}`}
        className={`pointer-events-auto flex h-10 w-10 items-center overflow-hidden rounded-xl border border-white/20 text-white shadow-lg transition-all duration-300 ease-out group active:scale-95 touch-manipulation sm:h-14 sm:w-14 sm:rounded-l-xl sm:hover:w-40 ${social.color}`}
        >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md sm:h-14 sm:w-14 sm:rounded-l-xl">
            {social.icon}
          </div>
          <div className="hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 font-semibold text-sm sm:text-base tracking-wide whitespace-nowrap">
            {social.name}
          </div>
        </button>
      ))}
    </div>
  );
};

export default SocialSidebar;
