import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useFonts } from 'expo-font';
import Loading from './components/Loading';

// import * as SplashScreen from 'expo-splash-screen';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { CredentialsContext } from './components/CredentialsContext';

//React Navigation stack
import LoginNavigation from './screens/LoginNavigation';

//SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontLoaded] = useFonts({
    'LexendDeca-Regular': require('./assets/fonts/LexendDeca-Regular.ttf'),
    'LexendDeca-SemiBold': require('./assets/fonts/LexendDeca-SemiBold.ttf'),
  });

  // const [appReady, setAppReady] = useState(false);
  // const [storedCredentials, setStoredCredentials] = useState("");

  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       checkLoginCredentials();
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       // Tell the application to render
  //       setAppReady(true);
  //     }
  //   }

  //   prepare();
  // }, []);

  // const onLayoutRootView = useCallback(async () => {
  //   if (appReady) {
  //     // This tells the splash screen to hide immediately! If we call this after
  //     // `setAppIsReady`, then we may see a blank screen while the app is
  //     // loading its initial state and rendering its first pixels. So instead,
  //     // we hide the splash screen once we know the root view has already
  //     // performed layout.
  //     await SplashScreen.hideAsync();
  //   }
  // }, [appReady]);

  // const checkLoginCredentials = () => {
  //   AsyncStorage
  //   .getItem('designMatchCredentials')
  //   .then((result) => {
  //     if(result !== null) {
  //     setStoredCredentials(JSON.parse(result));
  //     } else {
  //       setStoredCredentials(null);
  //     }

  //   })
  //   .catch(error => console.log(error))
  // }

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