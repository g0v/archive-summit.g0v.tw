import React, { Component } from "react";
import { getLocale } from "javascripts/locale";
import sponsors from "jsons/sponsors.json";
import styles from "./styles.css";

class Sponsors extends Component {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.wrapper}>
        <h2 className={styles.header}>{sponsors[getLocale()].title}</h2>
        <ul className={styles.list}>
          <li className={styles.item}>{sponsors[getLocale()].ocf}</li>
          <li className={styles.item}>{sponsors[getLocale()].iis}</li>
        </ul>
        <h2 className={styles.header}>{sponsors[getLocale()].list}</h2>
        <ul className={styles.list}>
        </ul>
        </div>
        <p>
          {sponsors[getLocale()].message}
          <a href={`mailto:${sponsors[getLocale()].email}`}>{sponsors[getLocale()].email}</a>
        </p>
      </div>
    );
  }
};

export default Sponsors;
