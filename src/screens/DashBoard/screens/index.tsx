import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import SearchScreen from './Search';
import Favorites from './Favorites';
import Settings from './Settings';

import SearchActive from '../../../../assets/icons/Search.svg';
import Favorite from '../../../../assets/icons/Bookmark-light.svg';
import Setting from '../../../../assets/icons/Setting-light.svg';

export type BottomNavigatorParamList = {
  Search: undefined;
  Favorites: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<BottomNavigatorParamList>();

const getIcons = (title: string, isActive: boolean) => {
  const style: any = { alignSelf: 'center' };

  switch (title) {
    case 'Search':
      if (isActive) {
        return <SearchActive style={style} />;
      } else {
        return <SearchActive style={style} />;
      }

    case 'Favorites':
      if (isActive) {
        return <SearchActive style={style} />;
      } else {
        return <Favorite style={style} />;
      }

    case 'Settings':
      if (isActive) {
        return <SearchActive style={style} />;
      } else {
        return <Setting style={style} />;
      }
  }
};

function MyTabBar({ state, descriptors, navigation }: any) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 10,
        backgroundColor: '#FFF',
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
            key={route.key}
          >
            {getIcons(label, isFocused)}
            <Text
              style={{
                color: isFocused ? '#FF5C00' : '#B9BCBE',
                fontFamily: 'Inter-Medium'
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
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
