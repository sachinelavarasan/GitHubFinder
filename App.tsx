// In App.js in a new project
import { useCallback, useState, useEffect } from 'react';
import { SafeAreaView, View, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { ThemeContext } from './utils/contexts/ThemeProvider';
import { getData, storeData } from './utils/asyncStorage';
import { createStackNavigator } from '@react-navigation/stack';
import Auth from './src/screens/Auth';
import Login from './src/screens/Auth/screens/Login';
import Register from './src/screens/Auth/screens/Register';
import DashBoard from './src/screens/DashBoard';

export type StackNavigatorParamList = {
  Auth: undefined;
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
};

const Stack = createStackNavigator<StackNavigatorParamList>();

function App() {
  const [theme, setTheme] = useState({ mode: 'dark' });

  const [fontsLoaded] = useFonts({
    'Inter-Black': require('./assets/fonts/Inter-Black.ttf'),
    'Inter-Normal': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-Semibold': require('./assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Inter-Extra': require('./assets/fonts/Inter-ExtraBold.ttf')
  });

  const updateTheme = (newTheme: any) => {
    let mode;
    if (!newTheme) {
      mode = theme.mode === 'dark' ? 'light' : 'dark';
      newTheme = { mode };
    }
    setTheme(newTheme);
    storeData('appTheme', newTheme);
  };

  const fetchSelectedTheme = async () => {
    try {
      let seletedTheme = await getData('appTheme');
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
    <SafeAreaProvider>
      <ThemeContext.Provider value={{ theme, updateTheme }}>
        <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
          <StatusBar barStyle="dark-content" backgroundColor={'white'} />
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
