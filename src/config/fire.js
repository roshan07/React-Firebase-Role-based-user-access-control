import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBFmcRi5LEqnkHfVo6DMF2Npo1qE3DzWmo",
    authDomain: "reactfireauth-3facb.firebaseapp.com",
    databaseURL: "https://reactfireauth-3facb.firebaseio.com",
    projectId: "reactfireauth-3facb",
    storageBucket: "",
    messagingSenderId: "448242670236",
    appId: "1:448242670236:web:f431c8e9821a08dd"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;