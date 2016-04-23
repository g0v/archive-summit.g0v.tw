import React from "react";
import styles from "./filter.css";

export default React.createClass({
  displayName: "Filter",

  render() {

    // var array = Array.apply(null, {length: 10}).map(Number.call, Number)
    // var fakeItems = array.map((value,i)=>{
    //   return (
    //     <li className="Filter-category" key={i}>CATEGORY</li>
    //   )
    // });

    var {data, filterOn, toggleCategoryHandler, clearCategoryHandler, togglePanelHander} = this.props;
    var items = data.map((value,i)=>{

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
        <div className={styles.filterCategory} key={i} onClick={toggleCategoryHandler.bind(null,i)}>
          <div className={`${styles.filterCategoryIcon}`} style={style}></div>
          <div className={icomoon}></div>
          <div className={`${styles.filterCategoryText}`}>{value.title}</div>
        </div>
      )
    });

    return (
      <div className={styles.filter}>
        <div className={styles.filterTitle}>Venues</div>
          <div className={styles.filterCategories}>{items}</div>
          <div className={styles.filterActions}>
            <div className={styles.filterClose} onClick={togglePanelHander}>Close</div>
            <div className={`${styles.filterClearAll} ${filterOn ? styles.isActive : ''}`} onClick={clearCategoryHandler}>All Topics</div>
          </div>
      </div>
    );
  }
});
