import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => { //adding a listener to the DOMContentLoaded event to ensure the DOM is fully loaded before accessing elements JV
  const orderForm = document.getElementById("orderForm"); //create orderForm variable and assign it to the orderForm id JV  
  const userStatus = document.getElementById("userStatus"); //create userStatus variable and assign it to the userStatus id JV
  const logoutBtn = document.getElementById("logoutBtn"); //create logoutBtn variable and assign it to the logoutBtn id JV

  // Listen for auth state changes
  onAuthStateChanged(auth, (user) => { //use the onAuthStateChanged function from Firebase Auth to listen for changes in the user's authentication state, and pass a callback function that receives the user object as a parameter JV
    if (user) {
      userStatus.textContent = "Logged in as: " + user.email; //if the user is logged in, set the text content of the userStatus element to show the user's email JV
    } else {
      userStatus.textContent = "Not logged in. Redirecting..."; //if the user is not logged in, set the text content of the userStatus element to indicate that the user is not logged in and that they will be redirected JV
      setTimeout(() => {
        window.location.href = "login.html"; //redirec to login page after 2 seconds to give the user time to read the message JV
      }, 2000);
    }
  });

  // Handle order submission
  orderForm.addEventListener("submit", async (event) => { //adding a submit event listener to the order form that is async to handle the asynchronous operations of Firebase, not stopping other functions JV
    event.preventDefault(); //prevent refresh JV

    const user = auth.currentUser; //get the currently authenticated user from Firebase Auth and assign it to the user variable JV

    if (!user) {
      alert("Please log in to place an order"); //if there is no authenticated user, show an alert to the user indicating that they need to log in to place an order JV
      window.location.href = "login.html"; //redirect to login page if not logged in JV
      return; 
    }

    const item = document.getElementById("item").value; //create a variable called item and assign it the value of the input field with the ID "item" JV
    const quantity = Number(document.getElementById("quantity").value); //create a variable called quantity and assign it the numeric value of the input field with the ID "quantity" JV
    const totalPrice = Number(document.getElementById("totalPrice").value); //create a variable called totalPrice and assign it the numeric value of the input field with the ID "totalPrice" JV

    try {
      await addDoc(collection(db, "orders"), { //use the addDoc function from Firebase Firestore to add a new document to the "orders" collection in the Firestore database, and pass an object with the order details as the second parameter JV
        userId: user.uid, //set the userId field in the Firestore document to the UID of the currently authenticated user JV
        email: user.email, //set the email field in the Firestore document to the email of the currently authenticated user JV
        item: item, //set the item field in the Firestore document to the value of the item variable JV
        quantity: quantity, //set the quantity field in the Firestore document to the value of the quantity variable JV
        totalPrice: totalPrice,   //set the totalPrice field in the Firestore document to the value of the totalPrice variable JV
        timestamp: serverTimestamp() //set the timestamp field in the Firestore document to the current server timestamp using the serverTimestamp function from Firebase Firestore JV
      });
      alert("Order placed successfully!"); //show an alert to the user indicating that the order was placed successfully JV
      orderForm.reset(); //reset the order form after successful submission JV
    } catch (error) {
      alert("Error placing order: " + error.message); //show an alert to the user indicating that there was an error placing the order, and include the error message from Firebase Firestore JV
      console.error("Order error:", error); //log the error to the console for debugging purposes JV
    }
  });

  // Handle logout
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth); //use the signOut function from Firebase Auth to sign out the currently authenticated user, and wait for the operation to complete JV
      alert("Logged out successfully!"); //show an alert to the user indicating that they have been logged out successfully JV
      window.location.href = "login.html"; //   redirect to login page after logout JV
    } catch (error) {
      alert("Error logging out: " + error.message); //show an alert to the user indicating that there was an error logging out, and include the error message from Firebase Auth JV
    }
  });
});