import React, { Component } from 'react';
import schedules from './schedules_by_track.json';
import { getLocale } from "javascripts/locale";
import Filter from "./filter";
import Session from './session';
import styles from "./styles.css";
import classnames from "classnames/bind";
import { StickyContainer, Sticky } from 'react-sticky';
const cx = classnames.bind(styles);

const venues = [
  {
    "id": "r1",
    "title": "R1",
    "color": "#8B4AA8"
  },
  {
    "id": "r0",
    "title": "R0",
    "color": "#36AAA8"
  },
  {
    "id": "r2",
    "title": "R2",
    "color": "#4EA23B"
  }
];

const venueObj = venues.reduce((aggObj, venue, idx) => {
  aggObj[venue.title] = venue
  aggObj.index = idx
  return aggObj
}, {})

function mapTimeSlotToItems(day, value, i) {
  let id = `day${day}-all-${i}`;
  let venue = value.venue || (value.event && value.event.venue);
  let { hash } = this.props.location;
  let selected = hash ? (hash === '#' + id) : false;
  let event = () => schedules[getLocale()][`day${day}`][i].event;
  if(venue && this.state.venueOn) {
    let venueState = this.state.venues.filter(cat => cat.title === venue)[0]
    if(!venueState.active) return false;
  }

  let content;
  if (!value.time) {
    return (
      <div
        className={cx({ "Schedule-item" : true, })}
        key={i}
        style={{ color: '#FFF', backgroundColor: venueObj[value.venue].color}}
      >
        <div className="Schedule-time">
          <span className={value.icomoon}></span>
          {value.title}／{venue}
        </div>

        <a id={`slot-${id}`} href={`#${id}`}
          className={cx({
            "Schedule-tagline" : true
          })}
          onClick={this.setSession.bind(this, event, value.time)}>

          <div className="Schedule-main">
            <div>{value.tagline}</div>
            { value.anchor && <div className="Schedule-anchor">{schedules[getLocale()].moderator}: {value.anchor}</div> }
          </div>
        </a>
      </div>
    );
  } else {
    let [timeStart, timeEnd] = value.time.split('-');
    return (
      <div className={cx({
            "Schedule-item" : true,
            "Schedule-keynote" : !venue,
            })}
           key={i}>
        <div className="Schedule-time">
          {timeStart}<span className="Schedule-timeEnd"> - {timeEnd}</span>
        </div>
        {
          do {
            if (typeof value.event === 'string') {
              <div className="Schedule-event">{value.event}</div>
            } else {
              <a id={`slot-${id}`} href={`#${id}`}
                className={cx({
                  "Schedule-event" : true,
                })}
                style={selected ? {backgroundColor: '#fff3f3'} : {}}
                onClick={this.setSession.bind(this, event, value.time)}>
                <div className="Schedule-main">
                  {value.event.title}
                  <div className="Schedule-presenter">{value.event.speaker}</div>
                  {
                    venue ? (
                      <div className="Schedule-categoryIcon" style={{
                             "background" : venueObj[venue].color
                           }}
                           title={`Toggle venue "${venue}"`}
                           onClick={this.toggleVenue.bind(this, venueObj[venue].index)}
                           ></div>
                    ) : null
                  }
                </div>
              </a>
            }
          }
        }
      </div>
    );
  }
}

