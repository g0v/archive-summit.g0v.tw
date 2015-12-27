'use strict';

import React from "react";

class Speaker extends React.Component {
  render() {
    return <figure className="feature-speaker">
      <img src={this.props.speaker.image} />
      <figcaption>
        <div className="name">{this.props.speaker.name}</div>
        <div className="title">{this.props.speaker.title}</div>
      </figcaption>
    </figure>;
  }
};

export default Speaker;
