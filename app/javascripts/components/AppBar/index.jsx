import React, { Component } from "react";
import { IndexLink, Link } from "react-router";
import { getLocale } from "javascripts/locale";
import info from "jsons/header.json";
import styles from "./styles";

class Header extends Component {
  state = {
    hiddenMenu: false,
    offsetWidth: 0,
  };
  static contextTypes = {
    router: React.PropTypes.object,
    changeLocale: React.PropTypes.func,
  };
  componentDidMount() {
    this.setState({
      offsetWidth: this.refs.header.offsetWidth
    });
    if (this.refs.header.offsetWidth <= 830) {
      this.setState({ hiddenMenu: true, });
    }
    window.addEventListener('resize', this.handleResize.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }
  handleResize(e) {
    this.setState({
      offsetWidth: this.refs.header.offsetWidth
    });
    if (this.state.hiddenMenu && this.refs.header.offsetWidth > 830) {
      this.setState({ hiddenMenu: false });
    } else if (!this.state.hiddenMenu && this.refs.header.offsetWidth <= 830) {
      this.setState({ hiddenMenu: true });
    }
  }
  showMenu() {
    this.setState({
      hiddenMenu: !this.state.hiddenMenu,
    });
  }
  render() {
    const { isActive } = this.context.router;
    return (
      <header className={styles.root} ref="header">
        <svg
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 31.25" version="1.1" x="0px" y="0px"
          className={styles.ham}
          onClick={() => this.showMenu()}
        >
          <title>Hamburger Round</title>
          <desc>Created by John Slater from the Noun Project</desc>
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g fill="#000000">
              <path d="M0,4 C0,2.8954305 0.889763236,2 2.00359486,2 L22.9964051,2 C24.10296,2 25,2.88772964 25,4 C25,5.1045695 24.1102368,6 22.9964051,6 L2.00359486,6 C0.897039974,6 0,5.11227036 0,4 L0,4 Z M0,12 C0,10.8954305 0.889763236,10 2.00359486,10 L22.9964051,10 C24.10296,10 25,10.8877296 25,12 C25,13.1045695 24.1102368,14 22.9964051,14 L2.00359486,14 C0.897039974,14 0,13.1122704 0,12 L0,12 Z M0,20 C0,18.8954305 0.889763236,18 2.00359486,18 L22.9964051,18 C24.10296,18 25,18.8877296 25,20 C25,21.1045695 24.1102368,22 22.9964051,22 L2.00359486,22 C0.897039974,22 0,21.1122704 0,20 L0,20 Z" />
              </g>
          </g>
        </svg>
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
          {
            do {
              if (this.state.offsetWidth >= 930) {
                <Menu />
              }
            }
          }
        </div>
        {
          do {
            if (!this.state.hiddenMenu && this.state.offsetWidth < 930) {
              <Menu />
            }
          }
        }
        <div className={styles.lang}>
          <a onClick={(e) => this.context.changeLocale("zh-TW", e)} className={styles.button}>中文</a>
          <a onClick={(e) => this.context.changeLocale("en-US", e)} className={styles.button}>English</a>
        </div>
      </header>
    );
  }
};

const Menu = () => {
  return (
    <ul className={styles.menu}>
      <li
        className={styles.item}
        activeClassName={styles.active}>
        <IndexLink
          to="/2016"
          activeClassName={styles.active}
        >
          {info[getLocale()].home}
        </IndexLink>
      </li>
      <li
        className={styles.item}
        activeClassName={styles.active}>
        <Link
          to="/2016/schedules"
        >
          {info[getLocale()].schedule}
        </Link>
      </li>
      <li
        className={styles.item}
        activeClassName={styles.active}>
        <Link
          to="/2016/speakers"
        >
          {info[getLocale()].speakers}
        </Link>
      </li>
      <li
        className={styles.item}
        activeClassName={styles.active}>
        <Link
          to="/2016/sponsors"
        >
          {info[getLocale()].sponsors}
        </Link>
      </li>
      <li className={styles.item}
        activeClassName={styles.active}>
        <Link
          to="/2016/transport"
        >
          {info[getLocale()].transport}
        </Link>
      </li>
      <li className={styles.item}
        activeClassName={styles.active}>
        <Link
          to="/2016/live"
        >
          {info[getLocale()].live}
        </Link>
      </li>
      <li
        className={styles.item}
        activeClassName={styles.active}>
        <Link
          to="/2016/staff"
        >
          {info[getLocale()].staff}
        </Link>
      </li>
      <li
        className={styles.item}
        activeClassName={styles.active}>
        <a href="https://www.facebook.com/hashtag/g0vsummit16"
        >
          {info[getLocale()].news}
        </a>
      </li>
    </ul>
  );
}

export default Header;
