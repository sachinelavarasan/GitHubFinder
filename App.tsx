// In App.js in a new project
import { useCallback, useState, useEffect } from "react";
import { SafeAreaView, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import SearchScreen from "./src/Search";
import DetailsScreen from "./src/Details";
import { ThemeContext } from "./contexts/ThemeProvider";
import { getData, storeData } from "./utils/asyncStorage";

export type RootStackParamList = {
  Search: undefined;
  Details: { username: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const [theme, setTheme] = useState({ mode: "dark" });

  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.ttf"),
    "Inter-Normal": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-Semibold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Inter-Extra": require("./assets/fonts/Inter-ExtraBold.ttf"),
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
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar backgroundColor={"#000"} />
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName="Search"
            >
              <Stack.Screen
                name="Search"
                component={SearchScreen}
                options={{ animation: "fade_from_bottom" }}
              />
              <Stack.Screen
                name="Details"
                component={DetailsScreen}
                options={{ animation: "fade_from_bottom" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </View>
    </ThemeContext.Provider>
  );
}

export default App;
