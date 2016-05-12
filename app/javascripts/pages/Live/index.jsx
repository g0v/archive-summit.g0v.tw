import React, { Component } from "react";
import {
  AppBar,
  MainSection,
} from "javascripts/components";
import _ from 'lodash';
import schedules from '../../components/Schedule/schedules_by_track.json';
import { getLocale } from "javascripts/locale";

import styles from "./styles.css";

import cover from './summit.jpg';

const locale = {
  "en-US": {
    "switch": "Language Switch",
  },
  "zh-TW": {
    "switch": "聲道語言切換"
  }
}

class Live extends Component {

  state = {
    venue: '',
    url: '',
  }

  onChangeVenue = (venue, embed, url) => {
    this.setState({ venue, embed, url });
  }

  render() {
    const { venue, embed, url } = this.state;

    return (
      <div className={styles.root}>
        <div className={styles.monitor}>
          <div className={styles.monitorWrap}>
            <div className={styles.control}>
              <a className={styles.channel} href="https://g0v.hackpad.com/g0v-summit--3TyxgUCaVIV" target="_blank">{locale[getLocale()].switch}</a>
              <a className={styles.channel} onClick={() => this.onChangeVenue('R0', 'https://www.youtube.com/embed/MRic6Qt8GKQ', 'https://www.youtube.com/user/g0vTW/live')}>YouTube R0</a>
              <a className={styles.channel} onClick={() => this.onChangeVenue('R1', 'https://www.youtube.com/embed/4MQX-SAQlZc', 'https://www.youtube.com/watch?v=4MQX-SAQlZc')}>YouTube R1</a>
              <a className={styles.channel} onClick={() => this.onChangeVenue('R2', 'https://www.youtube.com/embed/FhlMyeEhV6o', 'https://www.youtube.com/watch?v=FhlMyeEhV6o')}>YouTube R2</a>
              <a className={styles.channel} onClick={() => this.onChangeVenue('R0', 'https://livehouse.in/embed/channel/g0v/video', 'https://livehouse.in/channel/g0v.tw')}>LIVEhouse.in R0</a>
              <a className={styles.channel} onClick={() => this.onChangeVenue('R1', 'https://livehouse.in/embed/channel/g0v1/video', 'https://livehouse.in/channel/g0v1')}>LIVEhouse.in R1</a>
              <a className={styles.channel} onClick={() => this.onChangeVenue('R2', 'https://livehouse.in/embed/channel/g0v2/video', 'https://livehouse.in/channel/g0v2')}>LIVEhouse.in R2</a>
            </div>
            <div className={styles.video}>
              { embed && <iframe src={embed} width="640" height="360" frameborder="0" allowfullscreen style={{border: 0}} /> }
              { !embed && <img src={cover} width="640" height="360" /> }
              { url && <div className={styles.url}><a href={url} target="_blank">{url}</a></div> }
            </div>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.infoWrap}>
            {
              venue && _.filter(schedules[getLocale()]['day1'], o => !!o.title && o.venue === venue).map( item => (
                <div style={{ background: item.color }} className={styles.schedules}>
                  <div>{item.title}/{item.venue} - {item.tagline}</div>
                  <div>{schedules[getLocale()].moderator}: {item.anchor}</div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
};

export default Live;
