import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAs4X6rY-dxLm52rciImrp8GN23IQhR03A",
  authDomain: "exclusive-1f240.firebaseapp.com",
  projectId: "exclusive-1f240",
  storageBucket: "exclusive-1f240.appspot.com",
  messagingSenderId: "412254999107",
  appId: "1:412254999107:web:64643b3634890e5e12faf6",
  measurementId: "G-L9M1KN75TD",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
