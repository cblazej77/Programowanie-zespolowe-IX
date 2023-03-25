import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppText, ChatLabel, HomeLabel, Colors, ChatIconButton, ChatImage, ProfileTextValue, ProfileText } from '../../components/styles';
import Gallery from '../../components/Gallery';
import { createStackNavigator } from "@react-navigation/stack";
import Reviews from '../../components/Reviews';
import { useState } from 'react';

const { primary, darkLight } = Colors;
const Stack = createStackNavigator();

const GalleryButton = true;

const DATA = [
    {
        id: "1",
        name: "Piotr",
        surname: "Baran",
        unseen_messages: 0,
        last_message_date: Date(2023, 3, 22),
        last_message: "Ale zajmę się tym."
    },
    {
        id: "2",
        name: "Tyberiusz",
        surname: "Kowal",
        unseen_messages: 0,
        last_message_date: Date(2023, 2, 12),
        last_message: "Niestety nie mam w piątek czasu. Czy odpowiada Panu za tydzień? Ewentualnie mogę zrobić więcej."
    },
    {
        id: "3",
        name: "Igor",
        surname: "Nowak",
        unseen_messages: 10,
        last_message_date: Date(2023, 12, 15),
        last_message: "Zadzwonię do Pana jutro."
    },
    {
        id: "4",
        name: "Miranda",
        surname: "Duda",
        unseen_messages: 0,
        last_message_date: Date(2022, 4, 21),
        last_message: "Ok?"
    },
    {
        id: "5",
        name: "Ryszard",
        surname: "Szulc",
        unseen_messages: 0,
        last_message_date: Date(2023, 9, 29),
        last_message: "Hej"
    },
    {
        id: "6",
        name: "Hektor",
        surname: "Lipiński",
        unseen_messages: 2,
        last_message_date: Date(2023, 9, 3),
        last_message: "Niestety nie"
    },
    {
        id: "7",
        name: "Hubert",
        surname: "Jędrzejewski",
        unseen_messages: 8,
        last_message_date: Date(2022, 7, 4),
        last_message: "Oczywiście"
    },
    {
        id: "8",
        name: "Iwon",
        surname: "Gajewski",
        unseen_messages: 4,
        last_message_date: Date(2022, 9, 19),
        last_message: "Jasne"
    },
    {
        id: "9",
        name: "Matylda",
        surname: "Kamińska",
        unseen_messages: 3,
        last_message_date: Date(2023, 3, 13),
        last_message: "Okej"
    },
    {
        id: "10",
        name: "Adam",
        surname: "Jarosz",
        unseen_messages: 1,
        last_message_date: Date(2022, 12, 12),
        last_message: "Nie"
    },
    {
        id: "11",
        name: "Gerwazy",
        surname: "Majewski",
        unseen_messages: 10,
        last_message_date: Date(2022, 4, 15),
        last_message: "Tak jest"
    },
    {
        id: "12",
        name: "Jakub",
        surname: "Kowalski",
        unseen_messages: 0,
        last_message_date: Date(2022, 1, 7),
        last_message: "Ok?"
    },
];

export default function ProfileScreen({ navigation }) {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ChatLabel style={{
                padding: 15,
                height: 60
            }}>
                <View style={{
                    flexDirection: "row",
                    width: "50%",
                }}>
                    <View>
                        <AppText style={{ fontSize: 20 }}>Piotr Nowak</AppText>
                        <AppText style={{ fontSize: 16 }}>605263113</AppText>
                    </View>
                </View>
                <View style={styles.HeaderViewStyle} >
                    <TouchableOpacity >
                        <Image style={{ height: 30, width: 30 }} resizeMode="contain" source={require('./../../assets/img/3-dots.png')} />
                    </TouchableOpacity>
                </View>
            </ChatLabel>
            <View style={{ flexDirection: "row", margin: 15 }}>
                <View style={{ height: 100, width: 100, backgroundColor: "#CCC", borderRadius: 50 }} />
                <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "flex-end", width: "75%" }}>
                    <View>
                        <ProfileTextValue>63</ProfileTextValue>
                        <ProfileText>Prace</ProfileText>
                    </View>
                    <View>
                        <ProfileTextValue>205</ProfileTextValue>
                        <ProfileText>Opinie</ProfileText>
                    </View>
                    <View>
                        <ProfileTextValue>3,5/5</ProfileTextValue>
                        <ProfileText>Ocena</ProfileText>
                    </View>
                </View>
            </View>
            <Text style={styles.DescriptionTextStyle} numberOfLines={5}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Lorem ipsum dolor sit amet.
            </Text>
            <View style={styles.ContentLabelStyle}>
                <View style={[styles.GalleryLabelStyle]}>
                    <TouchableOpacity>
                        <Image style={styles.IconStyle} source={require('./../../assets/img/gallery.png')} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.ReviewsLabelStyle]}>
                    <TouchableOpacity>
                        <Image style={styles.IconStyle} source={require('./../../assets/img/reviews.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}
                initialRouteName="Gallery">
                <Stack.Screen name="Gallery" component={Gallery} />
                <Stack.Screen name="Reviews" component={Reviews} />
            </Stack.Navigator>
        </SafeAreaView>
    );

} const styles = StyleSheet.create({
    HeaderViewStyle: {
        flexDirection: "row",
        width: "50%",
        justifyContent: "flex-end"
    },
    DescriptionTextStyle: {
        width: "90%",
        margin: 15,
        fontSize: 16
    },
    ContentLabelStyle: {
        flexDirection: "row",
        width: "100%",
        height: 35,
    },
    IconStyle: {
        height: 30,
        width: 30,
        tintColor: darkLight
    },
    GalleryLabelStyle: {
        width: "50%",
        alignItems: "center",
        borderBottomWidth: 3,
    },
    ReviewsLabelStyle: {
        width: "50%",
        alignItems: "center",
        borderBottomWidth: 3,
    },
});