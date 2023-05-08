import * as React from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Modal,
    TouchableOpacity,
} from 'react-native';
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
    DropDownInfoText
} from './../../components/styles'
import SearchFilter from '../../components/SearchFilter';
import { useMemo } from 'react';
import { useEffect } from 'react';
import BASE_URL, { default as baseURL } from '../../components/AxiosAuth';
import axios from "axios";
import CardItem from '../../components/CardItem';

const { width } = Dimensions.get('window');
const { primary, secondary, darkLight, white, grey, black } = Colors;

export default function HomePage({ navigation }) {
    const [cities, setCities] = useState([]);
    const [tags, setTags] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [input, setInput] = useState("");
    const [showModal, setShowModal] = useState(false);

    const sort = [
        'ocena: najwyższa',
        'ocena: najniższa',
        'ostatnia aktywność'
    ]

    const citiesData = useMemo(() => ({
        method: 'get',
        maxBodyLength: 5000,
        url: BASE_URL + "/api/artist/getAvailableCities",
        headers: {},
    }), []);

    const tagsData = useMemo(() => ({
        method: 'get',
        maxBodyLength: 5000,
        url: BASE_URL + "/api/artist/getAvailableTags",
        headers: {},
    }), []);

    const languagesData = useMemo(() => ({
        method: 'get',
        maxBodyLength: 5000,
        url: BASE_URL + "/api/artist/getAvailableLanguages",
        headers: {},
    }), []);

    const categoriesData = useMemo(() => ({
        method: 'get',
        maxBodyLength: 5000,
        url: BASE_URL + "/api/artist/getAvailableCategories",
        headers: {},
    }), []);

    const filteredData = useMemo(() => ({
        method: 'get',
        maxBodyLength: Infinity,
        url: BASE_URL + "/artist/filter?level=&location=&category=&language=&subcategory=&tags=&page=0&size=10",
    }), []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [citiesResponse, tagsResponse, categoriesResponse, languagesResponse, filteredResponse] = await Promise.all([
                    axios.request(citiesData),
                    axios.request(tagsData),
                    axios.request(categoriesData),
                    axios.request(languagesData),
                    axios.request(filteredData),
                ]);
                setCities(citiesResponse.data);
                setTags(tagsResponse.data);
                setCategories(categoriesResponse.data);
                setLanguages(languagesResponse.data);
                setFiltered(filteredResponse.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [citiesData, tagsData, categoriesData, languagesData, filteredData]);

    const categoryOptions = useMemo(() => {
        if (!Array.isArray(categories.categories)) {
            return null;
        }

        return (
            <SelectDropdown
                data={categories.categories.map(category => category.name)}
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
                buttonStyle={styles.ModalDropdownButtonStyle}
                buttonTextStyle={styles.ModalDropdownButtonTextStyle}
                renderDropdownIcon={isOpened => {
                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#A9A9A9'} size={18} />;
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.ModalDropDownStyle1}
                rowStyle={styles.ModalDropdownRowStyle}
                rowTextStyle={styles.ModalDropdownRowTextStyle}
            />
        );
    })

    const subcategoryOptions = useMemo(() => {
        if (!Array.isArray(categories.categories)) {
            return null;
        }

        return (
            <SelectDropdown
                data={categories.categories.flatMap(category => category.subcategories)}
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
                buttonStyle={styles.ModalDropdownButtonStyle}
                buttonTextStyle={styles.ModalDropdownButtonTextStyle}
                renderDropdownIcon={isOpened => {
                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#A9A9A9'} size={18} />;
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.ModalDropDownStyle1}
                rowStyle={styles.ModalDropdownRowStyle}
                rowTextStyle={styles.ModalDropdownRowTextStyle}
            />
        );
    })

    const filteredCards = useMemo(() => {
        if (!Array.isArray(filtered.content)) {
            return null;
        }

        return filtered.content.map((filter, indexF) => (
            <CardItem key={indexF}
                avatar="/assets/cards/person1.jpg"
                name={filter.firstname}
                surname={filter.lastname}
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
            <ChatLabel style={{
                height: 60,
                justifyContent: "center",
            }}>
                <HeaderText>Przeglądaj designer'ów</HeaderText>
            </ChatLabel>
            <HomeLabel>
                <HomeIconButton onPress={() => setShowModal(true)} activeOpacity={0.5}>
                    <ChatImage style={{ tintColor: '#A9A9A9', width: '50%', marginLeft: 10 }} resizeMode="contain" source={require('./../../assets/img/filter.png')} />
                </HomeIconButton>
                <Modal
                    visible={showModal}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setShowModal(false)}
                >
                    <View style={styles.ModalStyle}>
                        <View style={styles.ModalViewStyle}>
                            <TouchableOpacity onPress={() => setShowModal(false)} style={{ width: '100%' }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Icon name="angle-down" size={35} color={darkLight} />
                                </View>
                            </TouchableOpacity>
                            <LineForm />
                            <View style={styles.ModalFilterViewStyle}>
                                <DropDownInfoText>Skąd?</DropDownInfoText>
                                <SelectDropdown
                                    data={cities}
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
                                    buttonStyle={styles.ModalDropdownButtonStyle}
                                    buttonTextStyle={styles.ModalDropdownButtonTextStyle}
                                    renderDropdownIcon={isOpened => {
                                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#A9A9A9'} size={18} />;
                                    }}
                                    dropdownIconPosition={'right'}
                                    dropdownStyle={styles.ModalDropDownStyle1}
                                    rowStyle={styles.ModalDropdownRowStyle}
                                    rowTextStyle={styles.ModalDropdownRowTextStyle}
                                />
                            </View>
                            <View style={styles.ModalFilterViewStyle}>
                                <DropDownInfoText>Języki</DropDownInfoText>
                                <SelectDropdown
                                    data={languages}
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
                                    buttonStyle={styles.ModalDropdownButtonStyle}
                                    buttonTextStyle={styles.ModalDropdownButtonTextStyle}
                                    renderDropdownIcon={isOpened => {
                                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#A9A9A9'} size={18} />;
                                    }}
                                    dropdownIconPosition={'right'}
                                    dropdownStyle={styles.ModalDropDownStyle1}
                                    rowStyle={styles.ModalDropdownRowStyle}
                                    rowTextStyle={styles.ModalDropdownRowTextStyle}
                                />
                            </View>
                            <View style={styles.ModalFilterViewStyle}>
                                <DropDownInfoText>Tagi</DropDownInfoText>
                                <SelectDropdown
                                    data={tags}
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
                                    buttonStyle={styles.ModalDropdownButtonStyle}
                                    buttonTextStyle={styles.ModalDropdownButtonTextStyle}
                                    renderDropdownIcon={isOpened => {
                                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#A9A9A9'} size={18} />;
                                    }}
                                    dropdownIconPosition={'right'}
                                    dropdownStyle={styles.ModalDropDownStyle1}
                                    rowStyle={styles.ModalDropdownRowStyle}
                                    rowTextStyle={styles.ModalDropdownRowTextStyle}
                                />
                            </View>
                            <View style={styles.ModalFilterViewStyle}>
                                <DropDownInfoText>Kategorie</DropDownInfoText>
                                {categoryOptions}
                            </View>
                            <View style={styles.ModalFilterViewStyle}>
                                <DropDownInfoText>Podkategorie</DropDownInfoText>
                                {subcategoryOptions}
                            </View>
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
                    renderDropdownIcon={isOpened => {
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
            <View>
                <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                    {filteredCards}
                </ScrollView>
            </View>
        </SafeAreaView>

    );
};

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
        textAlign: 'left'
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
        textAlign: 'left'
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 20,
    }
});
