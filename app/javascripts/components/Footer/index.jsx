import React, { Component } from "react";
import styles from "./styles.css";

class Footer extends Component {
  render() {
    return (
      <footer className={styles.root}>
        Copyright © g0v Summit 2016・
        <a
          className={styles.coc}
          href="https://g0v.hackpad.com/ep/pad/static/2mprMIpYMz9"
          target="_blank"
        >
          Code of Conduct
        </a>
      </footer>
    );
  }
};

export default Footer;
