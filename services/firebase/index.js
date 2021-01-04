import React, { useEffect, useState } from "react";
import * as firebase from "firebase";
import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";
import firebaseConfig from "../../config/firebaseConfig";
import { useDocumentData } from "react-firebase-hooks/firestore";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const FirebaseUserContext = React.createContext(null);

const useFirebaseAuth = () => {
  const [firebaseUser, setFirebaseUser] = useState(null);

  const dbh = firebase.firestore();
  const firestoreUserReference = firebaseUser
    ? dbh.collection("users").doc(firebaseUser.uid)
    : null;
  const [firestoreUser, loading, error] = useDocumentData(
    firestoreUserReference
  );

  useEffect(() => {
    const authStateSubscriber = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
      }
    });
    return authStateSubscriber;
  }, []);

  if (!firestoreUser) {
    return firebaseUser;
  }

  return {
    ...firebaseUser,
    ...firestoreUser,
  };
};

const FirebaseUserProvider = ({ children }) => {
  const firebaseUser = useFirebaseAuth();

  return (
    <FirebaseUserContext.Provider value={firebaseUser}>
      {children}
    </FirebaseUserContext.Provider>
  );
};

export default FirebaseUserProvider;
