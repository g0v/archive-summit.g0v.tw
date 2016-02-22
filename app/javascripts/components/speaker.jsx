'use strict';

import React, { Component } from "react";

class Speaker extends Component {
  render() {
    return <figure className={this.props.className}>
      <img src={require(`${this.props.speaker.image}`)} />
      <figcaption>
        <div className="name">{this.props.speaker.name}</div>
        <div className="title">{this.props.speaker.title}</div>
      </figcaption>
    </figure>;
  }
};

export default Speaker;
