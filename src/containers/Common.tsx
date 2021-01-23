import { useState } from 'react';
import useReactRouter from 'use-react-router';
import { createContainer } from 'unstated-next';
import { firebase } from '../firebase/config';

interface UserModel {
    uid: string;
    fullName: string;
    email: string;
    chumaPoint: number;
}

export default createContainer(() => {
    const [user, setUser] = useState<UserModel | undefined>(undefined);
    const { history } = useReactRouter();

    const loadMe = async () => {
        try {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    const usersRef = firebase.firestore().collection('users');
                    usersRef
                        .doc(user.uid)
                        .get()
                        .then((document) => {
                            const userData = document.data()
                            setUser(userData as UserModel)
                        })
                        .catch((error) => {
                            alert(error);
                        });
                }
            })
        } catch (err) {
            if (err.status === 401) {
                history.push('/login');
            }
        }
    }

    const signIn = async (email: string, password: string) => {
        try {
            await firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
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
                                setUser(user as UserModel);
                                history.push('/');
                            })
                            .catch(error => {
                                throw error
                            });
                    }
                })
        } catch (err) {
            throw err;
        }
    };

    const signUp = async (email: string, password: string, fullName: string) => {
        try {
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
        } catch (err) {
            throw err;
        }
    };

    const signOut = async () => {
        await firebase.auth().signOut();
        setUser(undefined);
        history.push('/login');
    };

    return {
        signIn, signUp, signOut, user, loadMe
    };
});