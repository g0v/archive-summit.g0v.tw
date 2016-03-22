import React, { Component } from "react";
import { getLocale } from "javascripts/locale";
import styles from "./styles.css";
import sponsors from "jsons/sponsors.json";

var multiParagraph = (text, className) => {
  if (!text) {
    return [];
  }
  var arr = text.split('\n');
  var ret = [];
  for (let i in arr) {
    let line = arr[i];
    ret.push(<p className={className} key={i}>{line}</p>);
  }
  return ret;
}

export default class SponsorsList extends Component {
  sponsor = (sponsor, i) => {
    return (
      <section className={styles.sponsor} key={sponsor.name}>
        <img className={styles.logo} src={require(`file!images/sponsors/${sponsor.logo}`)} />
        <h3 target="_blank" className={styles.name}>{
          (sponsor.url) ? <a href={sponsor.url} target="_blank">{sponsor.name}</a> : sponsor.name
        }</h3>
        {multiParagraph(sponsor.desc, styles.desc)}
      </section>
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
      </div>
    );
  }
};

