import { StyleSheet, Text, View, FlatList } from "react-native";
import React from 'react';

const DATA_images = [
    {
        id: "1",
        image: "#2b5057"
    },
    {
        id: "2",
        image: "#aad618"
    },
    {
        id: "3",
        image: "#b79d94"
    },
    {
        id: "4",
        image: "#5825dc"
    },
    {
        id: "5",
        image: "#5c7be9"
    },
    {
        id: "6",
        image: "#4cf8c2"
    },
    {
        id: "7",
        image: "#8fd075"
    },
    {
        id: "8",
        image: "#ab6ea6"
    },
    {
        id: "9",
        image: "#3e18f5"
    },
    {
        id: "10",
        image: "#f7a9ac"
    },

];

const Gallery = ({ data, input, setInput }) => {
    return (
        <FlatList
            style={{ margin: 2 }}
            numColumns={2}
            columnWrapperStyle={{ flex: 1, justifyContent: "space-evenly" }}
            data={DATA_images}
            keyExtractor={(item, index) => index}
            ItemSeparatorComponent={<View style={{ width: "100%", height: 2 }} />}
            renderItem={({ item }) => {
                return (
                    <View style={{
                        backgroundColor: item.image,
                        width: "49%",
                        height: 100,
                    }} />
                )
            }}>

        </FlatList>
    )
}

export default Gallery

const styles = StyleSheet.create({})