export default class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
    showSession: false,
    venueOn: false,
    mobileFilterOn: false,
    venues: venues.map(venue => ({...venue, active: false})),
    currentSection: '',
    currentSession: () => ({}),
    currentSessionTime: null,
    };
  }

  componentDidMount() {
    const { hash } = this.props.location;
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

  setSession(value, time) {
    this.setState({
      showSession: true,
      currentSession: value,
      currentSessionTime: time,
    })

    document.body.classList.add(styles.mobileScrollLock);
  }
  resetSession = () => {
    this.setState({
      showSession: false,
      currentSession: () => ({}),
      currentSessionTime: null,
    })
    document.body.classList.remove(styles.mobileScrollLock);
  };
  setSection(currentSection) {
    console.log(currentSection)
    this.setState({ currentSection });
  }
  toggleVenue = id => {
    let venues = this.state.venues.slice(0);
    venues[id] = {...venues[id], active: !venues[id].active}
    this.setState({venues, venueOn: true})
  }
  clearVenue = () => {
    this.setState({
      venues: venues.map(venue => ({...venue, active: false})),
      venueOn: false
    })
  }
  toggleMobileFilter = () => {
    this.setState({mobileFilterOn: !this.state.mobileFilterOn})
  }
  render () {
    return (
      <div className={styles.root}>
        <div style={{ color: '#FFF', backgroundColor: '#000', padding: '20px', textAlign: 'center'}}>{schedules[getLocale()].interpretation}</div>
        <StickyContainer>
          <div className={styles.container}>
            <div className={cx({
              "Home-filter": true,
            })}>
              <Sticky topOffset={-60} stickyStyle={{marginTop: 60}}>
                <Filter
                  title='venues'
                  data={this.state.venues}
                  filterOn={this.state.venueOn}
                  toggleCategoryHandler={this.toggleVenue}
                  clearCategoryHandler={this.clearVenue}
                />
              </Sticky>
            </div>
            <div className={cx({
              "Home-schedule": true,
              "with-session" : this.state.showSession,
            })}>
              <div className={`Schedule`}>
                <Sticky topOffset={-60} stickyStyle={{marginTop: 60}}>
                  <div className={cx({
                      "Schedule-title" : true,
                      "with-session" : this.state.showSession,
                      "without-session" : !this.state.showSession
                    })}>
                    <div className="Schedule-dayButtonLeftstop">
                      <div className={cx({
                             "Schedule-dayButton" : true,
                             "is-active" : this.state.currentSection === "day1"
                           })}
                           onClick={this.setSection.bind(this, 'day1')}>Day 1</div>
                    </div>
                    <div className={cx({
                           "Schedule-dayButton" : true,
                           "is-active" : this.state.currentSection === "day2"
                         })}
                         onClick={this.setSection.bind(this, 'day2')}>Day 2</div>
                    <div className="Schedule-switchBtn" onClick={this.props.onSwitch}>View Parallel</div>
                    <div className={cx({
                           'Schedule-filterBtn': true,
                           'is-show': this.state.mobileFilterOn,
                         })}
                         onClick={this.toggleMobileFilter}>Filter
                      <div className={cx({'Schedule-bar1': true, 'is-active': this.state.mobileFilterOn})}></div>
                      <div className={cx({'Schedule-bar2': true, 'is-active': this.state.mobileFilterOn})}></div>
                    </div>
                  </div>
                  <div className={cx({
                    'Schedule-filterPanel': true,
                    'is-show': this.state.mobileFilterOn,
                  })}>
                    <Filter ref="filter"
                            title='venues'
                            data={this.state.venues}
                            filterOn={this.state.venueOn}
                            toggleCategoryHandler={this.toggleVenue}
                            clearCategoryHandler={this.clearVenue}
                            togglePanelHandler={this.toggleMobileFilter}/>
                  </div>
                </Sticky>
                <div
                  className={cx({
                    "Home-section": true,
                    "is-hidden": this.state.currentSection !== ''&& this.state.currentSection !== 'day1'
                  })}
                  ref={(c) => this.day1 = c}
                  id="day1"
                >
                  <div className="Schedule-day">5/14 (Sat.)</div>
                  <section>
                    {schedules[getLocale()]["day1"].map(mapTimeSlotToItems.bind(this, 1))}
                  </section>
                </div>
                <div
                  className={cx({
                    "Home-section": true,
                    "is-hidden": this.state.currentSection !== '' && this.state.currentSection !== 'day2'
                  })}
                  ref={(c) => this.day2 = c}
                  id="day2"
                >
                  <div className="Schedule-day">5/15 (Sun.)</div>
                  <section>
                    {schedules[getLocale()]["day2"].map(mapTimeSlotToItems.bind(this, 2))}
                  </section>
                </div>
              </div>
            </div>
            <div className={cx({
                "Home-session" : true,
                "is-show": this.state.showSession,
              })}>
              <Session
                sessionHandler={this.resetSession}
                data={this.state.currentSession()}
                time={this.state.currentSessionTime}
                categories={venues}
              />
            </div>
          </div>
        </StickyContainer>
        <div className={cx({
          backdrop: true,
          isShown: this.state.showSession,
        })} onClick={this.resetSession} />
      </div>
    );
  }
}

export {default as ScheduleParallel} from './parallel'
