import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Text } from "react-native";
import { Image } from "react-native";

import {
    Colors,
    ChatLabel,
    ChatImageHolder
} from './../../components/styles'

//Colors
const { secondary, darkLight, primary } = Colors;

const Chat = () => {
    return (
        <View style={{
            backgroundColor: primary,
            height: '100%'
        }}>
            <ChatLabel>
                <Text style={{
                    color: secondary,
                    
                }}>
                    Piotr Nowak
                </Text>
                <ChatImageHolder></ChatImageHolder>
                <ChatImageHolder></ChatImageHolder>
            </ChatLabel>
            <ChatLabel style={{
                marginTop: "auto"
            }}>

            </ChatLabel>
        </View>
    )
}

export default Chat;