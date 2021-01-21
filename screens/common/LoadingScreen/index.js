import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Spinner } from "@ui-kitten/components";

export default function NotFoundScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Spinner size="giant" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
