import React, { Component } from "react";
import { getLocale } from "javascripts/locale";
import schedules from './schedules.json';
import styles from "./styles.css";
import Table from "../Table";

export default class Schedule extends Component {
  state = {
     index: 0,
   };
   handleTabChange = (index) => {
     this.setState({index});
   };
  render() {
    const day1 = schedules[getLocale()]["day1"].map((it) => {
      if (!it.events) return { colSpan: 3, time: it.time, event: it.event };
      return {
        time: it.time,
        r1: (<Slot speaker={it.events[0].speaker} title={it.events[0].title} />),
        r0: (<Slot speaker={it.events[1].speaker} title={it.events[1].title} />),
        r2: (<Slot speaker={it.events[2].speaker} title={it.events[2].title} />),
      };
    });

    const day2 = schedules[getLocale()]["day2"].map((it) => {
      if (!it.events) return { colSpan: 3, time: it.time, event: it.event };
      return {
        time: it.time,
        r1: (<Slot speaker={it.events[0].speaker} title={it.events[0].title} />),
        r0: (<Slot speaker={it.events[1].speaker} title={it.events[1].title} />),
        r2: (<Slot speaker={it.events[2].speaker} title={it.events[2].title} />),
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
        </section>
      </div>
    );
  }
};

const Slot = ({title, speaker}) => {
  return (
    <div>
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
