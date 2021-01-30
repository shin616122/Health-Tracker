import React, { useEffect, useState } from 'react';
import { Grid, Typography } from "@material-ui/core";

export default (() => {
    const [dateTime, setDateTime] = useState<Date>(new Date());

    useEffect(() => {
        const id = setInterval(() => {
            setDateTime(() => new Date());
        }, 60000);
        return () => clearInterval(id);
    }, []);

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Typography variant="h3" component={'h1'} style={{ color: '#5998AB' }} gutterBottom>
                {dateTime.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', hour12: false })}
            </Typography>
            <Typography variant="h6" component={'h1'} style={{ color: '#5998AB' }}>
                {dateTime.toLocaleDateString('ja-JP', { year: "numeric", month: "long", day: "numeric" })}
            </Typography>
        </Grid>
    )
}) as React.FC;
