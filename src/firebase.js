// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUHfko-mRNp3mh1INmGOg3DfyHxQoCL2M",
  authDomain: "noteeasy-91e6f.firebaseapp.com",
  projectId: "noteeasy-91e6f",
  storageBucket: "noteeasy-91e6f.appspot.com",
  messagingSenderId: "504410867737",
  appId: "1:504410867737:web:e8a04fcab25ca385218288"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export { db, auth }; 

