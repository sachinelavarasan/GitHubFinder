import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { darkTheme, lightTheme } from "../utils/colors";

export default function useTheme() {
  const [theme, setTheme] = useState<any>(darkTheme);
  const [isDark, setIsDark] = useState<boolean>(true);
  const getTheme = async () => {
    try {
      let value = await AsyncStorage.getItem("theme");
      if (value !== null) {
        switch (value) {
          case "dark":
            setTheme(darkTheme);
            break;
          case "light":
            setTheme(lightTheme);
            break;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  const setThemes = async (isDark: boolean) => {
    try {
      if (isDark) {
        await AsyncStorage.setItem("theme", "dark");
        setIsDark(true);
      } else {
        await AsyncStorage.setItem("theme", "light");
        setIsDark(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getTheme();
  }, [isDark]);

  return [theme, isDark, setThemes];
}
