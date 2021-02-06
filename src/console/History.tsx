import React, { useEffect, useState } from 'react';
import { Button, Grid, IconButton, Typography } from "@material-ui/core";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import CommonContainer from '../containers/Common';
import TrackerContainer from '../containers/Tracker';
import SleepChart from '../components/Labels/SleepChart';
import { LastWeekSleepTimeModel } from '../Models/Models';

interface Props {
    lastWeekSleepTimes: LastWeekSleepTimeModel[],
    handleComponentChanges: (componentId: number) => void,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

        },
        submit: {
            margin: theme.spacing(3, 0, 2),
            background: 'linear-gradient(55deg, #0989D9 10%, #63BDDB 70%)',
            borderRadius: 30,
            border: 0,
            color: 'white',
            height: 48,
            padding: '0 30px',
            boxShadow: '0 3px 5px 2px rgba(67, 120, 138, .3)',
        },
    })
);

export default ((props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [now, setNow] = useState<Date>(new Date());
    const commonContainer = CommonContainer.useContainer();
    const trackerContainer = TrackerContainer.useContainer();
    const classes = useStyles();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            // await trackerContainer.getTrackerRecord(now);
            // await historyContainer.getLastWeekSleepTimes(now);
            setIsLoading(false)
        })()
    }, []);

    return (
        <Grid item xs={12} className={classes.root}>
            <Grid container justify="center" direction="column" alignItems="center" spacing={2}>
                <Grid key={0} item>
                    <Typography variant="h6" component={'h1'} style={{ paddingTop: '10px', color: 'blue' }}>
                        {commonContainer.t('History')}(仮)
                    </Typography>
                </Grid>
                <Grid key={1} item>
                    <SleepChart lastWeekSleepTimes={props.lastWeekSleepTimes} />
                </Grid>
                <Grid key={2} item>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => props.handleComponentChanges(-1)}
                        className={classes.submit}
                    >
                        {commonContainer.t('Back')}
                    </Button>
                </Grid>
            </Grid>
        </Grid >
    )
}) as React.FC<Props>;
