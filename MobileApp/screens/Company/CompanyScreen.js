import * as React from 'react';
import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { ChatLabel, Colors } from '../../components/styles';
import CompanyProfile from './CompanyProfile';
import CompanyCommisions from './CompanyCommisions';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
//SecureStoring accessToken
import * as SecureStore from 'expo-secure-store';
import Loading from '../../components/Loading';

const Tab = createMaterialTopTabNavigator();
const { primary, secondary, darkLight, link, black } = Colors;

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (!result) {
    alert('Nie uzyskano danych z klucza: ' + key);
  }
  return result;
}

export default function CompanyScreen({ navigation }) {
  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState('jakis tam cos ');

  // async function getAccessToken() {
  //   const t = await getValueFor('accessToken');
  //   setToken(t);
  // }

  // async function getUserInfo() {
  //   const u = await getValueFor('user');
  //   setUserInfo(JSON.parse(u));
  // }

  // useEffect(() => {
  //   getAccessToken();
  //   getUserInfo();
  // }, []);

  // async function save(key, value) {
  //   await SecureStore.setItemAsync(key, value).catch((error) => {
  //     console.log(error);
  //   });
  // }

  // async function logout() {
  //   save('accessToken', '');
  //   save('user', '');
  //   navigation.navigate('Login');
  // }

  return (
    <>
      {userInfo ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: primary }}>
          <ChatLabel
            style={{
              height: '8%',
              justifyContent: 'space-between',
            }}
          >
             <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="arrow-back" size={38} style={{ color: primary, marginLeft: 5 }} />
            </TouchableOpacity>
          </ChatLabel>
            <Tab.Navigator
              initialRouteName="Profile"
              screenOptions={{
                tabBarIndicatorStyle: { backgroundColor: darkLight },
                tabBarStyle: { backgroundColor: primary, marginTop: 0 },
              }}
            >
              <Tab.Screen
                options={{
                  title: ({ color, focused }) => {
                    return (
                      <Ionicons
                        size={25}
                        name={focused ? 'people' : 'people-outline'}
                        color={focused ? darkLight : secondary}
                      />
                    );
                  },
                }}
                name="Profile"
                component={CompanyProfile}
              />
              <Tab.Screen
                options={{
                  title: ({ color, focused }) => {
                    return (
                      <Ionicons
                        size={25}
                        name={focused ? 'reader' : 'reader-outline'}
                        color={focused ? darkLight : secondary}
                      />
                    );
                  },
                }}
                name="Commisions"
                component={CompanyCommisions}
              />
            </Tab.Navigator>
        </SafeAreaView>
      ) : (
        <Loading />
      )}
    </>
  );
}

const styles = StyleSheet.create({
});
