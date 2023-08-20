import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DetailsScreen from './screens/Details';
import Main from './screens';

export type HomeStackNavigatorParamList = {
  Main: undefined;
  Details: { username: any };
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
    </Stack.Navigator>
  );
}
