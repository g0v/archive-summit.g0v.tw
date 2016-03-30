import React, { Component } from "react";
import { getLocale } from "javascripts/locale";
import styles from "./styles.css";
import speakers from "./speakers.json";

class SpeakerList extends Component {
  speaker = (speaker) => {
    return (
      <div className={styles.speaker} key={speaker.name} >
        <img className={styles.avatar} src={speaker.avatar || require('./default.png')} />
        <div className={styles.name}>{speaker.name}</div>
        <p className={styles.bio}>{speaker.bio}</p>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.root}>
        <h2 className={styles.header}>講者</h2>
        <div>{ speakers[getLocale()].map(this.speaker) }</div>
      </div>
    );
  }
};

export default SpeakerList;
