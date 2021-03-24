import React, { useState } from 'react';
import MedicineMain from '../console/MedicineMain';
import MedicineRecord from '../components/Inputs/MedicineRecord'

export default (() => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [componentId, setComponentId] = useState<number>(-1);

    const handleComponentChanges = (componentId: number) => {
        setComponentId(componentId);
    }

    let jsxElement: JSX.Element = <MedicineMain handleComponentChanges={handleComponentChanges} />

    switch (componentId) {
        case 0:
            jsxElement = <MedicineRecord handleComponentChanges={handleComponentChanges} />
            break;
        default:
            jsxElement = <MedicineMain handleComponentChanges={handleComponentChanges} />
            break;
    }

    return (
        jsxElement
    )
}) as React.FC;
