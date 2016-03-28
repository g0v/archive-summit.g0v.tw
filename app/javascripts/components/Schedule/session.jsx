import React from "react";
import classNames from "classnames";
import "./session.css";

export default React.createClass({
  displayName: "Session",

  render() {
    var {sessionHandler, data, categories, time} = this.props;
    var category = categories.find(cat => cat.id === data.category)
    var venue = (data.venue) ? <div className="Session-venue">{data.venue}</div> : "";
    var language = (data.EN) ? <div className="Session-en">EN</div> : "";

    var bio = (data.bio) ? (
      <div className="Session-biography">
          <div className="Session-subTitle">Biography</div>
          <div dangerouslySetInnerHTML={{__html: data.bio}}></div>
      </div>
    ): "";
    return (
        <div className="Session">
            <div className="Session-close"
                 onClick={sessionHandler}></div>
            <div className="Session-content">
                <div className="Session-meta">
                  {venue}
                  <div className="Session-time">{time}</div>
                  {language}
                </div>
                <div className="Session-title">
                  {data.title}
                </div>
                <div className="Session-presenter">
                    {data.speaker}
                </div>

                {
                  category ? (
                    <div className="Session-category">
                      <div className="Session-categoryIcon" style={{
                             "background" : category.color
                           }}></div>
                      {category.title} - {category.tagline}
                    </div>
                  ) : null
                }

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