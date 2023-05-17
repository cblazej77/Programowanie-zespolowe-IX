import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Pressable, SafeAreaView } from 'react-native';
import {
  HeaderText,
  HeaderTextInput,
  RegularTextInput,
  Colors,
  AppText,
  StatsText,
  RegularText,
  Bubble,
  Line,
  ModalBubble,
} from '../../components/styles';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment, { lang } from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { default as baseURL } from '../../components/AxiosAuth';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { black, primary, grey, darkLight } = Colors;

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

const commisionsData = [
  {
    id: 1,
    title: 'Projekt logo dla firmy produkującej kosmetyki naturalne',
    description:
      'Poszukujemy osoby do zaprojektowania logo dla naszej firmy. Chcielibyśmy, żeby logo nawiązywało do idei naturalności i ekologii, które są dla nas ważne. W zamian oferujemy dobre wynagrodzenie i ciekawe projekty do realizacji w przyszłości',
    stawka: 2000,
    deadline: '2 tyg.',
    level: ['Mid'],
    location: ['Zdalnie'],
    tags: ['Design logo', 'Kosmetyki', 'Ekologia'],
    skills: ['Maskotka'],
    languages: ['Polski', 'Angielski'],
  },
  {
    id: 2,
    title: 'Projekt opakowań dla nowej marki herbat ekologicznych',
    description:
      'Szukamy doświadczonego projektanta graficznego, który zaprojektuje dla nas opakowania do naszych herbat ekologicznych. Zależy nam na kreatywnym podejściu, które pozwoli wyróżnić nasze produkty na rynku. Oferujemy konkurencyjne wynagrodzenie oraz możliwość dalszej współpracy przy projektowaniu innych elementów graficznych.',
    stawka: 3000,
    deadline: '3 tyg.',
    level: ['Senior'],
    location: ['Zdalnie'],
    tags: ['Design opakowań', 'Herbaty', 'Ekologia'],
    skills: ['Maskotka'],
    languages: ['Polski', 'Angielski'],
  },
  {
    id: 3,
    title: 'Projekt plakatu promującego wystawę sztuki nowoczesnej',
    description:
      'Jesteśmy galerią sztuki i poszukujemy projektanta graficznego, który zaprojektuje dla nas plakat promujący zbliżającą się wystawę sztuki nowoczesnej. Zależy nam na ciekawym i oryginalnym projekcie, który przyciągnie uwagę potencjalnych zwiedzających. Oferujemy dobrą stawkę oraz możliwość dalszej współpracy przy projektowaniu innych elementów graficznych.',
    stawka: 2500,
    deadline: '2 tyg.',
    level: ['Junior', 'Mid', 'Senior'],
    location: ['Bydgoszcz', 'Torun', 'Warszawa', 'Zdalnie'],
    tags: [
      'Design plakatu',
      'Sztuka',
      'Wystawa',
      'Sztukaaaaaa',
      'Design plakatu',
      'Sztuka',
      'Wystawa',
      'Design plakatu',
      'Sztuka',
      'Wystawa',
    ],
    skills: ['Maskotka'],
    languages: ['Polski', 'Angielski'],
  },
];

const CommisionElement = (props) => {
  generateBoxShadowStyle(0, 8, '#0F0F0F33', 0.2, 15, 2, '#0F0F0F33');

  return (
    <View style={[styles.Commision, styles.boxShadow]}>
      <View style={styles.TopContainer}>
        <View style={styles.TitleContainer}>
          <View style={styles.TitleText}>
            <StatsText style={{ textAlign: 'left' }}>{props.title}</StatsText>
          </View>
          <Bubble style={[styles.LevelBubble]}>
            <AppText style={{ fontSize: 10, color: darkLight }}>{props.level}</AppText>
          </Bubble>
        </View>
        <RegularText style={{ maxWidth: '20%', textAlign: 'right' }}>{props.stawka + ' PLN'}</RegularText>
      </View>
      <View style={styles.MiddleContainer}>
        {props.location.length > 1 ? (
          <RegularText style={styles.MiddleText1}>{props.location[0] + '+'}</RegularText>
        ) : (
          <RegularText style={styles.MiddleText1}>{props.location}</RegularText>
        )}
        <RegularText style={styles.MiddleText2}>{props.deadline}</RegularText>
      </View>
      <View style={styles.BottomContainer}>
        {props.tags.map((tag, indexT) => (
          <Bubble style={styles.TagBubble} key={indexT}>
            <AppText style={{ fontSize: 10, color: darkLight }}>{tag}</AppText>
          </Bubble>
        ))}
      </View>
    </View>
  );
};

