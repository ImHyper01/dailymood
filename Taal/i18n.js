import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from '../locales/en.json';
import nl from '../locales/nl.json';

const LANG_STORAGE_KEY = 'user-language';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    try {
      const savedLang = await AsyncStorage.getItem(LANG_STORAGE_KEY);
      if (savedLang) {
        callback(savedLang);
      } else {
        callback('nl'); // fallback als niets is opgeslagen
      }
    } catch (error) {
      console.error('Error loading language', error);
      callback('nl');
    }
  },
  init: () => {},
  cacheUserLanguage: async (lang) => {
    try {
      await AsyncStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (error) {
      console.error('Failed to save language to storage', error);
    }
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'nl',
    resources: {
      en: { translation: en },
      nl: { translation: nl },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
