import React, { Component } from "react";
import { getLocale } from "javascripts/locale";
import about from "jsons/about.json";
import styles from "./styles.css";
import Session from "javascripts/components/Schedule/session";
import classnames from "classnames/bind";
import schedules from "javascripts/components/Schedule/schedules_by_track.json";

const cx = classnames.bind(styles);

function mapToDescription( section, index) {
    let day_venue_id = {};
    let data = {};

    if(section.location !== undefined){// Link to keynote speaker session
      day_venue_id = section.location.split("-");
      data = schedules[getLocale()][day_venue_id[0]][day_venue_id[2]]
      let event = () => schedules[getLocale()][day_venue_id[0]][day_venue_id[2]].event;

      return (
        <a
          href={`#${section.location}`}
          onClick={this.setSession.bind(this, event, data.time)}
          className="Schedule-event"
        >
          <section key={`subsection_${index}`}>
            <h3 className={styles.subheader}>{section.header}</h3>
            {
              section.description.map( (desc, j) => {
                return (
                  <p key={`sub_p_${index}_${j}`} className={styles.description} dangerouslySetInnerHTML={{__html: desc}}></p>
                )
              })
            }
          </section>
        </a>
      )
    } else{ // only "g0v introduction"
      return (
          <section key={`subsection_${index}`}>
            <h3 className={styles.subheader}>{section.header}</h3>
            {
              section.description.map( (desc, j) => {
                return (
                  <p key={`sub_p_${index}_${j}`} className={styles.description} dangerouslySetInnerHTML={{__html: desc}}></p>
                )
              })
            }
          </section>
      )
    }
}

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSession: false,
      currentSession: () => ({}),
      currentSessionTime: null
    }
  }

  componentDidMount() {
    const { hash } = this.props.properties.location;
    if (hash) {
      setTimeout(() => document.getElementById(hash.replace('#', 'slot-')).scrollIntoView(false), 300);
      const dataArray = hash.replace('#', '').split('-');
      const value = schedules[getLocale()][dataArray[0]][dataArray[2]];
      this.setState({
        showSession: true,
        currentSession: () => schedules[getLocale()][dataArray[0]][dataArray[2]].event,
        currentSessionTime: value.time
      });
    }
  }

  setSession(value, time){
    this.setState({
      showSession: true,
      currentSession: value,
      currentSessionTime: time
    })
  }

  resetSession = () => {
    this.setState({
      showSession: false,
      currentSection: () => ({}),
      currentSessionTime: null
    })
  }

  render() {
    return (
      <div className={styles.root}>
        {
          about[getLocale()].sections.map( (section, i_s) => {
            return (
              <section key={`section_${i_s}`}>
                <h2 className={styles.header}>{section.header}</h2>
                {
                  section.description.map( (desc, i) => {
                    return (
                      <p key={`p_${i_s}_${i}`} className={styles.description} dangerouslySetInnerHTML={{__html: desc}}></p>
                    )
                  })
                }
                { section.sub.map(mapToDescription.bind(this)) }
              </section>
            )
          })
        }

        <div className={cx({
          "Home-session": true,
          "is-show": this.state.showSession
        }
        )}>
          <Session
            sessionHandler={this.resetSession}
            data={this.state.currentSession()}
            time={this.state.currentSessionTime}
          />
        </div>
      </div>
    );
  }
};

export default About;
