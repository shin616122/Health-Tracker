import React from 'react';
import { CardMedia, Container, Grid, Typography } from '@material-ui/core';
import CommonContainer from '../containers/Common';

export default (() => {
    const commonContainer = CommonContainer.useContainer();

    return (
        <Grid container>
            <Grid item md={4}></Grid>
            <CardMedia
                component="img"
                alt="工事中"
                height="240"
                width="345"
                image="https://stat.ameba.jp/user_images/20170206/07/shirokuma244/96/99/j/o1600096913862247139.jpg?caw=800"
                title="工事中"
            />
            <Grid item md={4}>
                <Typography component={'h2'} style={{ color: 'white' }}>
                    {commonContainer.t('Welcome！Chuma App!')}
                </Typography>
            </Grid>
            <Grid item md={4}></Grid>
        </Grid>
    )
}) as React.FC;