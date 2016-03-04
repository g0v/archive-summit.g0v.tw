'use strict';

import React, { Component } from "react";
import styles from "./styles.css";

// usage: <LightBox url="" text="" />

class LightBox extends Component {
  static propTypes = {
    url: React.PropTypes.string,
    text: React.PropTypes.string
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
            <div className={styles.lightboxcontent}>
              <iframe className={styles.lightboxiframe} frameborder="0" allowfullscreen="" src={this.props.url}></iframe>
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