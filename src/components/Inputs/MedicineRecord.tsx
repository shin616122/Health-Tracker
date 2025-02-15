import React, { useState } from 'react';
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import CommonContainer from '../../containers/Common';
import TrackerContainer from '../../containers/Tracker';
import { Formik, FormikHelpers } from 'formik';
import { Avatar, Button, Grid, TextField, Typography } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import CreateIcon from '@material-ui/icons/Create';
import { MedicineRecordModel } from '../../Models/Models'

interface Props {
    handleComponentChanges: (componentId: number) => void,
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
    const [stomachMedicineType, setStomachMedicineType] = useState<number | null>(null);
    const [mentalMedicineType, setMentalMedicineTypeType] = useState<number | null>(null);
    const [pillType, setPillType] = useState<number | null>(null);

    const classes = useStyles();

    const handleStomachMedicineType = (event: React.MouseEvent<HTMLElement>, newStomachMedicineType: number | null) => {
        setStomachMedicineType(newStomachMedicineType);
    };

    const handleMentalMedicineType = (event: React.MouseEvent<HTMLElement>, newMentalMedicineType: number | null) => {
        setMentalMedicineTypeType(newMentalMedicineType);
    };

    const handlePillType = (event: React.MouseEvent<HTMLElement>, newPillType: number | null) => {
        setPillType(newPillType);
    };

    const handleMedicineRecord = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
        try {
            if (!window.confirm('Are you sure?')) {
                return;
            }

            let data: MedicineRecordModel = {
                recordDateTime: new Date(`${values.date}T${values.time}`).toISOString(),
                stomachMedicineType: stomachMedicineType ?? -1,
                mentalMedicineType: mentalMedicineType ?? -1,
                pillType: pillType ?? -1,
                image: 'url'
            }
            await trackerContainer.createOrUpdateMedicineRecord(new Date(`${values.date}T${values.time}`), data);
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
            onSubmit={handleMedicineRecord}>
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
                                    お薬記録をつける
                                </Typography>
                            </Grid>
                            <Grid key={2} item>
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
                            <Grid key={3} item>
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
                            <Grid key={4} item>
                                <div className={classes.toggleContainer}>
                                    <ToggleButtonGroup
                                        value={stomachMedicineType}
                                        exclusive
                                        onChange={handleStomachMedicineType}
                                        aria-label="stomach-medicine"
                                    >
                                        <ToggleButton value={0} aria-label="stomach-medicine-before">
                                            胃薬(食前)
                                        </ToggleButton>
                                        <ToggleButton value={1} aria-label="stomach-medicine-after">
                                            胃薬(食後)
                                        </ToggleButton>
                                        <ToggleButton value={2} aria-label="stomach-medicine-sleep">
                                            胃薬(寝る前)
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </div>
                            </Grid>
                            <Grid key={5} item>
                                <div className={classes.toggleContainer}>
                                    <ToggleButtonGroup
                                        value={mentalMedicineType}
                                        exclusive
                                        onChange={handleMentalMedicineType}
                                        aria-label="stomach-medicine"
                                    >
                                        <ToggleButton value={10} aria-label="mental-medicine-before">
                                            メンタル(寝る前)
                                        </ToggleButton>
                                        <ToggleButton value={11} aria-label="mental-medicine-after">
                                            メンタル(緊急)
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </div>
                            </Grid>
                            <Grid key={6} item>
                                <div className={classes.toggleContainer}>
                                    <ToggleButtonGroup
                                        value={pillType}
                                        exclusive
                                        onChange={handlePillType}
                                        aria-label="stomach-medicine"
                                    >
                                        <ToggleButton value={20} aria-label="pill-medicine-before">
                                            ピル
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </div>
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
