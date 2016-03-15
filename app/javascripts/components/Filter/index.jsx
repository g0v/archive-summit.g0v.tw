import React from "react";
import styles from "./styles.css";

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
      
      if(value.active){
          var style = {
              "border" : `1px solid ${value.color}`,
              "background" : value.color
          }
      }else{
          var style = {
              "border" : `1px solid ${value.color}`
          }
      }
      
      return (
        <div className={styles.filterCategory} key={i} onClick={toggleCategoryHandler.bind(null,i)}>
        <div className={`${styles.filterCategoryIcon} ${styles['filterCategoryIcon_' + i]}`} style={style}></div>
        <div className="${styles.filterCategoryText}">{value.title}</div>
        </div>
      )
    });

    var closeItem = (window.innerWidth < 1237) ? <div className="styles.filterClose" onClick={togglePanelHander}>Close</div> : "";
    
    return (
      <div className={styles.filter}>
        <div className={styles.filterTitle}>Filter by topic</div>
          <div className={styles.filterCategories}>{items}</div>
          <div className={styles.filterActions}>
            {closeItem}
            <div className={`${styles.filterClearAll} ${filterOn ? styles.isActive : ''}`} onClick={clearCategoryHandler}>Clear All</div>
          </div>
      </div>
    );
  }
});