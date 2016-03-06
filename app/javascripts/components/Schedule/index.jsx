import React, { Component } from "react";
import { Link } from "react-router";
import { getLocale } from "javascripts/locale";
import schedules from './schedules.json';
import lightbox from "./lightbox.json";
import styles from "./styles.css";
import Table from "../Table";

export default class Schedule extends Component {
  render() {
    var showLightbox = false;
    var lightboxHeading = '';
    var lightboxContent = '';
    var lightboxToggle = '';
    var [_, anchor] = document.location.hash.split('_');

    const ROOM = ['r1', 'r0', 'r2'];
    var matchTalk = (anchor, day, i, events) => {
      for (let j in events) {
        let event = events[j];
        if (anchor === day + '-' + ROOM[j] + '-' + i) {
          showLightbox = true;
          lightboxHeading = event.title;
          lightboxContent = event.abstract;
          lightboxToggle = "/schedules_" + day;
        }
      }
    }
    const day1 = schedules[getLocale()]["day1"].map((it, i) => {
      if (!it.events) return { colSpan: 3, time: it.time, event: it.event };

      matchTalk(anchor, 'day1', i, it.events);
      return {
        time: it.time,
        r1: (
          <Slot
            id={"/schedules_day1-r1-"+i}
            speaker={it.events[0].speaker}
            title={it.events[0].title}
          />),
        r0: (
          <Slot
            id={"/schedules_day1-r0-"+i}
            speaker={it.events[1].speaker}
            title={it.events[1].title}
          />),
        r2: (
          <Slot
            id={"/schedules_day1-r2-"+i}
            speaker={it.events[2].speaker}
            title={it.events[2].title}
          />),
      };
    });

    const day2 = schedules[getLocale()]["day2"].map((it, i) => {
      if (!it.events) return { colSpan: 3, time: it.time, event: it.event };

      matchTalk(anchor, 'day2', i, it.events);
      return {
        time: it.time,
        r1: (
          <Slot
            id={"/schedules_day2-r1-"+i}
            speaker={it.events[0].speaker}
            title={it.events[0].title}
          />),
        r0: (
          <Slot
            id={"/schedules_day2-r0-"+i}
            speaker={it.events[1].speaker}
            title={it.events[1].title}
          />),
        r2: (
          <Slot
            id={"/schedules_day2-r2-"+i}
            speaker={it.events[2].speaker}
            title={it.events[2].title}
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
              if (showLightbox) {
                <LightBox
                  heading={lightboxHeading}
                  content={lightboxContent}
                  toggle={lightboxToggle}
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
          <Link to={toggle} className={styles.lightboxbutton} onClick={toggle}>{lightbox[getLocale()].close}</Link>
        </div>
        <Link to={toggle} className={styles.lightboxclose}>x</Link>
      </div>
    </div>
  );
}
const Slot = ({title, speaker, id}) => {
  return (
    <Link to={id} id={id} className={styles.slot}>
      <div>{title}</div>
      <div>{speaker}</div>
    </Link>
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
