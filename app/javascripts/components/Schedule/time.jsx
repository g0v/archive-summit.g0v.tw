import React, { Component } from "react";
import { Link } from "react-router";
import { getLocale } from "javascripts/locale";
import schedules from './schedules.json';
import categoriesData from './categories.json';
import styles from "./styles.css";
import Filter from "./filter";
import Session from './session';
import classNames from "classnames";
import classNamesBind from "classnames/bind";

const cx = classNamesBind.bind(styles)

export default class ScheduleParallel extends Component {
  state = {
    showPanel: false,
    showSession: false,
    categoryOn: false,
    categories: categoriesData[getLocale()].map((cat, index) => ({...cat, index})),
    currentSession: {},
    currentSessionTime: null,
  };
  defaultTitle = document.title;

  constructor() {
    super()

    this.togglePanel = this.togglePanel.bind(this)
    this.toggleCategory = this.toggleCategory.bind(this)
    this.clearCategory = this.clearCategory.bind(this)
    this.resetSession = this.resetSession.bind(this)
  }

  togglePanel() { // mobile filter
    this.setState({showPanel: !this.state.showPanel})
  }

  toggleCategory(index, e) {
    e.stopPropagation();
    var current = this.state.categories.slice(0);
    current[index] = Object.assign({}, current[index], {active: !current[index].active})

    var sum = current.reduce((pre, current)=>{
        if(current.active){
           return pre + 1;
        }else{
           return pre;
        }
    },0);
    var categoryOn = (sum > 0);

    this.setState({
        categories: current,
        categoryOn: categoryOn
    })
  }

  setSession(value, time) {
    this.setState({
      showSession: true,
      currentSession: value,
      currentSessionTime: time,
    })

    document.body.classList.add(styles.mobileScrollLock);
  }

  resetSession() {
    this.setState({
      showSession: false,
      currentSession: {},
      currentSessionTime: null,
    })
    document.body.classList.remove(styles.mobileScrollLock);
  }

  clearCategory(){
    var current = this.state.categories.map((value,i)=>{
      return {
        ...value,
        active: false
      }
    });

    this.setState({
      categories: current,
      categoryOn: false
    })

  }

  goToElement(refName){
    var node = this.refs[refName].getDOMNode();
    // this.props.goToElementHandler(node.offsetTop);
    console.log(`TODO: animate to ${refName}`)
  }

