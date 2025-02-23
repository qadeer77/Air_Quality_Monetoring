import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt5Iy3TgW4hxcJ2KMblrafneBq71w8xnA",
  authDomain: "air-quality-monitoring-sameer.firebaseapp.com",
  projectId: "air-quality-monitoring-sameer",
  storageBucket: "air-quality-monitoring-sameer.appspot.com",
  messagingSenderId: "34430251763",
  appId: "1:34430251763:web:fbea7b7da8f2ac45ee7d86",
  measurementId: "G-772XKDBP3N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Authentication
export const auth = getAuth(app);
