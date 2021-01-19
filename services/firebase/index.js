import React from "react";
import firebase from "firebase/app";
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

  const firestore = firebase.firestore();
  const firestoreUserReference = firebaseUser
    ? firestore.collection("users").doc(firebaseUser.uid)
    : null;
  const [
    firestoreUser,
    loadingFirestoreUser,
    errorFirestoreUser,
  ] = useDocumentData(firestoreUserReference);

  // helper to update the user attributes
  // accepts values object with the attributes to update
  const updateFirebaseUser = async (values, successToast = null) => {
    if (firebaseUser?.uid && values) {
      try {
        await firestoreUserReference.update(values);

        if (successToast) {
          toast.show(successToast, { type: "success" });
        }

        return true;
      } catch (err) {
        console.log(err);
        toast.show("Something went wrong updating, sorry!", { type: "danger" });
      }
    }
    return false;
  };

  if (firestoreUser && firebaseUser) {
    return [
      {
        ...firebaseUser,
        ...firestoreUser,
        update: updateFirebaseUser,
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
