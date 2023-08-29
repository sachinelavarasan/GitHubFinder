import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Dimensions,
  ImageBackground
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AxiosResponse } from "axios";

import AuthLink from "../../components/AuthLink";
import Input from "../../../../components/Input";
import Spacer from "../../../../components/Spacer";

import { isEmail } from "../../../../../utils/validation";
import { RootStackNavigatorParamList } from "../../../../../App";
import { login } from "../../../../api/api";

import GoIcon from "../../../../../assets/icons/Button-go.svg";

type StateType = string | undefined;

type loginScreenProp = StackNavigationProp<RootStackNavigatorParamList>;
const windowDimensions = Dimensions.get("window").width;
const Login = () => {
  const navigation = useNavigation<loginScreenProp>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<StateType>();
  const [password, setPassword] = useState<StateType>();
  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: "",
    password: ""
  });
  const [isAuthError, setIsAuthError] = useState<string>();

  const signIn = () => {
    setIsAuthError("");
    if (!isEmail(email)) {
      setErrors((state) => ({ ...state, email: "Invalid email" }));
      return false;
    }
    if (!password) {
      setErrors((state) => ({
        ...state,
        password: "Password cannot be an empty"
      }));
      return false;
    }

    setErrors({ email: "", password: "" });

    setIsLoading(true);
    if (email && password) {
      login({ email: email, password: password })
        .then(async ({ data }: AxiosResponse) => {
          await AsyncStorage.setItem("@token", data.token);
          await AsyncStorage.setItem("@user", JSON.stringify(data.user));
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Dashboard" }]
            })
          );

          setEmail("");
          setPassword("");
        })
        .catch((e: any) => {
          console.log(e.response?.data);
          setIsAuthError(e.response?.data.message);
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <KeyboardAvoidingView
      {...(Platform.OS === "ios" ? { behavior: "padding" } : {})}
      style={{ flex: 1, backgroundColor: "#10061C" }}
    >
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps={"always"}
      >
        <ImageBackground
          source={require("../../../../../assets/AppAuthBackground/Background.png")}
          resizeMode="contain"
          style={styles.image}
        />

        <View style={styles.container}>
          <View style={styles.formContainer}>
            <View style={styles.errorContainer}>
              {isAuthError ? (
                <Text style={styles.error}>{isAuthError}</Text>
              ) : null}
            </View>
            <View style={styles.loginContainer}>
              <View>
                <Text style={styles.helloText}>Hello,</Text>
                <Text style={styles.welcomeText}>Welcome Back</Text>
              </View>
              <Input
                value={email}
                placeholder="Enter Email"
                label="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="off"
                onChangeText={(text) => {
                  setErrors({ email: "", password: "" });
                  setEmail(text);
                }}
                error={errors.email}
                borderBottom
                labelStyle={{
                  color: "#FF5C00",
                  padding: 6,
                  fontSize: 18,
                  fontFamily: "Inter-Bold"
                }}
              />
              <Spacer height={15} />
              <Input
                value={password}
                placeholder="Enter password"
                label="Password"
                autoCapitalize="none"
                isPassword
                onChangeText={(text) => {
                  setErrors({ email: "", password: "" });
                  setPassword(text);
                }}
                error={errors.password}
                borderBottom
                labelStyle={{
                  color: "#FF5C00",
                  padding: 6,
                  fontSize: 18,
                  fontFamily: "Inter-Bold"
                }}
              />
              <Spacer height={15} />
              <View style={styles.btnContainer}>
                <Text style={styles.buttonText}>Sign In</Text>
                <TouchableOpacity
                  style={[styles.button, isLoading ? styles.disable : {}]}
                  onPress={() => {
                    if (!isLoading) {
                      signIn();
                    }
                  }}
                >
                  {isLoading ? (
                    <ActivityIndicator
                      animating
                      color={"#fff"}
                      style={styles.loader}
                    />
                  ) : (
                    <GoIcon />
                  )}
                </TouchableOpacity>
              </View>
              <Spacer height={20} />
              <AuthLink
                linkText="Sign Up Here"
                onPress={() => {
                  navigation.navigate("Register");
                }}
              />
              <Spacer height={20} />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 35,
    justifyContent: "center"
  },
  image: {
    position: "absolute",
    top: -200,
    left: 0,
    right: 0,
    bottom: 0
  },
  loginContainer: {
    backgroundColor: "#69585839",
    padding: 15,
    borderRadius: 10
  },
  formContainer: {
    justifyContent: "center"
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 15
  },
  button: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  loader: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
    fontFamily: "Inter-Medium"
  },
  disable: {
    opacity: 0.8
  },
  textDisable: { opacity: 0 },
  errorContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  error: {
    fontSize: 16,
    color: "red",
    fontFamily: "Inter-Medium",
    paddingHorizontal: 35
  },
  helloText: { color: "#000", fontFamily: "Inter-Medium", fontSize: 36 },
  welcomeText: { color: "#000", fontFamily: "Inter-Normal", fontSize: 30 },
  buttonText: { color: "#fff", fontFamily: "Inter-Bold", fontSize: 18 }
});

export default Login;
