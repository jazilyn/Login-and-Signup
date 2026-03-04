import {auth, db} from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {doc, setDoc, serverTimestamp} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => { //adding a listener to the DOMContentLoaded event to ensure the DOM is fully loaded before accessing elements JV
  const signupForm = document.getElementById("signupForm"); //getting the signup form element by its ID JV

  signupForm.addEventListener("submit", async (event) => { //adding a submit event listener to the signup form that is async to handle the asynchronous operations of Firebase, not stopping other functions JV
    event.preventDefault(); //prevent page from refreshing when submit button is pressed JV

    const username = document.getElementById("usernm").value; //create a variable called username and assign it the value of the input field with the ID "usernm" JV
    const email = document.getElementById("email").value; //create a variable called email and assign it the value of the input field with the ID "email" JV
    const password = document.getElementById("password").value; //create a variable called password and assign it the value of the input field with the ID "password" JV

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password); //use the createUserWithEmailAndPassword function from Firebase Auth to create a new user with the provided email and password, and wait for the operation to complete JV
      const user = userCredential.user; //get the user object from the userCredential returned by Firebase Auth JV

      // Create a user document in Firestore
      await setDoc(doc(db, "users", user.uid), { //use setDoc to first grab information from the database and check if there is a collection called users on it and then create a document with the user's UID as the ID, and set the fields username, email, and createdAt with the corresponding values JV 
        username: username, //set the username field in the Firestore document to the value of the username variable JV
        email: email, //set the email field in the Firestore document to the value of the email variable JV
        createdAt: serverTimestamp() //set the createdAt field in the Firestore document to the current server timestamp using the serverTimestamp function from Firebase Firestore JV
      });

      alert("Account created successfully!"); // show an alert to the user indicating that the account was created successfully JV 
      window.location.href = "login.html"; //redirect to login.html when signed up 
    } catch (error) { //catch any errors that occur during the signup process and display an alert with the error message, and also log the error to the console for debugging purposes JV
      alert("Error signing up: + error.message"); //show an alert to the user indicating that there was an error signing up, and include the error message from Firebase Auth JV
      console.log("Signup error:",error); //  log the error to the console JV
    }
  }); 
}); 
