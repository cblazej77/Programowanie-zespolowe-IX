import React from 'react';

//stack navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Login';
import Signup from './Signup';
import MainNavigation from './MainNavigation';
import HomePage from './navigation_screens/HomePage';
import ArtistScreen from './Artist/ArtistScreen';
import CompanyScreen from './Company/CompanyScreen';
import UserCompanyScreen from './User/UserCompanyScreen';
import Chat from './Chat';
import { StatusBar } from 'react-native';

import { Colors } from '../components/styles';

const { darkLight, darkLight2, primary } = Colors;

const Stack = createStackNavigator();

const LoginNavigation = () => {
  return (
    <NavigationContainer>
      <StatusBar hidden={false} backgroundColor={'#000'} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="UserCompanyScreen"
      >
        <Stack.Screen name="MainNavigation" component={MainNavigation} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="ArtistScreen" component={ArtistScreen} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="CompanyScreen" component={CompanyScreen} />
        <Stack.Screen name="UserCompanyScreen" component={UserCompanyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginNavigation;
