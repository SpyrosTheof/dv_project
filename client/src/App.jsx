import './App.css';
import React, { useState } from 'react';
import Login from './components/auth/login';
import { Route, Redirect, Switch } from 'react-router-dom';
import Layout from './components/layout/layout';
import Aux from './hoc/auxiliary';

function App() {
  const isAuthCondition = localStorage.getItem('user') ? true : false;
  const [isAuth, setIsAuth] = useState(isAuthCondition);

  function setAuthorization(condition) {
    setIsAuth(condition);
  }
  let routes;

  if (isAuth) {
    routes = (
      <Aux>
        <Route path='/' render={(props) => <Layout {...props} />} />
        <Redirect to='/' />
      </Aux>
    );
  } else {
    routes = (
      <Aux>
        <Route
          path='/login'
          render={(props) => <Login {...props} setAuth={setAuthorization} />}
        />
        <Redirect to='/login' />
      </Aux>
    );
  }

  return (
    <div className='App'>
      <Aux>
        <Switch>{routes}</Switch>
      </Aux>
    </div>
  );
}

export default App;
