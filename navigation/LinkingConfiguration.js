import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: "/Home/HomeScreen/",
            },
          },
          Profile: {
            screens: {
              ProfileScreen: "/Profile/ProfileScreen",
              ProfileSettingsScreen: "/Profile/ProfileSettingsScreen",
            },
          },
        },
      },
      Auth: {
        screens: {
          SignUpScreen: "/Auth/SignUpScreen/",
          LoginScreen: "/Auth/LoginScreen",
          ForgotPasswordScreen: "/Auth/ForgotPasswordScreen",
        },
      },
      Onboarding: {
        screens: {
          PushNotificationScreen: "/Onboarding/PushNotificationScreen/",
          ProfileImageScreen: "/Onboarding/ProfileImageScreen/",
        },
      },
      NotFound: "*",
    },
  },
};
