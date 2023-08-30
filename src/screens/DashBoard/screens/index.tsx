import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useContext } from "react";

import SearchScreen from "./Search";
import Settings from "./Settings";

import Setting from "../../../../assets/icons/Setting-light.svg";
import Search from "../../../../assets/icons/Search-light.svg";

import SearchActive from "../../../../assets/icons/Search.svg";
import SettingActive from "../../../../assets/icons/Setting-active.svg";
import { ThemeContext } from "../../../../utils/contexts/ThemeProvider";
import { colors } from "../../../../utils/colors";

export type BottomNavigatorParamList = {
  Search: undefined;
  Favorites: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<BottomNavigatorParamList>();

const getIcons = (title: string, isActive: boolean) => {
  const style: any = { alignSelf: "center" };

  switch (title) {
    case "Search":
      if (isActive) {
        return <SearchActive style={style} />;
      } else {
        return <Search style={style} />;
      }

    case "Settings":
      if (isActive) {
        return <SettingActive style={style} />;
      } else {
        return <Setting style={style} />;
      }
  }
};

function MyTabBar({ state, descriptors, navigation }: any) {
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        elevation: 10,
        backgroundColor: activeColors.cardBg,
        paddingVertical: 10,
        paddingHorizontal: 20
      }}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={route.key}
            style={{ paddingHorizontal: 50 }}
          >
            {getIcons(label, isFocused)}
            <Text
              style={{
                color: isFocused ? "#FF5C00" : "#B9BCBE",
                fontFamily: "Inter-Medium"
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function Home() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
