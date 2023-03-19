import { DarkTheme } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppText, ChatLabel, HomeLabel, Colors, ChatIconButton, ChatImage, ProfileTextValue, ProfileText } from '../../components/styles';

const { primary, darkLight } = Colors;

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
                    <View >
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
                <View style={styles.ActiveContentLabelStyle}>
                <TouchableOpacity>
                    <Image style={styles.IconStyle} source={require('./../../assets/img/gallery.png')} />
                </TouchableOpacity>
                </View>
                <View style={styles.UnactiveContentLabelStyle}>
                <TouchableOpacity>
                    <Image style={styles.IconStyle} source={require('./../../assets/img/reviews.png')} />
                </TouchableOpacity>
                </View>
            </View>
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
    ActiveContentLabelStyle: {
        width: "50%", 
        alignItems: "center",
        borderBottomWidth: 3,
        borderBottomColor: darkLight
    },
    UnactiveContentLabelStyle: {
        width: "50%", 
        alignItems: "center",
        borderBottomWidth: 3,
        borderBottomColor: "#F0EDEB"
    },
});