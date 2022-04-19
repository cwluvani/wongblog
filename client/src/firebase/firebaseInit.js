import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

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
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Get a list of cities from your database
async function getCities(db) {
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;
}

export { firebaseApp, db, getCities };
// export default firebaseApp.firestore();