/* eslint-disable @typescript-eslint/no-explicit-any */
import { initializeApp } from 'firebase/app';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  DocumentData,
  deleteDoc,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { SignUpProps } from '../components/SignUp/SignUpForm';
import { NewRecipeProps } from '../components/modals/NewRecipe';

//utils
import storageUtils from './storageUtils';

//types
// import { RecipeProps } from '../pages/Recipes';

const firebaseConfig = {
  apiKey: 'AIzaSyCFOwo4rE4MmfwnljkYhcYu1oET3lkf4eQ',
  authDomain: 'cookease-cede4.firebaseapp.com',
  projectId: 'cookease-cede4',
  storageBucket: 'cookease-cede4.appspot.com',
  messagingSenderId: '11458584250',
  appId: '1:11458584250:web:6a0c01e6c5e2dbf29dec83',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

const db = getFirestore();

export const storage = getStorage(app);

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
      toast.error('🦄 An Error Occured!', {
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
      id: createUserResponse?.user?.uid,
      displayName: `${first_name} ${last_name}`,
      email,
    });

    return createUserResponse?.user?.uid;
  } catch (err: any) {
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

export const createRecipeDocument = async (newRecipe: NewRecipeProps) => {
  const user = storageUtils.getItem();
  const collectionRef = collection(db, 'recipes');
  const uniqueId = newRecipe?.uniqueId || uuidv4();
  const recipeDocRef = doc(collectionRef, uniqueId);

  const createdAt = new Date();
  try {
    await setDoc(recipeDocRef, {
      createdAt,
      ...newRecipe,
      ...user,
      uniqueId,
    });

    return true;
  } catch (err) {
    console.log('error occured trying to create recipe', err);
    toast.error('🦄 An Error Occured!', {
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
};

export const readMyRecipe = async () => {
  const user = storageUtils.getItem();
  const collectionRef = collection(db, 'recipes');

  const q = query(collectionRef, where('id', '==', user.id));
  try {
    const readMyRecipeSnapshot = await getDocs(q);

    const result: DocumentData[] = [];

    readMyRecipeSnapshot.forEach((doc) => result.push(doc.data()));

    return result;
  } catch (err) {
    console.log('error fetching my recipe');
    toast.error('🦄 An Error Occured!', {
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
};

export const readAllRecipe = async () => {
  const collectionRef = collection(db, 'recipes');
  const q = query(collectionRef);

  try {
    const readAllRecipeSnapshot = await getDocs(q);

    const result: DocumentData[] = [];

    readAllRecipeSnapshot.forEach((doc) => result.push(doc.data()));

    return result;
  } catch (error) {
    console.log('error fetching all recipes', error);
    toast.error('🦄 An Error Occured!', {
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
};

export const readCurrentRecipe = async (uniqueId: string) => {
  const readRecipeRef = doc(db, 'recipes', uniqueId);
  const readAllRecipeSnapshot = await getDoc(readRecipeRef);
  return readAllRecipeSnapshot.data();
};

export function updateOrAddRating(
  uniqueId: string,
  uid: string,
  rating: number,
) {
  const docRef = doc(db, 'recipes', uniqueId);

  // Get the document data
  getDoc(docRef).then((docSnapshot) => {
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();

      if (data.rating) {
        let existingIndex = -1;
        for (let i = 0; i < data.rating?.length; i++) {
          if (data.rating[i].uid === uid) {
            existingIndex = i;
            break;
          }
        }

        if (existingIndex !== -1) {
          // If the uid already exists, update the corresponding object with the new rating
          data.rating[existingIndex].rating = rating;
        } else {
          // If the uid doesn't exist, add a new object to the rating array
          data.rating?.push({ uid, rating });
        }

        // Update the document with the modified rating array
        setDoc(docRef, { ...data, rating: data.rating }).then(() => {
          console.log('rating updated!');
        });
      } else {
        setDoc(docRef, {
          ...data,
          rating: [{ uid, rating }],
        }).then(() => {
          console.log('rating updated');
        });
      }
    }
  });
}

export const userHasRated = (recipe: DocumentData) => {
  let isRated = [];
  if (recipe.rating) {
    isRated = recipe.rating.filter(
      (rate: { uid: string; rating: number }) =>
        rate.uid === storageUtils.getItem().id,
    );

    return isRated;
  } else {
    return [];
  }
};

export const deleteRecipe = async (collectionKey: string, uniqueId: string) => {
  const deleteRef = doc(db, collectionKey, uniqueId);

  return await deleteDoc(deleteRef);
};
