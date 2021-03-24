import { Tabs, Tab, AppBar, Box, Typography, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CommonContainer from '../containers/Common';
import TrackerContainer from '../containers/Tracker';
import HistoryContainer from '../containers/History';
import MealTable from '../components/Labels/MealTable';
import MealChart from '../components/Labels/MealChart';
import SleepChart from '../components/Labels/SleepChart';
import { LastWeekMealTimeModel, LastWeekSleepTimeModel } from '../Models/Models';
import MealMain from '../console/MealMain';

interface Props {
    lastWeekSleepTimes: LastWeekSleepTimeModel[],
    lastWeekMealTimes: LastWeekMealTimeModel[],
    handleComponentChanges: (componentId: number) => void,
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{ background: 'white' }}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
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
}));

function addDays(days: number) {
    var result = new Date();
    result.setDate(result.getDate() + days);
    return result;
}

export default (() => {
    const classes = useStyles();
    const commonContainer = CommonContainer.useContainer();
    const trackerContainer = TrackerContainer.useContainer();
    const historyContainer = HistoryContainer.useContainer();
    const [value, setValue] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dayOffset, setDayOffset] = useState<number>(0);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            await trackerContainer.getTrackerRecord(addDays(dayOffset));
            setIsLoading(false)
        })()
    }, [dayOffset])

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleDayOffset = (newValue: number) => {
        setDayOffset(dayOffset + newValue);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                    style={{ backgroundColor: 'white', color: '#000' }}
                    variant="fullWidth"
                    centered>
                    <Tab label="食事記録" {...a11yProps(0)} />
                    <Tab label="生活リズム" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <MealMain handleDayOffset={handleDayOffset} selectedDay={addDays(dayOffset)} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid item xs={12} className={classes.graph}>
                    <Grid container justify="center" direction="column" alignItems="center" spacing={2}>
                        <Grid key={0} item>
                            <Typography variant="h6" component={'h1'} style={{ paddingTop: '10px', color: 'blue' }}>
                                {commonContainer.t('History')}生活リズム(仮)
                            </Typography>
                        </Grid>
                        <Grid key={1} item>
                            <SleepChart lastWeekSleepTimes={historyContainer.lastWeekSleepTimes} />
                        </Grid>
                        <Grid key={2} item>
                            <MealChart lastWeekMealTimes={historyContainer.lastWeekMealTimes} />
                        </Grid>
                    </Grid>
                </Grid >
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
        </div>
    )
}) as React.FC<Props>;
