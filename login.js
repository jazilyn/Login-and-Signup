import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDP1tojLoeOh2PGlJx8uJ0-kZRqFSWZWjg",
  authDomain: "learningfirebase-e3320.firebaseapp.com",
  projectId: "learningfirebase-e3320",
  storageBucket: "learningfirebase-e3320.firebasestorage.app",
  messagingSenderId: "388809087729",
  appId: "1:388809087729:web:63df36e5b079c1deeaa750",
  measurementId: "G-871GKY9P70"
};

document.addEventListener("DOMContentLoaded", () => { //adding a listener to the DOMContentLoaded event to ensure the DOM is fully loaded before accessing elements JV
  const loginForm = document.getElementById("loginForm"); //creating the loginForm variable and assigning it to the loginForm id JV

  loginForm.addEventListener("submit", async (event) => { //adding a submit event listener to the login form that is async to handle the asynchronous operations of Firebase, not stopping other functions JV
  event.preventDefault(); //prevent page from refreshing on submit JV 

  const email = document.getElementById("email").value; //create a variable called email and assign it the value of the input field with the ID "email" JV
  const password = document.getElementById("password").value; //create a variable called password and assign it the value of the input field with the ID "password" JV

  try{ 
    const userCredential = await signInWithEmailAndPassword(auth, email, password); //use the signInWithEmailAndPassword function from Firebase Auth to sign in the user with the provided email and password, and wait for the operation to complete JV
    alert("Login successful!"); // show an alert to the user indicating that the login was successful JV
    window.location.href = "Order.html"; //redirect to order.html when logged in successfully JV
  } 
  catch (error) { //catch any errors that occur during the login process and display an alert with the error message JV 
    alert("Error logging in: " + error.message); //show an alert to the user indicating that there was an error logging in, and include the error message from Firebase Auth JV
    console.log("Login error:", error); // log the error to the console  JV
  }
});
}); 
