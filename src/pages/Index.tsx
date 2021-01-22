import React from 'react';
import { Route, Switch } from 'react-router-dom';
import useReactRouter from 'use-react-router';
import Authorize from '../layout/Authorize';
import Home from './Home';
import Bank from './Bank';

import Layout from '../layout/Root';

export default (() => {

    const { match } = useReactRouter();

    return (
        <Authorize>
            <Layout />
            <Switch>
                <Route path={`${match.url}/home`} component={Home} />
                <Route path={`${match.url}/bank`} component={Bank} />
            </Switch>
        </Authorize>
    )
}) as React.FC;
