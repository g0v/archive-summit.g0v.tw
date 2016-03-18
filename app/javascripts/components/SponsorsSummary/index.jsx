import React, { Component } from "react";
import { getLocale } from "javascripts/locale";
import sponsors from "jsons/sponsors.json";
import _ from "jsons/sponsors_summary.json";
import styles from "./styles.css";

class SponsorsSummary extends Component {
  sponsor = (sponsor) => {
    return (
      (sponsor.url) ? <a href={sponsor.url} target="_blank" className={styles.sponsor} key={sponsor.name} >
        <img className={styles.logo} src={require(`file!images/sponsors/${sponsor.logo}`)} />
        <span className={styles.name}>{sponsor.name}</span>
      </a> : <span className={styles.sponsor} key={sponsor.name} >
        <img className={styles.logo} src={require(`file!images/sponsors/${sponsor.logo}`)} />
        <span className={styles.name}>{sponsor.name}</span>
      </span>
    );
  }

  render() {
    return (
      <div className={styles.root}>
        { 
          sponsors[getLocale()].map( cat => {
            return (
              <section id={cat.category} className={styles.section} key={cat.category}>
                <h2 className={styles.header}>{cat.title}</h2>
                <div>{ cat.sponsors.map(this.sponsor) }</div>
              </section>
            )
          }) 
        }
        <p>
          {_[getLocale()].message}
          <a href={`mailto:${_[getLocale()].email}`}>{_[getLocale()].email}</a>
        </p>
      </div>
    );
  }
};

export default SponsorsSummary;
