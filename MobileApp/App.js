import React from 'react';
import { useFonts } from 'expo-font';
import Chat from './screens/Chat';
import Loading from './components/Loading';

//React Navigation stack
import LoginNavigation from './screens/LoginNavigation';

const App = () => {
  const [fontLoaded] = useFonts({
    'LexendDeca-Regular': require('./assets/fonts/LexendDeca-Regular.ttf'),
    'LexendDeca-SemiBold': require('./assets/fonts/LexendDeca-SemiBold.ttf'),
  });

  if (!fontLoaded) {
    return (
      //loading screen
      <Loading />
    );
  }

  return (
    <LoginNavigation />
  );
};

export default App;