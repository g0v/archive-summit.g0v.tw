import React, { Component } from 'react';
import classnames from 'classnames/bind';
import styles from './styles.css';

class TabContent extends Component {
  static propTypes = {
    active: React.PropTypes.bool,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    tabIndex: React.PropTypes.number
  };

  static defaultProps = {
    active: false,
    className: ''
  };

  render () {
    const cx = classnames.bind(styles);

    return (
      <section className={cx({
        tab: true,
        tabActive: this.props.active,
        [this.props.className]: this.props.className,
      })} tabIndex={this.props.tabIndex}>
        {this.props.children}
      </section>
    );
  }
}

export default TabContent;
