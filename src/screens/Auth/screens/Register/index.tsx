import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Text
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import AuthLink from '../../components/AuthLink';
import Input from '../../../../components/Input';
import Spacer from '../../../../components/Spacer';
import { register } from '../../../../api/api';
import { isEmail } from '../../../../../utils/validation';
import { StackNavigatorParamList } from '../../../../../App';

type StateType = string;

type registerScreenProp = StackNavigationProp<StackNavigatorParamList>;

const Register = () => {
  const navigation = useNavigation<registerScreenProp>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<StateType>('');
  const [name, setName] = useState<StateType>('');
  const [password, setPassword] = useState<StateType>('');
  const [errors, setErrors] = useState<{
    email: string;
    password: string;
    name: string;
  }>({
    email: '',
    password: '',
    name: ''
  });
  const [isAuthError, setIsAuthError] = useState<string>();

  const signUp = async () => {
    setIsAuthError('');
    if (!isEmail(email)) {
      setErrors((state) => ({ ...state, email: 'Invalid email' }));
      return false;
    }
    if (!password) {
      setErrors((state) => ({
        ...state,
        password: 'Password cannot be an empty'
      }));
      return false;
    }

    setErrors({ email: '', password: '', name: '' });
    setIsLoading(true);
    if (email && password) {
      register({ email: email, password: password, name: name })
        .then(async ({ data }) => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'login' }]
            })
          );
          setEmail('');
          setPassword('');
          setName('');
        })
        .catch((e) => setIsAuthError(e.response.data.message))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <KeyboardAvoidingView
      {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})}
      style={{ flex: 1 }}
    >
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps={'always'}
      >
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../../../../assets/app-icon.png')}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <View style={styles.errorContainer}>
              {isAuthError ? (
                <Text style={styles.error}>{isAuthError}</Text>
              ) : null}
            </View>
            <Spacer height={25} />
            <View style={styles.loginContainer}>
              <Input
                value={email}
                placeholder="Enter Email"
                label="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="off"
                onChangeText={(text) => {
                  setErrors({ email: '', password: '', name: '' });
                  setEmail(text);
                }}
                error={errors.email}
              />
              <Spacer height={20} />
              <Input
                value={password}
                placeholder="Enter password"
                label="Password"
                autoCapitalize="none"
                isPassword
                onChangeText={(text) => {
                  setErrors({ email: '', password: '', name: '' });
                  setPassword(text);
                }}
                error={errors.password}
              />
              <Spacer height={20} />
              <Input
                value={name}
                placeholder="Enter Name"
                label="Name"
                autoCapitalize="none"
                isPassword
                onChangeText={(text) => {
                  setErrors({ email: '', password: '', name: '' });
                  setName(text);
                }}
                error={errors.name}
              />
              <Spacer height={50} />
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={[styles.button, isLoading ? styles.disable : {}]}
                  onPress={() => {
                    if (!isLoading) {
                      signUp();
                    }
                  }}
                >
                  {isLoading ? (
                    <ActivityIndicator
                      animating
                      color={'#fff'}
                      style={styles.loader}
                    />
                  ) : null}
                  <Text
                    style={[styles.title, isLoading ? styles.textDisable : {}]}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
              <Spacer height={50} />
              <AuthLink
                linkText="Sign In"
                description="Already have an account ?"
                onPress={() => {
                  navigation.navigate('Login');
                }}
              />
              <Spacer height={50} />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: 150,
    width: 150
  },
  loginContainer: {
    justifyContent: 'center',
    paddingHorizontal: 35
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  btnContainer: {
    alignItems: 'center'
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#000',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 25
  },
  loader: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
    fontFamily: 'Inter-Medium'
  },
  disable: {
    opacity: 0.8
  },
  textDisable: { opacity: 0 },
  errorContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  error: {
    fontSize: 16,
    color: 'red',
    fontFamily: 'Inter-Medium',
    paddingHorizontal: 35
  }
});

export default Register;
