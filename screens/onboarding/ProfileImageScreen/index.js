import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, Avatar, Spinner } from "@ui-kitten/components";
import ImageOverlay from "./../../../components/ImageOverlay/ImageOverlay";
import OnboardingTopBar from "./../../../components/OnboardingTopBar/OnboardingTopBar";
import { SafeAreaView } from "react-native-safe-area-context";
import useFirebaseUser from "./../../../hooks/useFirebaseUser";
import {
  pickImage,
  uploadImageAsync,
} from "./../../../utilities/imageUpload/imageUpload";

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

export const ProfileImageScreen = () => {
  const [firebaseUser] = useFirebaseUser();

  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const pickImagePress = async () => {
    const imageUri = await pickImage();
    setImage(imageUri);
  };

  const onSignInButtonPress = async () => {
    setIsUploading(true);

    const publicImageUrl = await uploadImageAsync(image, firebaseUser.uid);

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
        <OnboardingTopBar isLastScreen={true} />
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
          onPress={pickImagePress}
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
        <Button
          style={styles.signInButton}
          size="giant"
          onPress={onSignInButtonPress}
          disabled={isUploading || !image}
        >
          {isUploading ? <Spinner /> : "Continue"}
        </Button>
      </SafeAreaView>
    </ImageOverlay>
  );
};
