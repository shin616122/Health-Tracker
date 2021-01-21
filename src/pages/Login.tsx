import React, { useEffect } from 'react';
import useReactRouter from 'use-react-router';
import { Avatar, Box, Button, CssBaseline, Container, Grid, Link, Typography, FormHelperText } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { firebase } from '../firebase/config';
import { Field, Formik, Form, FormikHelpers } from 'formik';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';

interface FormValues {
    email: string;
    password: string;
    isRememberMe: boolean;
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

    const handleLogin = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
        try {
            await firebase.auth().setPersistence(values.isRememberMe ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION)
            await firebase
                .auth()
                .signInWithEmailAndPassword(values.email, values.password)
                .then((response) => {
                    if (response.user) {
                        const uid = response.user.uid
                        const usersRef = firebase.firestore().collection('users')
                        usersRef
                            .doc(uid)
                            .get()
                            .then(firestoreDocument => {
                                if (!firestoreDocument.exists) {
                                    alert("User does not exist anymore.")
                                    return;
                                }
                                const user = firestoreDocument.data()
                                console.log(user);
                                history.push('/');
                            })
                            .catch(error => {
                                alert(error)
                            });
                    }
                })
        } catch (error) {
            formikHelpers.setStatus(error.message);
            formikHelpers.setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={{ email: '', password: '', isRememberMe: false }}
            onSubmit={handleLogin}>
            {({ status, isSubmitting }) => (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <Form className={classes.form} noValidate>
                            <FormHelperText error={true}>{status}</ FormHelperText>
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
                                autoComplete="current-password"
                                component={TextField}
                            />
                            <Field
                                component={CheckboxWithLabel}
                                type="checkbox"
                                name="isRememberMe"
                                Label={{ label: 'Remember me' }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                className={classes.submit}
                            >
                                Login
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
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