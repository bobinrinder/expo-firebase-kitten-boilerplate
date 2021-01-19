import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import Navigation from "./navigation";
import usePushNotifications from "./hooks/usePushNotifications";
import FirebaseUserProvider from "./services/firebase";
import Toast from "react-native-fast-toast";

export default function App() {
  const { notification } = usePushNotifications();

  return (
    <SafeAreaProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <FirebaseUserProvider>
          <Navigation />
        </FirebaseUserProvider>
      </ApplicationProvider>
      <Toast ref={(ref) => (global["toast"] = ref)} />
    </SafeAreaProvider>
  );
}
