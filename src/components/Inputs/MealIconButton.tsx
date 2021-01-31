import React, { useState } from 'react';
import { IconButton } from "@material-ui/core";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import CommonContainer from '../../containers/Common';
import TrackerContainer from '../../containers/Tracker';

interface Props {
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            position: "absolute",
            // top: `calc(50% - 35px)`,
            // left: `calc(50% - 35px)`,
            width: "70px",
            height: "70px",
            display: "flex",
            cursor: "pointer",
            zIndex: 4,
            color: "white",
            backgroundColor: "#FF8400",
            borderStyle: "solid",
            borderWidth: "0.2em",
            borderColor: "#FFC421",
            "&:hover": {
                backgroundColor: "#FF8400"
            }
        },
    })
);

export default ((props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [now, setNow] = useState<Date>(new Date());
    const commonContainer = CommonContainer.useContainer();
    const trackerContainer = TrackerContainer.useContainer();

    const classes = useStyles();
    const left = "-35px";
    const top = "-185px";

    return (
        <IconButton
            aria-label="food"
            className={classes.button}
            style={{ top: `calc(50% + ${top})`, left: `calc(50% + ${left})` }}
        >
            <RestaurantIcon fontSize="large" />
        </IconButton>

    )
}) as React.FC<Props>;
