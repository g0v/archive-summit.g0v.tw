'use strict';

import React, { Component } from "react";
import { getLocale } from "../../locale";
import lightbox from "./lightbox.json";
import styles from "./styles.css";

// usage: <LightBox text="" heading="" content="" />

class LightBox extends Component {
  static propTypes = {
    text: React.PropTypes.string,
    heading: React.PropTypes.string,
    content: React.PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {display: false};
  }

  openLightBox() {
    this.setState({display: true});
  }

  closeLightBox() {
    this.setState({display: false});
  }

  render() {
    if (this.state.display) {
      return (
        <div>
          <button onClick={this.openLightBox.bind(this)}>{this.props.text}</button>
          <div className={styles.lightboxwrap}>
            <div className={styles.lightboxcontainer}>
              <div className={styles.lightboxheading}><h3>{this.props.heading}</h3></div>
              <p>{this.props.content}</p>
              <button className={styles.lightboxbutton} onClick={this.closeLightBox.bind(this)}>{lightbox[getLocale()].close}</button>
            </div>
            <button className={styles.lightboxclose} onClick={this.closeLightBox.bind(this)}>x</button>
          </div>
        </div>);
    } else {
      return (
        <div>
          <button onClick={this.openLightBox.bind(this)}>{this.props.text}</button>
        </div>);
    }
  }
};

export default LightBox;