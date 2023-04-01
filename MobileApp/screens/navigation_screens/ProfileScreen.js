import * as React from 'react';
import { View, SafeAreaView, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ChatLabel, Colors, HeaderText, RegularText, StatsText } from '../../components/styles';
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
                height: 60,
                justifyContent: "space-between",
            }}>
                <HeaderText numberOfLines={1} style={{ width: "90%", marginLeft: 10 }}>Piotr Nowak</HeaderText>
                <View style={styles.HeaderViewStyle} >
                    <TouchableOpacity >
                        <Image style={{ height: 30, width: 30 }} resizeMode="contain" source={require('./../../assets/img/3-dots.png')} />
                    </TouchableOpacity>
                </View>
            </ChatLabel>
            <View style={{ flexDirection: "row", margin: 15, justifyContent: "space-between" }}>
                <View style={{ height: 100, width: 100, backgroundColor: "#771967", borderRadius: 50 }} />
                <View style={{ width: "65%", alignItems: "center", justifyContent: "space-around" }}>
                    <Stars
                        default={3.5}
                        spacing={7}
                        count={5}
                        starSize={30}
                        half={true}
                        disabled={true}
                        fullStar={require('./../../assets/img/star.png')}
                        halfStar={require('./../../assets/img/star-half.png')}
                        emptyStar={require('./../../assets/img/star-outline.png')}

                    />
                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-around" }}>
                        <View>
                            <StatsText bold={true}>63</StatsText>
                            <StatsText>Prace</StatsText>
                        </View>
                        <View>
                            <StatsText bold={true}>205</StatsText>
                            <StatsText>Opinie</StatsText>
                        </View>
                        <View>
                            <StatsText bold={true}>3,5/5</StatsText>
                            <StatsText>Ocena</StatsText>
                        </View>
                    </View>
                </View>
            </View>
            <RegularText numberOfLines={5} style={{ marginHorizontal: 10 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Lorem ipsum dolor sit amet.
            </RegularText>
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
        justifyContent: "flex-end",
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