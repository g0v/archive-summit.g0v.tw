import React from "react";
import styles from "./filter.css";
import classnames from 'classnames/bind'
const cx = classnames.bind(styles);

export default React.createClass({
  displayName: "Filter",

  propTypes: {
    data: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    activeMap: React.PropTypes.object.isRequired, // Maps ID to active or not (bool)
    onFilterToggle: React.PropTypes.func.isRequired,
    onClear: React.PropTypes.func.isRequired,
    onPanelToggle: React.PropTypes.func.isRequired, // Invoke when toggling <Filter>'s presence on mobile.
  },

  render() {

    var {data, activeMap, onFilterToggle, onClear, onPanelToggle} = this.props;
    var items = data.map(value => {

      return (
        <div className={cx({
          filterCategory: true,
          [value]: true,
          isActive: activeMap[value],
        })} key={value} onClick={onFilterToggle.bind(null, value)}>
          <div className={cx({
            filterCategoryIcon: true
          })}></div>
          <div className={cx({filterCategoryText: true})}>{value}</div>
        </div>
      )
    });

    return (
      <div className={styles.filter}>
        <div className={styles.filterTitle}>Venues</div>
          <div className={styles.filterCategories}>{items}</div>
          <div className={styles.filterActions}>
            <div className={styles.filterClose} onClick={onPanelToggle}>Close</div>
            <div className={styles.filterClearAll} onClick={onClear}>All Venues</div>
          </div>
      </div>
    );
  }
});
