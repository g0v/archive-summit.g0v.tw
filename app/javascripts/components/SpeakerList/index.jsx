import React, { Component } from "react";
import { getLocale, getString } from "javascripts/locale";
import avatarURL from "javascripts/helpers/avatar";
import Lightbox from "javascripts/components/Lightbox";
import styles from "./styles.css";
import speakers from "./speakers.json";
import schedulesByTrack from "javascripts/components/Schedule/schedules_by_track.json";
import classnames from "classnames/bind";
import Session from "javascripts/components/Schedule/session";

const cx = classnames.bind(styles);

class SpeakerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSession: false,
      currentSession: () => ({}),
      currentSessionTime: null
    }
  }

  enableSession(value,time) {
    this.setState({
      showSession: true,
      currentSession: value,
      currentSessionTime: time
    })
  }

  disableSession = () => {
    this.setState({
      showSession: false,
      currentSection: () => ({}),
      currentSessionTime: null
    })
  }

  speaker = (speaker) => {
    const avatar = avatarURL(speaker);
    const [locale] = getLocale().split('-');
    let data = this.mapToDescription(speaker, locale)

    return (
      <div className={cx({
                          "speaker": !this.state.showSession,
                          "speaker-shrink": this.state.showSession
        })} key={speaker.name} 
      >
        <a 
          href= {`#${data.id}`} 
          onClick={this.enableSession.bind(this, data.event, data.time)}
        >
          <img className={styles.avatar} src={avatar} />
        </a>
        <div className={styles.name}>{getString(speaker, 'name', locale)}</div>
        {speaker.title && <div className={styles.title}>{getString(speaker, 'title', locale)}</div>}
        {speaker.organization && <div className={styles.organization}>{getString(speaker, 'organization', locale)}</div>}
      </div>
    );
  }
  /*
    @Purpose: Use name in speaker.json to search the data in schedules_by_track.json
    @return: event => () => 
            time,
            id(day_venue_index)
  */
  mapToDescription(speaker, locale) {
    let data = [];
    let event = null;
    let id = "";

    // search day1 first
    data = schedulesByTrack[getLocale()]["day1"].filter((day, index) => {
      if((day.event.speaker === getString(speaker, 'name', locale))||
         (day.event.moderator && day.event.moderator[0] === getString(speaker, 'name', locale)) //||
        ) {
        id = "day1-all-" + index.toString();
        return true;
      }else {
        return false;
      }
    });

    // nothing found in day1, then try search day2
    if(id == "") {
      data = schedulesByTrack[getLocale()]["day2"].filter((day, index) => {
        if((day.event.speaker === getString(speaker, 'name', locale))||
           ((day.event.moderator && day.event.moderator[0]) === getString(speaker, 'name', locale))
          ) {
          id = "day2-all-" + index.toString();
          return true;
        }else {
          return false;
        }
      });
    }
    
    // data found in day1 or day2
    if(id !== "") {
      let day_venue_index = id.split("-");

      return {
        event: () => schedulesByTrack[getLocale()][day_venue_index[0]][day_venue_index[2]].event,
        time: schedulesByTrack[getLocale()][day_venue_index[0]][day_venue_index[2]].time,
        id: id
      };
    }

    // nothing found in schedules_by_track.json,so return speaker.json's data instead
    if((data == null) ||
       (event == null) ||
       (id == "")){
      return {
        event: () => ({
          venue: "",
          category: "",
          language: "",
          speaker:  speaker.name,
          title: speaker.title,
          bio: speaker.bio,
          abstract: "",
          avatar: speaker.avatar,
          value: speaker }),
        time: "",
        id: speaker.name
      };
    }
  }

  sortFunc = (a,b) => {
    const [locale] = getLocale().split('-');
    return getString(a, 'name', locale).localeCompare(getString(b, 'name', locale));
  }

  showBio = (speaker, e) => {
    e.preventDefault();
    this.refs.lightbox.setState({ show: true, speaker: speaker });
  }

  render() {
    return (
      <div className={styles.root}>
        <h2 className={cx({
          "header": true,
          "header-shrink" : this.state.showSession})}
        >
          講者
        </h2>
        <div className= {cx({"speaker-parent" : this.state.showSession })} >
          { speakers['en-US'].filter((s) => s.featured).sort(this.sortFunc).map(this.speaker) }
        </div>
        <div className= {cx({"speaker-parent" : this.state.showSession })} >
          { speakers['en-US'].filter((s) => !s.featured).sort(this.sortFunc).map(this.speaker) }
        </div>

        <div className={cx({
          "Home-session": true,
          "is-show": this.state.showSession
        }
        )}>
          <Session 
            sessionHandler={this.disableSession}
            data={this.state.currentSession()}
            time={this.state.currentSessionTime}
          />
        </div>
      </div>
    );
  }
};

export default SpeakerList;
