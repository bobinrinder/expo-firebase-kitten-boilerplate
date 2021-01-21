import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import { PushNotificationScreen } from "./../screens/onboarding/PushNotificationScreen";
import { ProfileImageScreen } from "./../screens/onboarding/ProfileImageScreen";

const OnboardingStack = createStackNavigator();

export default function OnboardingNavigator() {
  return (
    <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
      <OnboardingStack.Screen
        name="PushNotificationScreen"
        component={PushNotificationScreen}
        options={{ headerTitle: "PushNotificationScreen" }}
      />
      <OnboardingStack.Screen
        name="ProfileImageScreen"
        component={ProfileImageScreen}
        options={{ headerTitle: "ProfileImageScreen" }}
      />
    </OnboardingStack.Navigator>
  );
}
