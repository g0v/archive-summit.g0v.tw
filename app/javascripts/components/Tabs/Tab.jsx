import React from 'react';
import classnames from 'classnames/bind';
import styles from './styles.css';

class TabHeader extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    hidden: React.PropTypes.bool,
    label: React.PropTypes.any.isRequired,
    onActive: React.PropTypes.func,
    onClick: React.PropTypes.func
  };

  static defaultProps = {
    active: false,
    className: '',
    disabled: false,
    hidden: false
  };

  componentDidUpdate (prevProps) {
    if (!prevProps.active && this.props.active && this.props.onActive) {
      this.props.onActive();
    }
  }

  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  render () {
    const cx = classnames.bind(styles);
    
    return (
      <label className={cx({
        label: true,
        active: this.props.active
      })} onClick={this.handleClick}>
        {this.props.label}
      </label>
    );
  }
}

export default TabHeader;
