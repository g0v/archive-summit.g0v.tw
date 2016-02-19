'use strict';

import React, { Component } from "react";
import Speaker from "./speaker";
import { getLocale } from "../locale";

import speakers from "../../jsons/feature_speakers.json";
speakers["en-US"].map((speaker) => { require(`../../${speaker.image}`); });

class FeatureSpeakers extends Component {
  render() {
    return <div className="feature-speakers clearfix">
      <h2>Who Spoke at g0v Summit 2014</h2>
      <div>
        {speakers[getLocale()].map((speaker) => { return <Speaker key={speaker.name} className="feature-speaker" speaker={speaker} />; })}
      </div>
    </div>;
  }
};

export default FeatureSpeakers;
