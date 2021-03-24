import React, { useState, useEffect } from "react";
import { Theme, createStyles, makeStyles } from '@material-ui/core';
import { Paper, Typography, Grid, CircularProgress } from '@material-ui/core';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import { format, getUnixTime, parse } from 'date-fns'
import CommonContainer from '../../containers/Common';
import { LastWeekMealTimeModel } from '../../Models/Models'

interface Props {
    lastWeekMealTimes: LastWeekMealTimeModel[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(1),
        },
        charts: {
            width: '100%',
            height: '300px',
        },
        card: {
            width: '100%',
            height: '300px',
        }
    }),
);

export default ((props) => {
    const commonContainer = CommonContainer.useContainer();
    const [loading, setLoading] = useState(true);

    const classes = useStyles(props);

    console.log(props.lastWeekMealTimes)

    const formatDate = (x: string) => {
        let formattedDate = '今日';
        let today = new Date().toLocaleDateString('sv-SE')
        if (x !== today && x !== 'auto') {
            formattedDate = format(new Date(x), 'd日');
        }
        return formattedDate;
    }

    if (!loading) {
        return (<div><CircularProgress />Loading...</div>)

    } else {
        return (
            <Grid container justify="center" direction="column" alignItems="center" spacing={1}>
                <Grid key={0} item>
                    <Typography component={'h4'}>
                        {commonContainer.t('Meal')}
                    </Typography>
                </Grid>
                <Grid key={1} item>
                    <LineChart
                        width={350}
                        height={300}
                        data={props.lastWeekMealTimes}
                        margin={{
                            top: 5, right: 3, left: 3, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="createdDate" tickFormatter={x => formatDate(x)} tick={{ fontSize: '.7rem' }} />
                        <YAxis domain={[0, 24]} ticks={[0, 3, 6, 9, 12, 15, 18, 21, 24]} unit="時" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="breakfastTime" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="lunchTime" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="dinnerTime" stroke="#6f32a8" />
                    </LineChart>
                </Grid>
            </Grid>
        );
    }
}) as React.FC<Props>;
