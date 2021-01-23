import React, { useEffect, useState } from 'react';
import CommonContainer from '../containers/Common';

const Root = (() => {

    const now = new Date();
    const utc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

    const [selectedDate, setSelectedDate] = React.useState<Date>(new Date(utc));
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const commonContainer = CommonContainer.useContainer();

    useEffect(() => {
        (handleReload)();
    }, [selectedDate]);

    const handleSelectedDateChange = (date: Date | null) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    const handleReload = async () => {
        setIsLoading(true);
        setIsLoading(false);
    }

    return (
        <>{commonContainer.t('Chuma Tracker')}</>
    )
}) as React.FC;

export default (() => {
    return (
        <div style={{ background: "green", height: "90vh" }}>
            <Root />
        </div>
    )
}) as React.FC;
