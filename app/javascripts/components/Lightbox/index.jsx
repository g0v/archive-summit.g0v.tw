import React, { Component } from "react";
import { getLocale } from "javascripts/locale";
import styles from "./styles.css";

var multiParagraph = (text, className) => {
  if (!text) {
    return [];
  }
  var arr = text.split('\n');
  var ret = [];
  for (let i in arr) {
    let line = arr[i];
    ret.push(<p className={className} key={i} dangerouslySetInnerHTML={{__html: line}}></p>);
  }
  return ret;
}

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
      {multiParagraph(this.state.speaker.bio, styles.bio)}
    </div>;
  }
};

export default Lightbox;
