'use strict';

import React, { Component } from "react";
import { getLocale } from "../locale";

class Hightlights extends Component {
  render() {
    return <div>
      <h3>After g0v summit 2014</h3>
      <div className="highlights">
        <p>Here are some highlights in the local community:</p>
        <ul>
          <li>Taiwan topped the <a href="http://index.okfn.org/place/" target="_blank">OKFN Open Data Index</a> in 2015 as the vibrant communities push for open government data, but more importantly the Open-Definition-compliant <a href="http://data.gov.tw/license#eng" target="_blank">Open Government Data License</a> was enacted, which was also drafted in the community.</li>
          <li>The NGO alliance for constitution reform proposed several projects in the hackathon for people to better understand the issue.</li>
          <li>Minister Tsai, who spoke at the last summit, proposed a consultation platform focused on digital regulations in a hackathon which turned into the <a href="http://blog.pol.is/vtaiwan-uberx/" target="_blank">vTaiwan platform</a>.</li>
          <li>During the <a href="https://en.wikipedia.org/wiki/Formosa_Fun_Coast_explosion" target="_blank">dust explosion accident</a>, the civic tech community mobilized and work with the official emergency response team to provide timely information, and started regular digital disaster response drills.</li>
        </ul>
        <p>As the global civic tech communities continue to do exciting things to accelerate political changes, we'd like to invite you to share and celebrate some of the small successes, and your stories on what works (and what doesn't!)</p>
        <p>We expect to bring together 750 people in this event.  Call for Talks and further details on speakers and sessions will be announced on http://summit.g0v.tw</p>
      </div>
    </div>;
  }
};

export default Hightlights;
