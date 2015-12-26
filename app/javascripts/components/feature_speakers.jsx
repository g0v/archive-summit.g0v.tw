'use strict';

import React from "react";

class FeatureSpeakers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  speaker(speaker) {
    return <figure key={speaker.name} className="feature-speaker">
      <img src={speaker.image} />
      <figcaption>
        <div className="name">{speaker.name}</div>
        <div className="title">{speaker.title}</div>
      </figcaption>
    </figure>;
  }

  render() {
    return <div>
      {this.props.speakers.map(this.speaker.bind(this))}
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
