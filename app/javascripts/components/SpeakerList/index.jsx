import React, { Component } from "react";
import { getLocale } from "javascripts/locale";
import styles from "./styles.css";
import speakers from "./speakers.json";

class SpeakerList extends Component {
  speaker = (speaker) => {
    return (
      <div className={styles.speaker} key={speaker.name} >
        <img className={styles.avatar} src={speaker.avatar || (
            speaker.twitter ? 'https://avatars.io/twitter/' + speaker.twitter.replace(/^@/, '') :
            speaker.facebook ? 'https://avatars.io/facebook/' + speaker.facebook :
            require('./default.png'))} />
          <div className={styles.name}>{speaker.name}</div>
            { speaker.title &&
              <div className={styles.title}>{speaker.title}</div>
            }
            { speaker.organization &&
              <div className={styles.organization}>{speaker.organization}</div>
            }
        <p className={styles.bio}>{speaker.bio}</p>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.root}>
        <h2 className={styles.header}>講者</h2>
        <div>{ speakers['en-US'].sort((a,b) => a.name.localeCompare(b.name)).map(this.speaker) }</div>
      </div>
    );
  }
};

export default SpeakerList;
