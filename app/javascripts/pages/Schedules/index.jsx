import React, { Component } from "react";
import { default as Schedule, ScheduleParallel } from "javascripts/components/Schedule";

class Schedules extends Component {
  state = {
    type: 'topic'
  }
  handleSwitch = () => {
    this.props.history.pushState("", this.props.location.pathname);
    if(this.state.type === 'topic') {
      this.setState({type: 'parallel'})
    }else{
      this.setState({type: 'topic'})
    }
  }
  render() {
    if(this.state.type==='topic') {
      return <Schedule onSwitch={this.handleSwitch} {...this.props} />
    } else {
      return <ScheduleParallel onSwitch={this.handleSwitch} {...this.props} />
    }
  }
};

export default Schedules;
