import React, { Component } from "react";
import {
  AppBar,
  MainSection,
  Milestone,
  About,
  SponsorsSummary,
  Footer,
} from "javascripts/components";
import { getLocale, setLocale } from "javascripts/locale";

class Root extends Component {
  static childContextTypes = {
    changeLocale: React.PropTypes.func,
  };

  getChildContext() {
    return {
      changeLocale: this.changeLocale.bind(this)
    };
  }

  changeLocale(locale, e) {
    e.preventDefault();
    setLocale(locale);
    this.setState({});
  }

  render() {
    return (
      <div>
        <AppBar />
        <MainSection>
          {this.props.children}
          {this.props.location.pathname !== '/2016/sponsors' ?  <SponsorsSummary /> : null}
          <Footer />
        </MainSection>
      </div>
    );
  }
};

export default Root;
