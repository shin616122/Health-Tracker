import React from 'react';
import { Route, Switch } from 'react-router-dom';
import useReactRouter from 'use-react-router';
import Authorize from '../layout/Authorize';
import Home from './Home';
import Bank from './Bank';
import Tracker from './Tracker';
import Profile from './Profile'
import Layout from '../layout/Root';

export default (() => {

    const { match } = useReactRouter();

    return (
        <Authorize>
            <Layout />
            <Switch>
                <Route path={`${match.url}/home`} component={Home} />
                <Route path={`${match.url}/bank`} component={Bank} />
                <Route path={`${match.url}/tracker`} component={Tracker} />
                <Route path={`${match.url}/profile`} component={Profile} />
            </Switch>
        </Authorize>
    )
}) as React.FC;
