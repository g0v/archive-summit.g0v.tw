import React, { Component } from "react";
import {
  AppBar,
  MainSection,
} from "javascripts/components"

import styles from "./styles.css";

class Live extends Component {
  render() {
    return (
      <div>
        <AppBar />
        <MainSection className={styles.main}>
          <div className={styles.monitor}>TODO: Monitor</div>
          <div className={styles.channel}>TODO: Channel</div>
        </MainSection>
      </div>
    );
  }
};

export default Live;