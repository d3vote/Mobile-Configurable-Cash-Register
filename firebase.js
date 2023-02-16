import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDqdC58y1PEyePTE3QTA7aJoVHVTm_3EPo",
    authDomain: "restaurant-pos-9438a.firebaseapp.com",
    projectId: "restaurant-pos-9438a",
    storageBucket: "restaurant-pos-9438a.appspot.com",
    messagingSenderId: "72366181346",
    appId: "1:72366181346:web:7f8e703c0e86a39e17c7bb",
    measurementId: "G-36ND2YHNQQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);