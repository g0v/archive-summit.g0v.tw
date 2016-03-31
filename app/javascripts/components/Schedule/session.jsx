import React from "react";
import classNames from "classnames";
import "./session.css";
import speakers from '../SpeakerList/speakers.json';
import { getLocale, getString } from "javascripts/locale";
import { avatarURL } from '../SpeakerList';
import styles from "./styles.css";

var by_name = {};

speakers['en-US'].forEach((speaker) => by_name[speaker.name] = speaker);

export default React.createClass({
  displayName: "Session",

  render() {
    var {sessionHandler, data, categories, time} = this.props;
    var category = categories.find(cat => cat.id === data.category)
    var venue = (data.venue) ? <div className="Session-venue">{data.venue}</div> : "";
    var language = (data.EN) ? <div className="Session-en">EN</div> : "";
    const [locale] = getLocale().split('-');

    const speaker = by_name[data.speaker_key || data.speaker];
    const bio_text = ((speaker && getString(speaker, 'bio', locale)) || data.bio || '').replace(/\n/g, '<br/>');
    const speaker_title = speaker && getString(speaker, 'title', locale);
    const speaker_orgnization = speaker && getString(speaker, 'organization', locale);
    const speaker_name = speaker && getString(speaker, 'name', locale);
    var bio = bio_text ? (
      <div className="Session-biography">
          <div className="Session-subTitle">Biography</div>
          <div dangerouslySetInnerHTML={{__html: bio_text}}></div>
      </div>
    ): "";
    const avatar = speaker ? avatarURL(speaker) : '';
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
                    {speaker_name}
                </div>
                <div className="Session-presenter-title">
                    {speaker_title}
                </div>
                <div className="Session-presenter-organization">
                    {speaker_orgnization}
                </div>
                { avatar && <img className={styles.avatar} src={avatar} /> }

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

                { data.abstract && <div className="Session-abstract">
                    <div className="Session-subTitle">Abstract</div>
                    <div dangerouslySetInnerHTML={{__html: data.abstract}}></div>
                  </div>
                }
                {bio}
            </div>
        </div>
    );
  }
});
