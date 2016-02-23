import React, { Component } from "react";
import styles from "./styles.css";

class MainInfo extends Component {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <div className={styles.year}>2016 summit</div>
          <img
            className={styles.logo}
            src={require('./images/g0v-logo.png')}
          />
          <div>
            <img
              className={styles.theme}
              src={require('./images/theme.png')}
            />
          </div>
          <div className={styles.day}>5. 14-15</div>
          <div className={styles.place}>中央研究院</div>
        </div>
      </div>
    );
  }
};

export default MainInfo;
