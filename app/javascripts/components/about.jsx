'use strict';

import React, { Component } from "react";
import { getLocale } from "../locale";

import about from "../../jsons/about.json";

class About extends Component {
  render() {
    return <div className="about clearfix">
      <h3>{about[getLocale()].header}</h3>
      <p className="highlights">{about[getLocale()].description}</p>
    </div>;
  }
};

export default About;
