import React, { useEffect, useState } from 'react';
import { Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import CommonContainer from '../containers/Common';
import TrackerContainer from '../containers/Tracker';
import DateTimeLabel from '../components/Labels/DateTimeLabel'
import SleepButton from '../components/Inputs/SleepButton';
import MealLabel from '../components/Labels/MealLabel';
import MealIconButton from '../components/Inputs/MealIconButton'
import TimelineIcon from '@material-ui/icons/Timeline';
import { Stage, Graphics, Text } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';

interface Props {
    handleComponentChanges: (componentId: number) => void,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
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
        historyButton: {
            top: "-22px",
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
        table: {
            minWidth: 300,
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
        // <MealIconButton key={2} top={35} left={165} />,
    ];

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            // await trackerContainer.getTrackerRecord(now);
            setIsLoading(false)
        })()
    }, []);

    const [dateTime, setDateTime] = useState<Date>(new Date());

    useEffect(() => {
        const id = setInterval(() => {
            setDateTime(() => new Date());
        }, 60000);
        return () => clearInterval(id);
    }, []);

    const createGradient = (from: string, to: string, width: number, height: number) => {
        const c: HTMLCanvasElement = document.createElement("canvas");
        c.width = width
        c.height = height
        const ctx = c.getContext("2d");
        if (ctx) {
            const grd = ctx && ctx.createLinearGradient(0, 0, width, height);
            grd.addColorStop(0, from);
            grd.addColorStop(1, to);
            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, width, height);
        }

        return PIXI.Texture.from(c) as any;
    }

    const gradient = createGradient('#acb6e5', '#86fde8', 300, 300)

    const getMealTypeName = (meanType: number) => {
        let mealTypeName = '';
        switch (meanType) {
            case 0:
                mealTypeName = commonContainer.t('Breakfast');
                break;
            case 1:
                mealTypeName = commonContainer.t('Lunch');
                break;
            case 2:
                mealTypeName = commonContainer.t('Snack');
                break;
            case 3:
                mealTypeName = commonContainer.t('Dinner');
                break;
            case 4:
                mealTypeName = commonContainer.t('Drink');
                break;
            default:
                break;
        }
        return mealTypeName;
    }

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
                    {/* <Stage width={300} height={300} options={{ transparent: true }}>
                        <Graphics
                            draw={g => {
                                g.lineStyle(35, 0xFFC421, 1, 1)
                                g.beginFill(0xffffff, 1)
                                g.beginTextureFill(gradient);
                                g.drawCircle(150, 150, 110)
                                g.endFill()
                            }}
                        />
                        <Text x={120} y={120} style={{ color: '#5998AB' }} text={dateTime.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', hour12: false })} />
                        <Text x={80} y={150} style={{ color: '#5998AB' }} text={dateTime.toLocaleDateString('ja-JP', { year: "numeric", month: "long", day: "numeric" })} />
                    </Stage> */}
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>RecordDateTime</TableCell>
                                    <TableCell align="right">MealType</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {trackerContainer.meals.map((meal, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">{new Date(meal.recordDateTime).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', hour12: false })}</TableCell>
                                        <TableCell align="right">{getMealTypeName(meal.mealType)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid key={2} item>
                    <Grid container justify="center" direction="row" alignItems="center" spacing={2}>
                        <Grid key={0} item>
                            <SleepButton label={'Wake up Time'} data={trackerContainer.wakeUpTime} handleComponentChanges={props.handleComponentChanges} recordType={0} />
                        </Grid>
                        <Grid key={1} item>
                            <Grid container justify="center" direction="column" alignItems="center" spacing={3}>
                                <Grid key={0} item>
                                    <IconButton
                                        aria-label={'History'}
                                        className={classes.historyButton}
                                        onClick={() => props.handleComponentChanges(3)}
                                    >
                                        <div>
                                            <TimelineIcon fontSize="large" style={{ color: '#5998AB' }} />
                                            <Typography style={{ fontSize: '0.6em', color: '#5998AB' }} variant="body1" component={'p'}>
                                                {commonContainer.t('History')}
                                            </Typography>
                                        </div>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid key={2} item>
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
