import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Pressable, Linking } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Colors, RegularText, StatsText, AppText, Avatar, Bubble, Line, HeaderText } from '../../components/styles';
//SecureStoring accessToken
import * as SecureStore from 'expo-secure-store';
import { default as baseURL } from '../../components/AxiosAuth';
import axios from 'axios';
import Loading from '../../components/Loading';
import { Fontisto } from '@expo/vector-icons';

const { darkLight, link, black, primary } = Colors;

const generateBoxShadowStyle = (
  xOffset,
  yOffset,
  shadowColorIos,
  shadowOpacity,
  shadowRadius,
  elevation,
  shadowColorAndroid,
) => {
  if (Platform.OS === 'ios') {
    styles.boxShadow = {
      shadowColor: shadowColorIos,
      shadowOpacity,
      shadowRadius,
      shadowOffset: { width: xOffset, height: yOffset },
    };
  } else if (Platform.OS === 'android') {
    styles.boxShadow = { elevation, shadowColor: shadowColorAndroid };
  }
};

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (!result) {
    alert('Nie uzyskano danych z klucza: ' + key);
  }
  return result;
}

const CompanyProfile = ({ route, navigation }) => {
  const [token, setToken] = useState('');
  const [companyProfile, setcompanyProfile] = useState('dadsa');

  generateBoxShadowStyle(0, 8, '#0F0F0F33', 0.2, 15, 2, '#0F0F0F33');

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // async function getAccessToken() {
  //   const t = await getValueFor('accessToken');
  //   setToken(t);
  //   console.log(t);
  // }

  const OpenLinkElement = ({ link, children1, children2, color }) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL('https://' + link);

      if (supported) {
        await Linking.openURL('https://' + link);
      } else {
        Alert.alert(`Nie można otworzyć takiego URL'a: https://${link}`);
      }
    }, [link]);

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, paddingLeft: 0 }}>
        <AppText style={{ fontSize: 18, marginRight: 15 }}>{children1}</AppText>
        <TouchableOpacity onPress={handlePress}>
          <Fontisto name={children2} color={color} size={22} />
        </TouchableOpacity>
      </View>
    );
  };

  // useEffect(() => {
  //   getAccessToken();
  // }, []);

//   useEffect(() => {
//     if (username) {
//       let config = {
//         method: 'get',
//         maxBodyLength: Infinity,
//         url: baseURL + '/api/artist/getArtistProfile?username=' + username,
//         headers: {},
//       };

//       const fetchData = async () => {
//         try {
//           console.log(config.url);
//           const result = await axios.request(config);
//           console.log(result.data);
//           setArtistProfile(result.data);
//         } catch (error) {
//           console.log(error);
//         }
//       };

//       fetchData();
//     }
//   }, [username]);

  function ListLinks() {
    if (companyProfile) {
      const links = [
        { id: 1, data: companyProfile.facebook },
        { id: 2, data: companyProfile.instagram },
        { id: 3, data: companyProfile.linkedin },
        { id: 4, data: companyProfile.twitter },
        { id: 5, data: companyProfile.website },
      ];
      const names = [
        { enum: 'facebook', name: 'Facebook', color: '#4267B2' },
        { enum: 'instagram', name: 'Instagram', color: '#C13584' },
        { enum: 'linkedin', name: 'LinkedIn', color: '#0072b1' },
        { enum: 'twitter', name: 'Twitter', color: '#00acee' },
        { enum: 'earth', name: 'Własna strona', color: darkLight },
      ];
      const avaiable = links.filter((item) => {
        if (item.data !== 'string' && item !== null && item.data !== '' && typeof item.data !== 'undefined') {
          return item;
        }
      });
      const list = avaiable.map((item) => (
        <OpenLinkElement
          key={item.id}
          link={item.data}
          color={names[item.id].color}
          children2={names[item.id].enum}
          children1={names[item.id].name}
        />
      ));
      return <View style={styles.ListElement}>{list}</View>;
    } else {
      return <View></View>;
    }
  }

  return (
    <>
      {companyProfile ? (
        <ScrollView nestedScrollEnabled={true} style={{ flex: 1, backgroundColor: primary }} height={300}>
          <View style={{ flexDirection: 'row', margin: 15, justifyContent: 'space-between' }}>
            <Avatar resizeMode="contain" source={require('../../assets/img/avatar1.png')}></Avatar>
            <View style={{ width: '65%', alignItems: 'center', justifyContent: 'space-around' }}>
              <HeaderText numberOfLines={1} style={{ width: '75%', marginLeft: 10, color: black }}>
                {'Nazwa Firmy'}
              </HeaderText>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            <Pressable
              onPress={() => {
                navigation.navigate('Chat');
              }}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? 'lightgrey' : darkLight,
                },
                styles.ModalButton,
              ]}
            >
              <AppText style={{ color: primary }}>Napisz wiadomość</AppText>
            </Pressable>
          </View>
          <AppText style={styles.About}>O firmie:</AppText>
          <RegularText numberOfLines={5} style={{ marginHorizontal: 15, color: black, fontSize: 15 }}>
            {'Tutaj bedzie znajdowac sie opis firmy'}
          </RegularText>
          <View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Line style={{ width: '90%' }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AppText style={styles.ListHeader}>Adres:</AppText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AppText style={styles.ListHeader}>NIP:</AppText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AppText style={styles.ListHeader}>REGON:</AppText>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Line style={{ width: '90%' }} />
            </View>
          </View>
          <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'space-around', margin: 10 }}>
            <AppText style={{ fontSize: 19, color: black }}>Media Społecznościowe: </AppText>
            {ListLinks()}
          </View>
        </ScrollView>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default CompanyProfile;

const styles = StyleSheet.create({
  HeaderViewStyle: {
    justifyContent: 'flex-end',
  },
  ContentLabelStyle: {
    flexDirection: 'row',
    width: '100%',
    height: 35,
  },
  IconStyle: {
    height: 30,
    width: 30,
    tintColor: darkLight,
  },
  ListHeader: {
    fontSize: 19,
    color: black,
    marginHorizontal: 10,
  },
  ListElement: {
    color: black,
    marginHorizontal: 15,
  },
  About: {
    fontFamily: 'LexendDeca-SemiBold',
    fontSize: 22,
    marginHorizontal: 10,
    color: black,
  },
  ModalButton: {
    padding: 7,
    borderRadius: 15,
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    marginRight: 5,
    flexDirection: 'row',
  },
});
