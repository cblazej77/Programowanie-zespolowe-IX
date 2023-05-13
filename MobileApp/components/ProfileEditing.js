import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  Colors,
  StatsText,
  AppText,
  Avatar,
  Bubble,
  Line,
  RegularTextInput,
  AppTextInput,
  ModalBubble,
  MsgBox,
  HeaderText,
} from './styles';
import Stars from 'react-native-stars';
//SecureStoring accessToken
import * as SecureStore from 'expo-secure-store';
import { default as baseURL } from './AxiosAuth';
import axios from 'axios';
import Loading from './Loading';
import { Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectDropdown from 'react-native-select-dropdown';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
const { darkLight, grey, black, primary, red } = Colors;

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

const ProfileEditing = ({ navigation: { goBack } }) => {
  generateBoxShadowStyle(0, 8, '#0F0F0F33', 0.2, 15, 2, '#0F0F0F33');

  const [refreshing, setRefreshing] = useState(false);
  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [artistProfile, setArtistProfile] = useState('');
  const [availableTags, setAvailableTags] = useState('');
  const [availableCategories, setAvailableCategories] = useState('');
  const [availableSkills, setAvailableSkills] = useState([]);
  const [availableLanguages, setAvailableLanguages] = useState('');
  const [availableLevels, setAvailableLevels] = useState([]);
  const [availableLocations, setAvailableLocations] = useState([]);
  const [tagsModalVisible, setTagsModalVisible] = useState(false);
  const [skillsModalVisible, setSkillsModalVisible] = useState(false);
  const [languagesModalVisible, setLanguagesModalVisible] = useState(false);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [showStartEdu, setShowStartEdu] = useState(false);
  const [showStartExp, setShowStartExp] = useState(false);
  const [showEndEdu, setShowEndEdu] = useState(false);
  const [showEndExp, setShowEndExp] = useState(false);
  const [itemID, setItemID] = useState();
  //Hooks for temp values when editing
  const [bio, setBio] = useState('');
  const [level, setLevel] = useState('');
  const [location, setLocation] = useState('');
  const [dribble, setDribble] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [pinterest, setPinterest] = useState('');
  const [twitter, setTwitter] = useState('');
  const [website, setWebsite] = useState('');
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  const [skills, setSkills] = useState([]);
  const [tags, setTags] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [tagsToAdd, setTagsToAdd] = useState([]);
  const [skillsToAdd, setSkillsToAdd] = useState([]);
  const [languagesToAdd, setLanguagesToAdd] = useState([]);

  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };

  function datePatternValidation(date) {
    const regex = new RegExp(/^(0?[1-9]|1[0-2])[\/](19|20)$/);
    return regex.test(date);
  }

  //funcions handling setState for temp values
  function handleAddEducationElement(
    id,
    school_name,
    faculty,
    field_of_study,
    degree,
    start_date,
    end_date,
    description,
  ) {
    setEducationList((educationList) => [
      ...educationList,
      {
        id: id,
        school_name: school_name,
        faculty: faculty,
        field_of_study: field_of_study,
        degree: degree,
        start_date: start_date,
        end_date: end_date,
        description: description,
      },
    ]);
  }

  function handleDeleteEducationElement(id) {
    setEducationList(educationList.filter((e) => e.id !== id));
  }

  function handleAddExperienceElement(id, company, city, position, description, start_date, end_date) {
    setExperienceList((experienceList) => [
      ...experienceList,
      {
        id: id,
        company: company,
        city: city,
        position: position,
        description: description,
        start_date: start_date,
        end_date: end_date,
      },
    ]);
  }

  function handleDeleteExperienceElement(id) {
    setExperienceList(experienceList.filter((e) => e.id !== id));
  }

  function handleAddSkill(skill) {
    setSkills((skills) => [...skills, skill]);
  }

  function handleDeleteSkill(skill) {
    setSkills(skills.filter((s) => s !== skill));
  }

  function handleAddTag(tag) {
    setTags((tags) => [...tags, tag]);
  }

  function handleDeleteTag(tag) {
    setTags(tags.filter((t) => t !== tag));
  }

  function handleAddLanguage(language) {
    setLanguages((languages) => [...languages, language]);
  }

  function handleDeleteLanguage(language) {
    setLanguages(languages.filter((l) => l !== language));
  }

  function handleAddTagsToAdd(tag) {
    setTagsToAdd((tagsToAdd) => [...tagsToAdd, tag]);
  }

  function handleDeleteTagsToAdd(tag) {
    setTagsToAdd(tagsToAdd.filter((t) => t !== tag));
  }

  function handleAddLanguagesToAdd(language) {
    setLanguagesToAdd((languagesToAdd) => [...languagesToAdd, language]);
  }

  function handleDeleteLanguagesToAdd(language) {
    setLanguagesToAdd(languagesToAdd.filter((l) => l !== language));
  }

  function handleAddSkillsToAdd(skill) {
    setSkillsToAdd((skillsToAdd) => [...skillsToAdd, skill]);
  }

  function handleDeleteSkillsToAdd(skill) {
    setSkillsToAdd(skillsToAdd.filter((s) => s !== skill));
  }

  function handleAddAvailableSkills(skill) {
    setAvailableSkills((availableSkills) => [...availableSkills, skill]);
  }

  function handleDeleteAvailableSkills(skill) {
    setAvailableSkills(availableSkills.filter((s) => s !== skill));
  }

  //funkcje czyszczace
  function handleClearEducationList() {
    setEducationList([]);
  }

  function handleClearExperienceList() {
    setExperienceList([]);
  }

  function handleClearSkills() {
    setSkills([]);
  }

  function handleClearTags() {
    setTags([]);
  }

  function handleClearLanguages() {
    setLanguages([]);
  }

  function handleClearTagsToAdd() {
    setTagsToAdd([]);
  }

  function handleClearLanguagesToAdd() {
    setLanguagesToAdd([]);
  }

  function handleClearSkillsToAdd() {
    setSkillsToAdd([]);
  }

  function handleClearAvailableSkills() {
    setAvailableSkills([]);
  }

  function clear() {
    handleClearEducationList();
    handleClearExperienceList();
    handleClearLanguages();
    handleClearSkills();
    handleClearTags();
    handleClearLanguagesToAdd();
    handleClearTagsToAdd();
    handleClearSkillsToAdd();
    setBio('');
    setLevel('');
    setLocation('');
    setDribble('');
    setFacebook('');
    setInstagram('');
    setTwitter('');
    setPinterest('');
    setWebsite('');
    setLinkedin('');
  }

  async function getAccessToken() {
    const t = await getValueFor('accessToken');
    setToken(t);
  }

  async function getUserInfo() {
    const u = await getValueFor('user');
    setUserInfo(JSON.parse(u));
  }

  async function updateArtistProfile() {
    let education = educationList;
    let experience = experienceList;

    education.map((item, index) => {
      delete item.id;
    });
    experience.map((item, index) => {
      delete item.id;
    });
    const response = await axios
      .put(
        baseURL + '/api/artist/updateArtistProfile',
        {
          bio: bio,
          level: level,
          location: location,
          skills: skills,
          tags: tags,
          languages: languages,
          education: education,
          experience: experience,
          website: website,
          facebook: facebook,
          linkedin: linkedin,
          instagram: instagram,
          dribble: dribble,
          pinterest: pinterest,
          twitter: twitter,
        },
        {
          params: { username: userInfo.username },
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        },
      )
      .catch((error) => {
        handleMessage('Wystąpił błąd', 'FAILED');
        console.log(error);
      });
    if ((response.status = 200)) {
      handleMessage('Zapisano zmiany!', 'SUCCESS');
      experience = null;
      education = null;
    }
  }

  function getIdOfLastEducationElement() {
    let l = educationList.length;
    if (l > 0) {
      return educationList.at(l - 1).id;
    } else return -1;
  }

  function getIdOfLastExperienceElement() {
    let l = experienceList.length;
    if (l > 0) {
      return experienceList.at(l - 1).id;
    } else return -1;
  }

  function addTags() {
    for (let i = 0; i < tagsToAdd.length; ++i) {
      handleAddTag(tagsToAdd[i]);
    }
    handleClearTagsToAdd();
  }

  function addSkills() {
    for (let i = 0; i < skillsToAdd.length; ++i) {
      handleAddSkill(skillsToAdd[i]);
    }
    handleClearSkillsToAdd();
  }

  function addLanguages() {
    for (let i = 0; i < languagesToAdd.length; ++i) {
      handleAddLanguage(languagesToAdd[i]);
    }
    handleClearLanguagesToAdd();
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
          const result = await axios.request(config);
          setArtistProfile(result.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  }, [userInfo]);

  useEffect(() => {
    let configTag = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + '/api/artist/getAvailableTags',
      headers: {},
    };

    let configCities = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + '/api/artist/getAvailableCities',
      headers: {},
    };

    let configLevels = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + '/api/artist/getAvailableLevels',
      headers: {},
    };

    let configLanguages = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + '/api/artist/getAvailableLanguages',
      headers: {},
    };

    let configCategories = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + '/api/artist/getAvailableCategories',
      headers: {},
    };

    const fetchData = async () => {
      try {
        const [citiesResponse, tagsResponse, categoriesResponse, levelsResponse, languagesResponse] = await Promise.all(
          [
            axios.request(configCities),
            axios.request(configTag),
            axios.request(configCategories),
            axios.request(configLevels),
            axios.request(configLanguages),
          ],
        );
        setAvailableTags(tagsResponse.data);
        setAvailableLanguages(languagesResponse.data);
        setAvailableLocations(citiesResponse.data);
        setAvailableLevels(levelsResponse.data);
        handleClearAvailableSkills();
        setAvailableCategories(categoriesResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   let config = {
  //     method: 'get',
  //     maxBodyLength: Infinity,
  //     url: baseURL + '/api/artist/getAvailableLanguages',
  //     headers: {},
  //   };

  //   const fetchData = async () => {
  //     try {
  //       const result = await axios.request(config);
  //       setAvailableLanguages(result.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   let config = {
  //     method: 'get',
  //     maxBodyLength: Infinity,
  //     url: baseURL + '/api/artist/getAvailableLevels',
  //     headers: {},
  //   };

  //   const fetchData = async () => {
  //     try {
  //       const result = await axios.request(config);
  //       setAvailableLevels(result.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   let config = {
  //     method: 'get',
  //     maxBodyLength: Infinity,
  //     url: baseURL + '/api/artist/getAvailableCities',
  //     headers: {},
  //   };

  //   const fetchData = async () => {
  //     try {
  //       const result = await axios.request(config);
  //       setAvailableLocations(result.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   let config = {
  //     method: 'get',
  //     maxBodyLength: Infinity,
  //     url: baseURL + '/api/artist/getAvailableCategories',
  //     headers: {},
  //   };

  //   const fetchData = async () => {
  //     try {
  //       const result = await axios.request(config);
  //       handleClearAvailableSkills();
  //       setAvailableCategories(result.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    if (artistProfile) {
      clear();
      setBio(artistProfile.bio);
      setLevel(artistProfile.level);
      setLocation(artistProfile.location);
      for (let i = 0; i < artistProfile.education.length; i++) {
        handleAddEducationElement(
          i,
          artistProfile.education[i].school_name,
          artistProfile.education[i].faculty,
          artistProfile.education[i].field_of_study,
          artistProfile.education[i].degree,
          artistProfile.education[i].start_date,
          artistProfile.education[i].end_date,
          artistProfile.education[i].description,
        );
      }
      for (let i = 0; i < artistProfile.experience.length; i++) {
        handleAddExperienceElement(
          i,
          artistProfile.experience[i].company,
          artistProfile.experience[i].city,
          artistProfile.experience[i].position,
          artistProfile.experience[i].description,
          artistProfile.experience[i].start_date,
          artistProfile.experience[i].end_date,
        );
      }
      for (let i = 0; i < artistProfile.skills.length; i++) {
        handleAddSkill(artistProfile.skills[i]);
      }
      for (let i = 0; i < artistProfile.tags.length; i++) {
        handleAddTag(artistProfile.tags[i]);
      }
      for (let i = 0; i < artistProfile.languages.length; i++) {
        handleAddLanguage(artistProfile.languages[i]);
      }
      setDribble(artistProfile.dribble);
      setFacebook(artistProfile.facebook);
      setInstagram(artistProfile.instagram);
      setLinkedin(artistProfile.linkedin);
      setPinterest(artistProfile.pinterest);
      setTwitter(artistProfile.twitter);
      setWebsite(artistProfile.website);
    }
  }, [artistProfile]);

  useEffect(() => {
    if (availableCategories) {
      for (let i = 0; i < availableCategories.categories.length; ++i) {
        for (let j = 0; j < availableCategories.categories[i].subcategories.length; ++j) {
          handleAddAvailableSkills(availableCategories.categories[i].subcategories[j]);
        }
      }
    }
  }, [availableCategories]);

  function ListEducation() {
    if (educationList) {
      const list = educationList.map((item) => {
        return (
          <View style={[styles.ListElement, { marginBottom: 10 }]} key={item.id}>
            <View flexDirection="row" alignItems="center" style={{ marginBottom: 10 }}>
              <AppText>{'Kierunek: '}</AppText>
              <AppTextInput
                maxLength={50}
                multiline={true}
                style={{ flexWrap: 'wrap', width: '82%' }}
                defaultValue={item.faculty}
                onChangeText={(newText) => {
                  item.faculty = newText;
                }}
                placeholder="Wpisz kierunek"
              />
            </View>
            <View flexDirection="row" alignItems="center" style={{ marginBottom: 10 }}>
              <AppText>{'Uczelnia: '}</AppText>
              <AppTextInput
                maxLength={100}
                multiline={true}
                style={{ flexWrap: 'wrap', width: '83%' }}
                defaultValue={item.school_name}
                onChangeText={(newText) => {
                  item.school_name = newText;
                }}
                placeholder="Wpisz nazwę uczelni"
              />
            </View>
            <View flexDirection="row" alignItems="center" style={{ marginBottom: 10 }}>
              <AppText>{'Dziedzina nauk: '}</AppText>
              <AppTextInput
                maxLength={50}
                multiline={true}
                style={{ flexWrap: 'wrap', width: '71%' }}
                defaultValue={item.field_of_study}
                onChangeText={(newText) => {
                  item.field_of_study = newText;
                }}
                placeholder="Wpisz dziedzinę nauk"
              />
            </View>
            <View flexDirection="row" alignItems="center" style={{ marginBottom: 10 }}>
              <AppText>{'Stopień: '}</AppText>
              <AppTextInput
                maxLength={30}
                multiline={true}
                style={{ flexWrap: 'wrap', width: '30%' }}
                defaultValue={item.degree}
                onChangeText={(newText) => {
                  item.degree = newText;
                }}
                placeholder="Wpisz stopień"
              />
            </View>
            <View flexDirection="row" alignItems="center" style={{ marginBottom: 20, marginTop: 10 }}>
              <AppText>{'Od: '}</AppText>
              <TouchableOpacity
                onPress={() => {
                  setItemID(item.id);
                  setShowStartEdu(true);
                }}
              >
                <AppText style={{ fontSize: 16, marginLeft: 5 }}>{item.start_date}</AppText>
              </TouchableOpacity>

              {showStartEdu && item.id === itemID && (
                <DateTimePicker
                  testID="startDateTimePicker"
                  value={new Date(moment(item.start_date, 'DD-MM-YYYY'))}
                  mode="date"
                  onChange={(event, newdate) => {
                    item.start_date = moment(newdate).format('DD/MM/YYYY');
                    setShowStartEdu(false);
                  }}
                />
              )}
            </View>
            <View flexDirection="row" alignItems="center" style={{ marginBottom: 20 }}>
              <AppText>{'Do: '}</AppText>
              <TouchableOpacity
                onPress={() => {
                  setItemID(item.id);
                  setShowEndEdu(true);
                }}
              >
                <AppText style={{ fontSize: 16, marginLeft: 5 }}>{item.end_date}</AppText>
              </TouchableOpacity>

              {showEndEdu && item.id === itemID && (
                <DateTimePicker
                  testID="startDateTimePicker"
                  value={new Date(moment(item.end_date, 'DD-MM-YYYY'))}
                  mode="date"
                  onChange={(event, newdate) => {
                    item.end_date = moment(newdate).format('DD/MM/YYYY');
                    setShowEndEdu(false);
                  }}
                />
              )}
            </View>
            <View flexDirection="row" alignItems="center" style={{ marginBottom: 10 }}>
              <AppText>{'Opis: '}</AppText>
              <AppTextInput
                maxLength={255}
                multiline={true}
                style={{ flexWrap: 'wrap', width: '90%' }}
                defaultValue={item.description}
                onChangeText={(newText) => {
                  item.description = newText;
                }}
                placeholder="Wpisz opis"
              />
            </View>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity onPress={() => handleDeleteEducationElement(item.id)}>
                <Bubble style={[{ alignContent: 'center', marginBottom: 3, marginTop: 3 }, styles.boxShadow]}>
                  <AppText>Usuń</AppText>
                </Bubble>
              </TouchableOpacity>
            </View>
          </View>
        );
      });
      return (
        <>
          {list}
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                handleAddEducationElement(getIdOfLastEducationElement() + 1, '', '', '', '', '', '', '');
              }}
            >
              <Bubble style={[{ alignContent: 'center', marginBottom: 3, marginTop: 3 }, styles.boxShadow]}>
                <AppText>Dodaj</AppText>
              </Bubble>
            </TouchableOpacity>
          </View>
        </>
      );
    } else {
      return <View></View>;
    }
  }

  function ListExperience() {
    if (experienceList) {
      const list = experienceList.map((item) => {
        return (
          <View style={[styles.ListElement, { marginBottom: 10 }]} key={item.id}>
            <View flexDirection="row" alignItems="center" style={{ marginBottom: 10 }}>
              <AppText>{'Nazwa firmy: '}</AppText>
              <AppTextInput
                maxLength={100}
                multiline={true}
                style={{ flexWrap: 'wrap', width: '75%' }}
                defaultValue={item.company}
                onChangeText={(newText) => {
                  item.company = newText;
                }}
                placeholder="Wpisz nazwę firmy"
              />
            </View>
            <View flexDirection="row" alignItems="center" style={{ marginBottom: 10 }}>
              <AppText>{'Miasto: '}</AppText>
              <AppTextInput
                maxLength={50}
                multiline={true}
                style={{ flexWrap: 'wrap', width: '40%' }}
                defaultValue={item.city}
                onChangeText={(newText) => {
                  item.city = newText;
                }}
                placeholder="Wpisz miasto"
              />
            </View>
            <View flexDirection="row" alignItems="center" style={{ marginBottom: 10 }}>
              <AppText>{'Stanowisko: '}</AppText>
              <AppTextInput
                maxLength={50}
                multiline={true}
                style={{ flexWrap: 'wrap', width: '78%' }}
                defaultValue={item.position}
                onChangeText={(newText) => {
                  item.position = newText;
                }}
                placeholder="Wpisz stanowisko"
              />
            </View>
            <View flexDirection="row" alignItems="center" style={{ marginBottom: 10 }}>
              <AppText>{'Opis obowiązków: '}</AppText>
              <AppTextInput
                maxLength={255}
                multiline={true}
                style={{ flexWrap: 'wrap', width: '67.5%' }}
                defaultValue={item.description}
                onChangeText={(newText) => {
                  item.description = newText;
                }}
                placeholder="Wpisz stanowisko"
              />
            </View>
            <View flexDirection="row" alignItems="center" style={{ marginBottom: 10 }}>
              <AppText>{'Od: '}</AppText>
              <TouchableOpacity
                onPress={() => {
                  setItemID(item.id);
                  setShowStartExp(true);
                }}
              >
                <AppText style={{ fontSize: 16, marginLeft: 5 }}>{item.start_date}</AppText>
              </TouchableOpacity>

              {showStartExp && item.id === itemID && (
                <DateTimePicker
                  testID="startDateTimePicker"
                  value={new Date(moment(item.start_date, 'DD-MM-YYYY'))}
                  mode="date"
                  onChange={(event, newdate) => {
                    item.start_date = moment(newdate).format('DD/MM/yyyy');
                    setShowStartExp(false);
                  }}
                />
              )}
            </View>
            <View flexDirection="row" alignItems="center" style={{ marginBottom: 10 }}>
              <AppText>{'Do: '}</AppText>
              <TouchableOpacity
                onPress={() => {
                  setItemID(item.id);
                  setShowEndExp(true);
                }}
              >
                <AppText style={{ fontSize: 16, marginLeft: 5 }}>{item.end_date}</AppText>
              </TouchableOpacity>

              {showEndExp && item.id === itemID && (
                <DateTimePicker
                  testID="startDateTimePicker"
                  value={new Date(moment(item.end_date, 'DD-MM-YYYY'))}
                  mode="date"
                  onChange={(event, newdate) => {
                    item.end_date = moment(newdate).format('DD/MM/yyyy');
                    setShowEndExp(false);
                  }}
                />
              )}
            </View>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity onPress={() => handleDeleteExperienceElement(item.id)}>
                <Bubble style={[{ alignContent: 'center', marginBottom: 3, marginTop: 3 }, styles.boxShadow]}>
                  <AppText>Usuń</AppText>
                </Bubble>
              </TouchableOpacity>
            </View>
          </View>
        );
      });
      return (
        <>
          {list}
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                handleAddExperienceElement(getIdOfLastExperienceElement() + 1, '', '', '', '', '', '');
              }}
            >
              <Bubble style={[{ alignContent: 'center', marginBottom: 3, marginTop: 3 }, styles.boxShadow]}>
                <AppText>Dodaj</AppText>
              </Bubble>
            </TouchableOpacity>
          </View>
        </>
      );
    } else {
      return <View></View>;
    }
  }

  function ListSkills() {
    if (skills) {
      const list = skills.map((item, id) => (
        <Bubble
          style={[{ width: item.size, marginRight: 5, flexDirection: 'row', alignItems: 'center' }, styles.boxShadow]}
          key={id}
        >
          <AppText>{item}</AppText>
          <TouchableOpacity onPress={() => handleDeleteSkill(item)}>
            <Ionicons size={16} name={'close'} color="#A9A9A9" style={{ marginTop: 3 }} />
          </TouchableOpacity>
        </Bubble>
      ));
      return (
        <>
          {list}
          <TouchableOpacity onPress={() => setSkillsModalVisible(true)}>
            <Bubble style={[{ marginRight: 5, flexDirection: 'row', alignItems: 'center' }, styles.boxShadow]}>
              <Ionicons size={16} name={'add'} color="#A9A9A9" style={{ marginTop: 3 }} />
              <AppText>Dodaj</AppText>
            </Bubble>
          </TouchableOpacity>
        </>
      );
    } else {
      return <View></View>;
    }
  }

  function ListAvailableSkills() {
    if (availableSkills) {
      const available = availableSkills.filter((item) => {
        if (!skills.includes(item)) return item;
      });
      const list = available.map((item, id) => (
        <Pressable
          onPress={() => {
            if (skillsToAdd.includes(item)) {
              handleDeleteSkillsToAdd(item);
            } else {
              handleAddSkillsToAdd(item);
            }
          }}
          key={id}
        >
          <ModalBubble
            style={[{ width: item.size, marginRight: 5, flexDirection: 'row', alignItems: 'center' }, styles.boxShadow]}
            key={id}
            checked={skillsToAdd.includes(item)}
          >
            <AppText style={{ marginRight: 2 }}>{item}</AppText>
          </ModalBubble>
        </Pressable>
      ));
      return <>{list}</>;
    } else {
      return <View></View>;
    }
  }

  function ListLanguages() {
    if (languages) {
      const list = languages.map((item, id) => (
        <Bubble
          style={[{ width: item.size, marginRight: 5, flexDirection: 'row', alignItems: 'center' }, styles.boxShadow]}
          key={id}
        >
          <AppText>{item}</AppText>
          <TouchableOpacity onPress={() => handleDeleteLanguage(item)}>
            <Ionicons size={16} name={'close'} color="#A9A9A9" style={{ marginTop: 3 }} />
          </TouchableOpacity>
        </Bubble>
      ));
      return (
        <>
          {list}
          <TouchableOpacity onPress={() => setLanguagesModalVisible(true)}>
            <Bubble style={[{ marginRight: 5, flexDirection: 'row', alignItems: 'center' }, styles.boxShadow]}>
              <Ionicons size={16} name={'add'} color="#A9A9A9" style={{ marginTop: 3 }} />
              <AppText>Dodaj</AppText>
            </Bubble>
          </TouchableOpacity>
        </>
      );
    } else {
      return <View></View>;
    }
  }

  function ListAvailableLanguages() {
    if (availableLanguages) {
      const available = availableLanguages.filter((item) => {
        if (!languages.includes(item)) return item;
      });
      const list = available.map((item, id) => (
        <Pressable
          onPress={() => {
            if (languagesToAdd.includes(item)) {
              handleDeleteLanguagesToAdd(item);
            } else {
              handleAddLanguagesToAdd(item);
            }
          }}
          key={id}
        >
          <ModalBubble
            style={[{ width: item.size, marginRight: 5, flexDirection: 'row', alignItems: 'center' }, styles.boxShadow]}
            key={id}
            checked={languagesToAdd.includes(item)}
          >
            <AppText style={{ marginRight: 2 }}>{item}</AppText>
          </ModalBubble>
        </Pressable>
      ));
      return <>{list}</>;
    } else {
      return <View></View>;
    }
  }

  function ListTags() {
    if (tags) {
      const list = tags.map((item, id) => (
        <Bubble
          style={[{ width: item.size, marginRight: 5, flexDirection: 'row', alignItems: 'center' }, styles.boxShadow]}
          key={id}
        >
          <AppText style={{ marginRight: 2 }}>{item}</AppText>
          <TouchableOpacity onPress={() => handleDeleteTag(item)}>
            <Ionicons size={16} name={'close'} color="#A9A9A9" style={{ marginTop: 3 }} />
          </TouchableOpacity>
        </Bubble>
      ));
      return (
        <>
          {list}
          <TouchableOpacity onPress={() => setTagsModalVisible(true)}>
            <Bubble style={[{ marginRight: 5, flexDirection: 'row', alignItems: 'center' }, styles.boxShadow]}>
              <Ionicons size={16} name={'add'} color="#A9A9A9" style={{ marginTop: 3 }} />
              <AppText>Dodaj</AppText>
            </Bubble>
          </TouchableOpacity>
        </>
      );
    } else {
      return <View></View>;
    }
  }

  function ListAvailableTags() {
    if (availableTags) {
      const available = availableTags.filter((item) => {
        if (!tags.includes(item)) return item;
      });
      const list = available.map((item, id) => (
        <Pressable
          onPress={() => {
            if (tagsToAdd.includes(item)) {
              handleDeleteTagsToAdd(item);
            } else {
              handleAddTagsToAdd(item);
            }
          }}
          key={id}
        >
          <ModalBubble
            style={[{ width: item.size, marginRight: 5, flexDirection: 'row', alignItems: 'center' }, styles.boxShadow]}
            key={id}
            checked={tagsToAdd.includes(item)}
          >
            <AppText style={{ marginRight: 2 }}>{item}</AppText>
          </ModalBubble>
        </Pressable>
      ));
      return <>{list}</>;
    } else {
      return <View></View>;
    }
  }

  function ListLinks() {
    if (artistProfile) {
      function changeLink(text, id) {
        if(id === 1) {
          setFacebook(text);
        }
        if(id === 2) {
          setInstagram(text);
        }
        if(id === 3) {
          setLinkedin(text);
        }
        if(id === 4) {
          setPinterest(text);
        }
        if(id === 5) {
          setTwitter(text);
        }
        if(id === 6) {
          setDribble(text);
        }
        if(id === 7) {
          setWebsite(text);
        }
      };
      const links = [
        { id: 1, name: 'Facebook:', data: facebook },
        { id: 2, name: 'Instagram:', data: instagram },
        { id: 3, name: 'LinkedIn:', data: linkedin },
        { id: 4, name: 'Pinterest:', data: pinterest },
        { id: 5, name: 'Twitter:', data: twitter },
        { id: 6, name: 'Dribbble:', data: dribble },
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
      {artistProfile ? (
        <ScrollView nestedScrollEnabled={true} style={{ flex: 1, backgroundColor: primary }} height={300}>
          <View style={{ flexDirection: 'row', margin: 15, justifyContent: 'space-between' }}>
            <Avatar resizeMode="contain" source={require('../assets/img/avatar.png')}></Avatar>
            <View style={{ width: '65%', alignItems: 'center', justifyContent: 'space-around' }}>
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
              <AppText style={{ color: primary }}>Zmień zdjęcie profilowe</AppText>
            </Pressable>
            </View>
          </View>
          <View style={{ marginLeft: 15, justifyContent: 'space-between'}}>
            <HeaderText style={{color:darkLight, fontSize: 20}}>{userInfo.firstname + ' ' + userInfo.lastname}</HeaderText>
          </View>
          <AppText style={styles.About}>O mnie:</AppText>
          <RegularTextInput
            maxLength={255}
            multiline={true}
            style={{ marginHorizontal: 15, color: black, fontSize: 15, flexWrap: 'wrap' }}
            value={bio}
            onChangeText={setBio}
          ></RegularTextInput>
          <View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Line style={{ width: '90%' }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
              <AppText style={styles.ListHeader}>Wykształcenie:</AppText>
            </View>
            {ListEducation()}
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Line style={{ width: '90%' }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
              <AppText style={styles.ListHeader}>Doświadczenie zawodowe:</AppText>
            </View>
            {ListExperience()}
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Line style={{ width: '90%' }} />
            </View>
          </View>
          <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
            <AppText style={[styles.ListHeader, { fontSize: 14 }]}>Poziom:</AppText>
            <SelectDropdown
              data={availableLevels}
              onSelect={(selectedItem, index) => {
                setLevel(selectedItem);
              }}
              defaultButtonText={level}
              buttonStyle={{ width: 90, height: 30, borderWidth: 2, borderColor: grey, borderRadius: 12 }}
              buttonTextStyle={{ fontSize: 14 }}
              renderDropdownIcon={(isOpened) => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={black} size={12} />;
              }}
              dropdownIconPosition={'right'}
            />
            <AppText style={[styles.ListHeader, { fontSize: 14 }]}>Lokalizacja:</AppText>
            <SelectDropdown
              data={availableLocations}
              onSelect={(selectedItem, index) => {
                setLocation(selectedItem);
              }}
              defaultButtonText={location}
              buttonTextStyle={{ fontSize: 14 }}
              buttonStyle={{ width: 120, height: 30, borderWidth: 2, borderColor: grey, borderRadius: 12 }}
              renderDropdownIcon={(isOpened) => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={black} size={12} />;
              }}
              dropdownIconPosition={'right'}
            />
          </View>
          <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'space-around', margin: 10 }}>
            <AppText style={{ fontSize: 19, color: black }}>Umiejętności:</AppText>
            <View style={{ width: '90%', flexDirection: 'row', flexWrap: 'wrap' }}>{ListSkills()}</View>
            <Modal
              isVisible={skillsModalVisible}
              onBackdropPress={() => setSkillsModalVisible(false)}
              onSwipeComplete={() => setSkillsModalVisible(false)}
              swipeDirection="right"
              animationInTiming={500}
              animationOutTiming={500}
              hideModalContentWhileAnimating={true}
            >
              <ScrollView style={{ maxHeight: '90%', margin: 10 }}>
                <View style={[styles.centeredView]}>
                  <View style={styles.modalView}>
                    {ListAvailableSkills()}
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                      <Pressable
                        onPress={() => {
                          addSkills();
                          setSkillsModalVisible(false);
                        }}
                        style={({ pressed }) => [
                          {
                            backgroundColor: pressed ? 'lightgrey' : darkLight,
                          },
                          styles.ModalButton,
                        ]}
                      >
                        <AppText style={{ color: 'white' }}>Zapisz</AppText>
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          handleClearSkillsToAdd();
                          setSkillsModalVisible(false);
                        }}
                        style={({ pressed }) => [
                          {
                            backgroundColor: pressed ? 'lightgrey' : darkLight,
                          },
                          styles.ModalButton,
                        ]}
                      >
                        <AppText style={{ color: 'white' }}>Odrzuć</AppText>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </Modal>
            <AppText style={{ fontSize: 19, color: black }}>Języki:</AppText>
            <View style={{ width: '90%', flexDirection: 'row', flexWrap: 'wrap' }}>{ListLanguages()}</View>
            <Modal
              isVisible={languagesModalVisible}
              onBackdropPress={() => setLanguagesModalVisible(false)}
              onSwipeComplete={() => setLanguagesModalVisible(false)}
              swipeDirection="right"
              animationInTiming={500}
              animationOutTiming={500}
              hideModalContentWhileAnimating={true}
            >
              <ScrollView style={{ maxHeight: '90%', margin: 10 }}>
                <View style={[styles.centeredView]}>
                  <View style={styles.modalView}>
                    {ListAvailableLanguages()}
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                      <Pressable
                        onPress={() => {
                          addLanguages();
                          setLanguagesModalVisible(false);
                        }}
                        style={({ pressed }) => [
                          {
                            backgroundColor: pressed ? 'lightgrey' : darkLight,
                          },
                          styles.ModalButton,
                        ]}
                      >
                        <AppText style={{ color: 'white' }}>Zapisz</AppText>
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          handleClearLanguagesToAdd();
                          setLanguagesModalVisible(false);
                        }}
                        style={({ pressed }) => [
                          {
                            backgroundColor: pressed ? 'lightgrey' : darkLight,
                          },
                          styles.ModalButton,
                        ]}
                      >
                        <AppText style={{ color: 'white' }}>Odrzuć</AppText>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </Modal>
            <AppText style={{ fontSize: 19, color: black }}>Tagi:</AppText>
            <View style={{ width: '90%', flexDirection: 'row', flexWrap: 'wrap' }}>{ListTags()}</View>
            <Modal
              isVisible={tagsModalVisible}
              onBackdropPress={() => setTagsModalVisible(false)}
              onSwipeComplete={() => setTagsModalVisible(false)}
              swipeDirection="right"
              animationInTiming={500}
              animationOutTiming={500}
              hideModalContentWhileAnimating={true}
            >
              <ScrollView style={{ maxHeight: '90%', margin: 10 }}>
                <View style={[styles.centeredView]}>
                  <View style={styles.modalView}>
                    {ListAvailableTags()}
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                      <Pressable
                        onPress={() => {
                          addTags();
                          setTagsModalVisible(false);
                        }}
                        style={({ pressed }) => [
                          {
                            backgroundColor: pressed ? 'lightgrey' : darkLight,
                          },
                          styles.ModalButton,
                        ]}
                      >
                        <AppText style={{ color: 'white' }}>Zapisz</AppText>
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          handleClearTagsToAdd();
                          setTagsModalVisible(false);
                        }}
                        style={({ pressed }) => [
                          {
                            backgroundColor: pressed ? 'lightgrey' : darkLight,
                          },
                          styles.ModalButton,
                        ]}
                      >
                        <AppText style={{ color: 'white' }}>Odrzuć</AppText>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </Modal>
            <AppText style={{ fontSize: 19, color: black }}>Linki: </AppText>
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
            <MsgBox type={messageType}>{message}</MsgBox>
            <Button
              onPress={() => {
                updateArtistProfile();
              }}
              title="Zapisz"
              color={darkLight}
            ></Button>
          </View>
        </ScrollView>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProfileEditing;

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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: primary,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
