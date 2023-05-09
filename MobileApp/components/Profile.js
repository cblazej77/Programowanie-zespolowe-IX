import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Colors, RegularText, StatsText, AppText, Avatar, Bubble, Line } from '../components/styles';
import Stars from 'react-native-stars';
//SecureStoring accessToken
import * as SecureStore from 'expo-secure-store';
import { default as baseURL } from '../components/AxiosAuth';
import axios from 'axios';
import Loading from '../components/Loading';
import Hyperlink from 'react-native-hyperlink';

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

const Profile = ({ navigation }) => {
  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [artistProfile, setArtistProfile] = useState('');
  const [isExperienceShown, setIsExperienceShown] = useState(false);
  const [isEducationShown, setIsEducationShown] = useState(false);

  generateBoxShadowStyle(0, 8, '#0F0F0F33', 0.2, 15, 2, '#0F0F0F33');

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function getAccessToken() {
    const t = await getValueFor('accessToken');
    setToken(t);
    console.log(t);
  }

  async function getUserInfo() {
    const u = await getValueFor('user');
    setUserInfo(JSON.parse(u));
    console.log(u);
  }

  useEffect(() => {
    getAccessToken();
    getUserInfo();
  }, []);

  useEffect(() => {
    if (userInfo) {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: baseURL + '/api/artist/getArtistProfile?username=' + userInfo.username,
        headers: {},
      };

      const fetchData = async () => {
        try {
          console.log(config.url);
          const result = await axios.request(config);
          console.log(result.data);
          setArtistProfile(result.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  }, [userInfo]);

  function ListEducation() {
    if (artistProfile.education) {
      const list = artistProfile.education.map((item, id) => (
        <View style={styles.ListElement} key={id}>
          <AppText>{'Kierunek: ' + item.faculty}</AppText>
          <AppText>{'Uczelnia: ' + item.school_name}</AppText>
          <AppText>{'Stopień: ' + item.degree}</AppText>
          <AppText>{'Od: ' + item.start_date}</AppText>
          <AppText>{'Do: ' + item.end_date}</AppText>
        </View>
      ));
      return <>{list}</>;
    } else {
      return <View></View>;
    }
  }

  function ListExperience() {
    if (artistProfile.experience) {
      const list = artistProfile.experience.map((item, id) => (
        <View style={styles.ListElement} key={id}>
          <AppText>{'Nazwa firmy: ' + item.company}</AppText>
          <AppText>{'Miasto: ' + item.city}</AppText>
          <AppText>{'Stanowsko: ' + item.position}</AppText>
          <AppText>{'Opis obowiązków: ' + item.description}</AppText>
          <AppText>{'Od: ' + item.start_date}</AppText>
          <AppText>{'Do: ' + item.end_date}</AppText>
        </View>
      ));
      return <>{list}</>;
    } else {
      return <View></View>;
    }
  }

  function ListSkills() {
    if (artistProfile.skills) {
      const list = artistProfile.skills.map((item, id) => (
        <Bubble style={[{ width: item.size, marginRight: 5 }, styles.boxShadow]} key={id}>
          <AppText>{item}</AppText>
        </Bubble>
      ));
      return <>{list}</>;
    } else {
      return <View></View>;
    }
  }

  function ListLanguages() {
    if (artistProfile.languages) {
      const list = artistProfile.languages.map((item, id) => (
        <Bubble style={[{ width: item.size, marginRight: 5 }, styles.boxShadow]} key={id}>
          <AppText>{item}</AppText>
        </Bubble>
      ));
      return <>{list}</>;
    } else {
      return <View></View>;
    }
  }

  function ListTags() {
    if (artistProfile.tags) {
      const list = artistProfile.tags.map((item, id) => (
        <Bubble style={[{ width: item.size, marginRight: 5 }, styles.boxShadow]} key={id}>
          <AppText>{item}</AppText>
        </Bubble>
      ));
      return <>{list}</>;
    } else {
      return <View></View>;
    }
  }

  function ListLinks() {
    if (artistProfile) {
      const links = [
        { id: 1, data: artistProfile.facebook },
        { id: 2, data: artistProfile.instagram },
        { id: 3, data: artistProfile.linkedin },
        { id: 4, data: artistProfile.pinterest },
        { id: 5, data: artistProfile.twitter },
        { id: 6, data: artistProfile.website },
      ];
      const avaiable = links.filter((item) => item.data !== 'string' && item !== null);
      const list = avaiable.map((item) => (
        <Hyperlink linkDefault={true} key={item.id}>
          <TouchableOpacity>
            <AppText style={{ color: link, marginBottom: 5 }}>{item.data}</AppText>
          </TouchableOpacity>
        </Hyperlink>
      ));
      return <View style={styles.ListElement}>{list}</View>;
    } else {
      return <View></View>;
    }
  }

  const changeEducationState = () => {
    if (isEducationShown) {
      setIsEducationShown(false);
    } else {
      setIsEducationShown(true);
    }
  };

  const changeExperienceState = () => {
    if (isExperienceShown) {
      setIsExperienceShown(false);
    } else {
      setIsExperienceShown(true);
    }
  };

  return (
    <>
      {artistProfile ? (
        <ScrollView nestedScrollEnabled={true} style={{ flex: 1, backgroundColor: primary }} height={300}>
          <View style={{ flexDirection: 'row', margin: 15, justifyContent: 'space-between' }}>
            <Avatar resizeMode="contain" source={require('../assets/img/avatar1.png')}></Avatar>
            <View style={{ width: '65%', alignItems: 'center', justifyContent: 'space-around' }}>
              <Stars
                default={3.5}
                spacing={7}
                count={5}
                starSize={30}
                half={true}
                disabled={true}
                fullStar={require('../assets/img/star.png')}
                halfStar={require('../assets/img/star-half.png')}
                emptyStar={require('../assets/img/star-outline.png')}
              />
              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
                <View>
                  <StatsText bold={true}>63</StatsText>
                  <StatsText>Prace</StatsText>
                </View>
                <View>
                  <StatsText bold={true}>205</StatsText>
                  <StatsText>Opinie</StatsText>
                </View>
                <View>
                  <StatsText bold={true}>3,5/5</StatsText>
                  <StatsText>Ocena</StatsText>
                </View>
              </View>
            </View>
          </View>
          <AppText style={styles.About}>O mnie:</AppText>
          <RegularText numberOfLines={5} style={{ marginHorizontal: 15, color: black, fontSize: 15 }}>
            {artistProfile.bio}
          </RegularText>
          <View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Line style={{ width: '90%' }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AppText style={styles.ListHeader}>Wykształcenie:</AppText>
              <TouchableOpacity onPress={() => changeEducationState()} style={{ marginHorizontal: 10 }}>
                <Bubble style={styles.boxShadow}>
                  {isEducationShown ? (
                    <AppText style={{ color: '#C0C0C0' }}>Ukryj</AppText>
                  ) : (
                    <AppText style={{ color: '#C0C0C0' }}>Pokaż</AppText>
                  )}
                </Bubble>
              </TouchableOpacity>
            </View>
            {isEducationShown ? ListEducation() : <></>}
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Line style={{ width: '90%' }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AppText style={styles.ListHeader}>Doświadczenie zawodowe:</AppText>
              <TouchableOpacity onPress={() => changeExperienceState()} style={{ marginHorizontal: 10 }}>
                <Bubble style={styles.boxShadow}>
                  {isExperienceShown ? (
                    <AppText style={{ color: '#C0C0C0' }}>Ukryj</AppText>
                  ) : (
                    <AppText style={{ color: '#C0C0C0' }}>Pokaż</AppText>
                  )}
                </Bubble>
              </TouchableOpacity>
            </View>
            {isExperienceShown ? ListExperience() : <></>}
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Line style={{ width: '90%' }} />
            </View>
          </View>
          <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'space-around', margin: 10 }}>
            <AppText style={{ fontSize: 19, color: black }}>Umiejętności:</AppText>
            <View style={{ width: '90%', flexDirection: 'row', flexWrap: 'wrap' }}>{ListSkills()}</View>
            <AppText style={{ fontSize: 19, color: black }}>Języki:</AppText>
            <View style={{ width: '90%', flexDirection: 'row', flexWrap: 'wrap' }}>{ListLanguages()}</View>
            <AppText style={{ fontSize: 19, color: black }}>Tagi:</AppText>
            <View style={{ width: '90%', flexDirection: 'row', flexWrap: 'wrap' }}>{ListTags()}</View>
            <AppText style={{ fontSize: 19, color: black }}>Linki: </AppText>
            {ListLinks()}
          </View>
        </ScrollView>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Profile;

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
});