  render() {
    const {categoryOn: filterOn, currentSession, showSession, categories, showPanel} = this.state

    const categoryObj = {}
    for(let category of categories) categoryObj[category.id] = category

    const shouldPassFilter = (categoryId) => {
      if(!filterOn) return true;
      if(!categoryId) return false;
      return categoryObj[categoryId] && categoryObj[categoryId].active;
    }

    const mapTimeSlotToItems = (day, value, i) => {
      var itemClasses = classNames({
        "Schedule-item" : true,
      })

      var content = "";
      if(value.event){ //single event
        if(!shouldPassFilter(value.event.category)) {
          return null;
        }

        let id = `day${day}-all-${i}`

        if(typeof value.event === 'string'){
          content = <div className="Schedule-event">{value.event}</div>
        }else{
          content = <a id={`slot-${id}`} href={`#${id}`}
            className={classNames({
              "Schedule-event" : true,
              "is-active" : currentSession.title === value.event.title && currentSession.time === value.event.time && currentSession.venue === value.event.venue
            })}
            onClick={this.setSession.bind(this, value.event, value.time)}>
            <div className="Schedule-main">
              {value.event.title}
              <div className="Schedule-presenter">{value.event.speaker}</div>
            </div>
          </a>;
        }

      }else{ //multile events
        let filteredEvents = value.events.filter(v => shouldPassFilter(v.category));
        if(filteredEvents.length === 0) return null;
 
        content = (
          <div className="Schedule-events">
            {
              filteredEvents.map((v,k)=>{
                var language = (v.EN) ? <div className="Schedule-en">EN</div> : "";
 
                var venue = (v.venue) ? (
                        <div className="Schedule-meta">
                          <div className="Schedule-venue">{v.venue}</div>
                        </div>) : "";
                var id = `day${day}-${v.venue.toLowerCase()}-${i}`;
 
                return(
                  <a className={classNames({
                       "Schedule-event" : true,
                       "is-active" : currentSession.title === v.title && currentSession.time === v.time && currentSession.venue === v.venue
                     })}
                     onClick={this.setSession.bind(this,v, value.time)}
                     href={`#${id}`} key={k} id={`slot-${id}`}>
                    {venue}
                    <div className="Schedule-main">
                      <div>{v.title}{language}</div>
                      <div className="Schedule-presenter">{v.speaker}</div>
                      {
                        v.category && categoryObj[v.category] ? (
                          <div className="Schedule-categoryIcon" style={{
                                 "background" : categoryObj[v.category].color
                               }}
                               title={`Toggle topic "${categoryObj[v.category].title}"`}
                               onClick={this.toggleCategory.bind(this, categoryObj[v.category].index)}
                               ></div>
                        ):null
                      }
                    </div>
                  </a>
                )
              })
            }
          </div>
        );
      }
 

      let [timeStart, timeEnd] = value.time.split('-')
      return (
        <div className={itemClasses}
             key={i}>
          <div className="Schedule-time">
            {timeStart}<span className="Schedule-timeEnd"> - {timeEnd}</span>
          </div>
          {content}
        </div>
      )
    }

    const filterStyle = {}
    const sessionStyle = {}

    return (
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={classNames({
            "Home-filter": true,
            "is-fixed": false,
          })} style={filterStyle}>
            <Filter data={categories}
                    filterOn={filterOn}
                    toggleCategoryHandler={this.toggleCategory}
                    clearCategoryHandler={this.clearCategory}/>
          </div>
          <div className={classNames({
            "Home-schedule": true,
            "with-session" : showSession,
          })}>
            <div className={`Schedule`}>{/* todo: is-fixed */}
              <div className={classNames({
                  "Schedule-title" : true,
                  "with-session" : showSession,
                  "without-session" : !showSession
                  /*"is-fixed" : inScheduleArea==="within" || (inScheduleArea==="passed" && showPanel),*/
                })}>
                <div className="Schedule-dayButtonLeftstop">
                  <div className={classNames({
                         "Schedule-dayButton" : true,
                         /* "is-active" : currentSection === "day1" */
                       })}
                       onClick={this.goToElement.bind(this,"day1")}>Day 1</div>
                </div>
                <div className={classNames({
                       "Schedule-dayButton" : true,
                       /* "is-active" : currentSection === "day2" */
                     })}
                     onClick={this.goToElement.bind(this,"day2")}>Day 2</div>
                <div className="Schedule-switchBtn" onClick={this.props.onSwitch}>View Topics</div>
                <div className={classNames({
                       'Schedule-filterBtn': true,
                       'is-show': showPanel,
                     })}
                     onClick={this.togglePanel}>Filter
                  <div className={classNames({'Schedule-bar1': true, 'is-active': showPanel})}></div>
                  <div className={classNames({'Schedule-bar2': true, 'is-active': showPanel})}></div>
                </div>
              </div>
              <div className={classNames({
                'Schedule-filterPanel': true,
                'is-show': showPanel,
              })}>
                <Filter ref="filter"
                        data={categories}
                        filterOn={filterOn}
                        toggleCategoryHandler={this.toggleCategory}
                        clearCategoryHandler={this.clearCategory}
                        togglePanelHander={this.togglePanel}/>
              </div>
              <div ref="day1" id="day1">
                <div className="Schedule-day">5/14 (Sat.)</div>
                <section>
                  {schedules[getLocale()]["day1"].map(mapTimeSlotToItems.bind(this, 1))}
                </section>
              </div>
              <div ref="day2" id="day2">
                <div className="Schedule-day">5/15 (Sun.)</div>
                <section>
                  {schedules[getLocale()]["day2"].map(mapTimeSlotToItems.bind(this, 2))}
                </section>
              </div>
            </div>
          </div>
          <div className={classNames({
              "Home-session" : true,
              "is-show": showSession,
              "is-fixed": true,
            })}
            style={sessionStyle}>
            <Session sessionHandler={this.resetSession}
                     data={currentSession} time={this.state.currentSessionTime}
                     categories={this.state.categories}/>
          </div>

        </div>
        <div className={cx({
          backdrop: true,
          isShown: showSession,
        })} onClick={this.resetSession} />
      </div>
    );
  }
  componentDidMount() {
    var anchor = document.location.hash.split('#')[1] || '';
    var node = document.getElementById(`slot-${anchor}`);
    if (node && node.click) { node.click(); }
  }
  componentWillUnmount() {
    document.body.classList.remove(styles.mobileScrollLock);
  }
};

var multilineText = (text) => {
  var arr = text.split('\n');
  var ret = [arr.shift()];
  for (let line of arr) {
    ret.push(<br/>);
    ret.push(line);
  }
  return ret;
}
