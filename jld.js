var jsonfile = require('jsonfile');
var htmlToText = require('html-to-text');

var fs = require('fs');
var md5 = require('md5');

var USEDROOM = {};
const ROOM = {
  "Rall": {
    "@type": "Place",
    "@id": "#Rall",
    "name": "所有會議廳 All Conference Room",
    "address": "台北市南港區研究院路二段128號3F / 3F No.128, Sec. 2, Academia Rd., Nangang Dist., Taipei City 115, Taiwan",
    "url": "http://hssb.committee.sinica.edu.tw/"
  },
  "R0": {
    "@type": "Place",
    "@id": "#R0",
    "name": "國際會議廳 International Conference Hall",
    "address": "台北市南港區研究院路二段128號4F / 4F No.128, Sec. 2, Academia Rd., Nangang Dist., Taipei City 115, Taiwan",
    "url": "http://hssb.committee.sinica.edu.tw/room-1.html"
  },
  "R1": {
    "@type": "Place",
    "@id": "#R1",
    "name": "第1會議室 1st Conference Room",
    "address": "台北市南港區研究院路二段128號3F / 3F No.128, Sec. 2, Academia Rd., Nangang Dist., Taipei City 115, Taiwan",
    "url": "http://hssb.committee.sinica.edu.tw/room-2.html"
  },
  "R2": {
    "@type": "Place",
    "@id": "#R2",
    "name": "第2會議室 2nd Conference Room",
    "address": "台北市南港區研究院路二段128號3F / 3F No.128, Sec. 2, Academia Rd., Nangang Dist., Taipei City 115, Taiwan",
    "url": "http://hssb.committee.sinica.edu.tw/room-3.html"
  }
};

const offers = [
  {
    "@type": "Offer",
    "@id": "#offer-earlybird",
    "name": "Apply for International Early Bird's ticket",
    "category": "primary",
    "price": 0.0,
    "priceCurrency": "TWD",
    "availability": "InStock",
    "url": "http://g0v-summit2016.kktix.cc/events/early-bird",
    "validFrom": "2016-02-15T20:00:00.000+08:00",
    "validThrough": "2016-03-20T23:59:00.000+08:00"
  },
  {
    "@type": "Offer",
    "@id": "#offer-regular",
    "name": "Attendee (一般票)",
    "category": "primary",
    "price": 1200.0,
    "priceCurrency": "TWD",
    "availability": "InStock",
    "url": "http://g0v-summit2016.kktix.cc/events/conference",
    "validFrom": "2016-04-01T20:00:00.000+08:00",
    "validThrough": "2016-04-15T23:59:00.000+08:00"
  },
  {
    "@type": "Offer",
    "@id": "#offer-regular-donate",
    "name": "Attendee (一般票) + NT$500 donate OCF",
    "category": "primary",
    "price": 1700.0,
    "priceCurrency": "TWD",
    "availability": "InStock",
    "url": "http://g0v-summit2016.kktix.cc/events/conference",
    "validFrom": "2016-04-01T20:00:00.000+08:00",
    "validThrough": "2016-04-15T23:59:00.000+08:00"
  },
  {
    "@type": "Offer",
    "@id": "#offer-regular-invite",
    "name": "Attendee with invite code (一般邀請票)",
    "category": "premium",
    "price": 1200.0,
    "priceCurrency": "TWD",
    "availability": "InStock",
    "url": "http://g0v-summit2016.kktix.cc/events/conference",
    "validFrom": "2016-04-01T20:00:00.000+08:00",
    "validThrough": "2016-04-15T23:59:00.000+08:00"
  },
  {
    "@type": "Offer",
    "@id": "#offer-vip",
    "name": "Attendee with VIP invite code (VIP 票)",
    "category": "premium",
    "price": 800.0,
    "priceCurrency": "TWD",
    "availability": "InStock",
    "url": "http://g0v-summit2016.kktix.cc/events/conference",
    "validFrom": "2016-02-29T20:00:00.000+08:00",
    "validThrough": "2016-03-30T23:59:00.000+08:00"
  },
  {
    "@type": "Offer",
    "@id": "#offer-vip-donate",
    "name": "Attendee with VIP invite code (VIP 票) + NT$500 donate OCF",
    "category": "premium",
    "price": 1300.0,
    "priceCurrency": "TWD",
    "availability": "InStock",
    "url": "http://g0v-summit2016.kktix.cc/events/conference",
    "validFrom": "2016-02-29T20:00:00.000+08:00",
    "validThrough": "2016-03-30T23:59:00.000+08:00"
  },
  {
    "@type": "Offer",
    "@id": "#offer-reserved",
    "name": "Attendee with reserved invite code (保留票)",
    "category": "premium",
    "price": 0.0,
    "priceCurrency": "TWD",
    "availability": "InStock",
    "url": "http://g0v-summit2016.kktix.cc/events/conference",
    "validFrom": "2016-02-15T20:00:00.000+08:00",
    "validThrough": "2016-05-13T23:59:00.000+08:00"
  }
];

