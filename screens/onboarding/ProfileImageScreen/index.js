import React, { useState, useEffect } from "react";
import { StyleSheet, View, Platform } from "react-native";
import {
  Button,
  Text,
  TopNavigation,
  Avatar,
  Spinner,
} from "@ui-kitten/components";
import ImageOverlay from "./../../../components/ImageOverlay/ImageOverlay";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import useFirebaseUser from "./../../../hooks/useFirebaseUser";
import firebase from "firebase/app";
import "firebase/storage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 216,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
});

const SkipText = (props) => (
  <Text
    appearance="alternative"
    category="s1"
    style={{ paddingRight: 10 }}
    {...props}
  >
    Skip
  </Text>
);

export const ProfileImageScreen = () => {
  const [firebaseUser] = useFirebaseUser();

  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const onSignInButtonPress = async () => {
    setIsUploading(true);
    const publicImageUrl = await uploadImageAsync(
      image,
      firebaseUser.uid
      // setProgress
    );

    await firebaseUser.updateProfile({ photoURL: publicImageUrl });

    await firebaseUser.update({
      photoURL: publicImageUrl,
      hasCompletedOnboarding: true,
    });

    setIsUploading(false);
  };

  return (
    <ImageOverlay
      style={styles.container}
      source={require("./../../../assets/image-background.jpg")}
    >
      <SafeAreaView>
        <TopNavigation accessoryRight={SkipText} appearance="control" />
        <View style={styles.headerContainer}>
          <Text category="h1" status="control">
            Profile Image
          </Text>
          <Text style={styles.signInLabel} category="s1" status="control">
            Help your friends identify you.
          </Text>
        </View>
        <Button
          style={styles.signInButton}
          size="giant"
          onPress={pickImage}
          // disabled={authStore.isLoggingIn}
        >
          Pick Image
        </Button>
        {image && (
          <Avatar
            source={{ uri: image }}
            size="giant"
            style={{ width: 200, height: 200 }}
          />
        )}
        {/* {progress > 0 && <Text category="s1">{progress + "%"}</Text>} */}
        <Button
          style={styles.signInButton}
          size="giant"
          onPress={onSignInButtonPress}
          disabled={isUploading}
        >
          {isUploading ? <Spinner /> : "Continue"}
        </Button>
      </SafeAreaView>
    </ImageOverlay>
  );
};

async function uploadImageAsync(
  uri,
  fileName,
  setProgress,
  filePath = "/images/profile/"
) {
  try {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const ref = firebase
      .storage()
      .ref()
      .child(filePath + fileName);
    const snapshot = await ref.put(blob); //.on(
    //   "state_changed",
    //   (snapshot) => {
    //     if (setProgress) {
    //       const progress = Math.round(
    //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //       );
    //       setProgress(progress);
    //     }
    //   },
    //   (error) => this.setState({ error: error.message })
    // );

    // We're done with the blob, close and release it
    if (typeof blob.close === "function") {
      blob.close();
    }

    return await snapshot.ref.getDownloadURL();
  } catch (err) {
    console.log(err);
    toast.show("Error uploading image, sorry! " + uri);
    return null;
  }
}
