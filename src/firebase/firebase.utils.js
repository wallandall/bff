import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBsXjFBI-FEeovgr574-3D911Foyabubg0",
  authDomain: "bff-db.firebaseapp.com",
  databaseURL: "https://bff-db.firebaseio.com",
  projectId: "bff-db",
  storageBucket: "bff-db.appspot.com",
  messagingSenderId: "395836120427",
  appId: "1:395836120427:web:139bb2f4cf8a594d28802e",
  measurementId: "G-YZWZ2MLEGQ",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
