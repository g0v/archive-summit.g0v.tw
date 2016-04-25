'use strict';

export function avatar(speaker) {
  if (speaker.avatar) {
    return speaker.avatar.match(/^\.\//) ? require(`javascripts/components/SpeakerList/${speaker.avatar.replace(/^\.\//, "")}`) : speaker.avatar;
  } else if (speaker.facebook) {
    return 'https://avatars.io/facebook/' + speaker.facebook + '/large';
  } else if (speaker.twitter) {
    return 'https://avatars.io/twitter/' + speaker.twitter.replace(/^@/, '') + '/medium';
  } else {
    return require('javascripts/components/SpeakerList/default.png');
  }
}

export default avatar;
