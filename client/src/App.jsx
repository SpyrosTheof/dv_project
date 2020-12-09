import './App.css';
import Login from './components/auth/login';
import Aux from './hoc/auxiliary';
import { BrowserRouter, Route, Link } from 'react-router-dom';

function App() {
  const isAuth = localStorage.getItem('user') ? true : false;
  let routes;

  if (isAuth) {
    routes = (
      <Aux>
        <Route path='/' component={Layout} />
        <Redirect to='/' />
      </Aux>
    );
  } else {
    routes = (
      <Aux>
        <Route path='/login' component={Login} />
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
