'use strict';

import React, { Component } from "react";
import { getLocale } from "../locale";

class About extends Component {
  render() {
    return <div>
      <h3>About g0v.tw</h3>
      <p className="highlights">
        g0v is a civic tech community established in late 2012 with deep open-source roots. With 1,000+ contributors through 30+ hackathons, it is recognized as one of the largest group in the global civic tech community.  The community focuses on building tools for better information disclosure, citizen engagement, and online democracy.  Since the 2014 Summit, we’ve seen increasing collaboration between the civic tech communities in Taiwan, government agencies, media, and NGOs.
      </p>
    </div>;
  }
};

export default About;
