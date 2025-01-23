// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDt5Iy3TgW4hxcJ2KMblrafneBq71w8xnA",
  authDomain: "air-quality-monitoring-sameer.firebaseapp.com",
  projectId: "air-quality-monitoring-sameer",
  storageBucket: "air-quality-monitoring-sameer.firebasestorage.app",
  messagingSenderId: "34430251763",
  appId: "1:34430251763:web:fbea7b7da8f2ac45ee7d86",
  measurementId: "G-772XKDBP3N",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDt5Iy3TgW4hxcJ2KMblrafneBq71w8xnA",
//   authDomain: "air-quality-monitoring-sameer.firebaseapp.com",
//   projectId: "air-quality-monitoring-sameer",
//   storageBucket: "air-quality-monitoring-sameer.firebasestorage.app",
//   messagingSenderId: "34430251763",
//   appId: "1:34430251763:web:fbea7b7da8f2ac45ee7d86",
//   measurementId: "G-772XKDBP3N",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
