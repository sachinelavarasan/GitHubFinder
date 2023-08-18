import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from './screens/Search';
import DetailsScreen from './screens/Details';
import { Text, TouchableOpacity, View } from 'react-native';
import SearchActive from '../../../assets/icons/Search.svg';

export type BottomNavigatorParamList = {
  Search: undefined;
  Details: { username: string };
  Favorite: { username: string };
};

const Tab = createBottomTabNavigator<BottomNavigatorParamList>();

function MyTabBar({ state, descriptors, navigation }: any) {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 10,
        elevation: 10,
        backgroundColor: '#FFF'
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
            type: 'tabPress',
            target: route.key
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
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
            style={{
              flex: 1,
              alignItems: 'center'
            }}
            key={route.key}
          >
            <SearchActive />

            <Text style={{ color: isFocused ? '#FF5C00' : '#B9BCBE' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function DashBoard() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Details" component={DetailsScreen} />
    </Tab.Navigator>
  );
}
