'use strict';

import React, { Component } from "react";
import Intro from "./intro";
import Footer from "./footer";

class Root extends Component {
  render() {
    return <main>
      <header>
        <h1>啥米零時政府 g0v 2016 summit</h1>
        <h2>14-15 May, 2016</h2>
        <h2>Academia Sinica, Taipei</h2>
      </header>
      <Intro />
      <Footer />
    </main>;
  }
};

export default Root;
