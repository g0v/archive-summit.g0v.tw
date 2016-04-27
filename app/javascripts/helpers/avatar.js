'use strict';

export function avatar(speaker) {
  if (speaker.avatar) {
    return speaker.avatar.match(/^\.\//) ? require(`javascripts/components/SpeakerList/${speaker.avatar.replace(/^\.\//, "")}`) : speaker.avatar;
  } else if (speaker.facebook) {
    return 'https://avatars.io/facebook/' + speaker.facebook + '/large';
  } else if (speaker.twitter) {
    return 'https://twitter.com/' + speaker.twitter.replace(/^@/, '') + '/profile_image?size=original';
  } else {
    return require('javascripts/components/SpeakerList/default.png');
  }
}

export default avatar;
