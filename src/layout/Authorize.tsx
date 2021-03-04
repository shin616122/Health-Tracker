import React, { useEffect } from 'react';
import useReactRouter from 'use-react-router';
import firebase from 'firebase';
import CommonContainer from '../containers/Common';
import TrackerContainer from '../containers/Tracker';
import HistoryContainer from '../containers/History'

export default ((props) => {
    const { history } = useReactRouter();
    const commonContainer = CommonContainer.useContainer();
    const trackerContainer = TrackerContainer.useContainer();
    const historyContainer = HistoryContainer.useContainer();

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async user => {
            if (user) {
                await commonContainer.loadMe()
                await trackerContainer.getTrackerRecord(new Date());
                await historyContainer.getLastWeekSleepTimes(new Date());
                await historyContainer.getLastWeekMealTimes(new Date());
            } else {
                history.push('/login');
            }
        });
    }, []);

    return <>{props.children}</>
}) as React.FC;
