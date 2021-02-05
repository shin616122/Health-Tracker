import React, { useEffect, useState } from 'react';
import { Grid, IconButton, Typography } from "@material-ui/core";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import CommonContainer from '../containers/Common';
import TrackerContainer from '../containers/Tracker';
import DateTimeLabel from '../components/Labels/DateTimeLabel'
import SleepButton from '../components/Inputs/SleepButton';
import MealLabel from '../components/Labels/MealLabel';
import MealIconButton from '../components/Inputs/MealIconButton'

interface Props {
    handleComponentChanges: (componentId: number) => void,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // height: '80vh',
            // display: 'flex',
            // justify: 'flex-start',
            // alignItems: 'center',
            background: "linear-gradient(180deg, #80BED1 10%, #BCE8E1  70%)"
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
        donut: {
            position: "relative",
            width: "300px",
            height: "300px"
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
            width: "230px",
            height: "230px",
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
            width: 280,
            padding: '0 30px',
            "&:hover": {
                backgroundColor: "#FFF"
            }
        },
    })
);

export default ((props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [now, setNow] = useState<Date>(new Date());
    const commonContainer = CommonContainer.useContainer();
    const trackerContainer = TrackerContainer.useContainer();

    const classes = useStyles();
    const left = "-35px";
    const top = "-185px";

    let mealIcons = [
        <MealIconButton key={0} top={-165} left={-35} />,
        <MealIconButton key={1} top={-35} left={-165} />,
        <MealIconButton key={2} top={35} left={165} />,
    ];

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            await trackerContainer.getTrackerRecord(now);
            setIsLoading(false)
        })()
    }, []);

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
                        {mealIcons}
                        <div className={classes.donutDefault}></div>
                        <div className={classes.donutLine}></div>
                        <div className={classes.donutText}>
                            <DateTimeLabel />
                        </div>
                        <div className={classes.donutCase}></div>
                    </div>
                </Grid>
                <Grid key={2} item>
                    <Grid container justify="center" direction="row" alignItems="center" spacing={10}>
                        <Grid key={0} item>
                            <SleepButton label={'Wake up Time'} data={trackerContainer.wakeUpTime} handleComponentChanges={props.handleComponentChanges} recordType={0} />
                        </Grid>
                        <Grid key={1} item>
                            <SleepButton label={'Bed Time'} data={trackerContainer.bedTime} handleComponentChanges={props.handleComponentChanges} recordType={1} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid key={3} item>
                    <IconButton
                        aria-label="addMeal"
                        className={classes.mealButton}
                        onClick={() => props.handleComponentChanges(2)}
                    >
                        <RestaurantIcon className={classes.mealIconButton} />
                        <Typography style={{ color: '#000' }} variant="h6" component={'h1'}>
                            {commonContainer.t('Record Meal')}
                        </Typography>
                    </IconButton>
                </Grid>
                <Grid key={4} item style={{ marginBottom: '40px' }}>
                    <Grid container justify="center" direction="row" alignItems="center" spacing={0}>
                        <Grid key={0} item>
                            <MealLabel label={'First Meal'} meals={trackerContainer.meals} index={0} />
                        </Grid>
                        <Grid key={1} item>
                            <MealLabel label={'Recent Meal'} meals={trackerContainer.meals} index={trackerContainer.meals.length - 1} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid >
    )
}) as React.FC<Props>;
