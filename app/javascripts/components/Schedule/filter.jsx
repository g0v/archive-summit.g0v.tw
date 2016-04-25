import React, {PropTypes} from "react";
import styles from "./filter.css";

export default React.createClass({
  displayName: "Filter",

  propTypes: {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      active: PropTypes.bool,
      color: PropTypes.string,
      title: PropTypes.string,
    })).isRequired,
    filterOn: PropTypes.bool,
    toggleCategoryHandler: PropTypes.func.isRequired,
    clearCategoryHandler: PropTypes.func.isRequired,
    togglePanelHandler: PropTypes.func,
  },

  render() {

    var {filterOn} = this.props;
    var items = this.props.data.map((value,i)=>{

      if(!filterOn || value.active){
        var style = {
          "background" : value.color
        }
      }else{
        var style = {
          "border" : `2px solid ${value.color}`
        }
      }

      var icomoon = value.icomoon

      return (
        <div className={styles.filterCategory} key={i} onClick={this.props.toggleCategoryHandler.bind(null,i)}>
          <div className={`${styles.filterCategoryIcon}`} style={style}></div>
          <div className={icomoon}></div>
          <div className={`${styles.filterCategoryText}`}>{value.title}</div>
        </div>
      )
    });

    return (
      <div className={styles.filter}>
        <div className={styles.filterTitle}>{this.props.title}</div>
          <div className={styles.filterCategories}>{items}</div>
          <div className={styles.filterActions}>
            <div className={styles.filterClose} onClick={this.props.togglePanelHandler}>Close</div>
            <div className={`${styles.filterClearAll} ${filterOn ? styles.isActive : ''}`} onClick={this.props.clearCategoryHandler}>All {this.props.title.toLowerCase()}</div>
          </div>
      </div>
    );
  }
});
