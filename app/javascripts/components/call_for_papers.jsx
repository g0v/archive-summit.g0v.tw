'use strict';

import React, { Component } from "react";
import { getLocale } from "../locale";
import data from "../../jsons/call_for_papers.json";

class CallForPapers extends Component {
  render() {
    return <div className="call_for_papers">
      <h2>{data[getLocale()].title}</h2>
      <div>
        <p>{data[getLocale()].text}</p>
        <div className="cfp-button">
          <a href={data[getLocale()].url}>
            {data[getLocale()].action}
          </a>
        </div>
      </div>
    </div>;
  }
}

export default CallForPapers;
