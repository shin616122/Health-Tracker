import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { firebase } from './firebase/config';

import Index from './pages/Index';
import Login from './users/Login';
import Signup from './users/Signup';

const App: React.FC = () => {

  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<object | undefined>(undefined);

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            alert(error);
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  if (loading) {
    return (
      <></>
    )
  } else {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' component={Login} />
          <Route path="/pages" component={Index} />
        </Switch>
      </Router>
    );
  }
}
export default App;
