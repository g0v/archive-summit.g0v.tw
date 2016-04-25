import React, { Component } from "react";
import { getLocale } from "javascripts/locale";
import staff from './staffs.md';
import styles from './styles.css';

class StaffList extends Component {
  render() {
    return (
      <div className={styles.root}>
        <div
          className={styles.wrapper}
          dangerouslySetInnerHTML={{__html: staff }}
        />
      </div>
    );
  }
};

export default StaffList;
