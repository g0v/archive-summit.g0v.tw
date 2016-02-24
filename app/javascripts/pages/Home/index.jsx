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
        <Milestone />
        <About />
      </div>
    );
  }
};

export default Home;
