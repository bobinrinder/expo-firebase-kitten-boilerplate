import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import ImageOverlay from "./../../../components/ImageOverlay/ImageOverlay";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import useFirebaseUser from "./../../../hooks/useFirebaseUser";
import OnboardingTopBar from "./../../../components/OnboardingTopBar/OnboardingTopBar";

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

export const PushNotificationScreen = ({ navigation }) => {
  const [firebaseUser] = useFirebaseUser();

  const onSignInButtonPress = async () => {
    const token = await registerForPushNotificationsAsync();

    await firebaseUser.update({
      onboardingStep: "ProfileImageScreen",
      expoPushToken: token || null,
    });

    navigation && navigation.navigate("ProfileImageScreen");
  };

  return (
    <ImageOverlay
      style={styles.container}
      source={require("./../../../assets/image-background.jpg")}
    >
      <SafeAreaView>
        <OnboardingTopBar nextScreen="ProfileImageScreen" />
        <View style={styles.headerContainer}>
          <Text category="h1" status="control">
            Push Notifications
          </Text>
          <Text style={styles.signInLabel} category="s1" status="control">
            To get all the benefits of our app, let us send you push
            notifications.
          </Text>
        </View>
        <Button
          style={styles.signInButton}
          size="giant"
          onPress={onSignInButtonPress}
          // disabled={authStore.isLoggingIn}
        >
          Continue
        </Button>
      </SafeAreaView>
    </ImageOverlay>
  );
};

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice && Platform.OS !== "web") {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
