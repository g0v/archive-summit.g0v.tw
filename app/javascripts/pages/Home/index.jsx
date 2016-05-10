import React, { Component } from "react";
import {
  MainInfo,
  Milestone,
  About,
  MainSection,
} from "javascripts/components";

class Home extends Component {
  render() {
    return (
      <div>
        <MainInfo />
        <div>
          <Milestone />
          <About properties={this.props} />
        </div>
      </div>
    );
  }
};

export default Home;
