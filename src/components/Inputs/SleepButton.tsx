import React, { useEffect, useState } from 'react';
import { Grid, Typography, IconButton } from "@material-ui/core";
import LocalHotelIcon from '@material-ui/icons/LocalHotel';
import CommonContainer from '../../containers/Common';
import TrackerContainer from '../../containers/Tracker';
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

interface Props {
    isLoading: boolean,
    now: Date
}

interface SleepRecordModel {
    recordDateTime: Date;
    recordType: number;
    // createdDate: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bedTimeButton: {
            left: "40px",
            width: "90px",
            height: "90px",
            display: "flex",
            cursor: "pointer",
            color: "#FF8400",
            backgroundColor: "#FFF",
            "&:hover": {
                backgroundColor: "#FFF"
            }
        },
        wakeUpButton: {
            left: '-40px',
            width: "90px",
            height: "90px",
            display: "flex",
            cursor: "pointer",
            color: "#FF8400",
            backgroundColor: "#FFF",
            "&:hover": {
                backgroundColor: "#FFF"
            }
        },
    })
);

export default ((props) => {
    const commonContainer = CommonContainer.useContainer();
    const trackerContainer = TrackerContainer.useContainer();
    const classes = useStyles();

    const option = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };

    const handleSleepTime = async (recordType: number) => {
        let data = {
            'recordDateTime': props.now,
            'recordType': recordType,
            // 'alcohol': false,
            // 'foodRecords': [],
            // 'createdDate': now.toISOString().substr(0, 10),
        };
        await trackerContainer.createSleepRecord(data as SleepRecordModel);
        await trackerContainer.getTrackerRecord(props.now);
    }

    return (
        <Grid container justify="space-between" direction="row" alignItems="center" spacing={10}>
            <Grid key={0} item>
                <IconButton
                    aria-label="wake"
                    className={classes.wakeUpButton}
                    onClick={() => { handleSleepTime(1) }}
                >
                    <div>
                        <LocalHotelIcon fontSize="large" style={{ color: '#5998AB' }} />
                        <Typography style={{ fontSize: '0.6em', color: '#5998AB' }} variant="body1" component={'p'}>
                            {commonContainer.t('Wake up Time')}
                        </Typography>
                    </div>
                </IconButton>
                <Typography style={{ fontSize: '0.6em', color: '#5998AB' }} variant="body1" component={'p'}>
                    {trackerContainer.wakeUpTime ? trackerContainer.wakeUpTime.toLocaleTimeString('ja-JP', option) : ''}
                </Typography>
            </Grid>
            <Grid key={1} item>
                <IconButton
                    aria-label="sleep"
                    className={classes.bedTimeButton}
                    onClick={() => { handleSleepTime(0) }}
                >
                    <div>
                        <LocalHotelIcon fontSize="large" style={{ color: '#5998AB' }} />
                        <Typography style={{ fontSize: '0.6em', color: '#5998AB' }} variant="body1" component={'p'}>
                            {commonContainer.t('Bed Time')}
                        </Typography>
                    </div>
                </IconButton>
                <Typography style={{ fontSize: '0.6em', color: '#5998AB' }} variant="body1" component={'p'}>
                    {trackerContainer.bedTime ? trackerContainer.bedTime.toLocaleTimeString('ja-JP', option) : ''}
                </Typography>
            </Grid>
        </Grid>
    )
}) as React.FC<Props>;
