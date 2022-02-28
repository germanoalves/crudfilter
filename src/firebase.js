import firebase from 'firebase/compat/app';
import "firebase/compat/database";

const firebaseConfig = {
    apiKey: "AIzaSyCCS9nHqhSXDPd9E5Ga080ghm1z_ri7f3E",
    authDomain: "crud-com-filtros.firebaseapp.com",
    projectId: "crud-com-filtros",
    storageBucket: "crud-com-filtros.appspot.com",
    messagingSenderId: "900195183909",
    appId: "1:900195183909:web:bd43364ea013c68f9dfecc"
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();