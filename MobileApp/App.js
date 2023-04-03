import * as React from 'react';
import Chat from './screens/Chat';
import { useFonts } from '@expo-google-fonts/lexend-deca';

//React Navigation stack
import LoginNavigation from './screens/LoginNavigation';

export default function App() {
  return (
      <LoginNavigation />
  );
}