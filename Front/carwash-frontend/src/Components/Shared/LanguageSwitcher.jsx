import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher({ className }) {
  const { i18n } = useTranslation();

  const handleLanguageChange = async (lng) => {
    await i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <select 
      value={i18n.language}
      onChange={(e) => handleLanguageChange(e.target.value)}
      className={`bg-gray-800/30 backdrop-blur-lg px-3 py-2 rounded-lg text-white border border-white/20 cursor-pointer ${className}`}
    >
      <option value="en">EN</option>
      <option value="it">IT</option>
      <option value="ar">AR</option>
    </select>
  );
}