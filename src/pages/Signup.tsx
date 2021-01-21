import React, { Fragment, useEffect, useState } from 'react';
import useReactRouter from 'use-react-router';
import { Button, Container, FormControl, Grid, Link, TextField, Typography } from '@material-ui/core';

import { firebase } from '../firebase/config';

const Signup = (props: any) => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState('')

    const { history } = useReactRouter();

    useEffect(() => {
        // if logged in, redirect to home
        firebase.auth().onAuthStateChanged(user => {
            user && history.push('/');
        });
    }, [history]);

    const OnSignup = async () => {
        try {
            if (password !== confirmPassword) {
                alert("Passwords don't match.")
                return
            }
            await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((response) => {
                    if (response.user) {
                        const uid = response.user.uid
                        const data = {
                            id: uid,
                            email,
                            fullName,
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
            alert(error.message);
        }
    }

    return (
        <Fragment>
            <Container>
                <Grid container>
                    <Grid item md={4}></Grid>
                    <Grid item md={4}>
                        <FormControl margin='normal' fullWidth>
                            <TextField
                                style={{ marginTop: '0.5em', marginBottom: '0.5em' }}
                                name='text'
                                label='Full Name'
                                fullWidth
                                variant='outlined'
                                value={fullName}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setFullName(event.target.value);
                                }}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                style={{ marginTop: '0.5em', marginBottom: '0.5em' }}
                                name='email'
                                label='E-mail'
                                fullWidth
                                variant='outlined'
                                value={email}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setEmail(event.target.value);
                                }}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                style={{ marginTop: '0.5em', marginBottom: '0.5em' }}
                                name='password'
                                label='Password'
                                fullWidth
                                variant='outlined'
                                type='password'
                                value={password}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setPassword(event.target.value);
                                }}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                style={{ marginTop: '0.5em', marginBottom: '0.5em' }}
                                name='password'
                                label='Confirm Password'
                                fullWidth
                                variant='outlined'
                                type='password'
                                value={confirmPassword}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setConfirmPassword(event.target.value);
                                }}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <Button
                                fullWidth
                                onClick={OnSignup}
                                style={{ marginTop: '0.5em', marginBottom: '0.5em' }}
                            >
                                Sign up
                            </Button>
                            <Typography align='center'>
                                <Link href='/login'>to login</Link>
                            </Typography>
                        </FormControl>
                    </Grid>
                    <Grid item md={4}></Grid>
                </Grid>
            </Container>
        </Fragment>
    );
};

export default Signup;