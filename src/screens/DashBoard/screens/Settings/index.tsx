import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Dimensions,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useContext, useCallback, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { CommonActions, useFocusEffect } from "@react-navigation/native";

import { ThemeContext } from "../../../../../utils/contexts/ThemeProvider";
import { colors } from "../../../../../utils/colors";

import DarkThemeIcon from "../../../../../assets/theme/moon.svg";
import LightThemeIcon from "../../../../../assets/theme/sun.svg";
import SearchHistoryIcon from "../../../../../assets/icons/search-history.svg";
import Logout from "../../../../../assets/icons/logout.svg";
import Header from "../../components/Header";
import { BottomNavigatorParamList } from "..";
import { HomeStackNavigatorParamList } from "../..";
import { getData } from "../../../../../utils/asyncStorage";

type Props = StackScreenProps<
  HomeStackNavigatorParamList & BottomNavigatorParamList,
  "Settings"
>;

const Settings = ({ route, navigation }: Props) => {
  const [user, setUser] = useState<any>(null);
  const { theme, updateTheme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const styles = makeStyles(activeColors);

  const logOut = useCallback(async () => {
    try {
      await AsyncStorage.removeItem("@token");
      await AsyncStorage.removeItem("appTheme");
      await AsyncStorage.removeItem("@searchWords");
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

  useFocusEffect(
    useCallback(() => {
      const fetchUser = async () => {
        try {
          const user = await getData("@user");
          setUser(user);
        } catch (e) {
          // Handle error
        }
      };
      fetchUser();
      return () => {
        fetchUser();
      };
    }, [])
  );

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
      <View
        style={{ borderBottomColor: activeColors.bCard, borderBottomWidth: 1 }}
      >
        <Text style={[styles.subheader, { color: activeColors.primaryText }]}>
          Profile Details
        </Text>
        <View
          style={{
            flexDirection: "row"
          }}
        >
          <Text style={styles.col}>Name</Text>
          <Text style={styles.cell}>{user?.name}</Text>
        </View>
        <View
          style={{
            flexDirection: "row"
          }}
        >
          <Text style={styles.col}>Email</Text>
          <Text style={styles.cell}>{user?.email}</Text>
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
    },
    col: {
      width: 100,
      paddingVertical: 10,
      paddingHorizontal: 12,
      color: theme.primaryText,
      fontSize: 14,
      fontFamily: "Inter-Medium"
    },
    cell: {
      width: 200,
      paddingVertical: 10,
      paddingHorizontal: 12,
      color: theme.subText,
      fontSize: 14,
      fontFamily: "Inter-Medium"
    }
  });
