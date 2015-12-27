'use strict';

import React from "react";
import Keynote from "./keynote";
import FeatureSpeakers from "./feature_speakers";

class Intro extends React.Component {
  render() {
    return <div className="intro">
      <Keynote />
      <FeatureSpeakers />

      <h3>About g0v.tw</h3>
      <p>
        g0v is a civic tech community established in late 2012 with deep open-source roots. With 1,000+ contributors through 30+ hackathons, it is recognized as one of the largest group in the global civic tech community.  The community focuses on building tools for better information disclosure, citizen engagement, and online democracy.  Since the 2014 Summit, we’ve seen increasing collaboration between the civic tech communities in Taiwan, government agencies, media, and NGOs.
      </p>
      <h3>After g0v summit 2014</h3>
      <div className="highlights">
        <p>
          Here are some highlights in the local community:
        </p>
        <ul>
          <li>Taiwan topped the <a href="http://index.okfn.org/place/" target="_blank">OKFN Open Data Index</a> in 2015 as the vibrant communities push for open government data, but more importantly the Open-Definition-compliant <a href="http://data.gov.tw/license#eng" target="_blank">Open Government Data License</a> was enacted, which was also drafted in the community.</li>
          <li>The NGO alliance for constitution reform proposed several projects in the hackathon for people to better understand the issue.</li>
          <li>Minister Tsai, who spoke at the last summit, proposed a consultation platform focused on digital regulations in a hackathon which turned into the <a href="http://blog.pol.is/vtaiwan-uberx/" target="_blank">vTaiwan platform</a>.</li>
          <li>During the <a href="https://en.wikipedia.org/wiki/Formosa_Fun_Coast_explosion" target="_blank">dust explosion accident</a>, the civic tech community mobilized and work with the official emergency response team to provide timely information, and started regular digital disaster response drills.</li>
        </ul>
        <p>
          As the global civic tech communities continue to do exciting things to accelerate political changes, we'd like to invite you to share and celebrate some of the small successes, and your stories on what works (and what doesn't!)
        </p>
        <p>
          We expect to bring together 750 people in this event.  Call for Talks and further details on speakers and sessions will be announced on http://summit.g0v.tw
        </p>
      </div>
      <div id="mc_embed_signup">
        <form action="//facebook.us8.list-manage.com/subscribe/post?u=2cbe76b13b03aa196dea19786&amp;id=6acce179ae" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
          <div id="mc_embed_signup_scroll">
            <label htmlFor="mce-EMAIL">Subscribe to our mailing list</label>
            <input type="email" value="" name="EMAIL" className="email" id="mce-EMAIL" placeholder="email address" required />
            <div style={{position: "absolute", left: "-5000px"}} aria-hidden="true"><input type="text" name="b_2cbe76b13b03aa196dea19786_6acce179ae" tabIndex="-1" value="" /></div>
            <div className="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" /></div>
          </div>
        </form>
      </div>
    </div>;
  }
};

export default Intro;
