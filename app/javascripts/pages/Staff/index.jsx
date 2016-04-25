import React, { Component } from "react";
import { getLocale } from "javascripts/locale";
import { StaffList } from "javascripts/components"

class Staff extends Component {
  render() {
    return (<StaffList />);
  }
};

export default Staff;
