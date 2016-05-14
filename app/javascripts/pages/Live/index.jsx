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
  'en-US': {
    switch: "Language Switch",
    icecast: 'Interpretation',
  },
  'zh-TW': {
    switch: "聲道語言切換",
    icecast: '即時口譯',
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
              <a className={styles.channel} onClick={() => this.onChangeVenue('R1', 'https://www.youtube.com/embed/_Rq-mHszu-g', 'https://www.youtube.com/watch?v=_Rq-mHszu-g')}>YouTube R1</a>
              <a className={styles.channel} onClick={() => this.onChangeVenue('R2', 'https://www.youtube.com/embed/4vJb_5K4hYk', 'https://www.youtube.com/watch?v=4vJb_5K4hYk')}>YouTube R2</a>
              <a className={styles.channel} onClick={() => this.onChangeVenue('R0', 'https://livehouse.in/embed/channel/g0v/video', 'https://livehouse.in/channel/g0v.tw')}>LIVEhouse.in R0</a>
              <a className={styles.channel} onClick={() => this.onChangeVenue('R1', 'https://livehouse.in/embed/channel/g0v1/video', 'https://livehouse.in/channel/g0v1')}>LIVEhouse.in R1</a>
              <a className={styles.channel} onClick={() => this.onChangeVenue('R2', 'https://livehouse.in/embed/channel/g0v2/video', 'https://livehouse.in/channel/g0v2')}>LIVEhouse.in R2</a>
              <a className={styles.channel} onClick={() => this.onChangeVenue('icecast')}>{locale[getLocale()].icecast}</a>
            </div>
            <div className={styles.video}>
              { venue === 'icecast' && <div style={{
                width: '640px',
                height: '360px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <div style={{
                    border: '3px solid #36AAA8',
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <div style={{
                      background: '#36AAA8',
                      color: '#FFF',
                      padding: 5,
                    }}>R0</div>
                  <a href="http://i.summit.g0v.tw:8000/r0" target="_blank" style={{
                      padding: 5,
                      color: '#0F0F0F',
                    }}>http://i.summit.g0v.tw:8000/r0</a>
                </div>
                <div style={{
                    border: '3px solid #8B4AA8',
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <div style={{
                      background: '#8B4AA8',
                      color: '#FFF',
                      padding: 5,
                    }}>R1</div>
                  <a href="http://i.summit.g0v.tw:8000/r1" target="_blank" style={{
                      padding: 5,
                      color: '#0F0F0F',
                    }}>http://i.summit.g0v.tw:8000/r1</a>
                </div>
                <div style={{
                    border: '3px solid #4EA23B',
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <div style={{
                      background: '#4EA23B',
                      color: '#FFF',
                      padding: 5,
                    }}>R2</div>
                  <a href="http://i.summit.g0v.tw:8000/r2" target="_blank" style={{
                      padding: 5,
                      color: '#0F0F0F',
                    }}>http://i.summit.g0v.tw:8000/r2</a>
                </div>
              </div>}
              { embed && <iframe src={embed} width="640" height="360" frameborder="0" allowfullscreen style={{border: 0}} /> }
              { !embed && venue !== 'icecast' && <img src={cover} width="640" height="360" /> }
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
