import React, { useState, useEffect } from "react";
import {
  Avatar,
  ChatWrapper,
  DMHeaderContainer,
  DMInputContainter,
  DMMessagesContainer,
  DMName,
  DMWrapper,
  Input,
  LineForm,
  MessagesLabel,
  MessagesWrapper,
  ElementContainer,
  TitleText,
  BasicInfoContainer,
  SmallNameText,
  SmallText,
  DetailedInfoContainer,
  Notification,
} from "./ChatElements";

const MessagesElement = (props) => {
  return (
    <>
      <ElementContainer>
        <Avatar src={props.avatar} />
        <BasicInfoContainer>
          <SmallNameText>
            {props.name} {props.surname}
          </SmallNameText>
          <SmallText>{props.lastMessage}</SmallText>
        </BasicInfoContainer>
        <DetailedInfoContainer>
          <Notification>{props.unseenMessages}</Notification>
          <SmallText>{props.lastOnline}</SmallText>
        </DetailedInfoContainer>
      </ElementContainer>
      <LineForm />
    </>
  );
};

{
  /* <View
  style={{ flexDirection: "row", height: 50, justifyContent: "space-around" }}
>
  <View
    style={{
      width: 40,
      height: 40,
      borderRadius: 70,
      backgroundColor: "#CCC",
      marginRight: 5,
    }}
  />
  <View style={{ width: "80%" }}>
    <StatsText bold={true} style={{ textAlign: "left", fontSize: 15 }}>
      {item.name} {item.surname}
    </StatsText>
    <RegularText style={{ color: "#777", fontSize: 13 }} numberOfLines={1}>
      {item.last_message}
    </RegularText>
  </View>
  <View>
    <StatsText
      numberOfLines={1}
      bold={true}
      style={{
        width: 25,
        fontSize: 10,
        backgroundColor: "#DA7676",
        borderRadius: 30,
        paddingVertical: 1,
        color: "#FFF",
      }}
    >
      {item.unseen_messages}
    </StatsText>
  </View>
</View>; */
}

const Chat = () => {
  return (
    <ChatWrapper>
      <MessagesLabel>
        <TitleText>Wiadomości</TitleText>
        <MessagesWrapper>
          <MessagesElement
            name="Agnieszka"
            surname="Bielicka"
            avatar="/assets/cards/person1.jpg"
            lastMessage="Ale zajmę się tym."
            unseenMessages={3}
            lastOnline="1 godz."
          />
        </MessagesWrapper>
      </MessagesLabel>
      <DMWrapper>
        <DMHeaderContainer>
          <DMName>Piotr Nowak</DMName>
        </DMHeaderContainer>
        <LineForm />
        <DMMessagesContainer>wiadomości</DMMessagesContainer>
        <LineForm />
        <DMInputContainter>
          <Input placeholder="Napisz wiadomość" />
        </DMInputContainter>
      </DMWrapper>
    </ChatWrapper>
  );
};

export default Chat;
