import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Grid, IconButton, Typography } from "@material-ui/core";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import CommonContainer from '../containers/Common';
import TrackerContainer from '../containers/Tracker';
import DateTimeLabel from '../components/Labels/DateTimeLabel'
import SleepButton from '../components/Inputs/SleepButton';

interface TrackerRecordModel {
    bedTime: string;
    wakeUpTime: string;
    alcohol: boolean;
    foodRecords: FoodRecordModel[];
    createdDate: string
}


interface FoodRecordModel {
    recordDate: string,
    mealType: number,
    images: string[],
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // height: '80vh',
            display: 'flex',
            justify: 'flex-start',
            alignItems: 'center',
        },
        icons: {
            position: "relative"
        },
        button: {
            position: "absolute",
            // top: `calc(50% - 35px)`,
            // left: `calc(50% - 35px)`,
            width: "70px",
            height: "70px",
            display: "flex",
            cursor: "pointer",
            zIndex: 4,
            color: "white",
            backgroundColor: "#FF8400",
            borderStyle: "solid",
            borderWidth: "0.2em",
            borderColor: "#FFC421",
            "&:hover": {
                backgroundColor: "#FF8400"
            }
        },
        mealIconButton: {
            position: "absolute",
            left: "5px",
            width: "35px",
            height: "35px",
            display: "flex",
            borderRadius: '50%',
            zIndex: 4,
            color: "white",
            fontSize: "10px",
            backgroundColor: "#FF8400",
            "&:hover": {
                backgroundColor: "#FF8400"
            }
        },
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
        donut: {
            position: "relative",
            width: "340px",
            height: "340px"
        },
        donutDefault: {
            width: "100%",
            height: "100%",
            borderRadius: "50%"
        },
        donutWhite: {
            width: "70%",
            height: "70%",
            borderRadius: "50%",
            background: "#FFF",
            top: "50%",
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2
        },
        donutLine: {
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "0",
            left: "0"
        },
        donutText: {
            top: "35px",
            left: "35px",
            width: "270px",
            height: "270px",
            background: "linear-gradient(180deg, #80BED1 10%, #BCE8E1 70%)",
            position: "absolute",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 3
        },
        donutCase: {
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "#FFC421",
            position: "absolute",
            top: "0",
            left: "0",
            backgroundClip: "border-box",
            overflow: "hidden"
        },
        mealButton: {
            margin: theme.spacing(3, 0, 2),
            background: '#fff',
            borderRadius: 30,
            border: 0,
            color: '#5998AB',
            height: 48,
            padding: '0 30px',
            // boxShadow: '0 3px 5px 2px rgba(67, 120, 138, .3)',
        },
        cardRoot: {
            // minWidth: 275,
            // width: '100%'
        },
        title: {
            fontSize: 14,
        },
    })
);

const Root = (() => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [now, setNow] = useState<Date>(new Date());
    const commonContainer = CommonContainer.useContainer();
    const trackerContainer = TrackerContainer.useContainer();

    const classes = useStyles();
    const left = "-35px";
    const top = "-185px";

    useEffect(() => {
        (async function fetchData() {
            setIsLoading(true);
            await trackerContainer.getTrackerRecord(now);
            setIsLoading(false)
        })()
    }, [now]);

    return (
        <Grid item xs={12} className={classes.root}>
            <Grid container justify="center" direction="column" alignItems="center" spacing={2}>
                <Grid key={0} item>
                    <Typography variant="h6" component={'h1'} style={{ paddingTop: '10px', color: 'white' }}>
                        {commonContainer.t('Chuma Tracker')}
                    </Typography>
                </Grid>
                <Grid key={1} item>
                    <div className={classes.donut}>
                        <IconButton
                            aria-label="food"
                            className={classes.button}
                            style={{ top: `calc(50% + ${top})`, left: `calc(50% + ${left})` }}
                        >
                            <RestaurantIcon fontSize="large" />
                        </IconButton>
                        <div className={classes.donutDefault}></div>
                        <div className={classes.donutLine}></div>
                        <div className={classes.donutText}>
                            <DateTimeLabel />
                        </div>
                        <div className={classes.donutCase}></div>
                    </div>
                </Grid>
                <Grid key={2} item>
                    <SleepButton now={now} isLoading={isLoading} />
                    <Grid key={3} item>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.mealButton}
                        >
                            <RestaurantIcon className={classes.mealIconButton} />
                            <Typography style={{ color: '#000' }} variant="h6" component={'h1'}>
                                {commonContainer.t('Record Meal')}
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
                <Grid key={3} item>
                    <Grid container justify="space-between" direction="row" alignItems="stretch" spacing={0}>
                        <Grid key={0} item>
                            <Card className={classes.cardRoot}>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary">
                                        {commonContainer.t('First Meal')}
                                    </Typography>
                                    <Typography color="textSecondary" gutterBottom>
                                        4:15
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid><Grid key={1} item>
                            <Card className={classes.cardRoot}>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary">
                                        {commonContainer.t('Recent Meal')}
                                    </Typography>
                                    <Typography color="textSecondary" gutterBottom>
                                        10:15
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}) as React.FC;

export default (() => {
    return (
        <div style={{ background: "linear-gradient(180deg, #80BED1 10%, #BCE8E1  70%)", height: "90vh" }}>
            <Root />
        </div>
    )
}) as React.FC;
