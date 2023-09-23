// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword} from "firebase/auth"
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCl1Ynjhr83x3Lq2oBujAByiqFIFHFk9E",
  authDomain: "react-login-f7101.firebaseapp.com",
  projectId: "react-login-f7101",
  storageBucket: "react-login-f7101.appspot.com",
  messagingSenderId: "986304682550",
  appId: "1:986304682550:web:3707827300039f70545697",
  measurementId: "G-8V37CTN735"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
prompt:"select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore(firebaseApp);

export const createUserDocFromAuth = async (userAuth, additionalInformation) => {
  if (!userAuth || !userAuth.email) {
    console.error('Invalid userAuth object:', userAuth);
    return null;
  }

  const userDocRef = doc(db, 'user-data', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
      console.log('User document created in Firestore');
    } catch (error) {
      console.log('Error creating user document:', error.message);
    }
  }

  return userDocRef;
};


export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error creating user:', error.message);
    throw error;
  }
};