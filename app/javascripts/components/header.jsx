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
    window.addEventListener("scroll", this.scroll.bind(this));
  }

  scroll(e) {
    if (window.scrollY > 480) {
      this.setState({ affix: true });
    } else {
      this.setState({ affix: false });
    }
  }

  changeLocale(locale, e) {
    e.preventDefault();
    setLocale(locale);
    this.props.root.setState();
  }

  render() {
    return <header>
      <h1>&nbsp;</h1>
      <div className={classNames({affix: this.state.affix})}>
        <h4>{info[getLocale()].date}</h4>
        <h4>{info[getLocale()].location}</h4>
        <div className="locale">
          <a href="#" onClick={this.changeLocale.bind(this, "zh-TW")} className="button right">中文</a>
          <a href="#" onClick={this.changeLocale.bind(this, "en-US")} className="button right">English</a>
        </div>
      </div>
    </header>;
  }
};

export default Header;
