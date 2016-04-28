import React, { Component } from "react";
import { getLocale } from "javascripts/locale";
import info from "./data/README.md";
import styles from "./styles.css";

class Staff extends Component {
  render() {
    return (
      <div className={styles.root}>
        <div
          dangerouslySetInnerHTML={{__html: info }}
        />
      </div>
    );
  }
};

export default Staff;
