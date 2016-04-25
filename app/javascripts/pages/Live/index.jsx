import React, { Component } from "react";
import {
  AppBar,
  MainSection,
} from "javascripts/components";
import _ from 'lodash';
import schedules from '../../components/Schedule/schedules_by_track.json';
import { getLocale } from "javascripts/locale";

import styles from "./styles.css";

class Live extends Component {

  state = {
    venue: '',
  }

  onChangeVenue = (venue) => this.setState({ venue });

  render() {
    const { venue } = this.state;

    return (
      <div>
        <AppBar />
        <MainSection className={styles.main}>
          <div className={styles.monitor}>
            <div className={styles.monitorWrap}>
              <div className={styles.control}>
                <a className={styles.channel} onClick={() => this.onChangeVenue('')}>雙聲道選擇教學</a>
                <a className={styles.channel} onClick={() => this.onChangeVenue('R0')}>YouTube R0</a>
                <a className={styles.channel} onClick={() => this.onChangeVenue('R1')}>YouTube R1</a>
                <a className={styles.channel} onClick={() => this.onChangeVenue('R2')}>YouTube R2</a>
                <a className={styles.channel} onClick={() => this.onChangeVenue('R0')}>LIVEhouse.in R0</a>
                <a className={styles.channel} onClick={() => this.onChangeVenue('R1')}>LIVEhouse.in R1</a>
                <a className={styles.channel} onClick={() => this.onChangeVenue('R2')}>LIVEhouse.in R2</a>
              </div>
              <div className={styles.video}>
                <img src="http://placehold.it/640x360" />
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
        </MainSection>
      </div>
    );
  }
};

export default Live;
