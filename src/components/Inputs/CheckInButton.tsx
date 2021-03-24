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
            width: 280
        },
    })
);

export default ((props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [sending, setSending] = useState(false);
    const commonContainer = CommonContainer.useContainer();
    const trackerContainer = TrackerContainer.useContainer();

    const classes = useStyles();

    const handleCheckIn = async () => {
        setSending(true);
        await trackerContainer.addPoints(1).finally(() => setSending(false));
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
    )
}) as React.FC<Props>;
