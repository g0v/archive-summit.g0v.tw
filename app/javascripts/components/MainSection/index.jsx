import React, { Component } from "react";
import styles from "./styles.css";

class MainSection extends Component {
  render() {
    return (
      <main className={styles.root}>
        {this.props.children}
      </main>
    );
  }
};

export default MainSection;
