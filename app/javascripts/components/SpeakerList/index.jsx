import React, { Component } from "react";
import { getLocale, getString } from "javascripts/locale";
import styles from "./styles.css";
import speakers from "./speakers.json";

export function avatarURL(speaker) {
  return speaker.avatar ?
    speaker.avatar.match(/^\./) ? require(speaker.avatar) : speaker.avatar
                                : (speaker.twitter ? 'https://avatars.io/twitter/' + speaker.twitter.replace(/^@/, '') :
                                   speaker.facebook ? 'https://avatars.io/facebook/' + speaker.facebook :
                                  require('./default.png'));
}


class SpeakerList extends Component {
  speaker = (speaker) => {
    const bio = speaker.bio.replace(/\n/g, '<br/>');
    const avatar = avatarURL(speaker);
    const [locale] = getLocale().split('-');
    return (
      <div className={styles.speaker} key={speaker.name} >
        <img className={styles.avatar} src={avatar} />
          <div className={styles.name}>{getString(speaker, 'name', locale)}</div>
            { speaker.title &&
              <div className={styles.title}>{getString(speaker, 'title', locale)}</div>
            }
            { speaker.organization &&
              <div className={styles.organization}>{getString(speaker, 'organization', locale)}</div>
            }
      </div>
    );
    // Make this into lightbox
    // <p className={styles.bio} dangerouslySetInnerHTML={{__html: bio}}></p>
  }

  sortFunc = (a,b) => {
    return a.name.localeCompare(b.name);
  }

  render() {
    return (
      <div className={styles.root}>
        <h2 className={styles.header}>講者</h2>
        <div>{ speakers['en-US'].filter((s) => s.featured).sort(this.sortFunc).map(this.speaker) }</div>
        <div>{ speakers['en-US'].filter((s) => !s.featured).sort(this.sortFunc).map(this.speaker) }</div>
      </div>
    );
  }
};

export default SpeakerList;
