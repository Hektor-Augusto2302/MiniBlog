import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB9fqlY2dnxw9qrNtLJezopRF1lnI0HImo",
    authDomain: "miniblog-b90f1.firebaseapp.com",
    projectId: "miniblog-b90f1",
    storageBucket: "miniblog-b90f1.appspot.com",
    messagingSenderId: "386230759555",
    appId: "1:386230759555:web:5d46d175366c8862d66bb6",
    measurementId: "G-2BTR4GZQ29"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };