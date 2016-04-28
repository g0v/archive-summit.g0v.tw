import React, { Component } from "react";
import { getLocale } from "javascripts/locale";
import transports from "jsons/transport.json";
import hotels from "jsons/hotels.json";
import styles from "./styles.css";
import content from "text/unconf";

class Unconf extends Component {
    render() {
          return (
              <div className={styles.root}>
                <div dangerouslySetInnerHTML={{__html: content[getLocale()]}}>
                </div>
              </div>
          );
    }
};

export default Unconf;
