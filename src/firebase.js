// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB19tNRi9jV2HVCB2rskxmsB5WVxQMTjAg",
  authDomain: "astro-scope.firebaseapp.com",
  projectId: "astro-scope",
  storageBucket: "astro-scope.firebasestorage.app",
  messagingSenderId: "1089425440849",
  appId: "1:1089425440849:web:b573ce65a3c909fd7f3870"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
