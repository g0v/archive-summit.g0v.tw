'use strict';

import React, { Component } from "react";

class MailChimp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  change(e) {
    this.setState({email: e.target.value});
  }

  render() {
    return <div id="mc_embed_signup">
      <form action="//facebook.us8.list-manage.com/subscribe/post?u=2cbe76b13b03aa196dea19786&amp;id=6acce179ae" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
        <div id="mc_embed_signup_scroll">
          <h2>
            <label htmlFor="mce-EMAIL">Subscribe to our mailing list</label>
          </h2>
          <input type="email" value={this.state.email} onChange={this.change.bind(this)} name="EMAIL" className="email" id="mce-EMAIL" placeholder="email address" required />
          <div style={{position: "absolute", left: "-5000px"}} aria-hidden="true"><input type="text" name="b_2cbe76b13b03aa196dea19786_6acce179ae" tabIndex="-1" value="" /></div>
          <div className="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" /></div>
        </div>
      </form>
    </div>;
  }
}

export default MailChimp;
