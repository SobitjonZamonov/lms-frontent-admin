import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import uz from '../i18n/translation_uz.json';
import ru from '../i18n/translation_ru.json';
import en from '../i18n/translation_en.json';

i18n.use(initReactI18next).init({
  resources: {
    uz: { translation: uz },
    ru: { translation: ru },
    en: { translation: en }
  },
  lng: 'uz',
  fallbackLng: 'uz',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
