import "normalize.css";
import "stylesheets/application.css";

import React from "react";
import ReactDOM from "react-dom";
import { Router,  browserHistory } from 'react-router';
import locale, { getLocale, setLocale } from "./locale";
import getRoutes from './routes';
import ga from 'react-ga';
ga.initialize('UA-41326468-1');

browserHistory.listen(location => ga.pageview(location.pathname));
const component = (
  <Router history={browserHistory} >
    {getRoutes()}
  </Router>
);

if (!getLocale()) {
  if (locale() === "zh-TW") {
    setLocale(locale());
  } else {
    setLocale("en-US");
  }
}

ReactDOM.render(component, document.getElementById('react-root'));
