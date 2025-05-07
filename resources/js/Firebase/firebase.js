import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAipQ26QYeiB2pjnlTQKZ_Fz8JgsuO_zbA",
    authDomain: "cck-phoneauth.firebaseapp.com",
    projectId: "cck-phoneauth",
    storageBucket: "cck-phoneauth.firebasestorage.app",
    messagingSenderId: "454433024522",
    appId: "1:454433024522:web:d7ec8a3cc97da918c4cdf3",
    measurementId: "G-YNQ885SNE1"
  }; 

const app = getApps.length === 0 ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);
const auth = getAuth(app);
auth.useDeviceLanguage();

export {app, auth, analytics}; 
