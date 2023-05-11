import * as React from 'react';
import { View, Dimensions, StyleSheet, ScrollView, SafeAreaView, Modal, TouchableOpacity } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  HomeLabel,
  HomeIconButton,
  ChatImage,
  Colors,
  HomeTextInput,
  ChatLabel,
  AppText,
  StatsText,
  RegularText,
  HeaderText,
  LineForm,
  DropDownInfoText,
  DropDownSubcategoryText,
} from './../../components/styles';
import SearchFilter from '../../components/SearchFilter';
import { useMemo } from 'react';
import { useEffect } from 'react';
import BASE_URL from '../../components/AxiosAuth';
import axios from 'axios';
import CardItem from '../../components/CardItem';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const { width } = Dimensions.get('window');
const { primary, secondary, darkLight, white, grey, black } = Colors;

export default function HomePage({ navigation }) {
  const [cities, setCities] = useState([]);
  const [tags, setTags] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [levelsFiltr, setLevelsFiltr] = useState([]);
  const [citiesFiltr, setCitiesFiltr] = useState([]);
  const [tagsFiltr, setTagsFiltr] = useState([]);
  const [languagesFiltr, setLanguagesFiltr] = useState([]);
  const [categoriesFiltr, setCategoriesFiltr] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [input, setInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showLevels, setShowLevels] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [showLocations, setShowLocations] = useState(false);

  const sort = ['ocena: najwyższa', 'ocena: najniższa', 'ostatnia aktywność'];

  // function handleAddCategories(skill) {
  //   setCategories((categories) => [...categories, skill]);
  // }

  function handleAddTagsFiltr(filtr) {
    setTagsFiltr((tagsFiltr) => [...tagsFiltr, filtr]);
  }

  function handleAddLanguagesFiltr(filtr) {
    setLanguagesFiltr((languagesFiltr) => [...languagesFiltr, filtr]);
  }

  function handleAddCategoriesFiltr(filtr) {
    setCategoriesFiltr((categoriesFiltr) => [...categoriesFiltr, filtr]);
  }

  function handleAddCitiesFiltr(filtr) {
    setCitiesFiltr((citiesFiltr) => [...citiesFiltr, filtr]);
  }

  function handleAddLevelsFiltr(filtr) {
    setLevelsFiltr((levelsFiltr) => [...levelsFiltr, filtr]);
  }

  const citiesData = useMemo(
    () => ({
      method: 'get',
      maxBodyLength: 5000,
      url: BASE_URL + '/api/artist/getAvailableCities',
      headers: {},
    }),
    [],
  );

  const tagsData = useMemo(
    () => ({
      method: 'get',
      maxBodyLength: 5000,
      url: BASE_URL + '/api/artist/getAvailableTags',
      headers: {},
    }),
    [],
  );

  const languagesData = useMemo(
    () => ({
      method: 'get',
      maxBodyLength: 5000,
      url: BASE_URL + '/api/artist/getAvailableLanguages',
      headers: {},
    }),
    [],
  );

  const levelsData = useMemo(
    () => ({
      method: 'get',
      maxBodyLength: 5000,
      url: BASE_URL + '/api/artist/getAvailableLevels',
      headers: {},
    }),
    [],
  );

  const categoriesData = useMemo(
    () => ({
      method: 'get',
      maxBodyLength: 5000,
      url: BASE_URL + '/api/artist/getAvailableCategories',
      headers: {},
    }),
    [],
  );

  const filteredData = useMemo(
    () => ({
      method: 'post',
      maxBodyLength: Infinity,
      url: BASE_URL + '/artist/filter?page=0&size=10',
    }),
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citiesResponse, tagsResponse, categoriesResponse, languagesResponse, levelsResponse] = await Promise.all(
          [
            axios.request(citiesData),
            axios.request(tagsData),
            axios.request(categoriesData),
            axios.request(languagesData),
            axios.request(levelsData),
          ],
        );
        setCities(citiesResponse.data);
        setTags(tagsResponse.data);
        setLevels(levelsResponse.data);
        setLanguages(languagesResponse.data);
        setCategories(categoriesResponse.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [citiesData, tagsData, categoriesData, languagesData, levelsData]);

  const categoriesList = useMemo(() => {
    if (!Array.isArray(categories.categories)) {
      return null;
    }

    const list = categories.categories.map((category, indexC) => (
      <View key={indexC}>
        <DropDownSubcategoryText>{category.name}</DropDownSubcategoryText>
        {category.subcategories.map((subcategory, indexS) => (
          <View style={{ padding: 5 }} key={indexS}>
            <BouncyCheckbox
              size={25}
              fillColor={darkLight}
              unfillColor={primary}
              text={subcategory}
              iconStyle={{ borderColor: darkLight }}
              innerIconStyle={{ borderWidth: 1 }}
              textStyle={{ textDecorationLine: 'none', fontFamily: 'LexendDeca-VariableFont_wght' }}
              onPress={(isChecked) => {}}
            ></BouncyCheckbox>
          </View>
        ))}
      </View>
    ));

    return <View style={{ marginLeft: 45, padding: 10 }}>{list}</View>;
  });

  const levelsList = useMemo(() => {
    if (!levels) {
      return null;
    }

    const list = levels.map((item, index) => (
      <View style={{ padding: 5 }} key={index}>
        <BouncyCheckbox
          size={25}
          fillColor={darkLight}
          unfillColor={primary}
          text={item}
          iconStyle={{ borderColor: darkLight }}
          innerIconStyle={{ borderWidth: 1 }}
          textStyle={{ textDecorationLine: 'none', fontFamily: 'LexendDeca-VariableFont_wght' }}
          onPress={(isChecked) => {}}
        ></BouncyCheckbox>
      </View>
    ));

    return <View style={{ marginLeft: 45, padding: 10 }}>{list}</View>;
  });

  const locationsList = useMemo(() => {
    if (!cities) {
      return null;
    }

    const list = cities.map((item, index) => (
      <View style={{ padding: 5 }} key={index}>
        <BouncyCheckbox
          size={25}
          fillColor={darkLight}
          unfillColor={primary}
          text={item}
          iconStyle={{ borderColor: darkLight }}
          innerIconStyle={{ borderWidth: 1 }}
          textStyle={{ textDecorationLine: 'none', fontFamily: 'LexendDeca-VariableFont_wght' }}
          onPress={(isChecked) => {}}
        ></BouncyCheckbox>
      </View>
    ));

    return <View style={{ marginLeft: 45, padding: 10 }}>{list}</View>;
  });

  const languagesList = useMemo(() => {
    if (!languages) {
      return null;
    }

    const list = languages.map((item, index) => (
      <View style={{ padding: 5 }} key={index}>
        <BouncyCheckbox
          size={25}
          fillColor={darkLight}
          unfillColor={primary}
          text={item}
          iconStyle={{ borderColor: darkLight }}
          innerIconStyle={{ borderWidth: 1 }}
          textStyle={{ textDecorationLine: 'none', fontFamily: 'LexendDeca-VariableFont_wght' }}
          onPress={(isChecked) => {}}
        ></BouncyCheckbox>
      </View>
    ));

    return <View style={{ marginLeft: 45, padding: 10 }}>{list}</View>;
  });

  const tagsList = useMemo(() => {
    if (!tags) {
      return null;
    }

    const list = tags.map((item, index) => (
      <View style={{ padding: 5 }} key={index}>
        <BouncyCheckbox
          size={25}
          fillColor={darkLight}
          unfillColor={primary}
          text={item}
          iconStyle={{ borderColor: darkLight }}
          innerIconStyle={{ borderWidth: 1 }}
          textStyle={{ textDecorationLine: 'none', fontFamily: 'LexendDeca-VariableFont_wght' }}
          onPress={(isChecked) => {}}
        ></BouncyCheckbox>
      </View>
    ));

    return <View style={{ marginLeft: 45, padding: 10 }}>{list}</View>;
  });

  const filteredCards = useMemo(() => {
    if (!Array.isArray(filtered.content)) {
      return null;
    }

    return filtered.content.map((filter, indexF) => (
      <CardItem
        key={indexF}
        avatar="/assets/cards/person1.jpg"
        name={filter.firstname}
        surname={filter.lastname}
        username={filter.username}
        navigation={navigation}
        level={filter.level}
        rating={3.5}
        ratingCount={12}
        city={filter.city}
        skills={filter.skills}
        project1="/assets/cards/design1.jpg"
        project2="/assets/cards/design2.png"
        project3="/assets/cards/design3.jpg"
        project4="/assets/cards/design4.png"
      />
    ));
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: primary }}>
      <ChatLabel
        style={{
          height: 60,
          justifyContent: 'center',
        }}
      >
        <HeaderText>Przeglądaj designer'ów</HeaderText>
      </ChatLabel>
      <HomeLabel>
        <HomeIconButton onPress={() => setShowModal(true)} activeOpacity={0.5}>
          <ChatImage
            style={{ tintColor: '#A9A9A9', width: '50%', marginLeft: 10 }}
            resizeMode="contain"
            source={require('./../../assets/img/filter.png')}
          />
        </HomeIconButton>
        <Modal visible={showModal} transparent={true} animationType="slide" onRequestClose={() => setShowModal(false)}>
          <View style={styles.ModalStyle}>
            <View style={styles.ModalViewStyle}>
              <TouchableOpacity onPress={() => setShowModal(false)} style={{ width: '100%' }}>
                <View style={{ alignItems: 'center' }}>
                  <Icon name="angle-down" size={35} color={darkLight} />
                </View>
              </TouchableOpacity>
              <LineForm />
              <ScrollView style={{ maxWidth: '95%', width: '90%' }}>
                <View style={styles.ModalFilterViewStyle}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'baseline',
                    }}
                  >
                    <DropDownInfoText style={{ marginRight: 15 }}>Poziomy:</DropDownInfoText>
                    <TouchableOpacity
                      style={{ width: '60%' }}
                      onPress={() => {
                        setShowLevels(!showLevels);
                      }}
                    >
                      <FontAwesome name={showLevels ? 'chevron-down' : 'chevron-left'} color={'#A9A9A9'} size={18} />
                    </TouchableOpacity>
                  </View>

                  {showLevels ? levelsList : <></>}
                </View>
                <View style={styles.ModalFilterViewStyle}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'baseline',
                    }}
                  >
                    <DropDownInfoText style={{ marginRight: 15 }}>Skąd:</DropDownInfoText>
                    <TouchableOpacity
                      style={{ width: '60%' }}
                      onPress={() => {
                        setShowLocations(!showLocations);
                      }}
                    >
                      <FontAwesome name={showLocations ? 'chevron-down' : 'chevron-left'} color={'#A9A9A9'} size={18} />
                    </TouchableOpacity>
                  </View>
                  {showLocations ? locationsList : <></>}
                </View>
                <View style={styles.ModalFilterViewStyle}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'baseline',
                    }}
                  >
                    <DropDownInfoText style={{ marginRight: 15 }}>Języki:</DropDownInfoText>
                    <TouchableOpacity
                      style={{ width: '60%' }}
                      onPress={() => {
                        setShowLanguages(!showLanguages);
                      }}
                    >
                      <FontAwesome name={showLanguages ? 'chevron-down' : 'chevron-left'} color={'#A9A9A9'} size={18} />
                    </TouchableOpacity>
                  </View>
                  {showLanguages ? languagesList : <></>}
                </View>
                <View style={styles.ModalFilterViewStyle}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'baseline',
                    }}
                  >
                    <DropDownInfoText style={{ marginRight: 15 }}>Języki:</DropDownInfoText>
                    <TouchableOpacity
                      style={{ width: '60%' }}
                      onPress={() => {
                        setShowTags(!showTags);
                      }}
                    >
                      <FontAwesome name={showTags ? 'chevron-down' : 'chevron-left'} color={'#A9A9A9'} size={18} />
                    </TouchableOpacity>
                  </View>
                  {showTags ? tagsList : <></>}
                </View>
                <View style={styles.ModalFilterViewStyle}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'baseline',
                    }}
                  >
                    <DropDownInfoText style={{ marginRight: 15 }}>Umiejętności:</DropDownInfoText>
                    <TouchableOpacity
                      style={{ width: '60%' }}
                      onPress={() => {
                        setShowCategories(!showCategories);
                      }}
                    >
                      <FontAwesome
                        name={showCategories ? 'chevron-down' : 'chevron-left'}
                        color={'#A9A9A9'}
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>
                  {showCategories ? categoriesList : <></>}
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>

        <SelectDropdown
          data={sort}
          defaultValueByIndex={0}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.DropdownButtonStyle}
          buttonTextStyle={styles.DropdownButtonTextStyle}
          renderDropdownIcon={(isOpened) => {
            return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#A9A9A9'} size={18} />;
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.DropDownStyle1}
          rowStyle={styles.DropdownRowStyle}
          rowTextStyle={styles.DropdownRowTextStyle}
        />
        <HomeTextInput
          value={input}
          onChangeText={(text) => setInput(text)}
          backgroundColor={'#FFFFFF'}
          placeholderTextColor={'#D6D6D6'}
          placeholder="szukaj"
        />
      </HomeLabel>
      <View style={{ height: '86.5%' }}>
        <ScrollView contentContainerStyle={{ alignItems: 'center', marginTop: 5 }}>{filteredCards}</ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  DropdownButtonStyle: {
    flex: 1,
    height: '50%',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
  },
  DropdownButtonTextStyle: {
    fontSize: 14,
    color: '#D6D6D6',
    textAlign: 'left',
  },
  DropdownRowStyle: {
    backfroundColor: '#D6D6D6',
  },
  DropdownRowTextStyle: {
    fontSize: 14,
    color: darkLight,
    textAlign: 'left',
  },
  DropDownStyle1: {
    backgroundColor: primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  ModalStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#00000080',
  },
  ModalViewStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '85%',
    backgroundColor: white,
    overflow: 'hidden',
    padding: 10,
  },
  ModalDropdownButtonStyle: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    height: 40,
  },
  ModalDropdownButtonTextStyle: {
    fontSize: 16,
    color: black,
    fontFamily: 'LexendDeca-VariableFont_wght',
    textAlign: 'left',
  },
  ModalDropdownRowStyle: {
    backfroundColor: '#D6D6D6',
  },
  ModalDropdownRowTextStyle: {
    fontSize: 16,
    fontFamily: 'LexendDeca-VariableFont_wght',
    color: black,
    textAlign: 'left',
  },
  ModalDropDownStyle1: {
    backgroundColor: primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  ModalFilterViewStyle: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
  },
});
