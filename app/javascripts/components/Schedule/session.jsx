import React from "react";
import classNames from "classnames";
import "./session.css";
import speakers from '../SpeakerList/speakers.json';
import schedules from './schedules.json';
import categories from './categories.json';
import { getLocale, getString } from "javascripts/locale";
import avatarURL from "javascripts/helpers/avatar";
import styles from "./styles.css";
import helptext from "./helptext.json";

var by_name = {};

speakers["en-US"].forEach((speaker) => {
  if (speaker.name_zh) {
    by_name[speaker.name_zh] = speaker;
  }
  by_name[speaker.name] = speaker;
});

export default React.createClass({
  displayName: "Session",

  render() {
    var {sessionHandler, data, time} = this.props;
    var category = categories[getLocale()].find(cat => cat.id === data.category);
    var venue = (data.venue) ? <div className="Session-venue">{data.venue}</div> : "";
    var language = (data.EN) ? <div className="Session-en">EN</div> : "";
    const [locale] = getLocale().split('-');

    const speakers = data.speaker_key ? data.speaker_key : data.speaker ? [data.speaker] : [];
    const speakers_bio = [];
    const speakers_interview = speakers.map( speaker => by_name[speaker] )
      .filter( speaker => speaker && speaker.interview !== undefined )
      .map( speaker => {
        return (
          <div
            className="Session-interview"
            key={`speaker_bio_${speaker.id}`}
            dangerouslySetInnerHTML={{__html:
              `<h4>${helptext[getLocale()].text}(<a target="_blank" href="http://www.youtube.com/timedtext_video?ref=share&v=${speaker.interview}">${helptext[getLocale()].help}</a>)</h4><iframe src="https://www.youtube.com/embed/${speaker.interview}" frameborder="0" allowfullscreen></iframe>`}}
          />
        );
      });

    const speakers_profile = speakers.map( speaker => by_name[speaker] ).map( speaker => {
      const bio_text = ((speaker && getString(speaker, 'bio', locale)) || data.bio || '').replace(/\n/g, '<br/>');
      const speaker_title = speaker && getString(speaker, 'title', locale);
      const speaker_organization = speaker && getString(speaker, 'organization', locale);
      const speaker_name = speaker && getString(speaker, 'name', locale);
      const twitterID = speaker && getString(speaker, 'twitter', locale);
      const facebookID = speaker && getString(speaker, 'facebook', locale);
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
            { twitterID &&
              <a 
                className="Session-twitter"
                href={`https://twitter.com/${twitterID}`}
                target="_blank"
              >
                <img 
                  className="Session-social"
                  src={require('./twitter.png')}
                />
              </a>
            }
            { facebookID && 
              <a 
                className="Session-facebook"
                href={`https://facebook.com/${facebookID}`}
                target="_blank"
              >
                <img
                  className="Session-social"
                  src={require('./fb.png')}
                />
              </a>
            }
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

    // Use the same flows of speakers, speakers_bio and speakers_profile variables
    const moderator = data.moderator ? data.moderator : [];
    const moderator_bio = [];
    const moderator_profile = moderator.map( moderator => by_name[moderator] ).map( moderator  => {
      const bio_text = ((moderator && getString(moderator, 'bio', locale)) || data.bio || '').replace(/\n/g, '<br/>');
      const moderator_title = moderator && getString(moderator, 'title', locale);
      const moderator_organization = moderator && getString(moderator, 'organization', locale);
      const moderator_name = moderator && getString(moderator, 'name', locale);
      const avatar = moderator ? avatarURL(moderator) : '';
      var bio = bio_text ? (
        <div className="Session-biography" key={`moderator_bio_${moderator_name}`}>
            <div className="Session-subTitle">Biography</div>
            <div dangerouslySetInnerHTML={{__html: bio_text}}></div>
        </div>
      ): "";
      moderator_bio.push(bio);

      return <div key={`moderator_${moderator_name}`}>
        <div className="Session-presenter">
            {moderator_name}
        </div>
        <div className="Session-presenter-title">
            {moderator_title}
        </div>
        <div className="Session-presenter-organization">
            {moderator_organization}
        </div>
        { avatar && <img className={styles.avatar} src={avatar} /> }
      </div>;
    });

    if (time && speakers_profile.length) {
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
                  { speakers_interview }
                  { data.abstract && <div className="Session-abstract">
                      <div className="Session-subTitle">Abstract</div>
                      <div dangerouslySetInnerHTML={{__html: data.abstract}}></div>
                    </div>
                  }
                  { speakers_bio.map( bio => bio) }
              </div>
          </div>
      );
    } else if(moderator_profile.length) {
      return (
          <div className="Session">
            <div style={{ color: '#FFF', backgroundColor: '#000', padding: '20px', textAlign: 'center'}}>{schedules[getLocale()].interpretation}
            </div>
              <div className="Session-close"
                   onClick={sessionHandler}></div>
              <div className="Session-content">

                  { moderator_profile.map( profile => profile ) }

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
                  { moderator_bio.map( bio => bio) }
              </div>
          </div>
      );
    // nothing found in schedules_by_track.json,so display speaker.json's data instead
    }else if(data.value !== undefined) {
      const avatar = data ? avatarURL(data) : '';
      return (
        <div className="Session">
          <div style={{ color: '#FFF', backgroundColor: '#000', padding: '20px', textAlign: 'center'}}>{schedules[getLocale()].interpretation}
          </div>
            <div className="Session-close"
                 onClick={sessionHandler}></div>
            <div className="Session-content">
                <div key={`speaker_${getString(data.value, 'name', locale)}`}>
                  <div className="Session-presenter">
                      {getString(data.value, 'name', locale)}
                  </div>
                  <div className="Session-presenter-title">
                      {getString(data.value, 'title', locale)}
                  </div>
                  <div className="Session-presenter-organization">
                      {getString(data.value, 'organization', locale)}
                  </div>
                  {avatar && <img className={styles.avatar} src={avatar}/>}
                </div>
                <div className="Session-biography" key={`bio_${data.value.bio}`}>
                    <div className="Session-subTitle">Biography</div>
                    <div dangerouslySetInnerHTML={{__html: getString(data.value, 'bio', locale)}}></div>
                </div>
            </div>
        </div>
      );
    }else {
      return <br />;
    }

  }
});
