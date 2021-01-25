import { useEffect, useState } from 'react';
import useReactRouter from 'use-react-router';
import { createContainer } from 'unstated-next';
import { firebase } from '../firebase/config';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

import enJson from '../locales/en.json';
import jaJson from '../locales/ja.json';
import cmJson from '../locales/cm.json'

interface UserModel {
    uid: string;
    fullName: string;
    email: string;
    chumaPoint: number;
}

i18n.use(initReactI18next).init({
    debug: true,
    resources: {
        en: { translation: enJson },
        ja: { translation: jaJson },
        cm: { translation: cmJson },
    },
    lng: 'ja',
    fallbackLng: false,
    returnEmptyString: false,
});

export default createContainer(() => {
    const [user, setUser] = useState<UserModel | undefined>(undefined);
    const [t, i18n] = useTranslation();
    const [language, setLanguage] = useState('ja');
    const { history } = useReactRouter();

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language, i18n]);

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
                        const today = new Date().toISOString();
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
        try {
            await firebase.auth().signOut();
            setUser(undefined);
            history.push('/login');
        } catch (err) {
            throw err;
        }
    };

    return {
        signIn, signUp, signOut, user, loadMe,
        language, setLanguage, t
    };
});