import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { UI } from './data/content';
import bsLtr from 'bootstrap/dist/css/bootstrap.min.css?url';
import bsRtl from 'bootstrap/dist/css/bootstrap.rtl.min.css?url';

const LangCtx = createContext(null);

// Bootstrap ships a separate RTL stylesheet, so we swap it when the language changes.
function applyBootstrap(lang) {
  let link = document.getElementById('bootstrap-css');
  if (!link) {
    link = document.createElement('link');
    link.id = 'bootstrap-css';
    link.rel = 'stylesheet';
    // first in <head> so our own styles.css always wins
    document.head.insertBefore(link, document.head.firstChild);
  }
  link.href = lang === 'ar' ? bsRtl : bsLtr;
}

function initialLang() {
  let lang = 'en';
  try {
    lang = localStorage.getItem('lang') || 'en';
  } catch {
    /* storage unavailable */
  }
  applyBootstrap(lang);
  return lang;
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    applyBootstrap(lang);
    try {
      localStorage.setItem('lang', lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const t = useCallback((key) => UI[lang][key], [lang]);
  // L() picks the right language out of { en, ar } objects (and passes plain values through)
  const L = useCallback(
    (v) => (v && typeof v === 'object' && !Array.isArray(v) && 'en' in v ? v[lang] : v),
    [lang]
  );
  const toggle = () => setLang((l) => (l === 'ar' ? 'en' : 'ar'));

  return <LangCtx.Provider value={{ lang, t, L, toggle }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
