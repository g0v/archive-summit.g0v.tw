import React from "react";
import classNames from "classnames";
import "./session.css";

export default React.createClass({
  displayName: "Session",

  propTypes: {
    onClose: React.PropTypes.func.isRequired,
    data: React.PropTypes.shape({
      venue: React.PropTypes.string,
      category: React.PropTypes.string,
      language: React.PropTypes.string,
      speaker: React.PropTypes.string,
      title: React.PropTypes.string,
      bio: React.PropTypes.string,
      abstract: React.PropTypes.string,
    }).isRequired, // Session data
    time: React.PropTypes.string.isRequired,
  },

  render() {
    var {onClose, data, categories, time} = this.props;
    return (
      <div className="Session">
        <div className="Session-close"
             onClick={onClose}></div>
        <div className="Session-content">
          <div className="Session-meta">
            {data.venue ? <div className="Session-venue">{data.venue}</div> : ""}
            <div className="Session-time">{time}</div>
            {(data.EN) ? <div className="Session-en">EN</div> : ""}
          </div>
          <div className="Session-title">
            {data.title}
          </div>
          <div className="Session-presenter">
            {data.speaker}
          </div>
          <div className="Session-abstract">
            <div className="Session-subTitle">Abstract</div>
            <div dangerouslySetInnerHTML={{__html: data.abstract}}></div>
          </div>
          {
            (data.bio) ? (
              <div className="Session-biography">
                  <div className="Session-subTitle">Biography</div>
                  <div dangerouslySetInnerHTML={{__html: data.bio}}></div>
              </div>
            ): ""
          }
        </div>
      </div>
    );
  }
});