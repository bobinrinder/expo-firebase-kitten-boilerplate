import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import NotFoundScreen from "../screens/common/NotFoundScreen";
import LoadingScreen from "../screens/common/LoadingScreen";

import AuthNavigator from "./AuthNavigator";
import OnboardingNavigator from "./OnboardingNavigator";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

import useFirebaseUser from "./../hooks/useFirebaseUser";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }) {
  const [firebaseUser, loadingFirebaseUser] = useFirebaseUser();

  if (loadingFirebaseUser) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

function RootNavigator() {
  const [firebaseUser] = useFirebaseUser();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!firebaseUser && <Stack.Screen name="Auth" component={AuthNavigator} />}
      {firebaseUser && firebaseUser.hasCompletedOnboarding && (
        <Stack.Screen name="Root" component={BottomTabNavigator} />
      )}
      {firebaseUser && !firebaseUser.hasCompletedOnboarding && (
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      )}
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}