const CompanyCommisionsEditing = ({ route, navigation }) => {
  generateBoxShadowStyle(0, 8, '#0F0F0F33', 0.2, 15, 2, '#0F0F0F33');

  const availableLevels = ['Junior', 'Mid', 'Senior', 'Junior+', 'Mid+'];

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [tagsModalVisible, setTagsModalVisible] = useState(false);
  const [skillsModalVisible, setSkillsModalVisible] = useState(false);
  const [languagesModalVisible, setLanguagesModalVisible] = useState(false);
  const [locationsModalVisible, setLocationsModalVisible] = useState(false);
  const [commisions, setCommisions] = useState(commisionsData);
  const [isNewElement, setIsNewElement] = useState(false);

  //available data from server
  const [availableLocations, setAvailableLocations] = useState([]);
  const [availableTags, setAvailableTags] = useState('');
  const [availableCategories, setAvailableCategories] = useState('');
  const [availableSkills, setAvailableSkills] = useState([]);
  const [availableLanguages, setAvailableLanguages] = useState('');

  //temporatry const
  const [tagsToAdd, setTagsToAdd] = useState([]);
  const [skillsToAdd, setSkillsToAdd] = useState([]);
  const [languagesToAdd, setLanguagesToAdd] = useState([]);
  const [locationsToAdd, setLocationsToAdd] = useState([]);
  const [id, setId] = useState(0);

  //objects added to sended JSON
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [stake, setStake] = useState(0);
  const [deadline, setDeadline] = useState('01/01/1990');
  const [skills, setSkills] = useState([]);
  const [tags, setTags] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [levels, setLevels] = useState([]);
  const [locations, setLocations] = useState([]);

  //handling hooks

  function handleAddCommisionsElement(
    id,
    title,
    description,
    deadline,
    level,
    location,
    skills,
    tags,
    languages,
    stawka,
  ) {
    setCommisions((commisions) => [
      ...commisions,
      {
        id: id,
        title: title,
        description: description,
        deadline: deadline,
        level: level,
        location: location,
        skills: skills,
        tags: tags,
        languages: languages,
        stawka: stawka,
      },
    ]);
  }

  function handleChangeCommisionsElement(
    id,
    title,
    description,
    deadline,
    level,
    location,
    skills,
    tags,
    languages,
    stawka,
  ) {
    setCommisions(
      commisions.map((c) => {
        if (c.id === id) {
          c.title = title;
          c.description = description;
          c.deadline = deadline;
          c.level = level;
          c.location = location;
          c.skills = skills;
          c.tags = tags;
          c.languages = languages;
          c.stawka = stawka;
        }
        return c;
      }),
    );
  }

  function handleDeleteCommisionsElement(id) {
    setCommisions(commisions.filter((e) => e.id !== id));
  }

  function handleAddAvailableSkills(skill) {
    setAvailableSkills((availableSkills) => [...availableSkills, skill]);
  }

  function handleDeleteAvailableSkills(skill) {
    setAvailableSkills(availableSkills.filter((s) => s !== skill));
  }

  function handleAddSkill(skill) {
    setSkills((skills) => [...skills, skill]);
  }

  function handleDeleteSkill(skill) {
    setSkills(skills.filter((s) => s !== skill));
  }

  function handleAddLocation(location) {
    setLocations((locations) => [...locations, location]);
  }

  function handleDeleteLocation(location) {
    setLocations(locations.filter((s) => s !== location));
  }

  function handleAddLevel(level) {
    setLevels((levels) => [...levels, level]);
  }

  function handleDeleteLevel(level) {
    setLevels(levels.filter((s) => s !== level));
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

  function handleAddLocationsToAdd(location) {
    setLocationsToAdd((locationsToAdd) => [...locationsToAdd, location]);
  }

  function handleDeleteLocationsToAdd(location) {
    setLocationsToAdd(locationsToAdd.filter((s) => s !== location));
  }

  function handleClearAvailableSkills() {
    setAvailableSkills([]);
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

  function handleClearLocationsToAdd() {
    setLocationsToAdd([]);
  }

  function clear() {
    handleClearLanguagesToAdd();
    handleClearLocationsToAdd();
    handleClearSkillsToAdd();
    handleClearTagsToAdd();
    setId(-1);
    setTitle('');
    setDeadline('01/01/1990');
    setDescription('');
    setLevels([]);
    setLocations([]);
    setLanguages([]);
    setSkills([]);
    setTags([]);
    setStake(0);
    //setModalCommision('');
  }

  // Adding temp values to objects creating commision
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

  function addLocationss() {
    for (let i = 0; i < locationsToAdd.length; ++i) {
      handleAddLocation(locationsToAdd[i]);
    }
    handleClearLocationsToAdd();
  }

  // function saveModalCommision() {
  //   console.log(modalCommision);
  //   modalCommision.id = id;
  //   modalCommision.title = title;
  //   modalCommision.deadline = deadline;
  //   modalCommision.description = description;
  //   modalCommision.level = levels;
  //   modalCommision.location = locations;
  //   modalCommision.languages = languages;
  //   modalCommision.skills = skills;
  //   modalCommision.tags = tags;
  //   modalCommision.stawka = stake;
  //   console.log(modalCommision);
  // }

  function setModalCommision(id, title, description, deadline, level, location, languages, skills, tags, stawka) {
    console.log({
      'id:': id,
      'title:': title,
      'description:': description,
      'deadline:': deadline,
      'level:': level,
      'location:': location,
      'languages:': languages,
      'skills:': skills,
      'tags:': tags,
      'stawka:': stawka,
    });
    setId(id);
    setTitle(title);
    setDescription(description);
    setDeadline(deadline);
    setLevels(level);
    setLocations(location);
    setLanguages(languages);
    setSkills(skills);
    setTags(tags);
    setStake(stawka);
  }

  function saveCommision() {
    if (!isNewElement) {
      handleChangeCommisionsElement(
        id,
        title,
        description,
        deadline,
        levels,
        locations,
        skills,
        tags,
        languages,
        stake,
      );
    } else {
      handleAddCommisionsElement(id, title, description, deadline, levels, locations, skills, tags, languages, stake);
    }
    clear();
    setisModalVisible(false);
  }

  function getIdOfLastCommisionsElement() {
    let l = commisions.length;
    if (l > 0) {
      return commisions[l - 1].id;
    } else return -1;
  }

  function setSelectedLevels(level) {
    switch (level) {
      case 'Junior':
        setLevels(['Junior']);
        break;
      case 'Junior+':
        setLevels(['Junior', 'Mid', 'Senior']);
        break;
      case 'Mid':
        setLevels(['Mid']);
        break;
      case 'Mid+':
        setLevels(['Mid', 'Senior']);
        break;
      case 'Senior':
        setLevels(['Senior']);
        break;
    }
  }

  function getSelectedLevel(levels) {
    if (levels) {
      if (levels.length === 3) {
        return 'Junior+';
      } else if (levels.length === 2) {
        return 'Mid+';
      } else if (levels.length === 1) {
        return levels[0];
      } else {
        return 'Junior';
      }
    }
  }

  //listing bubbles

  function ListLocations() {
    if (locations) {
      const list = locations.map((item, id) => (
        <Bubble
          style={[{ width: item.size, marginRight: 5, flexDirection: 'row', alignItems: 'center' }, styles.boxShadow]}
          key={id}
        >
          <AppText>{item}</AppText>
          <TouchableOpacity onPress={() => handleDeleteLocation(item)}>
            <Ionicons size={16} name={'close'} color="#A9A9A9" style={{ marginTop: 3 }} />
          </TouchableOpacity>
        </Bubble>
      ));
      return (
        <>
          {list}
          <TouchableOpacity onPress={() => setLocationsModalVisible(true)}>
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

  function ListAvailableLocations() {
    if (availableLocations) {
      const available = availableLocations.filter((item) => {
        if (!locations.includes(item)) return item;
      });
      const list = available.map((item, id) => (
        <Pressable
          onPress={() => {
            if (locationsToAdd.includes(item)) {
              handleDeleteLocationsToAdd(item);
            } else {
              handleAddLocationsToAdd(item);
            }
          }}
          key={id}
        >
          <ModalBubble
            style={[{ width: item.size, marginRight: 5, flexDirection: 'row', alignItems: 'center' }, styles.boxShadow]}
            key={id}
            checked={locationsToAdd.includes(item)}
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

  //API handling

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
        const [citiesResponse, tagsResponse, categoriesResponse, languagesResponse] = await Promise.all([
          axios.request(configCities),
          axios.request(configTag),
          axios.request(configCategories),
          axios.request(configLanguages),
        ]);
        setAvailableTags(tagsResponse.data);
        setAvailableLanguages(languagesResponse.data);
        setAvailableLocations(citiesResponse.data);
        handleClearAvailableSkills();
        setAvailableCategories(categoriesResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (availableCategories) {
      for (let i = 0; i < availableCategories.categories.length; ++i) {
        for (let j = 0; j < availableCategories.categories[i].subcategories.length; ++j) {
          handleAddAvailableSkills(availableCategories.categories[i].subcategories[j]);
        }
      }
    }
  }, [availableCategories]);

  // useEffect(() => {
  //   if (modalCommision) {
  //     setId(modalCommision.id);
  //     setTitle(modalCommision.title);
  //     setDescription(modalCommision.description);
  //     setDeadline(modalCommision.deadline);
  //     setLocations(modalCommision.location);
  //     setLevels(modalCommision.level);
  //     setLanguages(modalCommision.languages);
  //     setTags(modalCommision.tags);
  //     setSkills(modalCommision.skills);
  //     setStake(parseInt(modalCommision.stawka));
  //   }
  // }, [modalCommision]);

  return (
    <SafeAreaView style={{ backgroundColor: primary, justifyContent: 'center' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {isModalVisible ? (
            <View style={{ maxHeight: '90%' }}>
              <View style={[styles.centeredView]}>
                <View style={styles.modalView}>
                  <HeaderTextInput
                    maxLength={255}
                    multiline={true}
                    style={{ color: darkLight, maxWidth: '95%', width: '90%', textAlign: 'left' }}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Wpisz tytuł"
                  ></HeaderTextInput>
                  <Line style={{ width: '90%', height: 2 }} />
                  <RegularTextInput
                    maxLength={255}
                    multiline={true}
                    style={{ color: '#6e6968', maxWidth: '100%', width: '90%', textAlign: 'left' }}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Wpisz opis"
                  ></RegularTextInput>
                  <Line style={{ width: '90%', height: 1 }} />
                  <View style={styles.ModalCommisionDetails}>
                    <View style={styles.ModalDetail}>
                      <RegularText style={{ width: '50%' }}>Stawka:</RegularText>
                      <RegularTextInput
                        maxLength={15}
                        textAlign="right"
                        keyboardType="number-pad"
                        style={{ color: darkLight, width: '30%' }}
                        value={stake.toString()}
                        onChangeText={(newText) => {
                          if (newText === '' || newText === 'NaN') {
                            setStake(0);
                          }
                          setStake(parseInt(newText));
                        }}
                        placeholder="Wpisz stawke"
                      ></RegularTextInput>
                      <RegularText> PLN</RegularText>
                    </View>
                    <View style={styles.ModalDetail}>
                      <RegularText style={{ width: '60%' }}>Czas wykonania:</RegularText>
                      <TouchableOpacity
                        onPress={() => {
                          setShowDatePicker(true);
                        }}
                      >
                        <RegularText style={{ fontSize: 16, marginLeft: 5 }}>{deadline}</RegularText>
                      </TouchableOpacity>

                      {showDatePicker && (
                        <DateTimePicker
                          testID="startDateTimePicker"
                          value={new Date(moment(deadline, 'DD-MM-YYYY'))}
                          mode="date"
                          onChange={(event, newdate) => {
                            setDeadline(moment(newdate).format('DD/MM/YYYY'));
                            setShowDatePicker(false);
                          }}
                        />
                      )}
                    </View>
                    <View style={styles.ModalDetail}>
                      <RegularText style={{ width: '60%' }}>Poziom zaawansowania:</RegularText>
                      <SelectDropdown
                        data={availableLevels}
                        onSelect={(selectedItem, index) => {
                          setSelectedLevels(selectedItem);
                        }}
                        defaultButtonText={getSelectedLevel(levels)}
                        buttonStyle={{
                          width: 100,
                          height: 30,
                          borderWidth: 2,
                          borderColor: grey,
                          borderRadius: 12,
                          backgroundColor: primary,
                        }}
                        buttonTextStyle={{ fontSize: 14 }}
                        renderDropdownIcon={(isOpened) => {
                          return (
                            <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={black} size={12} />
                          );
                        }}
                        dropdownIconPosition={'right'}
                      />
                    </View>
                  </View>
                  <Line style={{ width: '90%', height: 1 }} />
                  <View style={styles.ModalMapping}>
                    <RegularText style={{ marginRight: 5 }}>Lokalizacje:</RegularText>
                    <View style={{ width: '90%', flexDirection: 'row', flexWrap: 'wrap' }}>{ListLocations()}</View>
                    <Modal
                      isVisible={locationsModalVisible}
                      onBackdropPress={() => setLocationsModalVisible(false)}
                      onSwipeComplete={() => setLocationsModalVisible(false)}
                      swipeDirection="right"
                      animationInTiming={500}
                      animationOutTiming={500}
                      hideModalContentWhileAnimating={true}
                    >
                      <ScrollView style={{ maxHeight: '90%', margin: 10 }}>
                        <View style={[styles.centeredView]}>
                          <View style={styles.modalView}>
                            {ListAvailableLocations()}
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                              <Pressable
                                onPress={() => {
                                  addLocationss();
                                  setLocationsModalVisible(false);
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
                                  handleClearLocationsToAdd();
                                  setLocationsModalVisible(false);
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
                  </View>
                  <Line style={{ width: '90%', height: 1 }} />
                  <View style={styles.ModalMapping}>
                    <RegularText style={{ marginRight: 5 }}>Tagi:</RegularText>
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
                  </View>
                  <Line style={{ width: '90%', height: 1 }} />
                  <View style={styles.ModalMapping}>
                    <RegularText style={{ marginRight: 5 }}>Wymagane Umiejętności:</RegularText>
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
                  </View>
                  <Line style={{ width: '90%', height: 1 }} />
                  <View style={styles.ModalMapping}>
                    <RegularText style={{ marginRight: 5 }}>Wymagane Języki:</RegularText>
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
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Pressable
                      onPress={() => {
                        saveCommision();
                        setIsNewElement(false);
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
                        setisModalVisible(false);
                        setIsNewElement(false);
                        clear();
                      }}
                      style={({ pressed }) => [
                        {
                          backgroundColor: pressed ? 'lightgrey' : darkLight,
                        },
                        styles.ModalButton,
                      ]}
                    >
                      <AppText style={{ color: 'white' }}>Anuluj</AppText>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View>
              <View style={{ alignItems: 'center', width: '100%' }}>
                <HeaderText numberOfLines={1} style={{ color: black }}>
                  Zlecenia
                </HeaderText>
              </View>
              <View style={{ backgroundColor: primary }}>
                {commisions.map((cms, indexC) => (
                  <View key={indexC} style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                      onPress={() => {
                        setisModalVisible(true);
                        setIsNewElement(false);
                        setModalCommision(
                          cms.id,
                          cms.title,
                          cms.description,
                          cms.deadline,
                          cms.level,
                          cms.location,
                          cms.languages,
                          cms.skills,
                          cms.tags,
                          cms.stawka,
                        );
                      }}
                      key={indexC}
                    >
                      <CommisionElement
                        key={indexC}
                        title={cms.title}
                        description={cms.description}
                        stawka={cms.stawka}
                        deadline={cms.deadline}
                        level={getSelectedLevel(cms.level)}
                        location={cms.location}
                        tags={cms.tags}
                      />
                    </TouchableOpacity>
                    <Pressable
                      onPress={() => {
                        handleDeleteCommisionsElement(cms.id);
                      }}
                      style={({ pressed }) => [
                        {
                          backgroundColor: pressed ? 'lightgrey' : darkLight,
                          padding: 5,
                          borderRadius: 15,
                          fontSize: 16,
                          marginBottom: 10,
                          alignItems: 'center',
                          flexDirection: 'row',
                        },
                      ]}
                    >
                      <AppText style={{ color: 'white' }}>Usuń</AppText>
                    </Pressable>
                    <Line style={{ width: '90%', height: 1 }} />
                  </View>
                ))}
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  alignContent: 'center',
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    // handleAddCommisionsElement(
                    //   getIdOfLastCommisionsElement() + 1,
                    //   '',
                    //   '',
                    //   '01/01/1990',
                    //   [],
                    //   [],
                    //   [],
                    //   [],
                    //   [],
                    //   0,
                    // );
                    setIsNewElement(true);
                    setModalCommision(getIdOfLastCommisionsElement() + 1, '', '', '01/01/1990', [], [], [], [], [], 0);
                    setisModalVisible(true);
                  }}
                >
                  <Bubble style={[{ alignContent: 'center', marginBottom: 3, marginTop: 3 }, styles.boxShadow]}>
                    <AppText>Dodaj</AppText>
                  </Bubble>
                </TouchableOpacity>
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
                  onPress={() => {}}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? 'lightgrey' : darkLight,
                      marginRight: 0,
                      padding: 7,
                      borderRadius: 15,
                      fontSize: 16,
                      marginBottom: 10,
                      marginTop: 10,
                      alignItems: 'center',
                      flexDirection: 'row',
                    },
                  ]}
                >
                  <AppText style={{ color: primary, fontSize: 16 }}>Zapisz</AppText>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompanyCommisionsEditing;

const styles = StyleSheet.create({
  Commision: {
    borderRadius: 15,
    borderColor: grey,
    padding: 5,
    margin: 5,
    marginRight: 5,
    marginBottom: 10,
    width: '98%',
  },
  TopContainer: {
    flexDirection: 'row',
    maxWidth: '100%',
    justifyContent: 'space-evenly',
  },
  TitleContainer: {
    flexDirection: 'row',
    maxWidth: '80%',
    width: '80%',
    marginLeft: 5,
  },
  TitleText: {
    maxWidth: '92%',
    textAlign: 'left',
  },
  LevelBubble: {
    maxHeight: 20,
    maxWidth: 46,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 3,
    paddingRight: 3,
    marginTop: 0,
    marginBottom: 0,
    borderColor: '#a8a5a5',
    borderWidth: 1,
  },
  MiddleText1: {
    color: '#a8a5a5',
    fontSize: 12,
    marginHorizontal: 10,
    marginRight: 20,
  },
  MiddleText2: {
    color: '#a8a5a5',
    fontSize: 12,
    marginRight: 20,
  },
  MiddleContainer: {
    flexDirection: 'row',
    maxWidth: '80%',
    justifyContent: 'flex-start',
  },
  BottomContainer: {
    flexDirection: 'row',
    maxWidth: '100%',
    justifyContent: 'flex-end',
    flexWrap: 'wrap-reverse',
  },
  TagBubble: {
    maxHeight: 20,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 3,
    paddingRight: 3,
    marginTop: 3,
    marginBottom: 5,
    marginHorizontal: 2,
    borderColor: '#a8a5a5',
    borderWidth: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: '100%',
  },
  modalView: {
    width: '100%',
    margin: 10,
    backgroundColor: primary,
    borderRadius: 20,
    padding: 15,
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
  ModalDescription: {
    paddingTop: 5,
    padding: 15,
  },
  ModalCommisionDetails: {
    alignItems: 'flex-start',
    alignContent: 'center',
    justifyContent: 'center',
  },
  ModalDetail: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  ModalMapping: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 17,
    paddingRight: 12,
  },
  ModalTagBubble: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 0,
    marginBottom: 5,
    marginHorizontal: 2,
  },
});
