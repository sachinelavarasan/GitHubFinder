import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from "react-native";
import React from "react";

interface ExtraButtonProps {
  linkText: string;
}
//Touchable opacity default props and custom props for this button
const AuthLink: React.FC<ExtraButtonProps & TouchableOpacityProps> = ({
  linkText,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity {...props}>
        <Text style={styles.linkText}>{linkText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthLink;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  linkText: {
    color: "#FFFFFF",
    fontSize: 16,
    textDecorationLine: "underline",
    fontFamily: "Inter-Bold",
    fontStyle: "normal"
  }
});
