import React, { Component } from "react";
import { Link } from "react-router";
import { getLocale } from "javascripts/locale";
import schedules from './schedules.json';
import lightbox from "./lightbox.json";
import styles from "./styles.css";
import Table from "../Table";

export default class Schedule extends Component {
  state = {
    talkID: '',
    heading: '',
    speaker: '',
    content: '',
    bio: ''
  };
  defaultTitle = document.title;

  showLightBox(id = '', heading = '', speaker = '', content = '', bio = '') {
    this.state.showLightbox = true;
    this.setState({
      talkID: id,
      heading, speaker, content, bio
    });
  }
  hideLightBox(id = '', heading = '', speaker = '', content = '', bio = '') {
    this.state.showLightbox = false;
    this.setState({
      talkID: id,
      heading, speaker, content, bio
    });
  }
  render() {
    var onclick = (event) => (e) => {
      e.preventDefault();
      var id = e.currentTarget.href.split('#')[1] || '';
      history.replaceState({}, event.title, `#${id}`);
      this.showLightBox(id, event.title, event.speaker, event.abstract, event.bio)
    }

    const day1 = schedules[getLocale()]["day1"].map((it, i) => {
      if (!it.events) {
        if (it.event.title) {
          return { colSpan: 3, time: it.time, event: (
            <Slot
              id={"day1-all-"+i}
              speaker={it.event.speaker}
              title={it.event.title}
              onClick={onclick(it.event)}
            />,
          ) };
        }
        return { colSpan: 3, time: it.time, event: it.event };
      }

      return {
        time: it.time,
        r1: (
          <Slot
            id={"day1-r1-"+i}
            speaker={it.events[0].speaker}
            title={it.events[0].title}
            onClick={onclick(it.events[0])}
          />),
        r0: (
          <Slot
            id={"day1-r0-"+i}
            speaker={it.events[1].speaker}
            title={it.events[1].title}
            onClick={onclick(it.events[1])}
          />),
        r2: (
          <Slot
            id={"day1-r2-"+i}
            speaker={it.events[2].speaker}
            title={it.events[2].title}
            onClick={onclick(it.events[2])}
          />),
      };
    });

    const day2 = schedules[getLocale()]["day2"].map((it, i) => {
      if (!it.events) {
        if (it.event.title) {
          return { colSpan: 3, time: it.time, event: (
            <Slot
              id={"day2-all-"+i}
              speaker={it.event.speaker}
              title={it.event.title}
              onClick={onclick(it.event)}
            />,
          ) };
        }
        return { colSpan: 3, time: it.time, event: it.event };
      }

      return {
        time: it.time,
        r1: (
          <Slot
            id={"day2-r1-"+i}
            speaker={it.events[0].speaker}
            title={it.events[0].title}
            onClick={onclick(it.events[0])}
          />),
        r0: (
          <Slot
            id={"day2-r0-"+i}
            speaker={it.events[1].speaker}
            title={it.events[1].title}
            onClick={onclick(it.events[1])}
          />),
        r2: (
          <Slot
            id={"day2-r2-"+i}
            speaker={it.events[2].speaker}
            title={it.events[2].title}
            onClick={onclick(it.events[2])}
          />),
      };
    });

    return (
      <div className={styles.root}>
        <h2 className={styles.header}>{multilineText(schedules[getLocale()].header)}</h2>
        <section className={styles.section}>
          <h3 id="day1"><a href="#day1">Day 1</a></h3>
          <Table
            className={styles.table}
            model={Model}
            source={day1}
          />
          <h3 id="day2"><a href="#day2">Day 2</a></h3>
          <Table
            className={styles.table}
            model={Model}
            source={day2}
          />
          {
            do {
              if (this.state.talkID) {
                <LightBox
                  id={this.state.talkID}
                  heading={this.state.heading}
                  speaker={this.state.speaker}
                  content={this.state.content}
                  bio={this.state.bio}
                  toggle={() => {
                    history.replaceState({}, this.defaultTitle, '#');
                    this.hideLightBox()
                  }}
                />
              }
            }
          }
        </section>
      </div>
    );
  }
  componentDidMount() {
    var anchor = document.location.hash.split('#')[1] || '';
    var node = document.getElementById(anchor);
    if (node && node.click) { node.click(); }
  }
};
{/*<button className={styles.lightboxbutton} onClick={this.closeLightBox.bind(this)}>{lightbox[getLocale()].close}</button>*/}
//
  // <button className={styles.lightboxclose} onClick={this.closeLightBox.bind(this)}>x</button>

var multilineText = (text) => {
  var arr = text.split('\n');
  var ret = [arr.shift()];
  for (let line of arr) {
    ret.push(<br/>);
    ret.push(line);
  }
  return ret;
}

const LightBox = ({id, heading, speaker, content, bio, toggle }) => {
  return (
    <div>
      <div className={styles.lightboxwrap}>
        <div className={styles.lightboxcontainer}>
          <div className={styles.lightboxheading}>
            <h3 className={styles.lightboxTitle}>{heading}<br/>{speaker}</h3>
          </div>
          <h4>{lightbox[getLocale()].abstract}</h4>
          <div dangerouslySetInnerHTML={{__html: content}} />
          <h4>{lightbox[getLocale()].bio}</h4>
          <div dangerouslySetInnerHTML={{__html: bio}} />
          <button className={styles.lightboxbutton} onClick={toggle}>{lightbox[getLocale()].close}</button>
        </div>
        <button className={styles.lightboxclose} onClick={toggle}>x</button>
      </div>
    </div>
  );
}
const Slot = ({id, title, speaker, onClick}) => {
  return (
    <a href={`#${id}`} id={`slot-${id}`} className={styles.slot} onClick={onClick}>
      <div className={styles.slotTitle}>{multilineText(title)}</div>
      <div>{speaker}</div>
    </a>
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
