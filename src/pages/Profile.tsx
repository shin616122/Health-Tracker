import { Avatar, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '80vh',
            display: 'flex',
            justify: 'center',
            alignItems: 'center',
        },
        avatar: {
            width: theme.spacing(20),
            height: theme.spacing(20),
        },
        button: {
            margin: theme.spacing(3, 0, 2),
            background: 'linear-gradient(55deg, #0989D9 10%, #63BDDB 70%)',
            borderRadius: 30,
            border: 0,
            color: 'white',
            height: 48,
            padding: '0 30px',
            boxShadow: '0 3px 5px 2px rgba(67, 120, 138, .3)',
        },
    }),
);

const handleChangeAvatar = () => {
    console.log('Changed avatar! Not really')
}

export default (() => {
    const classes = useStyles();

    return (
        <div style={{ background: "yellow", height: "100vh" }}>
            <Grid item xs={12} className={classes.root}>
                <Grid container justify="center" direction="column" alignItems="center" spacing={2}>
                    <Grid key={0} item>
                        <Typography variant="h6" noWrap>Chuma Profile</Typography>
                    </Grid>
                    <Grid key={1} item>
                        <Avatar className={classes.avatar} alt="Remy Sharp" src="https://images.assetsdelivery.com/compings_v2/cgdeaw/cgdeaw1904/cgdeaw190400286.jpg" />
                    </Grid>
                    <Grid key={2} item>
                        <Button
                            fullWidth
                            onClick={handleChangeAvatar}
                            style={{ marginTop: '0.5em', marginBottom: '0.5em' }}
                            className={classes.button}
                        >
                            Change Avatar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}) as React.FC;
