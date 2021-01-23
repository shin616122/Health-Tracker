import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import CommonContainer from '../containers/Common';

const Root = ((props: any) => {
    const commonContainer = CommonContainer.useContainer();

    return (
        <div style={{ background: "red", height: "100vh" }}>
            <Container>
                <Grid container>
                    <Grid item md={4}></Grid>
                    <img src='https://stat.ameba.jp/user_images/20170206/07/shirokuma244/96/99/j/o1600096913862247139.jpg?caw=800' alt='工事中' />
                    <Grid item md={4}>
                        <Typography>{commonContainer.t('Welcome！Chuma App!')}</Typography>
                    </Grid>
                    <Grid item md={4}></Grid>
                </Grid>
            </Container>
        </div>
    );
}) as React.FC;

export default (() => {
    return (
        <Root />
    )
}) as React.FC;