import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { useContext, useCallback } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { CommonActions } from "@react-navigation/native";

import { ThemeContext } from "../../../../../utils/contexts/ThemeProvider";
import { colors } from "../../../../../utils/colors";

import DarkThemeIcon from "../../../../../assets/theme/moon.svg";
import LightThemeIcon from "../../../../../assets/theme/sun.svg";
import SearchHistoryIcon from "../../../../../assets/icons/search-history.svg";
import Logout from "../../../../../assets/icons/logout.svg";
import Header from "../../components/Header";
import { BottomNavigatorParamList } from "..";
import { HomeStackNavigatorParamList } from "../..";

type Props = StackScreenProps<
  HomeStackNavigatorParamList & BottomNavigatorParamList,
  "Settings"
>;

const Settings = ({ route, navigation }: Props) => {
  const { theme, updateTheme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const styles = makeStyles(activeColors);

  const logOut = useCallback(async () => {
    try {
      await AsyncStorage.removeItem("@token");
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }]
        })
      );
    } catch (e) {
      console.log(e);
    }
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Header title={route.name} />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderBottomColor: activeColors.bCard,
          paddingBottom: 15
        }}
      >
        <Text style={[styles.subheader, { color: activeColors.primaryText }]}>
          Theme
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <View style={{ marginRight: 4 }}>
            {theme.mode === "dark" ? <DarkThemeIcon /> : <LightThemeIcon />}
          </View>
          <Switch
            trackColor={{ false: "#000", true: "#fff" }}
            thumbColor={theme.mode === "dark" ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              updateTheme();
            }}
            value={theme.mode === "dark"}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: activeColors.bCard,
          paddingVertical: 15
        }}
        onPress={() => {
          navigation.navigate("SearchHistory");
        }}
      >
        <SearchHistoryIcon style={{ marginRight: 8 }} />
        <Text style={[styles.subheader, { color: activeColors.primaryText }]}>
          Search History
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: activeColors.bCard,
          paddingVertical: 15
        }}
        onPress={() => {
          logOut();
        }}
      >
        <Logout style={{ marginRight: 8 }} />
        <Text style={[styles.subheader, { color: activeColors.primaryText }]}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const makeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      paddingHorizontal: 20,
      paddingVertical: 20
    },
    header: {
      fontSize: 16,
      color: theme.primaryText,
      fontFamily: "Inter-Extra",
      textTransform: "capitalize",
      paddingVertical: 10
    },
    subheader: {
      fontSize: 14,
      color: theme.primaryText,
      fontFamily: "Inter-Bold",
      textTransform: "capitalize",
      paddingVertical: 8
    }
  });
