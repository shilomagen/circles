import React, { useEffect } from 'react';
import { UserProvider } from '../../providers/user';
import { View } from 'react-native';
import { AuthService } from '../../services/auth';
import { FirebaseService } from '../../services/firebase';

const App = () => {

  const authService = AuthService();
  const firebaseService = FirebaseService();

  useEffect(() => {
    firebaseService.initialize();

  }, []);

  return (
    <View>
      <UserProvider user={}>
      </UserProvider>

    </View>
  );
};
