import * as React from 'react';
import Chat from './screens/Chat';
import { useFonts } from '@expo-google-fonts/lexend-deca';

//React Navigation stack
import LoginNavigation from './screens/LoginNavigation';
import { SafeAreaView, View } from 'react-native';

export default function App() {
  let [fontsLoaded] = useFonts({
    'LexendDeca-Regular': require('./assets/fonts/LexendDeca-Regular.ttf'),
  });
  return (
      <LoginNavigation />
  );
}