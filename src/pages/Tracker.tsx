import React, { useEffect, useState } from 'react';
import { Grid, IconButton, Typography } from "@material-ui/core";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import LocalHotelIcon from '@material-ui/icons/LocalHotel';
import CommonContainer from '../containers/Common';

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
        sleepButton: {
            // top: `calc(50% - 35px)`,
            // left: `calc(50% - 35px)`,
            width: "70px",
            height: "70px",
            display: "flex",
            cursor: "pointer",
            // zIndex: 4,
            color: "#FF8400",
            backgroundColor: "#FFC421",
            "&:hover": {
                backgroundColor: "#FFC421"
            }
        },
        wakebutton: {
            // top: `calc(50% - 35px)`,
            // left: `calc(50% - 35px)`,
            width: "70px",
            height: "70px",
            display: "flex",
            cursor: "pointer",
            // zIndex: 4,
            color: "#FF8400",
            backgroundColor: "#FFC421",
            "&:hover": {
                backgroundColor: "#FFC421"
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
        }
    })
);

const Root = (() => {

    const now = new Date();
    const utc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

    const [selectedDate, setSelectedDate] = React.useState<Date>(new Date(utc));
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const commonContainer = CommonContainer.useContainer();
    // const [today, setDate] = useState(new Date());

    const classes = useStyles();
    const left = "-35px";
    const top = "-185px";

    useEffect(() => {
        // const timer = setInterval(() => { // Creates an interval which will update the current data every minute
        //     // This will trigger a rerender every component that uses the useDate hook.
        //     setDate(new Date());
        // }, 60 * 1000);
        // return () => {
        //     clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
        // }
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
        <Grid item xs={12} className={classes.root}>
            <Grid container justify="center" direction="column" alignItems="center" spacing={2}>
                <Grid key={0} item>
                    <Typography variant="h6" component={'h2'} style={{ paddingTop: '10px', color: 'white' }}>
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
                            <Typography variant="h4" component={'h2'} style={{ color: '#5998ab' }}>
                                {now.toLocaleTimeString()}
                            </Typography>
                        </div>
                        <div className={classes.donutCase}></div>
                    </div>
                </Grid>
                <Grid key={2} item>
                    <Grid container justify="space-between" direction="row" alignItems="center" spacing={10}>
                        <Grid key={0} item>
                            <IconButton
                                aria-label="wake"
                                className={classes.sleepButton}
                            >
                                <LocalHotelIcon fontSize="large" />
                                Wake Time
                            </IconButton>
                        </Grid>
                        <Grid key={1} item>
                            <IconButton
                                aria-label="sleep"
                                className={classes.wakebutton}
                            >
                                <LocalHotelIcon fontSize="large" />
                                Sleep Time
                            </IconButton>
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
