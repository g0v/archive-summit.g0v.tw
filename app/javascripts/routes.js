import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';
import { Root } from 'javascripts/components';
import {
  Home,
  Speakers,
  Schedules,
  Sponsors,
  Transport,
  Unconf,
  Live,
  Staff,
  Travel,
} from 'javascripts/pages';

function scrollToTop() {
  window.scrollTo(0,0);
}
export default () => {
  return (
    <Route path="/2016" component={Root}>
      <IndexRoute component={Home} onEnter={scrollToTop} />
      <Route path="live" component={Live} onEnter={scrollToTop} />
      <Redirect from="/2016/:page.html" to=":page" /> {/* Only works after prerendering */}
      <Route path="schedules" component={Schedules} onEnter={scrollToTop}/>
      <Route path="speakers" component={Speakers} onEnter={scrollToTop} />
      <Route path="sponsors" component={Sponsors} onEnter={scrollToTop} />
      <Route path="staff" component={Staff} onEnter={scrollToTop} />
      <Route path="transport" component={Transport} onEnter={scrollToTop} />
      <Route path="travel" component={Travel} onEnter={scrollToTop} />
      <Route path="unconf" component={Unconf} onEnter={scrollToTop} />
    </Route>
  );
}
