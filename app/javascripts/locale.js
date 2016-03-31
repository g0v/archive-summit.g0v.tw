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

export function getString(object, key, locale = getLocale()) {
  return object[`${key}_${locale}`] || object[key];
}

export default locale;
