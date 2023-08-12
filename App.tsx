// In App.js in a new project

import { useCallback, useMemo } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import SearchScreen from "./src/Search";
import { SafeAreaView, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import DetailsScreen from "./src/Details";
import useTheme from "./utils/Hooks";

export type RootStackParamList = {
  Search: undefined;
  Details: { username: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.ttf"),
    "Inter-Normal": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-Semibold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Inter-Extra": require("./assets/fonts/Inter-ExtraBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Search"
          >
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </View>
  );
}

export default App;
