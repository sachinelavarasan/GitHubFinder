import React, { useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View, Image, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CommonActions, useNavigation } from "@react-navigation/native";

import { RootStackNavigatorParamList } from "../../../App";
import Constants from "expo-constants";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  Extrapolate,
  withRepeat,
  withDelay,
  Easing,
  cancelAnimation
} from "react-native-reanimated";

type authScreenProp = StackNavigationProp<RootStackNavigatorParamList>;

const Pulse = ({ delay }: any) => {
  const animation = useSharedValue(0);
  useEffect(() => {
    animation.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 2000,
          easing: Easing.linear
        }),
        -1,
        false
      )
    );
    return () => {
      cancelAnimation(animation);
    };
  }, []);
  const animatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      animation.value,
      [0, 1],
      [0.6, 0],
      Extrapolate.CLAMP
    );
    return {
      opacity: opacity,
      transform: [{ scale: animation.value }]
    };
  });
  return <Animated.View style={[styles.circle, animatedStyles]} />;
};

const Auth = () => {
  const navigation = useNavigation<authScreenProp>();

  const checkIsLoggedIn = useCallback(async () => {
    try {
      const tokenId = await AsyncStorage.getItem("@token");
      if (tokenId) {
        setTimeout(() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Dashboard" }]
            })
          );
        }, 1000);
        return false;
      }

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }]
        })
      );
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          style={styles.innerCircle}
          source={require("../../../assets/app-icon.png")}
        />

        <Pulse delay={0} />
        <Pulse delay={500} />
        <Pulse delay={1000} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  circle: {
    width: 200,
    borderRadius: 100,
    height: 200,
    position: "absolute",
    borderColor: "#b053e2",
    borderWidth: 4,
    backgroundColor: "#a60ee8"
  },
  innerCircle: {
    width: 80,
    borderRadius: 40,
    height: 80,
    zIndex: 100,
    position: "absolute",
    backgroundColor: "white"
  }
});

export default Auth;
