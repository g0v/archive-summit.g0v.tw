import React, { Component } from 'react';
import Tab from './Tab';
import TabContent from './TabContent';
import classnames from 'classnames/bind';
import styles from './styles.css';

class Tabs extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    index: React.PropTypes.number,
    onChange: React.PropTypes.func
  };

  static defaultProps = {
    index: 0
  };

  state = {
    pointer: {}
  };

  handleHeaderClick = (idx) => {
    if (this.props.onChange) this.props.onChange(idx);
  };

  parseChildren () {
    const headers = [];
    const contents = [];

    React.Children.forEach(this.props.children, (item) => {
      if (!item) return;
      if (item.type === Tab) {
        headers.push(item);
        if (item.props.children) {
          contents.push(
            <TabContent
              {...item.props}
              children={item.props.children}
            />
          );
        }
      } else if (item.type === TabContent) {
        contents.push(item);
      }
    });

    return {headers, contents};
  }

  renderHeaders (headers) {
    return headers.map((item, idx) => {
      return React.cloneElement(item, {
        key: idx,
        active: this.props.index === idx,
        onClick: this.handleHeaderClick.bind(this, idx, item)
      });
    });
  }

  renderContents (contents) {
    return contents.map((item, idx) => {
      return React.cloneElement(item, {

        key: idx,
        active: this.props.index === idx,
        tabIndex: idx
      });
    });
  }

  render () {
    const cx = classnames.bind(styles);
    const { headers, contents } = this.parseChildren();

    return (
      <div className={cx({
        tabs: true,
        [this.props.className]: this.props.className,
      })}>
        <nav className={styles.nav}>
          {this.renderHeaders(headers)}
        </nav>
        {this.renderContents(contents)}
      </div>
    );
  }
}

export default Tabs;
