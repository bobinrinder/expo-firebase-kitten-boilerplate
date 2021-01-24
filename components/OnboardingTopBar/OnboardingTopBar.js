import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, TopNavigation, Spinner } from "@ui-kitten/components";
import useFirebaseUser from "./../../hooks/useFirebaseUser";

const OnboardingTopBar = ({ nextScreen = null, isLastScreen = false }) => {
  const [firebaseUser] = useFirebaseUser();
  const [isLoading, setIsLoading] = useState(false);

  const SkipText = () => (
    <TouchableOpacity
      onPress={async () => {
        setIsLoading(true);
        if (nextScreen) {
          await firebaseUser.update({
            onboardingStep: nextScreen,
          });
        }
        if (isLastScreen) {
          await firebaseUser.update({
            hasCompletedOnboarding: true,
          });
        }
        setIsLoading(false);
      }}
    >
      <Text appearance="alternative" category="s1" style={{ paddingRight: 10 }}>
        {isLoading ? <Spinner /> : "Skip"}
      </Text>
    </TouchableOpacity>
  );
  return <TopNavigation accessoryRight={SkipText} appearance="control" />;
};

export default OnboardingTopBar;
