import firebase from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import 'firebase/firestore';

// web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyApelsEH1vLdPskgtgwxwO9ZhDNPspy8K0",
    authDomain: "wongblog-afaeb.firebaseapp.com",
    projectId: "wongblog-afaeb",
    storageBucket: "wongblog-afaeb.appspot.com",
    messagingSenderId: "291805183923",
    appId: "1:291805183923:web:0fdc0666b45d48ed0455c6",
    measurementId: "G-MF8ZK37TQK"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const analytic = getAnalytics(app);

export { timestamp, analytic };
export default firebaseApp.firestore();