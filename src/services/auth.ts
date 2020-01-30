import { initializeAsync, logInWithReadPermissionsAsync } from 'expo-facebook';
import Constants from 'expo-constants';
import { FACEBOOK_APP_ID } from 'react-native-dotenv';
import firebase, { User } from 'firebase';

export interface IAuthService {
  loginWithFacebook(): Promise<User>;
  onAuthStateChange(cb: (user: User) => void)
}
export const AuthService = (): IAuthService => {
  const loginWithFacebook = async () => {
    try {
      const appName = Constants.manifest.name;
      await initializeAsync(FACEBOOK_APP_ID, appName);
      const facebookLoginResult = await logInWithReadPermissionsAsync({ permissions: ['public_profile'] });
      if (facebookLoginResult.type === 'success') {
        const { token } = facebookLoginResult;
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        const { user } = await firebase.auth().signInWithCredential(credential);
        return user;
      }
    } catch (e) {
      console.warn('Error!', e);
    }
  };

  const onAuthStateChange = (cb: (user: User) => void) => firebase.auth().onAuthStateChanged(cb);

  return {
    loginWithFacebook,
    onAuthStateChange
  };
};
