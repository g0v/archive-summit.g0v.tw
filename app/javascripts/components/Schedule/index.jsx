import React, { Component } from "react";
import { Link } from "react-router";
import { getLocale } from "javascripts/locale";
import schedules from './schedules.json';
import categoriesData from './categories.json';
import styles from "./styles.css";
import Table from "../Table";
import Filter from "../Filter";
import Session from './session';
import classNames from "classnames";

export default class Schedule extends Component {
  state = {
    showPanel: false,
    showSession: false,
    categoryOn: false,
    categories: categoriesData.categories,
    currentSession: {}
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

  toggleCategory(index) {
    console.log('toggleCategory', index)
    return

    var current = this.state.categories;
    current[index].active = !current[index].active;

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

  setSession(value, event) {
    this.setState({
      showSession: true,
      currentSession: value
    })
  }

  resetSession() {
    this.setState({
      showSession: false,
      currentSession: {}
    })
  }

  clearCategory(){
    console.log('clearCategory', index)
    return

    var current = this.state.categories.map((value,i)=>{
      return {
        title: value.title,
        color: value.color,
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
    const filterOn = this.state.categoryOn
    const currentSession = this.state.currentSession
    const categoryObj = {}
    for(let category of this.state.categories) categoryObj[category.title] = category

    const mapTimeSlotToItems = (day, value, i) => {
      var itemClasses = classNames({

        "Schedule-item" : value.event && !value.lightning,
        "Schedule-itemLightning" : value.event && value.lightning === true,
        "Schedule-itemLightningLast" : value.event && value.lightningLast === true,
        "Schedule-itemWrapper" : value.events,
        "has-top-border" : i !== 0
      })


      var content = "";
      if(value.event){ //single event
        let id = `day${day}-all-${i}`

        if(typeof value.event === 'string'){
          content = <div>{value.event}</div>
        }else{
          content = <a id={`slot-${id}`} href={`#${id}`}
            className={classNames({
              "Schedule-session" : true,
              "is-last" : true,
              "is-active" : currentSession.title === value.event.title && currentSession.time === value.event.time && currentSession.venue === value.event.venue
            })}
            onClick={this.setSession.bind(this,value.event)}>
            {value.event.title}
            <div className="Schedule-keynotePresenter">{value.event.speaker}</div>
          </a>;
        }

      }else{ //multile events
        var filteredEvents = value.events
        .filter(sessionItem => !filterOn || (categoryObj[sessionItem.category] && categoryObj[sessionItem.category].active))

        content = filteredEvents
        .map((v,k)=>{
          var categoryStyle = {};
          if(filterOn){
             categoryStyle = {
                "border" : `1px solid ${categoryObj[v.category].color}`,
                "background" : categoryObj[v.category].color
             }
          }
          var language = (v.EN) ? <div className="Schedule-en">EN</div> : "";

          var venue = (v.venue) ? (
                  <div className="Schedule-meta">
                    <div className="Schedule-venue">{v.venue}</div>
                  </div>) : "";
          var id = `day${day}-${v.venue.toLowerCase()}-${i}`;

          return(
            <a className={classNames({
                 "Schedule-session" : true,
                 "is-last" : k === filteredEvents.length-1,
                 "is-active" : currentSession.title === v.title && currentSession.time === v.time && currentSession.venue === v.venue
               })}
               onClick={this.setSession.bind(this,v)}
               href={`#${id}`} key={k} id={`slot-${id}`}>
              {venue}
              <div className="Schedule-main">
                <div>{v.title}{language}</div>
                <div className="Schedule-presenter">{v.presenter}</div>
                <div className="Schedule-categoryIcon" style={categoryStyle}></div>
              </div>
            </a>
          )
        })
      }
      return (
        <div className={itemClasses}
             key={i}>
          <div className="Schedule-time">{value.time}</div>
          <div className="Schedule-event">{content}</div>
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
            <Filter data={this.state.categories}
                    filterOn={filterOn}
                    toggleCategoryHandler={this.toggleCategory}
                    clearCategoryHandler={this.clearCategory}/>
          </div>
          <div className={classNames({
            "Home-schedule": true,
          })}>
            <div className={`Schedule`}>{/* todo: is-fixed */}
              <div className={`Schedule-title without-session`}>{/* todo: session toggle */}
                <div className={`Schedule-dayButton`}
                     onClick={this.goToElement.bind(this,"day1")}>Day 1</div>
                <div className={`Schedule-dayButton`}
                     onClick={this.goToElement.bind(this,"day2")}>Day 2</div>
                <div className={`Schedule-filterBtn`}
                     onClick={this.togglePanel}>Filter
                  <div className={`Schedule-bar1`}></div>
                  <div className={`Schedule-bar2`}></div>
                </div>
              </div>
              <div className={`Schedule-filterPanel`}>
                <Filter ref="filter"
                        data={this.state.categories}
                        filterOn={filterOn}
                        toggleCategoryHandler={this.toggleCategory}
                        clearCategoryHandler={this.clearCategory}
                        togglePanelHander={this.togglePanel}/>
              </div>
              <div ref="day1" id="day1">
                <div className="Schedule-day">5/14 (Sat.)</div>
                {schedules[getLocale()]["day1"].filter(filterEventItem).map(mapTimeSlotToItems.bind(this, 1))}
              </div>
              <div ref="day2" id="day2">
                <div className="Schedule-day">5/15 (Sun.)</div>
                {schedules[getLocale()]["day2"].filter(filterEventItem).map(mapTimeSlotToItems.bind(this, 2))}
              </div>
            </div>
          </div>
          <div className={classNames({
              "Home-session" : true,
              "is-show" : this.state.showSession,
            })}
            style={sessionStyle}>
            <Session sessionHandler={this.resetSession}
                     data={currentSession}
                     categories={this.state.categories}/>
          </div>

        </div>
      </div>
    );
    function filterEventItem(eventItem) {
      return !filterOn || (categoryObj[eventItem.event.category] && categoryObj[eventItem.event.category].active)
    }
  }
  componentDidMount() {
    var anchor = document.location.hash.split('#')[1] || '';
    var node = document.getElementById(`slot-${anchor}`);
    if (node && node.click) { node.click(); }
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
