import React from 'react';

//stack navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from './Login';
import Signup from './Signup';
import MainNavigation from './MainNavigation';
import HomePage from './navigation_screens/HomePage';
import { StatusBar } from 'react-native';

import { Colors } from '../components/styles';

const { darkLight, darkLight2, primary } = Colors

const Stack = createStackNavigator();

const LoginNavigation = () => {
    return (

        <NavigationContainer>
                <StatusBar hidden={false} backgroundColor={"#000"} />
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName="Login"
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="MainNavigation" component={MainNavigation} />
                <Stack.Screen name="HomePage" component={HomePage} />

            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default LoginNavigation;