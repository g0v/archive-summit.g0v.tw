'use strict';

import "../stylesheets/application.css";
import "../images/keynote/heusser.jpg";

import React from "react";
import ReactDOM from "react-dom";
import Intro from "./components/intro";
import Keynote from "./components/keynote";
import FeatureSpeakers from "./components/feature_speakers";

FeatureSpeakers.defaultProps.speakers = require("../jsons/feature_speakers.json");
FeatureSpeakers.defaultProps.speakers.map((speaker) => { require(`../${speaker.image}`); });

document.addEventListener("DOMContentLoaded", function(e) {
  ReactDOM.render(<FeatureSpeakers />, document.querySelector('[data-react-class="FeatureSpeakers"]'));
  ReactDOM.render(<Keynote />, document.querySelector('[data-react-class="Keynote"]'))
});
