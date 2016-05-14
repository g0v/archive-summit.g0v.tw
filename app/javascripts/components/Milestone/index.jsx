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
          {data.milestones.map(({title, url, label, faded}) => (
            <a className={styles.links} href={url} target="_blank">
            <article className={styles.article + ' ' + (faded ? 'faded' : '')} key={title}>
              <div className={styles.title}>
                  {title}
              </div>
            </article>
          </a>
          ))}
        </section>
        <p>
          {data.media}
          <a href={`mailto:${data.email}`}>{data.person}</a>
        </p>
        <p>
          <a href={`mailto:${data.sponsoremail}`}>{data.sponsor}</a>
        </p>
      </div>
    );
  }
};
