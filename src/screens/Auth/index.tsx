import React, { useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CommonActions, useNavigation } from '@react-navigation/native';

import { RootStackNavigatorParamList } from '../../../App';

type authScreenProp = StackNavigationProp<RootStackNavigatorParamList>;

const Auth = () => {
  const navigation = useNavigation<authScreenProp>();

  const checkIsLoggedIn = useCallback(async () => {
    try {
      const tokenId = await AsyncStorage.getItem('@token');
      if (tokenId) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }]
          })
        );
        return false;
      }

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }]
        })
      );
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator animating />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Auth;
