import React, { Component } from "react";
import c from 'classnames';
import styles from "./styles.css";

function MainSection({children, className}) {
  return (
    <main className={c(styles.root, className)}>
      {children}
    </main>
  );
};

export default MainSection;
