import * as React from 'react';
import { View, Text, TextInput, StatusBar, Dimensions, StyleSheet, ScrollView, Image } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
const { width } = Dimensions.get('window');
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
    HomeLabel,
    HomeIconButton,
    ChatImage,
    Colors,
    HomeTextInput,
} from './../../components/styles'

const { primary, secondary, darkLight } = Colors;

export default function HomePage({ navigation }) {
    const sort = [
        'ocena: najwyższa',
        'ocena: najniższa',
        'ostatnia aktywność'
    ]

    return (
<<<<<<< Updated upstream
        <View style={{ flex: 1 }}>
            <HomeLabel>
                <HomeIconButton onPress={() => alert('Filtrowanie')} activeOpacity={0.5}>
                    <ChatImage resizeMode="contain" source={require('./../../assets/img/filter.png')} />
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
                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={{ backgroundColor: primary }}
                rowStyle={styles.DropdownRowStyle}
                rowTextStyle={styles.DropdownRowTextStyle}
                />
                <HomeTextInput
                    backgroundColor={'#FFFFFF'}
                    placeholderTextColor={'#D6D6D6'}
                    placeholder="szukaj"
                />
            </HomeLabel>
            <ScrollView style={{backgroundColor: primary}}>
                <Text
                    onPress={() => alert('This is the HomePage')}
                    style={{ fontSize: 26, fontWeight: 'bold' }}>Home Page</Text>
            </ScrollView>
        </View>

=======
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
                onPress={() => alert('This is the HomePage')}
                style={{ fontSize: 26, fontWeight: 'bold'}}>Home Page</Text>
        </View>    
>>>>>>> Stashed changes
    );
};

const styles = StyleSheet.create({
    DropdownButtonStyle: {
        height: '50%',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
    },
    DropdownButtonTextStyle: {
        fontSize: 14,
        color: '#D6D6D6',
    },
    DropdownRowStyle: {
        backfroundColor: '#D6D6D6',
    },
    DropdownRowTextStyle: {
        fontSize: 14,
        color: darkLight,
        textAlign: 'left'
    },
});