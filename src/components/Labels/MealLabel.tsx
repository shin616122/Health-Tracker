import React from 'react';
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import CommonContainer from '../../containers/Common';
import TrackerContainer from '../../containers/Tracker';

interface Props {

}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardRoot: {
            // minWidth: 275,
            // width: '100%'
        },
        title: {
            fontSize: 14,
        },
    })
);

export default ((props) => {
    const commonContainer = CommonContainer.useContainer();
    const trackerContainer = TrackerContainer.useContainer();
    const classes = useStyles();

    const convertDateTime = (dateTime: string) => {
        return new Date(dateTime).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', hour12: false });
    }

    return (
        <Grid container justify="space-between" direction="row" alignItems="stretch" spacing={0}>
            <Grid key={0} item>
                <Card className={classes.cardRoot}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary">
                            {commonContainer.t('First Meal')}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                            {trackerContainer.meals && trackerContainer.meals.length !== 0 ? `${convertDateTime(trackerContainer.meals[0].recordDateTime)}` : commonContainer.t('No Record')}
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
                            {trackerContainer.trackerRecord && trackerContainer.meals.length !== 0 ? `${convertDateTime(trackerContainer.meals[trackerContainer.meals.length - 1].recordDateTime)}` : commonContainer.t('No Record')}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}) as React.FC<Props>;
