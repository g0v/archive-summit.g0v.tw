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
                <img src={require("./unconf_map_3F.jpg")} />
                <img src={require("./unconf_map_4F.jpg")} />
                <iframe src="https://docs.google.com/spreadsheets/d/1dj2ySUzJYu-5fjc2fdQ-05ahTLQfsJ8hnWWF6vV_ySI/pubhtml?gid=1230998661&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="400px"></iframe>
              </div>
          );
    }
};

export default Unconf;
