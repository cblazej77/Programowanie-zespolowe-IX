import * as React from 'react';
import { View, Text, SafeAreaView, StatusBar, Dimensions, StyleSheet, ScrollView, Image } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
const { width } = Dimensions.get('window');
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
    HomeLabel,
    HomeIconButton,
    ChatImage
} from './../../components/styles'

export default function HomePage({ navigation }) {
    const sort = [
        'ocena: najwyższa',
        'ocena: najniższa',
        'ostatnia aktywność'
    ]

    return (
        <View style={{ flex: 1 }}>
            <HomeLabel>
                <HomeIconButton onPress={() => alert('Filtrowanie')} activeOpacity={0.5}>
                    <ChatImage resizeMode="contain" source={require('./../../assets/img/filter.png')} />
                </HomeIconButton>
                <SelectDropdown
                    data={sort}
                    defaultValueByIndex={1}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                        return item;
                    }}
                    //buttonStyle={styles.dropdown1BtnStyle}
                    //buttonTextStyle={styles.dropdown1BtnTxtStyle}
                    renderDropdownIcon={isOpened => {
                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                    }}
                    dropdownIconPosition={'right'}
                //dropdownStyle={styles.dropdown1DropdownStyle}
                //rowStyle={styles.dropdown1RowStyle}
                //rowTextStyle={styles.dropdown1RowTxtStyle}
                />
            </HomeLabel>
            <Text
                onPress={() => alert('This is the HomePage')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Home Page</Text>
        </View>
    );
}