import React from 'react';
import { Grid, Typography, IconButton } from "@material-ui/core";
import LocalHotelIcon from '@material-ui/icons/LocalHotel';
import CommonContainer from '../../containers/Common';
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

interface Props {
    label: string,
    data: Date | undefined,
    handleComponentChanges: (componentId: number) => void,
    recordType: number,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            width: "90px",
            height: "90px",
            display: "flex",
            cursor: "pointer",
            color: "#FF8400",
            backgroundColor: "#FFF",
            "&:hover": {
                backgroundColor: "#FFF"
            }
        },
    })
);

export default ((props) => {
    const commonContainer = CommonContainer.useContainer();
    const classes = useStyles();

    const option = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };

    return (
        <Grid container justify="center" direction="column" alignItems="center" spacing={2}>
            <Grid key={0} item>
                <IconButton
                    aria-label={props.label}
                    className={classes.button}
                    onClick={() => props.handleComponentChanges(props.recordType)}
                >
                    <div>
                        <LocalHotelIcon fontSize="large" style={{ color: '#5998AB' }} />
                        <Typography style={{ fontSize: '0.6em', color: '#5998AB' }} variant="body1" component={'p'}>
                            {commonContainer.t(props.label)}
                        </Typography>
                    </div>
                </IconButton>
            </Grid>
            <Grid key={1} item>
                <Typography style={{ color: '#5998AB', fontSize: '1em' }} variant="h6" component={'h1'}>
                    {props.data ? props.data.toLocaleTimeString('ja-JP', option) : commonContainer.t('No Record')}
                </Typography>
            </Grid>
        </Grid>
    )
}) as React.FC<Props>;
