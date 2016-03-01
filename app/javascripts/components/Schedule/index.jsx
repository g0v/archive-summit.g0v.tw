import React, { Component } from "react";
import { getLocale } from "javascripts/locale";
import schedules from './schedules.json';
import styles from "./styles.css";
import Table from "../Table";
import { Tabs,Tab } from "../Tabs";

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
          <Tabs
            index={this.state.index}
            onChange={this.handleTabChange}
          >
            <Tab label="Day 1">
              <Table
                model={Model}
                source={day1}
              />
            </Tab>
            <Tab label="Day 2">
              <Table
                model={Model}
                source={day2}
              />
            </Tab>
          </Tabs>
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
