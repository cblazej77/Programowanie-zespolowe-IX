import React from 'react';

//stack navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from './Login';
import Signup from './Signup';
import MainNavigation from './MainNavigation';

const Stack = createStackNavigator();

const LoginNavigation = () => {
    return (
        <NavigationContainer>
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