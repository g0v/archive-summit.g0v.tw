'use strict';

import React, { Component } from "react";
import Speaker from "./speaker";
import { getLocale } from "../locale";

import speaker from "../../jsons/keynote_speaker.json";

class Keynote extends Component {
  render() {
    return <div className="keynote">
      {speaker[getLocale()].description}
      <Speaker className="keynote-speaker" speaker={speaker[getLocale()]} />
    </div>;
  }
};

export default Keynote;
