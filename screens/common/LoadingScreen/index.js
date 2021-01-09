import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NotFoundScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
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
