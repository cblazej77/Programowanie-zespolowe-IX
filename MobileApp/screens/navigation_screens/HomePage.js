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
    RegularText
} from './../../components/styles'
import SearchFilter from '../../components/SearchFilter';

const { width } = Dimensions.get('window');
const { primary, secondary, darkLight } = Colors;

const DATA = [
    {
        id: "1",
        name: "Cyprian Woźniak",
        opinions: 27,
    },
    {
        id: "2",
        name: "Norbert Krawczyk",
        opinions: 108,
    },
    {
        id: "3",
        name: "Blanka Szulc",
        opinions: 79,
    },
    {
        id: "4",
        name: "Iza Mazur",
        opinions: 165,
    },
    {
        id: "5",
        name: "Piotr Baran",
        opinions: 250,
    },
    {
        id: "6",
        name: "Joachim Kołodziej",
        opinions: 93,
    },
    {
        id: "7",
        name: "Blanka Krajewska",
        opinions: 183,
    },
    {
        id: "8",
        name: "Elżbieta Makowska",
        opinions: 204,
    },
];

export default function HomePage({ navigation }) {
    const sort = [
        'ocena: najwyższa',
        'ocena: najniższa',
        'ostatnia aktywność'
    ]

    const [input, setInput] = useState("");

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: primary }}>
            
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
            <FlatList contentContainerStyle={{ alignItems: 'center' }}
                data={DATA}
                keyExtractor={(item, index) => index}
                ListHeaderComponent={<View style={{ height: 20 }}></View>}
                renderItem={({ item }) => {
                    if (input === "") {
                        return (
                            <View style={styles.PostStyle}>
                                <View style={{
                                    height: '20%',
                                    alignItems: 'center',
                                    flexDirection: 'row'
                                }}>
                                    <View style={{ height: 50, width: 50, backgroundColor: "#CCC", marginLeft: 10, borderRadius: 30 }} />
                                    <StatsText style={{
                                        color: "#FFF",
                                        marginLeft: 10
                                    }}>{item.name}</StatsText>
                                </View>
                                <View style={{
                                    backgroundColor: "#CCC",
                                    height: "70%",
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{ color: primary }}>Image not found</Text></View>
                                <View style={{ height: '10%', justifyContent: 'center', marginLeft: 10 }}>
                                    <RegularText style={{ color: "#FFF", }}>{item.opinions} opinii</RegularText>
                                </View>
                            </View>
                        )
                    }

                    if (item.name.toLowerCase().includes(input.toLowerCase())) {
                        return (
                            <View style={styles.PostStyle}>
                                <View style={{
                                    height: '20%',
                                    alignItems: 'center',
                                    flexDirection: 'row'
                                }}>
                                    <View style={{ height: 50, width: 50, backgroundColor: "#CCC", marginLeft: 10, borderRadius: 30 }} />
                                    <Text style={{
                                        color: "#FFF",
                                        fontSize: 17,
                                        fontWeight: 'bold',
                                        marginLeft: 10
                                    }}>{item.name}</Text>
                                </View>
                                <View style={{
                                    backgroundColor: "#CCC",
                                    height: "70%",
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{ color: primary }}>Image not found</Text></View>
                                <View style={{ height: '10%', justifyContent: 'center', marginLeft: 10 }}>
                                    <Text style={{ color: "#FFF", }}>{item.opinions} opinii</Text>
                                </View>
                            </View>
                        )
                    }
                }}
                ListFooterComponent={<View style={{ height: 20 }}></View>}
            />

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
    PostStyle: {
        backgroundColor: secondary,
        height: 350,
        minWidth: "90%",
        maxWidth: "90%",
        marginBottom: 15,
        borderRadius: 5,
    }
});

/*
nagłówek Homepage
<ChatLabel style={{ paddingLeft: 15}}>
    <AppText>Znajdź artystów</AppText>
</ChatLabel>
*/