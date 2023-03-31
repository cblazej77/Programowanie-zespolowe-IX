import { StyleSheet, Text, View, FlatList } from "react-native";
import React from 'react';
import { RegularText, StatsText, StatsTextBold } from "./styles";
import { Colors } from "./styles";

const { darkLight, secondary } = Colors;

const SearchFilter = ({ data, input, setInput }) => {
    return (
            <FlatList
                contentContainerStyle={{ padding: 10 }}
                data={data}
                ItemSeparatorComponent={<View style={{ width: "100%", height: 2, backgroundColor: "#e4dfe1", marginBottom: 10 }} />}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => {
                    if (input === "") {
                        return (
                            <View style={{ flexDirection: "row", height: 50, justifyContent: "space-around", }}>
                                <View style={{ width: 40, height: 40, borderRadius: 70, backgroundColor: "#CCC", marginRight: 5 }} />
                                <View style={{ width: "80%" }}>
                                    <StatsTextBold style={{ textAlign: "left", fontWeight: "bold", fontSize: 15 }}>{item.name} {item.surname}</StatsTextBold>
                                    <RegularText style={{color: "#6b6f96", fontSize: 13}} numberOfLines={1}>{item.last_message}</RegularText>
                                </View>
                                <View>
                                    <StatsTextBold numberOfLines={1} style={{
                                        width: 25,
                                        fontSize: 10,
                                        backgroundColor: "#DA7676",
                                        borderRadius: 30,
                                        paddingVertical: 1,
                                        color: "#FFF"
                                    }}>{item.unseen_messages}</StatsTextBold>
                                </View>
                            </View>
                        )
                    }

                    if (item.name.toLowerCase().includes(input.toLowerCase())) {
                        return (
                            <View style={{ flexDirection: "row", height: 50, justifyContent: "space-around", }}>
                                <View style={{ width: 40, height: 40, borderRadius: 70, backgroundColor: "#CCC", marginRight: 5 }} />
                                <View style={{ width: "80%" }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>{item.name} {item.surname}</Text>
                                    <Text numberOfLines={1}>{item.last_message}</Text>
                                </View>
                                <View>
                                    <Text numberOfLines={1} style={{
                                        width: 25,
                                        fontSize: 10,
                                        fontWeight: "bold",
                                        backgroundColor: "#DA7676",
                                        borderRadius: 30,
                                        textAlign: "center",
                                        paddingVertical: 1,
                                        color: "#FFF"
                                    }}>{item.unseen_messages}</Text>
                                </View>
                            </View>
                        )
                    }
                }} />
    )
}

export default SearchFilter

const styles = StyleSheet.create({})