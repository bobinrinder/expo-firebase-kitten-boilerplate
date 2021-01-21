import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { Button, Input, Text, Icon, Spinner } from "@ui-kitten/components";
import ImageOverlay from "./../../../components/ImageOverlay/ImageOverlay";
import {
  FacebookIcon,
  GoogleIcon,
  EmailIcon,
  TwitterIcon,
} from "./extra/icons";
import { KeyboardAvoidingView } from "./extra/3rd-party";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase/app";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 216,
  },
  passwordInput: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
  signUpButton: {
    marginVertical: 12,
    marginBottom: 40,
  },
  socialAuthButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  socialAuthContainer: {
    marginTop: 32,
  },
  socialAuthHintText: {
    alignSelf: "center",
    marginBottom: 16,
  },
});

export const LoginScreen = () => {
  const [email, setEmail] = React.useState("m13@m13.com");
  const [password, setPassword] = React.useState("testtest");
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const navigation = useNavigation();

  const onSignInButtonPress = async () => {
    setIsLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log(err);
      toast.show("Something went wrong, sorry!", { type: "danger" });
    } finally {
      setIsLoading(false);
    }
  };

  const onSignUpButtonPress = () => {
    navigation && navigation.navigate("SignUpScreen");
  };

  const onForgotPasswordButtonPress = () => {
    navigation && navigation.navigate("ForgotPasswordScreen");
  };

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  const renderPasswordIcon = (style) => {
    return (
      <TouchableWithoutFeedback onPress={onPasswordIconPress}>
        <Icon {...style} name={passwordVisible ? "eye" : "eye-off"} />
      </TouchableWithoutFeedback>
    );
  };

  return (
    <KeyboardAvoidingView>
      <ImageOverlay
        style={styles.container}
        source={require("./../../../assets/image-background.jpg")}
      >
        <View style={styles.headerContainer}>
          <Text category="h1" status="control">
            Welcome Back
          </Text>
          <Text style={styles.signInLabel} category="s1" status="control">
            Sign in to your account.
          </Text>
        </View>
        <View style={styles.formContainer}>
          <Input
            status="control"
            placeholder="Email"
            autoCapitalize="none"
            accessoryRight={EmailIcon}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            style={styles.passwordInput}
            status="control"
            placeholder="Password"
            accessoryRight={renderPasswordIcon}
            value={password}
            secureTextEntry={!passwordVisible}
            onChangeText={setPassword}
            onSubmitEditing={onSignInButtonPress}
            returnKeyType={"done"}
          />
          <View style={styles.forgotPasswordContainer}>
            <Button
              style={styles.forgotPasswordButton}
              appearance="ghost"
              status="control"
              onPress={onForgotPasswordButtonPress}
            >
              Forgot your password?
            </Button>
          </View>
        </View>
        <Button
          style={styles.signInButton}
          size="giant"
          onPress={onSignInButtonPress}
          disabled={!email || !password || isLoading}
        >
          {isLoading ? <Spinner /> : "SIGN IN"}
        </Button>
        <View style={styles.socialAuthContainer}>
          <Text style={styles.socialAuthHintText} status="control">
            or Sign In using Social Media
          </Text>
          <View style={styles.socialAuthButtonsContainer}>
            <Button
              appearance="ghost"
              status="control"
              size="giant"
              accessoryRight={GoogleIcon}
            />
            <Button
              appearance="ghost"
              status="control"
              size="giant"
              accessoryRight={FacebookIcon}
            />
            <Button
              appearance="ghost"
              status="control"
              size="giant"
              accessoryRight={TwitterIcon}
            />
          </View>
        </View>
        <Button
          style={styles.signUpButton}
          appearance="ghost"
          status="control"
          onPress={onSignUpButtonPress}
        >
          Don't have an account? Sign Up
        </Button>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};
