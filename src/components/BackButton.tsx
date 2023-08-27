import { Text, View, TouchableOpacity } from "react-native";
import { useContext } from "react";

import BackLight from "../../assets/icons/back-light.svg";
import BackDark from "../../assets/icons/back-dark.svg";
import { ThemeContext } from "../../utils/contexts/ThemeProvider";
import { colors } from "../../utils/colors";

const BackButton = ({ onPress }: { onPress: () => void }) => {
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignSelf: "flex-start"
      }}
      onPress={onPress}
    >
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {theme.mode === "dark" ? <BackDark /> : <BackLight />}
        <Text
          style={{
            color: activeColors.back,
            fontSize: 12,
            fontFamily: "Inter-Medium"
          }}
        >
          Back
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;
