'use strict';

import "../stylesheets/application.css";
import "../images/keynote/heusser.jpg";

import React from "react";
import ReactDOM from "react-dom";
import Intro from "./components/intro";
import Speaker from "./components/speaker";
import FeatureSpeakers from "./components/feature_speakers";

FeatureSpeakers.defaultProps.speakers = require("../jsons/feature_speakers.json");
FeatureSpeakers.defaultProps.speakers.map((speaker) => { require(`../${speaker.image}`); });

document.addEventListener("DOMContentLoaded", function(e) {
  ReactDOM.render(<FeatureSpeakers />, document.querySelector('[data-react-class="FeatureSpeakers"]'));
  ReactDOM.render(<Speaker className="keynote-speaker" speaker={require("../jsons/keynote_speaker.json")} />, document.querySelector('[data-react-class="KeynoteSpeaker"]'))
});
