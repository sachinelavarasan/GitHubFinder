import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { darkTheme, lightTheme } from "../utils/colors";

export default function useTheme() {
  const [theme, setTheme] = useState<any>(darkTheme);
  const getTheme = async () => {
    try {
      const value = await AsyncStorage.getItem("theme");
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
  useEffect(() => {
    getTheme();
  }, []);
  return [theme];
}
