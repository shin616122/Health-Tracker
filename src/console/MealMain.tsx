import React, { useEffect, useState } from 'react';
import { Grid, IconButton, Paper, Table, TableBody, Button, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import CommonContainer from '../containers/Common';
import TrackerContainer from '../containers/Tracker';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import MealTable from '../components/Labels/MealTable';

interface Props {
    handleDayOffset: (newValue: number) => void,
    selectedDay: Date,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
        },
        arrow: {
            backgroundColor: '#FF8400',
            borderRadius: '20%',
            width: "40px",
            height: "40px",
            cursor: "pointer",
            color: "white",
            "&:hover": {
                backgroundColor: "#FF8400"
            }
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
        graph: {
            marginBottom: '100px',
        }
    })
);

function addDays(days: number) {
    var result = new Date();
    result.setDate(result.getDate() + days);
    return result;
}


export default ((props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [now, setNow] = useState<Date>(new Date());
    const commonContainer = CommonContainer.useContainer();
    const trackerContainer = TrackerContainer.useContainer();

    const classes = useStyles();

    return (
        <Grid container direction="column" justify="flex-start" alignItems="center">
            <Grid key={0} item>
                食事記録
            </Grid>
            <Grid key={1} item>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Grid key={0} item>
                        <IconButton
                            edge="start"
                            className={classes.arrow}
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => props.handleDayOffset(-1)}
                            disabled={isLoading}
                        >
                            <KeyboardArrowLeftIcon style={{ color: '#FFF' }} />
                        </IconButton>
                    </Grid>
                    <Grid key={1} item>
                        <Typography style={{ color: '#000', fontSize: '1em', marginRight: '50px', marginLeft: '50px' }}>
                            {`${props.selectedDay.toLocaleDateString('ja-JP', { year: "numeric", month: "long", day: "numeric" })}`}
                        </Typography>
                    </Grid>
                    <Grid key={2} item>
                        <IconButton
                            edge="start"
                            className={classes.arrow}
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => props.handleDayOffset(1)}
                            disabled={isLoading}
                        >
                            <KeyboardArrowRightIcon style={{ color: '#FFF' }} />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <Grid key={2} item>
                <MealTable />
            </Grid>
        </Grid>
    )
}) as React.FC<Props>;
