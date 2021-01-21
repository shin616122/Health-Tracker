import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDvbpVmihyEIwSikYNcOG4MlwsRliLnXK4',
    authDomain: 'chuma-point.firebaseapp.com',
    databaseURL: 'https://your-database-name.firebaseio.com',
    projectId: 'chuma-point',
    storageBucket: 'chuma-point.appspot.com',
    messagingSenderId: '39631976230',
    appId: '1:39631976230:web:565ca263fceabff14433e7',
};

firebase.initializeApp(firebaseConfig);

export { firebase };