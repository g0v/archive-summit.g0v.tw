'use strict';

import React, { Component } from "react";

class Footer extends Component {
  render() {
    return <footer>
      <div className="sponsor">
        <h3>Co-organizer</h3>
        <ul>
          <li>Open Culture Foundation</li>
          <li>Institute of Information Science, Academia Sinica</li>
        </ul>
      </div>

      Copyright © g0v Summit 2015
      <a href="https://g0v.hackpad.com/ep/pad/static/2mprMIpYMz9" target="_blank">Code of Conduct</a>
    </footer>;
  }
};

export default Footer;
