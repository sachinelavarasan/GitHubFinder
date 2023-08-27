import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DetailsScreen from './screens/Details';
import Main from './screens';
import SearchHistory from './screens/SearchHistory';

export type HomeStackNavigatorParamList = {
  Main: undefined;
  Details: { username: any };
  SearchHistory: undefined;
};

const Stack = createNativeStackNavigator<HomeStackNavigatorParamList>();

export default function DashBoard() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="SearchHistory" component={SearchHistory} />
    </Stack.Navigator>
  );
}
