import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD97Y0ClXxM62lI-_9shw8ZZGydzcTp9KA",
  authDomain: "credigo-bc4c7.firebaseapp.com",
  projectId: "credigo-bc4c7",
  storageBucket: "credigo-bc4c7.firebasestorage.app",
  messagingSenderId: "229924730841",
  appId: "1:229924730841:web:7ba8f8038a2c0618840bc8",
  measurementId: "G-84STMF025M",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
