import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Pressable, Linking } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  Colors,
  RegularTextInput,
  AppTextInput,
  AppText,
  Avatar,
  Bubble,
  Line,
  HeaderTextInput,
} from '../../components/styles';
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

const CompanyProfileEditing = ({ route, navigation }) => {
  const [token, setToken] = useState('');
  const [companyProfile, setcompanyProfile] = useState('dadsa');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [NIP, setNIP] = useState('');
  const [REGON, setREGON] = useState('');
  const [KRS, setKRS] = useState('');
  const [adress, setAdress] = useState('');
  const [companyName, setCompanyName] = useState('');

  generateBoxShadowStyle(0, 8, '#0F0F0F33', 0.2, 15, 2, '#0F0F0F33');

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // async function getAccessToken() {
  //   const t = await getValueFor('accessToken');
  //   setToken(t);
  //   console.log(t);
  // }

  function facebookPatternValidation(name) {
    const regex = new RegExp(
      /(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*?(\/)?([\w\-\.]{5,})/,
    );
    return regex.test(name);
  }
  function instagramPatternValidation(name) {
    const regex = new RegExp(/(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9_.]{1,30}\/?/);
    return regex.test(name);
  }
  function twitterPatternValidation(name) {
    const regex = new RegExp(/(https?:\/\/)?(www\.)?twitter\.com\/[A-Za-z0-9_]{5,15}(\?(\w+=\w+&?)*)?/);
    return regex.test(name);
  }
  function linkedinPatternValidation(name) {
    const regex = new RegExp(/(https?:\/\/)?(www\.)?linkedin\.com\/[A-Za-z0-9_.]{1,30}/);
    return regex.test(name);
  }
  function websitePatternValidation(name) {
    const regex = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/);
    return regex.test(name);
  }

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
      function changeLink(text, id) {
        if (id === 1) {
          setFacebook(text);
        }
        if (id === 2) {
          setInstagram(text);
        }
        if (id === 3) {
          setLinkedin(text);
        }
        if (id === 5) {
          setTwitter(text);
        }
        if (id === 7) {
          setWebsite(text);
        }
      }
      const links = [
        { id: 1, name: 'Facebook:', data: facebook },
        { id: 2, name: 'Instagram:', data: instagram },
        { id: 3, name: 'LinkedIn:', data: linkedin },
        { id: 5, name: 'Twitter:', data: twitter },
        { id: 7, name: 'Twoja strona:', data: website },
      ];
      const list = links.map((item) => (
        <View flexDirection="row" alignItems="center" style={{ marginBottom: 10 }} key={item.id}>
          <AppText style={{ width: '25%', alignContent: 'flex-start', alignItems: 'flex-start' }}>{item.name}</AppText>
          <AppTextInput
            maxLength={100}
            style={{ flexWrap: 'wrap', width: '70%' }}
            defaultValue={item.data}
            onChangeText={(newText) => {
              changeLink(newText, item.id);
            }}
            placeholder="Wpisz adres"
            autoComplete="off"
            autoCorrect={false}
          />
        </View>
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
              <Pressable
                onPress={() => {}}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? 'lightgrey' : darkLight,
                    marginTop: 0,
                    padding: 7,
                    borderRadius: 15,
                    fontSize: 16,
                    marginBottom: 10,
                    alignItems: 'center',
                    marginRight: 5,
                    flexDirection: 'row',
                  },
                ]}
              >
                <AppText style={{ color: primary }}>Zmień zdjęcie profilowe</AppText>
              </Pressable>
              <HeaderTextInput
                multiline={true}
                maxLength={100}
                style={{ width: '100%', marginLeft: 10, marginRight: 10, color: black, fontSize: 22}}
                value={companyName}
                onChangeText={setCompanyName}
                placeholder='Wpisz nazwę firmy'
              />
            </View>
          </View>

          <AppText style={styles.About}>O firmie:</AppText>
          <RegularTextInput
            maxLength={255}
            multiline={true}
            style={{ marginHorizontal: 15, color: black, fontSize: 15, flexWrap: 'wrap' }}
            value={description}
            onChangeText={setDescription}
          ></RegularTextInput>
          <View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Line style={{ width: '90%' }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
              <AppText style={styles.ListHeader}>Adres:</AppText>
              <AppTextInput
                maxLength={100}
                multiline={true}
                style={{ flexWrap: 'wrap', width: '75%' }}
                defaultValue={adress}
                onChangeText={(newText) => {
                  setAdress(newText);
                }}
                placeholder="Wpisz adres"
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
              <AppText style={styles.ListHeader}>NIP:</AppText>
              <AppTextInput
                maxLength={10}
                keyboardType="number-pad"
                multiline={true}
                style={{ flexWrap: 'wrap', width: '75%' }}
                defaultValue={NIP}
                onChangeText={(newText) => {
                  setNIP(newText);
                }}
                placeholder="Wpisz NIP"
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
              <AppText style={styles.ListHeader}>REGON:</AppText>
              <AppTextInput
                maxLength={14}
                keyboardType="number-pad"
                multiline={true}
                style={{ flexWrap: 'wrap', width: '75%' }}
                defaultValue={REGON}
                onChangeText={(newText) => {
                  setREGON(newText);
                }}
                placeholder="Wpisz REGON"
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
              <AppText style={styles.ListHeader}>KRS:</AppText>
              <AppTextInput
                maxLength={10}
                keyboardType="number-pad"
                multiline={true}
                style={{ flexWrap: 'wrap', width: '75%' }}
                defaultValue={KRS}
                onChangeText={(newText) => {
                  setKRS(newText);
                }}
                placeholder="Wpisz numer KRS"
              />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Line style={{ width: '90%' }} />
            </View>
          </View>
          <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'space-around', margin: 10 }}>
            <AppText style={{ fontSize: 19, color: black, marginBottom: 15 }}>Media Społecznościowe: </AppText>
            {ListLinks()}
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              alignContent: 'center',
              marginBottom: 15,
            }}
          >
          <Pressable
              onPress={() => {
              }}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? 'lightgrey' : darkLight,
                },
                styles.ModalButton,
              ]}
            >
              <AppText style={{ color: primary, fontSize: 16 }}>Zapisz</AppText>
            </Pressable>
            </View>
        </ScrollView>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default CompanyProfileEditing;

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
