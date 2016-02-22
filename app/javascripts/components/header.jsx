'use strict';

import React, { Component } from "react";
import classNames from "classnames";
import { getLocale, setLocale } from "../locale";
import info from "../../jsons/header.json";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      affix: false,
    };
  }

  changeLocale(locale, e) {
    e.preventDefault();
    setLocale(locale);
    this.props.root.setState();
  }

  render() {
    return <header>
      <div id="brand">
        <h2>g0v Summit</h2>
      </div>
      <div className="right">
        <a href="#" onClick={this.changeLocale.bind(this, "zh-TW")} className="button">中文</a>
        <a href="#" onClick={this.changeLocale.bind(this, "en-US")} className="button">English</a>
      </div>
    </header>;
  }
};

export default Header;
