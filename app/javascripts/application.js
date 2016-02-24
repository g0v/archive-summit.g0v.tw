import "normalize.css";
import "stylesheets/application.css";

import React from "react";
import ReactDOM from "react-dom";
import { Router,  useRouterHistory } from 'react-router';
import createHistory from 'history/lib/createHashHistory';
import locale, { getLocale, setLocale } from "./locale";
import getRoutes from './routes';

const history = useRouterHistory(createHistory)({ queryKey: false });
const component = (
  <Router history={history} >
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

document.addEventListener("DOMContentLoaded", (e) => {
  ReactDOM.render(component, document.getElementById('react-root'));
});
