import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useFirebaseUser from "./../../../hooks/useFirebaseUser";
import * as firebase from "firebase";

export default function HomeScreen({ navigation }) {
  const firebaseUser = useFirebaseUser();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi {firebaseUser?.email} </Text>
      <Text style={styles.title}>
        You have {!firebaseUser?.hasCompletedOnboarding ? "not" : ""} completed
        onboarding
      </Text>
      <TouchableOpacity
        onPress={() => navigation.replace("Auth")}
        style={styles.link}
      >
        <Text style={styles.linkText}>Go to Auth</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.replace("Onboarding")}
        style={styles.link}
      >
        <Text style={styles.linkText}>Go to Onboarding</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => firebase.auth().signOut()}
        style={styles.link}
      >
        <Text style={styles.linkText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
