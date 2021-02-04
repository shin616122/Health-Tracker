import React from 'react';
import { CardMedia, Container, Grid, Typography } from '@material-ui/core';
import CommonContainer from '../containers/Common';
import CheckInButton from '../components/Inputs/CheckInButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        paddingTop: 20,
        background: "linear-gradient(180deg, #79bdb7 10%, #FFF  70%)"
    },
    card: {
        maxWidth: 300,
    },
});


export default (() => {
    const commonContainer = CommonContainer.useContainer();
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container justify="center" direction="column" alignItems="center" spacing={1}>
                <Grid key={0} item>
                    {/* <CardMedia
                        component="img"
                        alt="工事中"
                        height="240"
                        width="345"
                        image="https://stat.ameba.jp/user_images/20170206/07/shirokuma244/96/99/j/o1600096913862247139.jpg?caw=800"
                        title="工事中"
                    /> */}
                </Grid>
                <Grid key={1} item>
                    <Typography component={'h2'} style={{ color: 'white' }}>
                        {commonContainer.t('Welcome！Chuma App!')}
                    </Typography>
                </Grid>
                <Grid key={2} item>
                    <CheckInButton />
                </Grid>
            </Grid>
        </div>
    )
}) as React.FC;