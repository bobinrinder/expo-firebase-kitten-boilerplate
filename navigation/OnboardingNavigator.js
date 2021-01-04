import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import { PushNotificationScreen } from "./../screens/onboarding/PushNotificationScreen";

const OnboardingStack = createStackNavigator();

export default function OnboardingNavigator() {
  return (
    <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
      <OnboardingStack.Screen
        name="PushNotificationScreen"
        component={PushNotificationScreen}
        options={{ headerTitle: "PushNotificationScreen" }}
      />
    </OnboardingStack.Navigator>
  );
}
