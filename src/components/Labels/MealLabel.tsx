import React from 'react';
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import CommonContainer from '../../containers/Common';
import { MealRecordModel } from '../../Models/Models'

interface Props {
    label: string,
    meals: MealRecordModel[] | undefined,
    index: number

}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardRoot: {
            minWidth: 186,
            // width: '100%'
        },
        title: {
            fontSize: 14,
            alignItems: 'center',
            justifyContent: 'center',
        },
    })
);

export default ((props) => {
    const commonContainer = CommonContainer.useContainer();
    const classes = useStyles();

    const convertDateTime = (dateTime: string) => {
        return new Date(dateTime).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', hour12: false });
    }

    return (
        <Card className={classes.cardRoot}>
            <CardContent >
                <Typography className={classes.title} color="textSecondary">
                    {commonContainer.t(props.label)}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    {props.meals && props.meals.length !== 0 ? `${convertDateTime(props.meals[props.index].recordDateTime)}` : commonContainer.t('No Record')}
                </Typography>
            </CardContent>
        </Card>
    )
}) as React.FC<Props>;
