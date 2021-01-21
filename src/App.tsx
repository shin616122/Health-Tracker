import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//screens
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App: React.FC = () => {

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
