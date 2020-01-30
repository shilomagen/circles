import React from 'react';
import { Button, View } from 'react-native';
import { AuthService } from '../services/auth';

const LoginScreen = () => {
  const authService = AuthService();
  return (
    <View>
      <Button onPress={authService.loginWithFacebook} title={'Login with facebook'}/>
    </View>
  );
};

export default LoginScreen;
