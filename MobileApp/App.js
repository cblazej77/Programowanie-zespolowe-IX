import * as React from 'react';

//screens
import Login from './screens/Login';
import Signup from './screens/Signup';
import Welcome from './screens/Welcome';
import Chat from './screens/Chat';
import MainNavigation from './screens/MainNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StatusBar } from 'react-native';
import { Colors } from './components/styles';

const Stack = createNativeStackNavigator();

const { darkLight, primary } = Colors

/*export default function App() {
  return <Login />;
}*/

export default function App() {
  return (
    
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={Login}
        >
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainNavigation"
            component={MainNavigation}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  )
}