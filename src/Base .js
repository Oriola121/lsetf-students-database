// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Firestore
import { getStorage } from "firebase/storage";       // Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQ6RvbyXZm5iSyj1Hoc9YkXVEzdXDysrA",
  authDomain: "lsetf-student-database.firebaseapp.com",
  projectId: "lsetf-student-database",
  storageBucket: "lsetf-student-database.appspot.com",
  messagingSenderId: "292689783189",
  appId: "1:292689783189:web:3d3b7dd1585722366a6e9c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  // Initialize Firestore
const storage = getStorage(app);     // Initialize Storage

export { db, storage };
