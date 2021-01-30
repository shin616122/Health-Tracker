import { Card, CardActionArea, CardContent, CardMedia, Grid, IconButton, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CommonContainer from '../containers/Common';
import RefreshIcon from '@material-ui/icons/Refresh';

const useStyles = makeStyles({
    root: {
        paddingTop: 20
    },
    card: {
        maxWidth: 300,
    },
});

export default (() => {
    const classes = useStyles();
    const commonContainer = CommonContainer.useContainer();

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
                                        {commonContainer.user && `${commonContainer.user.chumaPoint} ${commonContainer.t('Chuma Points!')}`}
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
                    </Card>
                </Grid>
            </Grid >
        </div>
    )
}) as React.FC;
