import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enTranslations from './locales/en.json';
import arTranslations from './locales/Ar.json';
import itTranslations from './locales/IT.json';

// Initialize i18next
const initI18n = async () => {
  await i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: enTranslations },
        ar: { translation: arTranslations },
        it: { translation: itTranslations }
      },
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['cookie', 'localStorage', 'navigator'],
        caches: ['cookie', 'localStorage']
      }
    });
};

initI18n();

export default i18n;