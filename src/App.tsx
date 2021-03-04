import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { auth } from './firebase/config';
import CommonContainer from './containers/Common';
import Index from './pages/Index';
import Login from './users/Login';
import Signup from './users/Signup';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <></>
    )
  } else {
    return (
      <Router>
        <CommonContainer.Provider>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            <Route path="/pages" component={Index} />
          </Switch>
        </CommonContainer.Provider>
      </Router>
    );
  }
}
export default App;
