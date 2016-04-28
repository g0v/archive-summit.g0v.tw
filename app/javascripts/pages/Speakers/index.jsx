import React, { Component } from "react";
import { SpeakerList } from "javascripts/components";

class Speakers extends Component {
  render() {
    return (
      <SpeakerList properties={this.props} />
    );
  }
};

export default Speakers;
