import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/functions';
import 'firebase/auth'

// const firebaseConfig = {
//     apiKey: 'xxxxxxxxxx',
//     authDomain: 'xxxxxxxxxx',
//     databaseURL: 'xxxxxxxxxx',
//     projectId: 'xxxxxxxxxx',
//     storageBucket: 'xxxxxxxxxx',
//     messagingSenderId: 'xxxxxxxxxx',
//     appId: 'xxxxxxxxxx',
// };

const app = firebase.initializeApp(firebaseConfig);

export const functioons = app.functions();
export const firestore = app.firestore();
export { firebase };
export const auth = app.auth();