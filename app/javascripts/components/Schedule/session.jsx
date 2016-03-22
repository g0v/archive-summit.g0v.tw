import React from "react";
import classNames from "classnames";
import "./session.css";

export default React.createClass({
  displayName: "Session",

  render() {
    var {sessionHandler, data, categories} = this.props;
    var categoryObj = {};
    categories.map((v,i)=>{
        categoryObj[v.title] = v;
    });
    var categoryStyle = {};
    if(categoryObj[data.category]){
      categoryStyle = {
        "border" : `1px solid ${categoryObj[data.category].color}`,
        "background" : categoryObj[data.category].color
      }
    }
    var venue = (data.venue) ? <div className="Session-venue">{data.venue}</div> : "";
    var language = (data.EN) ? <div className="Session-en">EN</div> : "";

    var bio = (data.biography) ? (
      <div className="Session-biography">
          <div className="Session-subTitle">Biography</div>
          <div dangerouslySetInnerHTML={{__html: data.biography}}></div>
      </div>
    ): "";
    return (
        <div className="Session">
            <div className="Session-close"
                 onClick={sessionHandler}></div>
            <div className="Session-content">
                <div className="Session-meta">
                  {venue}
                  <div className="Session-time">{data.time}</div>
                  {language}
                </div>
                <div className="Session-title">
                  {data.title}
                </div>
                <div className="Session-presenter">
                    {data.presenter}
                </div>

                <div className="Session-category">
                  <div className="Session-categoryIcon" style={categoryStyle}></div>
                  {data.category}
                </div>

                <div className="Session-abstract">
                    <div className="Session-subTitle">Abstract</div>
                    <div dangerouslySetInnerHTML={{__html: data.abstract}}></div>
                </div>
                {bio}
            </div>
        </div>
    );
  }
});