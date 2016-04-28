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
    <Route>
      <Route path="/2016/live" component={Live} />
      <Route path="/2016" component={Root}>
         { /* Home (main) route */ }
         <IndexRoute component={Home}/>
         <Redirect from=":page.html" to=":page" /> {/* Only works after prerendering */}
         <Route path="speakers" component={Speakers} />
         <Route path="schedules" component={Schedules} />
         <Route path="sponsors" component={Sponsors} />
         <Route path="transport" component={Transport} />
         <Route path="unconf" component={Unconf} />
         <Route path="staff" component={Staff} />
         <Route path="travel" component={Travel}/>
         {/*<Route path="*" component={NotFound} status={404} />*/}
       </Route>
     </Route>
  );
}
