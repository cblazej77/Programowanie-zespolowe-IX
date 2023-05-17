import { StyleSheet, Text, View, FlatList } from "react-native";
import React from 'react';
import { Colors, RegularText, StatsText } from "../../components/styles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Stars from 'react-native-stars';

const { secondary, darkLight } = Colors

const DATA_reviews = [
    {
        id: "1",
        avatar: "#d9a28d",
        name: "Anna",
        surname: "Malinowska",
        review: 3.5,
        review_text: "",
    },
    {
        id: "2",
        avatar: "#ebae4a",
        name: "Andrzej",
        surname: "Kot",
        review: 4.5,
        review_text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        id: "3",
        avatar: "#83cd0d",
        name: "Mariusz",
        surname: "Derek",
        review: 3,
        review_text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad lorem ipsum dolor sit amet",
    },
    {
        id: "4",
        avatar: "#e8f45e",
        name: "Kacper",
        surname: "Kowalski",
        review: 5,
        review_text: "Lorem ipsum",
    },
    {
        id: "5",
        avatar: "#d6e50c",
        name: "Kamil",
        surname: "Nowak",
        review: 4,
        review_text: "Lorem ipsum",
    },
];

const Reviews = ({ data, input, setInput }) => {
    return (
        <FlatList
            style={{ margin: 2 }}
            data={DATA_reviews}
            nestedScrollEnabled={true}
            keyExtractor={(item, index) => index}
            contentContainerStyle={{ padding: 5 }}
            ItemSeparatorComponent={<View style={{ width: "100%", height: 1, backgroundColor: "#e4dfe1", marginVertical: 5 }} />}
            renderItem={({ item }) => {
                return (
                    <View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }} >
                                <View style={{
                                    backgroundColor: item.avatar,
                                    height: 40,
                                    width: 40,
                                    borderRadius: 50,
                                }} />
                                <RegularText style={{ marginLeft: 10 }}>{item.name} {item.surname}</RegularText>
                            </View>
                            <Stars
                            default={item.review}
                            spacing={3}
                            count={5}
                            starSize={20}
                            half={true}
                            disabled={true}
                            fullStar={require('../../assets/img/star.png')}
                            halfStar={require('../../assets/img/star-half.png')}
                            emptyStar={require('../../assets/img/star-outline.png')}
                        />
                        </View>
                        <RegularText numberOfLines={2} style={{ fontSize: 13, marginVertical: 5 }}>{item.review_text}</RegularText>
                    </View>
                )
            }}>

        </FlatList>
    )
}

export default Reviews

const styles = StyleSheet.create({})