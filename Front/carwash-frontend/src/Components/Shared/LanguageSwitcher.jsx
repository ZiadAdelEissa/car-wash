import { useTranslation } from 'react-i18next';

const LanguageOption = ({ value, children }) => (
  <option value={value} className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white">
    {children}
  </option>
);

const FlagIcon = ({ country }) => {
  const flags = {
    en: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="20" height="10">
        <clipPath id="s">
          <path d="M0,0 v30 h60 v-30 z"/>
        </clipPath>
        <clipPath id="t">
          <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
        </clipPath>
        <g clipPath="url(#s)">
          <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
          <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
        </g>
      </svg>
    ),
    it: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="20" height="10">
        <path d="M0,0 h20 v30 h-20 z" fill="#009246"/>
        <path d="M20,0 h20 v30 h-20 z" fill="#fff"/>
        <path d="M40,0 h20 v30 h-20 z" fill="#CE2B37"/>
      </svg>
    ),
    ar: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="20" height="10">
        <path d="M0,0 h60 v10 h-60 z" fill="#CE1126"/>
        <path d="M0,10 h60 v10 h-60 z" fill="#fff"/>
        <path d="M0,20 h60 v10 h-60 z" fill="#000"/>
        <path d="M30,15 a4,4 0 1 0 0.1,0 z" fill="#FFC72C"/>
      </svg>
    )
  };

  return flags[country] || null;
};

export default function LanguageSwitcher({ className }) {
  const { i18n } = useTranslation();

  const handleLanguageChange = async (lng) => {
    await i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <div className={`relative ${className}`}>
      <select
        value={i18n.language}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="appearance-none bg-gray-800/70 hover:bg-gray-700/70 backdrop-blur-lg pl-10 pr-8 py-2 rounded-lg text-white border border-white/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
      >
        <LanguageOption value="en">
          <FlagIcon country="en" />
          English
        </LanguageOption>
        <LanguageOption value="it">
          <FlagIcon country="it" />
          Italiano
        </LanguageOption>
        <LanguageOption value="ar">
          <FlagIcon country="ar" />
          العربية (Egypt)
        </LanguageOption>
      </select>
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <FlagIcon country={i18n.language} />
      </div>
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}