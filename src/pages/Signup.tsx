import React, { useEffect } from 'react';
import useReactRouter from 'use-react-router';
import { Avatar, Box, Button, CssBaseline, Container, Grid, Typography, FormHelperText, Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { firebase } from '../firebase/config';
import { Field, Formik, Form, FormikHelpers } from 'formik';
import { TextField } from 'formik-material-ui';

interface FormValues {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
                Chuma
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default ((props: any) => {

    const { history } = useReactRouter();
    const classes = useStyles();

    useEffect(() => {
        // if logged in, redirect to home
        firebase.auth().onAuthStateChanged(user => {
            user && history.push('/');
        });
    }, [history]);

    const handleSignup = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
        try {
            if (values.password !== values.confirmPassword) {
                formikHelpers.setStatus('Passwords don\'t match.');
                return
            }
            await firebase
                .auth()
                .createUserWithEmailAndPassword(values.email, values.password)
                .then((response) => {
                    if (response.user) {
                        const uid = response.user.uid
                        const data = {
                            id: uid,
                            email: values.email,
                            fullName: values.fullName,
                            chumaPoint: 0
                        };
                        const usersRef = firebase.firestore().collection('users')
                        usersRef
                            .doc(uid)
                            .set(data)
                            .then(() => {
                                history.push('/login');
                            })
                            .catch((error) => {
                                alert(error)
                            });
                    }
                })
        } catch (error) {
            formikHelpers.setStatus(error.message);
            formikHelpers.setSubmitting(false);
        }
    }

    return (
        <Formik
            initialValues={{ fullName: '', email: '', password: '', confirmPassword: '' }}
            onSubmit={handleSignup}>
            {({ status, isSubmitting }) => (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Signup
                    </Typography>
                        <Form className={classes.form} noValidate>
                            <FormHelperText error={true}>{status}</ FormHelperText>
                            <Field
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="fullName"
                                label="Full Name"
                                name="fullName"
                                autoFocus
                                component={TextField}
                            />
                            <Field
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                component={TextField}
                            />
                            <Field
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                component={TextField}
                            />
                            <Field
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                component={TextField}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                className={classes.submit}
                            >
                                Signup
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        {"Already have an account? Login"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Form>
                    </div>
                    <Box mt={8}>
                        <Copyright />
                    </Box>
                </Container>
            )}
        </Formik>
    )
}) as React.FC;