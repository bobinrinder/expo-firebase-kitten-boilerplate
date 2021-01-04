import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import { SignUpScreen } from "./../screens/auth/SignUpScreen";
import { LoginScreen } from "./../screens/auth/LoginScreen";
import { ForgotPasswordScreen } from "./../screens/auth/ForgotPasswordScreen";

const AuthStack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerTitle: "SignUpScreen" }}
      />
      <AuthStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerTitle: "LoginScreen" }}
      />
      <AuthStack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{ headerTitle: "ForgotPasswordScreen" }}
      />
    </AuthStack.Navigator>
  );
}
