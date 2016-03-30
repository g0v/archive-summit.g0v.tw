import React, { Component } from "react";
import { getLocale } from "javascripts/locale";
import about from "jsons/about.json";
import styles from "./styles.css";

class About extends Component {
  render() {
    return (
      <div className={styles.root}>
        { 
          about[getLocale()].sections.map( section => {
            return (
              <section>
                <h2 className={styles.header}>{section.header}</h2>
                {
                  section.description.map( desc => {
                    return (
                      <p className={styles.description} dangerouslySetInnerHTML={{__html: desc}}></p>
                    )
                  })
                }
                {
                  section.sub.map( section => {
                    return (
                      <section>
                        <h3 className={styles.subheader}>{section.header}</h3>
                        {
                          section.description.map( desc => {
                            return (
                              <p className={styles.description} dangerouslySetInnerHTML={{__html: desc}}></p>
                            )
                          })
                        }
                      </section>
                    )
                  })
                }
              </section>
            )
          }) 
        }
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
