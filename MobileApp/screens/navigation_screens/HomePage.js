import * as React from 'react';
import { View, Text, TextInput, StatusBar, Dimensions, StyleSheet, ScrollView, Image, FlatList, SafeAreaView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    HeaderText
} from './../../components/styles'
import SearchFilter from '../../components/SearchFilter';
import { useMemo } from 'react';
import { useEffect } from 'react';
import {default as baseURL} from '../../components/AxiosAuth';
import axios from "axios";
import CardItem from '../../components/CardItem';

const { width } = Dimensions.get('window');
const { primary, secondary, darkLight } = Colors;

export default function HomePage({ navigation }) {
    const [filtered, setFiltered] = useState([]);
    const [input, setInput] = useState("");

    const sort = [
        'ocena: najwyższa',
        'ocena: najniższa',
        'ostatnia aktywność'
    ]

    const filteredData = useMemo(() => ({
        method: 'get',
        maxBodyLength: Infinity,
        url: baseURL + "/artist/filter?level=&location=&category=&language=&subcategory=&tags=&page=0&size=10",
    }), []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [filteredResponse] = await Promise.all([
                    axios.request(filteredData),
                ]);
                setFiltered(filteredResponse.data);
                console.log(filteredResponse.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [filteredData]);

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
                <HomeIconButton onPress={() => alert('Filtrowanie')} activeOpacity={0.5}>
                    <ChatImage style={{ tintColor: '#A9A9A9', width: '50%', marginLeft: 10 }} resizeMode="contain" source={require('./../../assets/img/filter.png')} />
                </HomeIconButton>
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
            {/* karty do odkomentowania
            {filteredCards} */}
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
        borderBottomRightRadius: 20
    },
});

/*
nagłówek Homepage
<ChatLabel style={{ paddingLeft: 15}}>
    <AppText>Znajdź artystów</AppText>
</ChatLabel>
*/