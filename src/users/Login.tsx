import React, { useEffect } from 'react';
import useReactRouter from 'use-react-router';
import { Avatar, Box, Button, CssBaseline, Container, Grid, Link, Typography, FormHelperText } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { firebase } from '../firebase/config';
import { Field, Formik, Form, FormikHelpers } from 'formik';
import { TextField } from 'formik-material-ui';
import CommonContainer from '../containers/Common';
import { LoginFormModel } from '../Models/Models'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: 'rgba(9, 137, 217, 0.8)',
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
}));

export default ((props: any) => {
    const { history } = useReactRouter();
    const classes = useStyles();
    const commonContainer = CommonContainer.useContainer();

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            user && history.push('/pages/tracker');
        });
    }, [history]);

    const handleSignIn = async (values: LoginFormModel, formikHelpers: FormikHelpers<LoginFormModel>) => {
        try {
            await commonContainer.signIn(values.email, values.password);
        } catch (error) {
            formikHelpers.setStatus(error.message);
            formikHelpers.setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={handleSignIn}>
            {({ status, isSubmitting }) => (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {commonContainer.t('Login')}
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
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                className={classes.submit}
                            >
                                {commonContainer.t('Login')}
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {commonContainer.t('Don\'t have an account? Sign Up')}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Form>
                    </div>
                    <Box mt={8}>
                        <Typography variant="body2" color="textSecondary" align="center">
                            {`Copyright © Chuma`}
                            {new Date().getFullYear()}
                            {`.`}
                        </Typography>
                    </Box>
                </Container>
            )}
        </Formik>
    )
}) as React.FC;