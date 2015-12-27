'use strict';

import React, { Component } from "react";
import Speaker from "./speaker";

class FeatureSpeakers extends Component {
  render() {
    return <div className="feature-speakers">
      <h2>Who Spoke at g0v Summit 2014</h2>
      <div>
        {this.props.speakers.map((speaker) => { return <Speaker key={speaker.name} className="feature-speaker" speaker={speaker} />; })}
      </div>
    </div>;
  }
};

FeatureSpeakers.defaultProps = {
};

FeatureSpeakers.defaultProps.speakers = require("../../jsons/feature_speakers.json");
FeatureSpeakers.defaultProps.speakers.map((speaker) => { require(`../../${speaker.image}`); });

export default FeatureSpeakers;
