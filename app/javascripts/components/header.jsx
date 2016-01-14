'use strict';

import React, { Component } from "react";
import { getLocale, setLocale } from "../locale";
import info from "../../jsons/header.json";

class Header extends Component {
  changeLocale(locale, e) {
    e.preventDefault();
    setLocale(locale);
    this.props.root.setState();
  }

  render() {
    return <header>
      <h1>&nbsp;</h1>
      <h2>{info[getLocale()].date}</h2>
      <h2>{info[getLocale()].location}</h2>
      <div className="locale">
        <a href="#" onClick={this.changeLocale.bind(this, "zh-TW")} className="button right">中文</a>
        <a href="#" onClick={this.changeLocale.bind(this, "en-US")} className="button right">English</a>
      </div>
    </header>;
  }
};

export default Header;
