import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import { PushNotificationScreen } from "./../screens/onboarding/PushNotificationScreen";
import { ProfileImageScreen } from "./../screens/onboarding/ProfileImageScreen";
import useFirebaseUser from "./../hooks/useFirebaseUser";

const OnboardingStack = createStackNavigator();

export default function OnboardingNavigator() {
  const [firebaseUser] = useFirebaseUser();

  return (
    <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
      {firebaseUser?.onboardingStep === "PushNotificationScreen" && (
        <OnboardingStack.Screen
          name="PushNotificationScreen"
          component={PushNotificationScreen}
          options={{ headerTitle: "PushNotificationScreen" }}
        />
      )}
      {firebaseUser?.onboardingStep === "ProfileImageScreen" && (
        <OnboardingStack.Screen
          name="ProfileImageScreen"
          component={ProfileImageScreen}
          options={{ headerTitle: "ProfileImageScreen" }}
        />
      )}
    </OnboardingStack.Navigator>
  );
}
