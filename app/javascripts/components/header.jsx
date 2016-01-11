'use strict';

import React, { Component } from "react";
import { setLocale } from "../locale";

class Header extends Component {
  changeLocale(locale, e) {
    e.preventDefault();
    setLocale(locale);
    this.props.root.setState();
  }

  render() {
    return <header>
      <h1>啥米零時政府 g0v 2016 summit</h1>
      <h2>14-15 May, 2016</h2>
      <h2>Academia Sinica, Taipei</h2>
      <div className="locale">
        <a href="#" onClick={this.changeLocale.bind(this, "zh-TW")} className="button right">中文</a>
        <a href="#" onClick={this.changeLocale.bind(this, "en-US")} className="button right">English</a>
      </div>
    </header>;
  }
};

export default Header;
