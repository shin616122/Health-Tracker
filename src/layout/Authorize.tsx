import React, { useEffect, useState } from 'react';
import useReactRouter from 'use-react-router';
import firebase from 'firebase';

export default ((props) => {

    const [currentUser, setCurrentUser] = useState<null | object>(null);
    const { history } = useReactRouter();

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            user ? setCurrentUser(user) : history.push('/login');
        });
    }, [history]);

    return <>{props.children}</>
}) as React.FC;
