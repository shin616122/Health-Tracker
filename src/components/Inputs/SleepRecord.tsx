import React, { useState } from 'react';
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import CommonContainer from '../../containers/Common';
import TrackerContainer from '../../containers/Tracker';
import { Formik, FormikHelpers } from 'formik';
import { Avatar, Button, Grid, TextField, Typography } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { SleepRecordModel } from '../../Models/Models'

interface Props {
    label: string,
    recordType: number,
    handleComponentChanges: (componentId: number) => void,
    sleepTime: Date | undefined
}

interface FormValues {
    date: string,
    time: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // marginTop: '50px'
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
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: 'rgba(9, 137, 217, 0.8)',
        },
    })
);

export default ((props) => {
    const commonContainer = CommonContainer.useContainer();
    const trackerContainer = TrackerContainer.useContainer();
    const [dateValue, setDateValue] = useState<string>(new Date().toLocaleDateString('ja-JP', { year: "numeric", month: "2-digit", day: "2-digit" }).replaceAll('/', '-'));
    const [timeValue, setTimeValue] = useState<string>(new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', hour12: false }));

    const classes = useStyles();

    const handleSleepRecord = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
        try {
            if (!window.confirm('Are you sure?')) {
                return;
            }

            let data: SleepRecordModel = {
                recordDateTime: new Date(`${values.date}T${values.time}`),
                recordType: props.recordType ?? -1,
            }
            await trackerContainer.createSleepRecord(data as SleepRecordModel);
            await trackerContainer.getTrackerRecord(new Date());
            await props.handleComponentChanges(-1);
            await formikHelpers.setSubmitting(false);
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
            onSubmit={handleSleepRecord}>
            {({ status, isSubmitting, handleSubmit }) => (
                <form onSubmit={handleSubmit} className={classes.form} noValidate>
                    <Grid item xs={12} className={classes.root}>
                        <Grid container justify="center" direction="column" alignItems="center" spacing={1}>
                            <Grid key={0} item>
                                <Avatar className={classes.avatar}>
                                    <CreateIcon />
                                </Avatar>
                            </Grid>
                            <Grid key={1} item>
                                <Typography component="h1" variant="h5">
                                    {commonContainer.t(props.label)}
                                </Typography>
                            </Grid>
                            <Grid key={2} item>
                                <Typography style={{ color: '#5998AB' }} variant="body1" component={'p'}>
                                    {props.sleepTime ? `${props.sleepTime.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}` : commonContainer.t('No Record')}
                                </Typography>
                            </Grid>
                            <Grid key={3} item>
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
                            <Grid key={4} item>
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
                            <Grid key={5} item>
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
