import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBsOgn3KjXHJUS0sSMFJAI4DEIcWOaT_n0",
    authDomain: "miniblog-6dd0d.firebaseapp.com",
    projectId: "miniblog-6dd0d",
    storageBucket: "miniblog-6dd0d.appspot.com",
    messagingSenderId: "246404530801",
    appId: "1:246404530801:web:422cde51e3bd3f06a991d0",
    measurementId: "G-VMWSL09TFQ"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };