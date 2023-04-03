import React from 'react';
import { useFonts } from 'expo-font';
import Chat from './screens/Chat';

//React Navigation stack
import LoginNavigation from './screens/LoginNavigation';

const App = () => {
  const [fontLoaded] = useFonts({
    'LexendDeca-Regular': require('./assets/fonts/LexendDeca-Regular.ttf'),
  });

  if (!fontLoaded) {
    return null; // tutaj można umieścić dowolny ekran ładowania
  }

  return (
    <LoginNavigation />
  );
};

export default App;