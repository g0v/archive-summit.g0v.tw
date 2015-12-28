'use strict';

export function locale() {
  return (window.navigator.userLanguage || window.navigator.language);
};

export function setLocale(locale) {
  return localStorage.setItem("locale", locale);
}

export function getLocale() {
  return localStorage.getItem("locale");
}

export default locale;
