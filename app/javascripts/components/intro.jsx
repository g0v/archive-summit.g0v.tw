'use strict';

import React, { Component } from "react";
import { getLocale } from "../locale";
import CallForPapers from "./call_for_papers";
import EarlyBirdProgram from "./early_bird";
import Keynote from "./keynote";
import FeatureSpeakers from "./feature_speakers";
import About from "./about";
import Hightlights from "./highlights";
import MailChimp from "./mail_chimp";
import Milestone from './milestone';

class Intro extends Component {
  render() {
    return <div className="intro">
      <Milestone />
      <CallForPapers />
      { getLocale() === 'en-US' ? <EarlyBirdProgram /> : null }
      <Keynote />
      <FeatureSpeakers />
      <About />
      <Hightlights />
      <MailChimp />
    </div>;
  }
};

export default Intro;
