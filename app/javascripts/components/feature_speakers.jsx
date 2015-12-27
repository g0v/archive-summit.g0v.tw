'use strict';

import React, { Component } from "react";
import Speaker from "./speaker";

class FeatureSpeakers extends Component {
  render() {
    return <div>
      {this.props.speakers.map((speaker) => { return <Speaker key={speaker.name} speaker={speaker} />; })}
    </div>;
  }
};

FeatureSpeakers.defaultProps = {
  speakers: [
    {
      image: "images/speakers2014/david.jpg",
      name: "David Eaves",
      title: "",
    },
    {
      image: "images/speakers2014/clays.jpg",
      name: "Clay Shirky",
      title: "",
    },
    {
      image: "images/speakers2014/audreyt.jpg",
      name: "Audrey Tang",
      title: "",
    },
    {
      image: "images/speakers2014/lucyp.jpg",
      name: "Lucy Park",
      title: "Director, Team POPONG",
    },
    {
      image: "images/speakers2014/kirby.png",
      name: "Kirby",
      title: "Co-founder, g0v.tw",
    },
    {
      image: "images/speakers2014/hlb.jpg",
      name: "Liang-Bin Hsueh",
      title: "",
    },
  ],
};

export default FeatureSpeakers;
