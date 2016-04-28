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

export default () => {
  return (
    <Route path="/2016" component={Root}>
      <IndexRoute component={Home}/>
      <Route path="live" component={Live} />
      <Redirect from="/2016/:page.html" to=":page" /> {/* Only works after prerendering */}
      <Route path="schedules" component={Schedules} />
      <Route path="speakers" component={Speakers} />
      <Route path="sponsors" component={Sponsors} />
      <Route path="staff" component={Staff} />
      <Route path="transport" component={Transport} />
      <Route path="travel" component={Travel}/>
      <Route path="unconf" component={Unconf} />
    </Route>
  );
}
