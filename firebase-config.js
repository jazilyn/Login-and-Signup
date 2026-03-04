import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDP1tojLoeOh2PGlJx8uJ0-kZRqFSWZWjg",
    authDomain: "learningfirebase-e3320.firebaseapp.com",
    projectId: "learningfirebase-e3320",
    storageBucket: "learningfirebase-e3320.firebasestorage.app",
    messagingSenderId: "388809087729",
    appId: "1:388809087729:web:63df36e5b079c1deeaa750",
    measurementId: "G-871GKY9P70"
  };

const app = initializeApp(firebaseConfig);
