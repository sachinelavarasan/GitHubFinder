import { StyleSheet, SafeAreaView } from "react-native";
import React from "react";

const SafeAreaViewComponent = ({ children }: { children: JSX.Element }) => (
  <SafeAreaView style={styles.container}>{children}</SafeAreaView>
);
export default SafeAreaViewComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  }
});
