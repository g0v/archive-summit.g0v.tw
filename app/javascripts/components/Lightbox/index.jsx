import React, { Component } from "react";
import { getLocale } from "javascripts/locale";
import styles from "./styles.css";

class Lightbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      speaker: {},
    };
  }

  close = (e) => {
    e.preventDefault();
    this.setState({ show: false });
  }

  render() {
    return <div className={styles.root} style={{ display: (this.state.show ? "inherit" : "none") }}>
      <div>
        <b>{this.state.speaker.name}</b>
        <a href="#" className={styles.close} onClick={this.close}>X</a>
      </div>
      {this.state.speaker.bio}
    </div>;
  }
};

export default Lightbox;
