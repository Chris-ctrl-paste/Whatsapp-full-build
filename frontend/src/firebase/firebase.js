import * as firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyCAC7uENyACCdE-4kMyNpvqGnx8DGs9diM",
    authDomain: "whatsapp-1f415.firebaseapp.com",
    databaseURL: "https://whatsapp-1f415.firebaseio.com",
    projectId: "whatsapp-1f415",
    storageBucket: "whatsapp-1f415.appspot.com",
    messagingSenderId: "792423772467",
    appId: "1:792423772467:web:5c58e38505c8f1eac5ce46",
    measurementId: "G-H1YW9RP7P2"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth()

const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider };

export default db;