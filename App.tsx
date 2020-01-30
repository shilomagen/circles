import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Firebase } from './src/services/firebase';
import LoginScreen from './src/screens/Login.screen';
import firebase from 'firebase';
import { UserProvider } from './src/providers/user';
import { AuthService } from './src/services/auth';

export default function App() {
  const [user, setUser] = useState<firebase.User | null>(null);
  useEffect(() => {
    Firebase().initialize();
    AuthService().onAuthStateChange(setUser);
  }, []);
  return (
    <View style={styles.container}>
      <UserProvider user={user}>
        <LoginScreen/>
      </UserProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
