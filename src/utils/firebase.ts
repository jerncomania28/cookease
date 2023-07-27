/* eslint-disable @typescript-eslint/no-explicit-any */
import { initializeApp } from 'firebase/app';
import { toast } from 'react-toastify';

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

import { SignUpProps } from '../components/SignUp/SignUpForm';

const firebaseConfig = {
  apiKey: 'AIzaSyCFOwo4rE4MmfwnljkYhcYu1oET3lkf4eQ',
  authDomain: 'cookease-cede4.firebaseapp.com',
  projectId: 'cookease-cede4',
  storageBucket: 'cookease-cede4.appspot.com',
  messagingSenderId: '11458584250',
  appId: '1:11458584250:web:6a0c01e6c5e2dbf29dec83',
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();

const db = getFirestore();

export const signOutUser = async () => await signOut(auth);

const createUserDoc = async (userAuthId: string, othetProps = {}) => {
  const userDocRef = doc(db, 'users', userAuthId);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        createdAt,
        ...othetProps,
      });
    } catch (err) {
      console.log('error creating user document', err);
    }
  }
};

export const createUserViaEmailAndPassword = async (
  userSignUpData: SignUpProps,
) => {
  const { email, password, first_name, last_name } = userSignUpData;

  try {
    const createUserResponse = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await createUserDoc(createUserResponse?.user?.uid, {
      displayName: `${first_name} ${last_name}`,
      email,
    });

    return createUserResponse?.user?.uid;
  } catch (err: any) {
    console.log('error occured trying to create and store user data', err);
    if (err.code === 'auth/email-already-exists') {
      toast.error('🦄 email already exist!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else if (err.code === 'auth/email-already-in-use') {
      toast.error('🦄 email already in use!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      toast.error('🦄 An error occured!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }
};

export const authStateChange = async (callback: (user: unknown) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const signInViaEmailAndPassword = async (
  email: string,
  password: string,
) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const getCurrentUser = async (uid: string) => {
  const currentUserDocRef = doc(db, 'users', uid);
  const currentUser = await getDoc(currentUserDocRef);
  return currentUser.data();
};
