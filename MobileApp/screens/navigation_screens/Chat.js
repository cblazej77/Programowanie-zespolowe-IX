import React, { useState } from "react";
import { ScrollView, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";

import {
    Colors,
    ChatLabel,
    ChatImage,
    ChatText,
    ChatIconButton,
    ChatMessages
} from './../../components/styles'

//Colors
const { secondary, darkLight, primary, brand } = Colors;

const Chat = () => {
    return (
        <View style={{height: '100%'}}>
            <ChatLabel style={{height: '4%'}}/>
            <ChatLabel>
                <ChatIconButton style={{
                   marginLeft: -20,
                   marginRight: 10
                }} onPress={() => alert('Powrót do wiadomości')} activeOpacity={0.5}>
                    <ChatImage resizeMode="contain" source={require('./../../assets/img/arrow-left.png')} />
                </ChatIconButton>
                
                <View style={{flex: 3}}>
                <ChatText numberOfLines={1}>
                    Piotr Nowak
                </ChatText>
                <ChatText style={{fontSize: 16}}>
                    605 263 113
                </ChatText>
                </View>

                <ChatIconButton onPress={() => alert('Profil uzytkownika')} activeOpacity={0.5}>
                    <ChatImage resizeMode="contain" source={require('./../../assets/img/user.png')} />
                </ChatIconButton>

                <ChatIconButton onPress={() => alert('Opcje')} activeOpacity={0.5}>
                    <ChatImage resizeMode="contain" source={require('./../../assets/img/3-dots.png')} />
                </ChatIconButton>
            </ChatLabel>

            <ScrollView style={{backgroundColor: primary}}>
            <Text style={{fontSize: 100}}>
                - - test - - 
                - - test - -
                - - test - -
                - - test - -
                - - test - -
                - - test - -
            </Text>
            </ScrollView>

            <ChatLabel style={{
                marginTop: "auto",
                height: '7%'
            }}>
                <ChatIconButton style={{
                    height: '95%', 
                    marginLeft: -20
                    }} onPress={() => alert('Galeria')} activeOpacity={0.5}>
                    <ChatImage resizeMode="contain" source={require('./../../assets/img/gallery.png')} />
                </ChatIconButton>

                <TextInput style={{
                    flex: 4, 
                    borderRadius: 30,  
                    height: '75%',
                    paddingLeft: 15,
                    marginRight: 10}}
                            backgroundColor={primary}
                            placeholderTextColor={secondary}
                            placeholder="napisz wiadomość..."
                        />

            </ChatLabel>
        </View>
    )
}

export default Chat;