import React, { useState } from 'react';
import TrackerMain from '../console/TrackerMain';
import SleepRecord from '../components/Inputs/SleepRecord'
import MealRecord from '../components/Inputs/MealRecord'

export default (() => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [componentId, setComponentId] = useState<number>(-1);

    const handleComponentChanges = (componentId: number) => {
        setComponentId(componentId);
    }

    let jsxElement: JSX.Element = <TrackerMain handleComponentChanges={handleComponentChanges} />


    switch (componentId) {
        case 0:
            jsxElement = <SleepRecord label={'Wake up Time'} recordType={0} handleComponentChanges={handleComponentChanges} />
            break;
        case 1:
            jsxElement = <SleepRecord label={'Bed Time'} recordType={1} handleComponentChanges={handleComponentChanges} />
            break;
        case 2:
            jsxElement = <MealRecord handleComponentChanges={handleComponentChanges} />
            break;
        default:
            jsxElement = <TrackerMain handleComponentChanges={handleComponentChanges} />
            break;
    }

    return (
        jsxElement
    )
}) as React.FC;
