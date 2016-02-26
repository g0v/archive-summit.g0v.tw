import React, { Component } from "react";
import { getLocale } from "javascripts/locale";
import milestoneData from "jsons/milestones.json";
import styles from "./styles.css";

export default class Milestone extends Component {
  render() {
    let data = milestoneData[getLocale()]
    return (
      <div className={styles.root}>
        <h2 className={styles.header}>{data.header}</h2>
        <section className={styles.section}>
          {data.milestones.map(({range, title, url, label}) => (
            <article className={styles.article} key={title}>
              <div className={styles.title}>
                <a className={styles.links} href={url} target="_blank">
                  {title}
                </a>
              </div>
              <div className={styles.range}>
                <span className={styles.date}>{range[0]}</span>
                －
                <span className={styles.date}>{range[1]}</span>
                  {
                    do {
                      if (label) {
                        <div>
                          <span className={styles.label}>{label}</span>
                        </div>
                      }
                    }
                  }
              </div>
            </article>
          ))}
        </section>
        <p>
          {milestoneData[getLocale()].media}
          (<a href={`mailto:${milestoneData[getLocale()].email}`}>{milestoneData[getLocale()].person}</a>)
        </p>
      </div>
    );
  }
};
