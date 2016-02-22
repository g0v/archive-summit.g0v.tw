import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { Root } from 'javascripts/components';
import { Home, Speakers } from 'javascripts/pages';

export default () => {
  return (
    <Route path="/" component={Root}>
       { /* Home (main) route */ }
       <IndexRoute component={Home}/>
       <Route path="speakers" component={Speakers} />
       { /* Catch all route */ }
       {/*<Route path="*" component={NotFound} status={404} />*/}
     </Route>
  );
}
