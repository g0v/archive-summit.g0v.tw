import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { Root } from 'javascripts/components';
import { Home, Speakers, Schedules } from 'javascripts/pages';

export default () => {
  return (
    <Route path="/2016" component={Root}>
       { /* Home (main) route */ }
       <IndexRoute component={Home}/>
       <Route path="speakers.html" component={Speakers} />
       <Route path="schedules.html" component={Schedules} />
       {/*<Route path="sponsors" component={Sponsors} />*/}
       {/*<Route path="*" component={NotFound} status={404} />*/}
     </Route>
  );
}
