'use strict';

import "../stylesheets/application.css";
import "../images/keynote/heusser.jpg";

import React from "react";
import ReactDOM from "react-dom";
import Intro from "./components/intro";

document.addEventListener("DOMContentLoaded", function(e) {
  ReactDOM.render(<Intro />, document.querySelector('[data-react-class="Intro"]'))
});
