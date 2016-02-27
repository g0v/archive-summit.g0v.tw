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
                source={schedules[getLocale()]["day1"].map((it) => {
                  if (!it.events) return { colSpan: 3, ...it};
                  return {
                    time: it.time,
                    r1: <Slot />,
                    r0: <Slot />,
                    r2: <Slot />,
                  };
                })}
              />
            </Tab>
            <Tab label="Day 2">
              <Table
                model={Model}
                source={schedules[getLocale()]["day2"].map((it) => {
                  if (!it.events) return { colSpan: 3, ...it};
                  return {
                    time: it.time,
                    r1: <Slot />,
                    r0: <Slot />,
                    r2: <Slot />,
                  };
                })}
              />
            </Tab>
          </Tabs>
        </section>
      </div>
    );
  }
};

const Slot = () => {
  return (
    <div>
      <div>Title of Speech</div>
      <div>Speaker</div>
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