var Base = function () {
  var base = {
    "@context": "http://schema.org",
    "@type": "Event",
    "@id": "g0v-summit-2016",
    "name": "g0v Summit 2016 Conference",
    "url": "http://summit.g0v.tw/2016/",
    "startDate": "2016-05-14T09:00:00.000+08:00",
    "endDate": "2016-05-15T17:40:00.000+08:00",
    "location": {
      "@type": "EventVenue",
      "name": "中研院人文社會科學館 / Social Sciences Building, Academia Sinica, Taipei, Taiwan",
      "address": "台北市南港區研究院路二段128號 / No.128, Sec. 2, Academia Rd., Nangang Dist., Taipei City 115, Taiwan",
      "url": "http://hssb.committee.sinica.edu.tw/"
    }
  };
  var about_data = jsonfile.readFileSync('./app/jsons/about.json');
  base.description = `${about_data["zh-TW"].sections[0].description.join(' ')} / ${about_data["en-US"].sections[0].description.join(' ')}`;
  return base;
};

var talk = function (name, description, performers, start, end, location) {
  var obj = {
    "@type": "Event",
    location: location,
    "startDate": start,
    "endDate": end,
    "offers": offers_ref
  };

  if (name) {
    obj.name = name;
  }
  if (description) {
    obj.description = description;
  }
  if (performers) {
    if (performers.length > 1) {
      obj.performers = performers;
    } else {
      obj.performer = performers;
    }
  }

  return obj;
};

var person = function (name) {
  return {
    "@type": "Person",
    "name": name
  };
};

var datetime = function (day, hhmm) {
  if (day === 1) {
    return `2016-05-14T${hhmm}:00.000+08:00`;
  } else {
    return `2016-05-15T${hhmm}:00.000+08:00`;
  }
};

var location_by_room = function (room) {
  if (!room) {
    room = 'Rall';
  }
  if (USEDROOM[room]) {
    return {
      "@id": ROOM[room]['@id']
    };
  } else {
    USEDROOM[room] = true;
    return ROOM[room];
  }
};

var html2text = function (html) {
  return htmlToText.fromString(html, {wordwrap: null}).replace(/\n/g, ' ');
};

var offers_ref = offers.map(function (offer) {
  return {
    "@id": offer["@id"]
  };
});

var basic = JSON.stringify(function () {
  var base = Base();
  base.offers = offers;

  return base;
}());


var schedule = JSON.stringify(function () {
  var base = Base();
  base.subEvents = [];

  var schedule_data = jsonfile.readFileSync('./app/javascripts/components/Schedule/schedules.json');

  var day1 = schedule_data["en-US"]["day1"];
  var day2 = schedule_data["en-US"]["day2"];

  var slot, event;
  var day, start, end, temp;

  var performers;

  var days = [[], day1, day2];

  for (day in days) {
    for (slot of days[day]) {
      if (!slot.events) {
        slot.events = [slot.event];
      }
      temp = slot.time.split('-');
      start = temp[0];
      end = temp[1];

      for (event of slot.events) {
        performers = null;
        if (event.title && event.title !== 'TBA') {
          if (event.speaker) {
            performers = event.speaker.split(/[,&]/).map(function (name) {
              return person(name.trim());
            });
          }

          base.subEvents.push(talk(event.title, html2text(event.abstract), performers, datetime(day, start), datetime(day, end), location_by_room(event.venue)));
        }
      }
    }
  }

  return base;
}());

var hash_file = function (file) {
  return md5(fs.readFileSync(file));
};

var sponsors = JSON.stringify(function () {
  var base = [Base()];
  var sponsors_data = jsonfile.readFileSync('./app/jsons/sponsors.json')['en-US'];

  for (let cat of sponsors_data) {
    for (let sponsor of cat.sponsors) {
      var agent = {
        "@type": "Organization",
        "name": sponsor.name
      };

      if (sponsor.url) {
        agent.url = sponsor.url;
      }
      if (sponsor.desc) {
        agent.description = sponsor.desc;
      }
      if (sponsor.logo) {
        agent.logo = `http://summit.g0v.tw/2016/${hash_file(`./app/images/sponsors/${sponsor.logo}`)}.png`;
      }
      base.push({
        "@context": "http://schema.org",
        "@type": "JoinAction",
        "agent": agent,
        "object": {
          "@id": "g0v-summit-2016",
        }
      });
    }
  }

  return base;
}());


export {basic, schedule, sponsors}
