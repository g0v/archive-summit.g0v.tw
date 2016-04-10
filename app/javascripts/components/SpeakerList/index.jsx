import React, { Component } from "react";
import { getLocale, getString } from "javascripts/locale";
import avatarURL from "javascripts/helpers/avatar";
import Lightbox from "javascripts/components/Lightbox";
import styles from "./styles.css";
import speakers from "./speakers.json";

class SpeakerList extends Component {
  speaker = (speaker) => {
    const bio = speaker.bio.replace(/\n/g, '<br/>');
    const avatar = avatarURL(speaker);
    const [locale] = getLocale().split('-');
    return (
      <div className={styles.speaker} key={speaker.name} >
        <a href="#" onClick={this.showBio.bind(this, speaker)}>
          <img className={styles.avatar} src={avatar} />
        </a>
        <div className={styles.name}>{getString(speaker, 'name', locale)}</div>
        { speaker.title && <div className={styles.title}>{getString(speaker, 'title', locale)}</div> }
        { speaker.organization && <div className={styles.organization}>{getString(speaker, 'organization', locale)}</div> }
      </div>
    );
  }

  sortFunc = (a,b) => {
    return a.name.localeCompare(b.name);
  }

  showBio = (speaker, e) => {
    e.preventDefault();
    this.refs.lightbox.setState({ show: true, speaker: speaker });
  }

  render() {
    return (
      <div className={styles.root}>
        <h2 className={styles.header}>講者</h2>
        <div>{ speakers['en-US'].filter((s) => s.featured).sort(this.sortFunc).map(this.speaker) }</div>
        <div>{ speakers['en-US'].filter((s) => !s.featured).sort(this.sortFunc).map(this.speaker) }</div>
        <Lightbox ref="lightbox" />
      </div>
    );
  }
};

export default SpeakerList;
