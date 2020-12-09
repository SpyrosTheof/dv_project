import React from 'react';
import Aux from '../../hoc/auxiliary';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import MUInavbar from '../navbar/MUInavbar';
import Articles from '../articles/articles';

export default function layout() {
  return (
    <Aux>
      <MUInavbar />
      {/* <Switch>
    <Route path="/articles/:id" component={Article} />
    <Route  path="/categories" component={Categories} />
   
  </Switch> */}

      <Route path='/' component={Articles} />
    </Aux>
  );
}
