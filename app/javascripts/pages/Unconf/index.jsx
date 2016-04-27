import React, { Component } from "react";
import { getLocale } from "javascripts/locale";
import transports from "jsons/transport.json";
import hotels from "jsons/hotels.json";
import styles from "./styles.css";

var content = require(`./${getLocale() === null ? 'en-US' : getLocale() }.md`);

class Unconf extends Component {
    render() {
          return (
              <div className={styles.root}>
                <div dangerouslySetInnerHTML={{__html: content}}>
                </div>
              </div>
          );
    }
};

export default Unconf;
