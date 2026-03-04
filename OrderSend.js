import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

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

document.getElementById("orderForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const user = auth.currentUser;
  if (!user) {
    alert("Please log in to place an order");
    return;
  }

  const item = document.getElementById("item").value;
  const quantity = Number(document.getElementById("quantity").value);
  const totalPrice = Number(document.getElementById("total").value);

  try {
    await addDoc(collection(db, "orders"), {
      userId: user.uid,
      item,
      quantity,
      totalPrice,
      timestamp: serverTimestamp()
    });

    alert("Order placed!");
  } catch (error) {
    alert("Error placing order: " + error.message);
  }
});
