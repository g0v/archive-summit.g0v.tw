'use strict';

require("../stylesheets/application.css");

var speakers = [ "audreyt.jpg", "clays.jpg", "david.jpg", "hlb.jpg", "kirby.png", "lucyp.jpg" ];
speakers.map(function(speaker) { require("../images/speakers2014/" + speaker) });
