import React, { useState } from 'react';
import { Card, CardActionArea, Button, CardActions, CardMedia, Typography, Grid } from "@material-ui/core";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import CommonContainer from '../../containers/Common';
import TrackerContainer from '../../containers/Tracker';
import homebear from '../../images/homebear.jpg'

interface Props {
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
        root: {
            // maxWidth: 345,
            width: 200
        },
    })
);

export default ((props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const commonContainer = CommonContainer.useContainer();
    const trackerContainer = TrackerContainer.useContainer();

    const classes = useStyles();

    const handleCheckIn = async () => {
        await trackerContainer.addPoints(1);
    }

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Check In Polar Bear"
                    height="240"
                    image={homebear}
                    title="Check In Polar Bear"
                />
            </CardActionArea>
            <Typography style={{ color: '#000' }} variant="h6" component={'h1'}>
                {trackerContainer.isCheckedIn ? commonContainer.t('AlreadyCheckedIn') : ''}
            </Typography>
            <CardActions>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={trackerContainer.isCheckedIn}
                    className={classes.submit}
                    onClick={handleCheckIn}
                >
                    {commonContainer.t('CheckIn')}
                </Button>
            </CardActions>
        </Card>
    )
}) as React.FC<Props>;
