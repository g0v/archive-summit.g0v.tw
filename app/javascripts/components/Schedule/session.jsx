import React from "react";
import classNames from "classnames";
import "./session.css";
import speakers from '../SpeakerList/speakers.json';
import schedules from './schedules.json';
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

    const speakers = data.speaker_key ? data.speaker_key : data.speaker ? [data.speaker] : [];
    const speakers_bio = [];
    const speakers_profile = speakers.map( speaker => by_name[speaker] ).map( speaker => {
      const bio_text = ((speaker && getString(speaker, 'bio', locale)) || data.bio || '').replace(/\n/g, '<br/>');
      const speaker_title = speaker && getString(speaker, 'title', locale);
      const speaker_organization = speaker && getString(speaker, 'organization', locale);
      const speaker_name = speaker && getString(speaker, 'name', locale);
      const avatar = speaker ? avatarURL(speaker) : '';
      var bio = bio_text ? (
        <div className="Session-biography" key={`speaker_bio_${speaker_name}`}>
            <div className="Session-subTitle">Biography</div>
            <div dangerouslySetInnerHTML={{__html: bio_text}}></div>
        </div>
      ): "";
      speakers_bio.push(bio);

      return <div key={`speaker_${speaker_name}`}>
        <div className="Session-presenter">
            {speaker_name}
        </div>
        <div className="Session-presenter-title">
            {speaker_title}
        </div>
        <div className="Session-presenter-organization">
            {speaker_organization}
        </div>
        { avatar && <img className={styles.avatar} src={avatar} /> }
      </div>;
    });
    return (
        <div className="Session">
          <div style={{ color: '#FFF', backgroundColor: '#000', padding: '20px', textAlign: 'center'}}>{schedules[getLocale()].interpretation}
          </div>
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
                { speakers_profile.map( profile => profile ) }

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
                { speakers_bio.map( bio => bio) }
            </div>
        </div>
    );
  }
});
