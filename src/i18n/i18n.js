// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Traducciones
const resources = {
  en: {
    translation: {
      welcome: "Welcome to our website!",
      description: "This is an example of multi-language support."
    }
  },
  es: {
    translation: {
      welcome: "¡Bienvenido a nuestro sitio web!",
      description: "Este es un ejemplo de soporte multilenguaje."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Idioma predeterminado
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React ya hace escaping
    }
  });

export default i18n;
