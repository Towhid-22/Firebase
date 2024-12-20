// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1H22SM5CrWd-yKjeD0imy2UZ8spB_Nn8",
  authDomain: "todo-list-50941.firebaseapp.com",
  projectId: "todo-list-50941",
  storageBucket: "todo-list-50941.firebasestorage.app",
  messagingSenderId: "128934983134",
  appId: "1:128934983134:web:35ab4a5ea2a000d367594f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig;