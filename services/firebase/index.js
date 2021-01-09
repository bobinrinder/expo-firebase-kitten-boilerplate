import React, { useEffect, useState } from "react";
import * as firebase from "firebase";
import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";
import firebaseConfig from "../../config/firebaseConfig";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const FirebaseUserContext = React.createContext(null);

const useFirebaseAuth = () => {
  const [firebaseUser, loadingFirebaseUser, error] = useAuthState(
    firebase.auth()
  );

  const dbh = firebase.firestore();
  const firestoreUserReference = firebaseUser
    ? dbh.collection("users").doc(firebaseUser.uid)
    : null;
  const [
    firestoreUser,
    loadingFirestoreUser,
    errorFirestoreUser,
  ] = useDocumentData(firestoreUserReference);

  if (firestoreUser && firebaseUser) {
    return [
      {
        ...firebaseUser,
        ...firestoreUser,
      },
      loadingFirebaseUser || loadingFirestoreUser,
    ];
  }

  return [
    firebaseUser,
    loadingFirebaseUser || loadingFirestoreUser || firestoreUserReference,
  ];
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
