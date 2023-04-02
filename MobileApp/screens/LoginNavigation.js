import React from 'react';

//stack navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from './Login';
import Signup from './Signup';
import MainNavigation from './MainNavigation';
import { SafeAreaView, StatusBar, View } from 'react-native';

import { Colors } from '../components/styles';
import { useFonts } from '@expo-google-fonts/lexend-deca';

const {darkLight} = Colors

const Stack = createStackNavigator();

const LoginNavigation = () => {
    let [fontsLoaded] = useFonts({
        'LexendDeca-Regular': require('./../assets/fonts/LexendDeca-Regular.ttf'),
      });
    return (
        
        <NavigationContainer>
            <StatusBar hidden={false} backgroundColor={darkLight}/>
            <Stack.Navigator
                screenOptions={{
                    headerShown:false
                }}
                initialRouteName="Login"
            >
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Signup" component={Signup}/>
                <Stack.Screen name="MainNavigation" component={MainNavigation}/>
            </Stack.Navigator>
        </NavigationContainer>
        
    )
}

export default LoginNavigation;