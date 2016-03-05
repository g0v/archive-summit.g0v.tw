import React, { Component } from "react";
import { getLocale } from "javascripts/locale";
import schedules from './schedules.json';
import lightbox from "./lightbox.json";
import styles from "./styles.css";
import Table from "../Table";

export default class Schedule extends Component {
  state = {
    showLightbox: false,
    heading: '',
    content: '',
  };
  toggleLightBox(heading = '', content = '') {
    this.setState({
      showLightbox: !this.state.showLightbox,
      heading, content,
    });
  }
  render() {
    const day1 = schedules[getLocale()]["day1"].map((it) => {
      if (!it.events) return { colSpan: 3, time: it.time, event: it.event };
      return {
        time: it.time,
        r1: (
          <Slot
            speaker={it.events[0].speaker}
            title={it.events[0].title}
            onClick={() => this.toggleLightBox(it.events[0].title, it.events[0].abstract)}
          />),
        r0: (
          <Slot
            speaker={it.events[1].speaker}
            title={it.events[1].title}
            onClick={() => this.toggleLightBox(it.events[1].title, it.events[1].abstract)}
          />),
        r2: (
          <Slot
            speaker={it.events[2].speaker}
            title={it.events[2].title}
            onClick={() => this.toggleLightBox(it.events[2].title, it.events[2].abstract)}
          />),
      };
    });

    const day2 = schedules[getLocale()]["day2"].map((it) => {
      if (!it.events) return { colSpan: 3, time: it.time, event: it.event };
      return {
        time: it.time,
        r1: (
          <Slot
            speaker={it.events[0].speaker}
            title={it.events[0].title}
            onClick={() => this.toggleLightBox(it.events[0].title, it.events[0].abstract)}
          />),
        r0: (
          <Slot
            speaker={it.events[1].speaker}
            title={it.events[1].title}
            onClick={() => this.toggleLightBox(it.events[1].title, it.events[1].abstract)}
          />),
        r2: (
          <Slot
            speaker={it.events[2].speaker}
            title={it.events[2].title}
            onClick={() => this.toggleLightBox(it.events[2].title, it.events[2].abstract)}
          />),
      };
    });

    return (
      <div className={styles.root}>
        <h2 className={styles.header}>{schedules[getLocale()].header}</h2>
        <section className={styles.section}>
          <h3 id="/schedules_day1"><a href="#/schedules_day1">Day 1</a></h3>
          <Table
            className={styles.table}
            model={Model}
            source={day1}
          />
          <h3 id="/schedules_day2"><a href="#/schedules_day2">Day 2</a></h3>
          <Table
            className={styles.table}
            model={Model}
            source={day2}
          />
          {
            do {
              if (this.state.showLightbox) {
                <LightBox
                  heading={this.state.heading}
                  content={this.state.content}
                  toggle={() => this.toggleLightBox()}
                />
              }
            }
          }
        </section>
      </div>
    );
  }
};
{/*<button className={styles.lightboxbutton} onClick={this.closeLightBox.bind(this)}>{lightbox[getLocale()].close}</button>*/}
//
  // <button className={styles.lightboxclose} onClick={this.closeLightBox.bind(this)}>x</button>

const LightBox = ({ heading, content, toggle }) => {
  return (
    <div>
      <div className={styles.lightboxwrap}>
        <div className={styles.lightboxcontainer}>
          <div className={styles.lightboxheading}>
            <h3>{heading}</h3>
          </div>
          <div dangerouslySetInnerHTML={{__html: content}} />
          <button className={styles.lightboxbutton} onClick={toggle}>{lightbox[getLocale()].close}</button>
        </div>
        <button className={styles.lightboxclose} onClick={toggle}>x</button>
      </div>
    </div>
  );
}
const Slot = ({title, speaker, onClick}) => {
  return (
    <div className={styles.slot} onClick={onClick}>
      <div>{title}</div>
      <div>{speaker}</div>
    </div>
  );
}

const Model = {
  time: {
    label: "Time",
    type: String,
  },
  r1: {
    label: "R1",
    type: React.PropTypes.node,
  },
  r0: {
    label: "R0",
    type: React.PropTypes.node,
  },
  r2: {
    label: "R2",
    type: React.PropTypes.node,
  }
}
