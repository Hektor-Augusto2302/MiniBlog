import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD2ifNK_czMZlYm_qWTx_yeUAirGf4weMA",
    authDomain: "miniblog-15fe4.firebaseapp.com",
    projectId: "miniblog-15fe4",
    storageBucket: "miniblog-15fe4.appspot.com",
    messagingSenderId: "709490831751",
    appId: "1:709490831751:web:7883196d6bf95dadd5e322",
    measurementId: "G-VXM1PCJWZR"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};