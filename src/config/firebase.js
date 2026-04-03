import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyD_m3QY8FNcVm_okedYchZepgPWvOAL26s",
  authDomain: "lugarlang-3ba05.firebaseapp.com",
  projectId: "lugarlang-3ba05",
  storageBucket: "lugarlang-3ba05.firebasestorage.app",
  messagingSenderId: "534592954761",
  appId: "1:534592954761:web:706722a048ddf267c64158",
  measurementId: "G-ER99LER848"
};

const app = initializeApp(firebaseConfig);

// Initialize Auth (simple version without persistence)
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };