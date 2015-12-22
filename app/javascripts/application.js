'use strict';

require("../stylesheets/application.css");
require("../images/keynote/Heusser, 2014.jpg");

var speakers = [ "audreyt.jpg", "clays.jpg", "david.jpg", "hlb.jpg", "kirby.png", "lucyp.jpg" ];
speakers.map(function(speaker) { require("../images/speakers2014/" + speaker) });

import React from "react";
import ReactDOM from "react-dom";
import Intro from "./components/intro";

document.addEventListener("DOMContentLoaded", function(e) {
//ReactDOM.render(<Intro />, document.body);
});
