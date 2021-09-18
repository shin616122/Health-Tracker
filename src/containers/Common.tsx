import { useEffect, useState } from 'react';
import useReactRouter from 'use-react-router';
import { createContainer } from 'unstated-next';
import { auth, firestore } from '../firebase/config';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import { UserModel } from '../Models/Models'

import enJson from '../locales/en.json';
import jaJson from '../locales/ja.json';

i18n.use(initReactI18next).init({
    debug: true,
    resources: {
        en: { translation: enJson },
        ja: { translation: jaJson },
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
            auth.onAuthStateChanged(user => {
                if (user) {
                    const usersRef = firestore.collection('users');
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
            await auth
                .signInWithEmailAndPassword(email, password)
                .then((response) => {
                    if (response.user) {
                        const uid = response.user.uid
                        const usersRef = firestore.collection('users')
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
            await auth
                .createUserWithEmailAndPassword(email, password)
                .then((response) => {
                    if (response.user) {
                        const uid = response.user.uid
                        const data = {
                            id: uid,
                            email,
                            fullName,
                            healthTrackerPoints: 0,
                        };
                        const usersRef = firestore.collection('users')
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
            await auth.signOut();
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