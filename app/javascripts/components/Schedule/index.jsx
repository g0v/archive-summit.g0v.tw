import React, { Component } from 'react';
import schedules from './schedules_by_track.json';
import { getLocale } from "javascripts/locale";
import Filter from "./filter";
import Session from './session';
import styles from "./styles.css";
import classnames from "classnames/bind";
const cx = classnames.bind(styles);

const noop = () => {}

function mapTimeSlotToItems(day, value, i) {
  let id = `day${day}-all-${i}`;
  let venue = value.venue || (value.event && value.event.venue);

  if(venue && this.state.categoryOn) {
    let category = this.state.categories.filter(cat => cat.title === venue)[0]
    if(!category.active) return false;
  }

  let content;
  if (!value.time) {
    return (
      <div
        className={cx({ "Schedule-item" : true, })}
        key={i}
        style={{ color: '#FFF', backgroundColor: value.color}}
      >
        <div className="Schedule-time">
          {value.title}／{venue}
        </div>
        <div className="Schedule-tagline">
          {value.tagline}
        </div>
      </div>
    );
  } else {
    let [timeStart, timeEnd] = value.time.split('-');
    return (
      <div className={cx({
            "Schedule-item" : true,
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
                onClick={this.setSession.bind(this, value.event, value.time)}>
                <div className="Schedule-main">
                  {value.event.title}
                  <div className="Schedule-presenter">{value.event.speaker}</div>
                </div>
              </a>
            }
          }
        }
      </div>
    );
  }
}

const categories = [
  {
    "id": "r0",
    "title": "R0",
    "color": "#CE0D41"
  },
  {
    "id": "r1",
    "title": "R1",
    "color": "#FCDE86"
  },
  {
    "id": "r2",
    "title": "R2",
    "color": "#1BADBE"
  }
];

export default class Schedule extends Component {
  state = {
    showSession: false,
    categoryOn: false,
    mobileFilterOn: false,
    categories: categories.map(category => ({...category, active: false})),
    currentSection: '',
    currentSession: {},
    currentSessionTime: null,
  };
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
      currentSession: {},
      currentSessionTime: null,
    })
    document.body.classList.remove(styles.mobileScrollLock);
  };
  setSection(currentSection) {
    console.log(currentSection)
    this.setState({ currentSection });
  }
  toggleCategory = id => {
    let categories = this.state.categories.slice(0);
    categories[id] = {...categories[id], active: !categories[id].active}
    this.setState({categories, categoryOn: true})
  }
  clearCategory = () => {
    this.setState({
      categories: categories.map(category => ({...category, active: false})),
      categoryOn: false
    })
  }
  toggleMobileFilter = () => {
    this.setState({mobileFilterOn: !this.state.mobileFilterOn})
  }
  render () {
    return (
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={cx({
            "Home-filter": true,
            "is-fixed": false,
          })}>
            <Filter
              data={this.state.categories}
              filterOn={this.state.categoryOn}
              toggleCategoryHandler={this.toggleCategory}
              clearCategoryHandler={this.clearCategory}
            />
          </div>
          <div className={cx({
            "Home-schedule": true,
            "with-session" : this.state.showSession,
          })}>
            <div className={`Schedule`}>{/* todo: is-fixed */}
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
                        data={this.state.categories}
                        filterOn={this.state.categoryOn}
                        toggleCategoryHandler={this.toggleCategory}
                        clearCategoryHandler={this.clearCategory}
                        togglePanelHander={this.toggleMobileFilter}/>
              </div>
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
              "is-fixed": true,
            })}>
            <Session
              sessionHandler={this.resetSession}
              data={this.state.currentSession}
              time={this.state.currentSessionTime}
              categories={categories}
            />
          </div>

        </div>
        <div className={cx({
          backdrop: true,
          isShown: this.state.showSession,
        })} onClick={this.resetSession} />
      </div>
    );
  }
}

export {default as ScheduleParallel} from './time'