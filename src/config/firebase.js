// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyChmE5AE-VDXeAASYHGMQazv9nLyBUgbMc",
    authDomain: "melo-app-f2a3c.firebaseapp.com",
    projectId: "melo-app-f2a3c",
    storageBucket: "melo-app-f2a3c.appspot.com",
    messagingSenderId: "405312796085",
    appId: "1:405312796085:web:854b55924ed9b90526d5fc",
    measurementId: "G-900WD6SM02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;