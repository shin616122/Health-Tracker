import React from 'react';
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import CommonContainer from '../../containers/Common';
import TrackerContainer from '../../containers/Tracker';

interface Props {

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
        table: {
            minWidth: 300,
        },
    })
);

export default ((props) => {
    const trackerContainer = TrackerContainer.useContainer();
    const commonContainer = CommonContainer.useContainer();
    const classes = useStyles();


    const getMealTypeName = (meanType: number) => {
        let mealTypeName = '';
        switch (meanType) {
            case 0:
                mealTypeName = commonContainer.t('Breakfast');
                break;
            case 1:
                mealTypeName = commonContainer.t('Lunch');
                break;
            case 2:
                mealTypeName = commonContainer.t('Snack');
                break;
            case 3:
                mealTypeName = commonContainer.t('Dinner');
                break;
            case 4:
                mealTypeName = commonContainer.t('Drink');
                break;
            default:
                break;
        }
        return mealTypeName;
    }


    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>RecordDateTime</TableCell>
                        <TableCell align="right">MealType</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {trackerContainer.meals.map((meal, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">{new Date(meal.recordDateTime).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', hour12: false })}</TableCell>
                            <TableCell align="right">{getMealTypeName(meal.mealType)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}) as React.FC<Props>;
