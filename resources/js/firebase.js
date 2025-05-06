import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAvbRAdXupEL2quJfIlJdIAeu1EPstsBjc",
    authDomain: "laravel-react-5d543.firebaseapp.com",
    projectId: "laravel-react-5d543",
    storageBucket: "laravel-react-5d543.firebasestorage.app",
    messagingSenderId: "471536229596",
    appId: "1:471536229596:web:aecf1f4082e4426d832819",
    measurementId: "G-6KHG79F785"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
auth.useDeviceLanguage();

export {app, auth}; 
