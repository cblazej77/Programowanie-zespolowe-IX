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
  SenderDM,
  SenderContainer,
  ReceiverContainer,
  ReceiverDM,
} from "./ChatElements";
import { COLORS } from "../../components/Colors";
import styled from "styled-components";

const { darkLight, white, black } = COLORS;

const conversation = [
  {who: 'receiver', message: 'Dzień dobry! Widziałem, że poszukujecie artysty do projektu. Czy nadal jesteście zainteresowani współpracą?' },
  {who: 'sender', message: 'Tak, nadal szukamy odpowiedniej osoby. Czy możesz przedstawić nam swoje portfolio?' },
  {who: 'receiver', message: 'Oczywiście, przesyłam link do mojego portfolio: www.artysta.com/portfolio' },
  {who: 'sender', message: 'Dziękujemy, wygląda świetnie. Czy mógłbyś przygotować wstępną koncepcję projektu i przesłać nam ją na maila?' },
  {who: 'receiver', message: 'Jasne, już się za to zabieram. Kiedy potrzebujecie gotowej koncepcji?' },
  {who: 'sender', message: 'Na przyszły tydzień. Czy jesteś w stanie dotrzymać tego terminu?' },
  {who: 'receiver', message: 'Tak, bez problemu. O której dokładnie chcielibyście otrzymać koncepcję?' },
  {who: 'sender', message: 'Najlepiej do końca dnia we wtorek.' },
  {who: 'receiver', message: 'Dobra, zrobię wszystko, żeby zdążyć.' },
  {who: 'receiver', message: 'Hej, przesyłam wstępną koncepcję projektu. Co o niej sądzicie?' },
  {who: 'sender', message: 'Wygląda świetnie! Czy mógłbyś dodać jeszcze kilka szczegółów w opisie projektu?' },
  {who: 'receiver', message: 'Jasne, poprawię to w ciągu kilku godzin.' },
  {who: 'sender', message: 'Dzięki, będziemy czekać na aktualizację.' },
  {who: 'receiver', message: 'Hej, już dodałem brakujące informacje. Czy możecie to potwierdzić i przesłać mi umowę na maila?' },
  {who: 'sender', message: 'Tak, wszystko wygląda dobrze. Przesyłam umowę. Czy możesz ją podpisać i odesłać do nas w ciągu dwóch dni?' },
  {who: 'receiver', message: 'Oczywiście, zajmę się tym jak najszybciej.' },
  {who: 'receiver', message: 'Wysłałem podpisaną umowę. Czy jakiś zaliczkę mam przesłać przed rozpoczęciem pracy?' },
  {who: 'sender', message: 'Tak, prosimy o zaliczkę w wysokości 30% wartości projektu.' },
  {who: 'receiver', message: 'Rozumiem, prześlę ją w ciągu kilku dni.' },
];

const reversedConversation = conversation.reverse();

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

const DMElement = (props) => {
  if(props.who === 'sender') {
    return (
      <SenderContainer>
        <SenderDM>{props.message}</SenderDM>
      </SenderContainer>
    );
  }
  else if(props.who === 'receiver'){
    return (
      <ReceiverContainer>
        <ReceiverDM>{props.message}</ReceiverDM>
      </ReceiverContainer>
    );
  }
};

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
            unseenMessages={32}
            lastOnline="1 godz."
          />
        </MessagesWrapper>
      </MessagesLabel>
      <DMWrapper>
        <DMHeaderContainer>
          <Avatar src="/assets/cards/person1.jpg" />
          <DMName>Agnieszka Bielicka</DMName>
        </DMHeaderContainer>
        <LineForm />
        <DMMessagesContainer>
        {reversedConversation.map((msg, index) => (
        <DMElement key={index} who={msg.who} message={msg.message}/>
      ))}
      {reversedConversation.map((msg, index) => (
        <DMElement key={index} who={msg.who} message={msg.message}/>
      ))}
        </DMMessagesContainer>
        <LineForm />
        <DMInputContainter>
          <Input placeholder="Napisz wiadomość" />
        </DMInputContainter>
      </DMWrapper>
    </ChatWrapper>
  );
};

export default Chat;
