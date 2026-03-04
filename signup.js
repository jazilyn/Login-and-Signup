import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
const db = getFirestore(app);

document.getElementById("submit").addEventListener("click", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      username: username,
      email: email,
      createdAt: serverTimestamp()
    });

    alert("Account created!");
    window.location.href = "login.html";
  } catch (error) {
    alert(error.message);
  }
});
