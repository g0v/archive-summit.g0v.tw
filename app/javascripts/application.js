'use strict';

import "../stylesheets/application.css";
import "../images/keynote/heusser.jpg";

import React from "react";
import ReactDOM from "react-dom";
import Intro from "./components/intro";
import locale, { getLocale, setLocale } from "./locale";

if (!getLocale()) {
  if (locale() === "zh-TW") {
    setLocale(locale());
  } else {
    setLocale("en-US");
  }
}

document.addEventListener("DOMContentLoaded", (e) => {
  ReactDOM.render(<Intro />, document.querySelector('[data-react-class="Intro"]'))
});
