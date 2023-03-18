import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Screens
import HomePage from './navigation_screens/HomePage';
import MessagesScreen from './navigation_screens/MessagesScreen';
import ProfileScreen from './navigation_screens/ProfileScreen';

import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import { Colors } from '../components/styles';

const { darkLight } = Colors

//Screen names
const homeName = 'Strona główna';
const profileName = 'Profil';
const messagesName = 'Wiadomości';

const Tab = createBottomTabNavigator();

export default function MainNavigation() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
                <StatusBar
                    animated={true}
                    backgroundColor={darkLight}
                />
                <Tab.Navigator
                    initialRouteName={homeName}
                    screenOptions={({ route }) => ({
                        tabBarHideOnKeyboard:true,
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;
                            let rn = route.name;

                            if (rn == homeName) {
                                iconName = focused ? 'home' : 'home-outline'
                            }
                            else if (rn == profileName) {
                                iconName = focused ? 'person' : 'person-outline'
                            } else if (rn == messagesName) {
                                iconName = focused ? 'chatbubbles' : 'chatbubbles-outline'
                            }

                            return <Ionicons name={iconName} size={size} color={color} />;

                        },
                        headerShown: false,
                        tabBarShowLabel: false,
                        "tabBarActiveTintColor": "#4A4E69",
                        "tabBarInactiveTintColor": "grey",
                        "tabBarLabelStyle": {
                            "paddingBottom": 10,
                            "fontSize": 10
                        },

                        "tabBarStyle": [
                            {
                                "display": "flex"
                            },
                            null
                        ]
                    })}
                //Chowanie paska nawigacji po wysunięciu klawiatury
                /*tabBarOptions={{
                    keyboardHidesTabBar: true
                }}
                /*tabBarOptions={{
                     activeTintColor: '#4A4E69',
                     inactiveTintColor: 'grey',
                     labelStyle: { paddingBottom: 10, fontSize: 10},
                     style: {padding: 10, height: 70}
                }}*/

                >

                    <Tab.Screen name={profileName} component={ProfileScreen} />
                    <Tab.Screen name={homeName} component={HomePage} />
                    <Tab.Screen name={messagesName} component={MessagesScreen} />

                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaView>


    );
};

