import React, { Component } from "react";
import { getLocale } from "javascripts/locale";
import about from "jsons/about.json";
import styles from "./styles.css";

class About extends Component {
  render() {
    return (
      <div className={styles.root}>
        <h2 className={styles.header}>{about[getLocale()].header}</h2>
        <p className={styles.description}>{about[getLocale()].description}</p>
        <div className={styles.links}>
          <h2 className={styles.title}>當日大會共筆</h2>
          <a className={styles.button}>Hackpad</a>
          <a className={styles.active}>Hackpad</a>
        </div>
      </div>
    );
  }
};

export default About;
