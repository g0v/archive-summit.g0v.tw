'use strict';

import React, { Component } from "react";
import Speaker from "./speaker";

class Keynote extends Component {
  render() {
    return <div className="keynote">
      Returning for a second year after 2014, the g0v Summit 2016 will again invite the global civic tech community to share their experiences for collaboration between public servants, technologists, and NGO workers.  We are pleased to have Felipe Heusser, founder and former Director of the Chilean NGO Ciudadano Inteligente and Fellow at the Berkman Center, as our keynote speaker.
      <Speaker className="keynote-speaker" speaker={require("../../jsons/keynote_speaker.json")} />
    </div>;
  }
};

export default Keynote;
