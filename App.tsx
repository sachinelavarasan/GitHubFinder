// In App.js in a new project
import { useCallback, useState, useEffect } from "react";
import { View, StatusBar, Text, LogBox } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeContext } from "./utils/contexts/ThemeProvider";
import { getData, storeData } from "./utils/asyncStorage";
import { createStackNavigator } from "@react-navigation/stack";
import Auth from "./src/screens/Auth";
import Login from "./src/screens/Auth/screens/Login";
import Register from "./src/screens/Auth/screens/Register";
import DashBoard from "./src/screens/DashBoard";

import { CommonModal } from "./src/components";

// Ignore log notification by message
LogBox.ignoreAllLogs();

export type RootStackNavigatorParamList = {
  Auth: undefined;
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
};

const Stack = createStackNavigator<RootStackNavigatorParamList>();

function App() {
  const [theme, setTheme] = useState({ mode: "dark" });
  const [isOnline, setIsOnline] = useState(true);

  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.ttf"),
    "Inter-Normal": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-Semibold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Inter-Extra": require("./assets/fonts/Inter-ExtraBold.ttf")
  });

  const updateTheme = (newTheme: any) => {
    let mode;
    if (!newTheme) {
      mode = theme.mode === "dark" ? "light" : "dark";
      newTheme = { mode };
    }
    setTheme(newTheme);
    storeData("appTheme", newTheme);
  };

  const fetchSelectedTheme = async () => {
    try {
      let seletedTheme = await getData("appTheme");
      if (seletedTheme) {
        updateTheme(seletedTheme);
      }
    } catch ({ message }: any) {
      alert(message);
    }
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    fetchSelectedTheme();
    // Subscribe
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.type === "cellular" || state.type === "wifi") {
        if (!state.isConnected) {
          setIsOnline(true);
        } else {
          setIsOnline(false);
        }
      } else {
        setIsOnline(true);
      }
    });
    // Unsubscribe
    return () => unsubscribe();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeContext.Provider value={{ theme, updateTheme }}>
        <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
          <CommonModal
            isShow={isOnline}
            onClose={() => {
              setIsOnline(!isOnline);
            }}
          >
            <Text style={{ fontFamily: "Inter-Bold", fontSize: 16 }}>
              You are in Offline. Please, Check your network connection
            </Text>
          </CommonModal>
          <StatusBar barStyle="dark-content" backgroundColor={"white"} />
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Auth"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Auth" component={Auth} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Dashboard" component={DashBoard} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </ThemeContext.Provider>
    </SafeAreaProvider>
  );
}

export default App;
