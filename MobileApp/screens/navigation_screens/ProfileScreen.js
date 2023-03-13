import * as React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { AppText, ChatLabel, HomeLabel, Colors } from '../../components/styles';

const { primary } = Colors;

export default function ProfileScreen({navigation}) {
    return (
        <View style={{ flex: 1}}>
            <ChatLabel style={{height: '4%'}}/>
            <ChatLabel style={{paddingLeft: 15}}>
            <AppText>Twój profil</AppText>
        </ChatLabel>
        <ScrollView style={{backgroundColor: primary}}>
            </ScrollView>
        </View>    
    );
}