import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

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
const auth = getAuth(app);

document.getElementById("submit").addEventListener("click", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("Logged in!");
    window.location.href = "Order.html";
  } catch (error) {
    alert(error.message);
  }
});
