'use strict';

require("../stylesheets/application.css");
require("../images/keynote/heusser.jpg");

var speakers = [ "audreyt.jpg", "clays.jpg", "david.jpg", "hlb.jpg", "kirby.png", "lucyp.jpg" ];
speakers.map(function(speaker) { require("../images/speakers2014/" + speaker) });

import React from "react";
import ReactDOM from "react-dom";
import Intro from "./components/intro";
import FeatureSpeaker from "./components/feature_speakers";

document.addEventListener("DOMContentLoaded", function(e) {
  [].forEach.call(document.querySelectorAll("[data-react-class]"), (c) => {
    let reactClass = eval(c.dataset.reactClass);
    ReactDOM.render(React.createElement(reactClass, {}), c);
  });
});
