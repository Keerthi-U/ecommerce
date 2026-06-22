import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAA9NPCCSrgpKIE9wFFhwhMaJOEYqhMHBQ",
  authDomain: "cintu1.firebaseapp.com",
  databaseURL: "https://cintu1-default-rtdb.firebaseio.com",
  projectId: "cintu1",
  storageBucket: "cintu1.firebasestorage.app",
  messagingSenderId: "997840771945",
  appId: "1:997840771945:web:31e3f9ad3bb6edc482fbf8",
  measurementId: "G-Q42CGTH6MT"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);  // ✅ Add this to enable authentication

export { db, auth }; // ✅ Export `auth`