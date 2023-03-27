import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppText, ChatLabel, Colors, ProfileTextValue, ProfileText } from '../../components/styles';
import Gallery from '../../components/Gallery';
import Reviews from '../../components/Reviews';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Stars from 'react-native-stars';

const Tab = createMaterialTopTabNavigator();
const { primary, secondary, darkLight } = Colors;

export default function ProfileScreen({ navigation }) {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: primary }}>
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
            <View style={{ flexDirection: "row", margin: 15, justifyContent: "space-between" }}>
                <View style={{ height: 100, width: 100, backgroundColor: "#771967", borderRadius: 50 }} />
                <View style={{ width: "65%", alignItems: "center", justifyContent: "space-between" }}>
                    
                        <Stars
                            default={3.5}
                            spacing={7}
                            count={5}
                            starSize={35}
                            half={true}
                            disabled={true}
                            fullStar={require('./../../assets/img/star.png')}
                            halfStar={require('./../../assets/img/star-half.png')}
                            emptyStar={require('./../../assets/img/star-outline.png')}
                        />
                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-around" }}>
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
            </View>
            <Text style={styles.DescriptionTextStyle} numberOfLines={5}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Lorem ipsum dolor sit amet.
            </Text>
            <Tab.Navigator
                initialRouteName="Gallery"
                screenOptions={{
                    tabBarIndicatorStyle: { backgroundColor: darkLight },
                    tabBarStyle: { backgroundColor: primary, marginTop: 30 },
                }}>
                <Tab.Screen
                    options={{
                        title: ({ color, focused }) => {
                            return <Ionicons size={25} name={focused ? 'images' : 'images-outline'}
                                color={focused ? darkLight : secondary} />
                        }
                    }}
                    name="Gallery"
                    component={Gallery} />
                <Tab.Screen options={{
                    title: ({ color, focused }) => {
                        return <Ionicons size={25} name={focused ? 'happy' : 'happy-outline'}
                            color={focused ? darkLight : secondary} />
                    }
                }}
                    name="Reviews" component={Reviews} />
            </Tab.Navigator>
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