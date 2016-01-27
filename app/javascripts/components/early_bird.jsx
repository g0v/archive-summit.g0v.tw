'use strict';

import React, { Component } from "react";
import { getLocale } from "../locale";
import data from "../../jsons/early_bird.json";

class EarlyBirdProgram extends Component {
  render() {
    return <div className="early_bird">
      <h2>{data[getLocale()].header}</h2>
      <div>
        <p>
          {data[getLocale()].text}
        </p>
        <h3>{data[getLocale()].subHeader}</h3>
        <p className="info">
          {data[getLocale()].information}<br/>
          {data[getLocale()].more}
        </p>
      </div>
    </div>;
  }
}

export default EarlyBirdProgram
