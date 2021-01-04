import React, { useContext } from "react";
import { FirebaseUserContext } from "../services/firebase/index";

const useFirebaseUser = () => {
  const firebaseUser = useContext(FirebaseUserContext);

  return firebaseUser;
};

export default useFirebaseUser;
