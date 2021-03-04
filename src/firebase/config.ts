import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/functions';
import 'firebase/auth'
// import '@firebase/auth';
// import '@firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDvbpVmihyEIwSikYNcOG4MlwsRliLnXK4',
    authDomain: 'chuma-point.firebaseapp.com',
    databaseURL: 'https://your-database-name.firebaseio.com',
    projectId: 'chuma-point',
    storageBucket: 'chuma-point.appspot.com',
    messagingSenderId: '39631976230',
    appId: '1:39631976230:web:565ca263fceabff14433e7',
};

const app = firebase.initializeApp(firebaseConfig);

export const functioons = app.functions();
export const firestore = app.firestore();
export { firebase };
export const auth = app.auth();