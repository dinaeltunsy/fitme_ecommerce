// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBN6rk3jNRF30TXYxWnu-0cbBmmq8XyXyM",
  authDomain: "my-ecommerce-project-f6fc6.firebaseapp.com",
  projectId: "my-ecommerce-project-f6fc6",
  storageBucket: "my-ecommerce-project-f6fc6.appspot.com",
  messagingSenderId: "413578062417",
  appId: "1:413578062417:web:1c3065674510f072c96670"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db , storage};

