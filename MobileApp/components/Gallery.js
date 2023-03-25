import { StyleSheet, Text, View, FlatList } from "react-native";
import React from 'react';

const DATA_images = [
    {
        id: "1",
        name: "Piotr",
        surname: "Baran",
        unseen_messages: 0,
        last_message_date: Date(2023, 3, 22),
        last_message: "Ale zajmę się tym."
    },
    
];

const Gallery = ({ data, input, setInput }) => {
    return (
            <View><Text>Galeria</Text></View>
    )
}

export default Gallery

const styles = StyleSheet.create({})