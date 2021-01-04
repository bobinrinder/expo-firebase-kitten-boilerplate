# Expo Firebase Kitten Boilerplate

<p>
  <!-- iOS -->
  <a href="https://itunes.apple.com/app/apple-store/id982107779">
    <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  </a>
  <!-- Android -->
  <a href="https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=blankexample">
    <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  </a>
  <!-- Web -->
  <a href="https://docs.expo.io/workflow/web/">
    <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
  </a>
</p>

This is a basic boilerplate aimed to show a simple setup of Firebase Auth in Expo. After following the setup steps this app provides email sign up, login and password forgot functionality.

Currently included:

- Expo
- React Navigation
- Firebase Auth
- Firebase Firestore
- React Native UI Kitten
- And more!

## Setup

Before getting started, make surer you are setup for React Native, Yarn and that you have an active Firebase project. If you do not meet these prerequisites, follow the links below:

- [Getting started with React Native](https://facebook.github.io/react-native/docs/getting-started.html)
- [Create a new Firebase project](https://console.firebase.google.com/)

### Step 1 - Download and Install

Clone this repo with `git clone git@github.com:bobinrinder/expo-firebase-kitten-boilerplate.git`

Run `cd expo-firebase-kitten-boilerplate && yarn && cp /config/firebaseConfig.example.js /config/fireebaseConfig.js` to enter root project folder and install required modules.

### Step 2 - Enable Email Signup

Ensure the "Email" sign-in provider is enabled on the [Firebase Console](https://console.firebase.google.com/project/_/authentication/providers).

### Step 3 - Firebase Credentials

On the Firebase console, add a new web application and enter your projects details. Afterwards click the `Configuration` and values that are needed into `/config/firebaseConfig.js`.

### Step 5 - Run the app

Run with `expo start`.

## Licence

MIT
