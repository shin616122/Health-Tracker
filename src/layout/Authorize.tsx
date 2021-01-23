import React, { useEffect, useState } from 'react';
import useReactRouter from 'use-react-router';
import firebase from 'firebase';
import CommonContainer from '../containers//Common';

export default ((props) => {
    const { history } = useReactRouter();
    const commonContainer = CommonContainer.useContainer();

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            user ? commonContainer.loadMe() : history.push('/login');
        });
    }, []);

    return <>{props.children}</>
}) as React.FC;
