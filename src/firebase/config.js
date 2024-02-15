// Importing the required modules from Firebase v10+
import { initializeApp } from 'firebase/app'
import { getFirestore, serverTimestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCMBWmzsfv9Ydpt4gUGkBTZBSnq2GqskHM",
  authDomain: "muso-ninjas-5de78.firebaseapp.com",
  projectId: "muso-ninjas-5de78",
  storageBucket: "muso-ninjas-5de78.appspot.com",
  messagingSenderId: "297874988138",
  appId: "1:297874988138:web:0772e3f6d334e08f0dfe13",
  measurementId: "G-0BWH8XFNR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore and Auth services
const projectFirestore = getFirestore(app)
const projectAuth = getAuth(app)
const projectStorage = getStorage(app)

// Timestamp
const timestamp = serverTimestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }
