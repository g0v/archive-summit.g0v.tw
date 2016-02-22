import React, { Component } from "react";
import classNames from "classnames";
import { getLocale } from "javascripts/locale";
import info from "jsons/header.json";
import styles from "./styles";

class Header extends Component {
  state = {
    affix: false,
  };

  static contextTypes = {
    changeLocale: React.PropTypes.func,
  };

  render() {
    return (
      <header className={styles.root}>
        <div className={styles.brand}>
          <h2 className={styles.title}>
            g0v Summit
          </h2>
          <div className={styles.live}>
            <svg width="48px" height="33px" viewBox="0 0 48 33" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-218.000000, -12.000000)">
                  <g transform="translate(219.000000, 13.000000)">
                    <path d="M44.8887627,20.6529902 C43.034656,28.1106176 31.663456,31.7473431 19.4906293,28.7749902 C7.31718933,25.8032451 -1.04867733,17.3481471 0.805429333,9.89051961 C2.65892267,2.43228431 14.0301227,-1.20383333 26.2035627,1.76791176 C38.3770027,4.74026471 46.7428693,13.1953627 44.8887627,20.6529902" id="Fill-1" fill="#FDD974"></path>
                    <path d="M44.8887627,20.6529902 C43.034656,28.1106176 31.663456,31.7473431 19.4906293,28.7749902 C7.31718933,25.8032451 -1.04867733,17.3481471 0.805429333,9.89051961 C2.65892267,2.43228431 14.0301227,-1.20383333 26.2035627,1.76791176 C38.3770027,4.74026471 46.7428693,13.1953627 44.8887627,20.6529902 L44.8887627,20.6529902 Z" id="Stroke-3" stroke="#050101" strokeWidth="1.787" strokeLinecap="round" strokeLinejoin="round"></path>
                    <g id="Group-8">
                      <path d="M12.932624,24.4490922 C12.932624,24.4490922 11.063184,28.3368569 6.400624,28.925249 C6.400624,28.925249 15.065184,32.4689745 19.490384,28.7751118" id="Fill-5" fill="#FDD974"></path>
                      <path d="M12.932624,24.4490922 C12.932624,24.4490922 11.063184,28.3368569 6.400624,28.925249 C6.400624,28.925249 15.065184,32.4689745 19.490384,28.7751118" id="Stroke-7" stroke="#050101" strokeWidth="1.787" strokeLinecap="round" strokeLinejoin="round"></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
        <ul className={styles.menu}>
          <li className={styles.active}>{info[getLocale()].home}</li>
          <li className={styles.item}>{info[getLocale()].schedule}</li>
          <li className={styles.item}>{info[getLocale()].speakers}</li>
          <li className={styles.item}>{info[getLocale()].sponsors}</li>
          <li className={styles.item}>{info[getLocale()].transport}</li>
        </ul>
        <div className={styles.lang}>
          <a onClick={(e) => this.context.changeLocale("zh-TW", e)} className={styles.button}>中文</a>
          <a onClick={(e) => this.context.changeLocale("en-US", e)} className={styles.button}>English</a>
        </div>
      </header>
    );
  }
};

export default Header;
