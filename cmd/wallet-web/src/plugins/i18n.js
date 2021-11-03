import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { setDocumentLang, setDocumentTitle } from '@/utils/i18n/document';

Vue.use(VueI18n);

const loadedLanguages = [];

const i18n = new VueI18n({
  locale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: {},
});

// This function updates i18n locale, loads new locale's messages and sets document properties accordingly
export async function updateI18nLocale(locale) {
  if (loadedLanguages.length > 0 && i18n.locale === locale) {
    return;
  }

  // If the language was already loaded
  if (loadedLanguages.includes(locale)) {
    i18n.locale = locale;
    setDocumentLang(locale);
    setDocumentTitle(i18n.t('App.title'));
    return;
  }

  // If the language hasn't been loaded yet
  const messages = await import(
    /* webpackChunkName: "locale-[request]" */ `@/translations/${locale}.js`
  );
  i18n.setLocaleMessage(locale, messages.default);
  setDocumentLang(locale);
  setDocumentTitle(i18n.t('App.title'));
  i18n.locale = locale;
  loadedLanguages.push(locale);
  return;
}

export default i18n;
