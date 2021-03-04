import React, { useState } from 'react';
import TrackerMain from '../console/TrackerMain';
import History from '../console/History'
import SleepRecord from '../components/Inputs/SleepRecord'
import MealRecord from '../components/Inputs/MealRecord'
import TrackerContainer from '../containers/Tracker'
import HistoryContainer from '../containers/History'


export default (() => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [componentId, setComponentId] = useState<number>(-1);
    const trackerContainer = TrackerContainer.useContainer();
    const historyContainer = HistoryContainer.useContainer();

    const handleComponentChanges = (componentId: number) => {
        setComponentId(componentId);
    }

    let jsxElement: JSX.Element = <TrackerMain handleComponentChanges={handleComponentChanges} />


    switch (componentId) {
        case 0:
            jsxElement = <SleepRecord label={'Wake up Time'} recordType={0} handleComponentChanges={handleComponentChanges} sleepTime={trackerContainer.wakeUpTime} />
            break;
        case 1:
            jsxElement = <SleepRecord label={'Bed Time'} recordType={1} handleComponentChanges={handleComponentChanges} sleepTime={trackerContainer.bedTime} />
            break;
        case 2:
            jsxElement = <MealRecord handleComponentChanges={handleComponentChanges} />
            break;
        case 3:
            jsxElement = <History lastWeekSleepTimes={historyContainer.lastWeekSleepTimes} lastWeekMealTimes={historyContainer.lastWeekMealTimes} handleComponentChanges={handleComponentChanges} />
            break;
        default:
            jsxElement = <TrackerMain handleComponentChanges={handleComponentChanges} />
            break;
    }

    return (
        jsxElement
    )
}) as React.FC;
