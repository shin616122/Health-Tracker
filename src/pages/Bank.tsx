import React, { useEffect, useState } from 'react';

const Root = (() => {

    const now = new Date();
    const utc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

    const [selectedDate, setSelectedDate] = React.useState<Date>(new Date(utc));
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
        <>Chuma Bank</>
    )
}) as React.FC;

export default (() => {
    return (
        <div style={{ background: "blue", height: "100vh" }}>
            <Root />
        </div>
    )
}) as React.FC;
