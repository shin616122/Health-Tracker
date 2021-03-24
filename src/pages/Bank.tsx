import { Button, Card, CardActionArea, CardContent, CardMedia, CardActions, Grid, IconButton, Typography } from '@material-ui/core';
import React, { useState} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CommonContainer from '../containers/Common';
import TrackerContainer from '../containers/Tracker';
import RefreshIcon from '@material-ui/icons/Refresh';

const useStyles = makeStyles((theme: Theme) =>
createStyles({
    root: {
        paddingTop: 20,
        background: "linear-gradient(180deg, #80BED1 10%, #FFF  70%)"
    },
    card: {
        maxWidth: 300,
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
    }
    })
);

export default (() => {
    const [sending, setSending] = useState(false);
    const commonContainer = CommonContainer.useContainer();
    const trackerContainer = TrackerContainer.useContainer();

    const classes = useStyles();

    const handleCheckIn = async () => {
        setSending(true);
        await trackerContainer.addPoints(1).finally(() => setSending(false));
    }

    const handleRefresh = async () => {
        await commonContainer.loadMe();
    };

    return (
        <div className={classes.root}>
            <Grid container justify="center" direction="column" alignItems="center">
                <Grid key={0} item>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="240"
                                image="https://i.insider.com/5e4c67ade6b21701e2412474?width=1136&format=jpeg"
                                title="Contemplative Reptile"
                            />
                        </CardActionArea>
                        <CardContent>
                            <Grid container justify="center" alignItems="center">
                                <Typography variant="h5" component="h2">
                                    {commonContainer.user && `${commonContainer.user.fullName}${commonContainer.t('\'s Chuma Bank!')}`}
                                </Typography>
                            </Grid>
                            <Grid container justify="center" direction="row" alignItems="center" spacing={2}>
                                <Grid key={0} item>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {commonContainer.user && `${commonContainer.user.chumaPoints} ${commonContainer.t('Chuma Points!')}`}
                                    </Typography>
                                </Grid>
                                <Grid key={1} item>
                                    <IconButton
                                        edge="end"
                                        aria-label="refresh"
                                        aria-haspopup="true"
                                        onClick={handleRefresh}
                                        color="inherit"
                                    >
                                        <RefreshIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </CardContent>

                        <div>
                            <Typography style={{ color: '#000', fontSize: '1em', textAlign: 'center' }}>
                                毎日、日本時間9時にリセットします。
                            </Typography>
                            <Typography style={{ color: '#000', fontSize: '1em', textAlign: 'center' }}>
                                {trackerContainer.isCheckedIn ? commonContainer.t('AlreadyCheckedIn') : ''}
                                <Typography style={{ color: '#000', fontSize: '1em', textAlign: 'center' }}>
                                </Typography>
                                {trackerContainer.isCheckedIn ? trackerContainer.checkedInTime?.toLocaleString() : ''}
                            </Typography>
                        </div>
                        <CardActions>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={trackerContainer.isCheckedIn || sending}
                                className={classes.submit}
                                onClick={handleCheckIn}
                            >
                                {commonContainer.t('CheckIn')}
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid >
        </div>
    )
}) as React.FC;
