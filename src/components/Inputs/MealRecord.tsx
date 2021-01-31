import React, { useState } from 'react';
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import CommonContainer from '../../containers/Common';
import TrackerContainer from '../../containers/Tracker';
import { Formik, FormikHelpers } from 'formik';
import { Button, Grid, TextField } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

interface Props {
    handleComponentChanges: (componentId: number) => void,
}

interface FormValues {
    date: string,
    time: string
}

interface MealRecordModel {
    recordDateTime: string,
    mealType: number,
    image: string,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: '50px'
            // background: "linear-gradient(180deg, #80BED1 10%, #BCE8E1  70%)"
        },
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 300,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        toggleContainer: {
            margin: theme.spacing(2, 0),
        },
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
    })
);

export default ((props) => {
    const commonContainer = CommonContainer.useContainer();
    const trackerContainer = TrackerContainer.useContainer();
    const [dateValue, setDateValue] = useState<string>(new Date().toLocaleDateString('ja-JP', { year: "numeric", month: "2-digit", day: "2-digit" }).replaceAll('/', '-'));
    const [timeValue, setTimeValue] = useState<string>(new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', hour12: false }));
    const [mealType, setMealType] = useState<number | null>(0);

    const classes = useStyles();

    const handleMealType = (event: React.MouseEvent<HTMLElement>, newMealType: number | null) => {
        if (newMealType !== null) {
            setMealType(newMealType);
        }
    };

    const handleMealRecord = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
        try {
            if (!window.confirm('Are you sure?')) {
                return;
            }

            let data: MealRecordModel = {
                recordDateTime: new Date(`${values.date}T${values.time}`).toISOString(),
                mealType: mealType ?? -1,
                image: 'url'
            }
            await trackerContainer.createOrUpdateMealRecord(new Date(`${values.date}T${values.time}`), data);
            props.handleComponentChanges(-1);
            formikHelpers.setSubmitting(false);
        } catch (err) {
            if (err.status === 403) {
                formikHelpers.setStatus('Invalid Staff No or Password');
            } else {
                formikHelpers.setStatus('Unhandled error');
            }
            formikHelpers.setSubmitting(false);
        }
    }

    return (
        <Formik
            enableReinitialize
            initialValues={{
                date: dateValue,
                time: timeValue,
            }}
            onSubmit={handleMealRecord}>
            {({ status, isSubmitting, handleSubmit }) => (
                <form onSubmit={handleSubmit} className={classes.form} noValidate>
                    <Grid item xs={12} className={classes.root}>
                        <Grid container justify="center" direction="column" alignItems="center" spacing={10}>
                            <Grid key={0} item>
                                <TextField
                                    id="date"
                                    label={commonContainer.t('Date')}
                                    type="date"
                                    className={classes.textField}
                                    onChange={e => setDateValue(e.target.value)}
                                    value={dateValue}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid key={1} item>
                                <TextField
                                    id="time"
                                    label={commonContainer.t('Time')}
                                    type="time"
                                    className={classes.textField}
                                    onChange={e => setTimeValue(e.target.value)}
                                    value={timeValue}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                />
                            </Grid>
                            <Grid key={2} item>
                                <div className={classes.toggleContainer}>
                                    <ToggleButtonGroup
                                        value={mealType}
                                        exclusive
                                        onChange={handleMealType}
                                        aria-label="mealType"
                                    >
                                        <ToggleButton value={0} aria-label="breakfast">
                                            {commonContainer.t('Breakfast')}
                                        </ToggleButton>
                                        <ToggleButton value={1} aria-label="lunch">
                                            {commonContainer.t('Lunch')}
                                        </ToggleButton>
                                        <ToggleButton value={2} aria-label="snack">
                                            {commonContainer.t('Snack')}
                                        </ToggleButton>
                                        <ToggleButton value={3} aria-label="dinner">
                                            {commonContainer.t('Dinner')}
                                        </ToggleButton>
                                        <ToggleButton value={4} aria-label="drink">
                                            {commonContainer.t('Drink')}
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </div>
                            </Grid>
                            <Grid key={3} item>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    className={classes.submit}
                                >
                                    {commonContainer.t('Submit')}
                                </Button>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={() => props.handleComponentChanges(-1)}
                                    className={classes.submit}
                                >
                                    {commonContainer.t('Back')}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid >
                </form>
            )}
        </Formik>
    )
}) as React.FC<Props>;
