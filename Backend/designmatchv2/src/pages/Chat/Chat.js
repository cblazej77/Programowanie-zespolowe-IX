import React, { useState, useEffect, useRef, useCallback } from "react";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
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
import { default as axios } from '../../api/axios';
import LoadingPage from "../LoadingPage";
import { RiSendPlane2Line } from 'react-icons/ri'

const { darkLight, white, black } = COLORS;

const reversedConversation = [
  { sender_username: 'zabkaCompany', recipient_username: 'jakub1', content: 'Dzień dobry! Widziałem, że poszukujecie artysty do projektu. Czy nadal jesteście zainteresowani współpracą?' },
  { sender_username: 'jakub1', recipient_username: 'zabkaCompany', content: 'Tak, nadal szukamy odpowiedniej osoby. Czy możesz przedstawić nam swoje portfolio?' },
  { sender_username: 'zabkaCompany', recipient_username: 'jakub1', content: 'Oczywiście, przesyłam link do mojego portfolio: www.artysta.com/portfolio' },
  { sender_username: 'jakub1', recipient_username: 'zabkaCompany', content: 'Dziękujemy, wygląda świetnie. Czy mógłbyś przygotować wstępną koncepcję projektu i przesłać nam ją na maila?' },
  { sender_username: 'zabkaCompany', recipient_username: 'jakub1', content: 'Jasne, już się za to zabieram. Kiedy potrzebujecie gotowej koncepcji?' },
  { sender_username: 'jakub1', recipient_username: 'zabkaCompany', content: 'Na przyszły tydzień. Czy jesteś w stanie dotrzymać tego terminu?' },
  { sender_username: 'zabkaCompany', recipient_username: 'jakub1', content: 'Tak, bez problemu. O której dokładnie chcielibyście otrzymać koncepcję?' },
  { sender_username: 'jakub1', recipient_username: 'zabkaCompany', content: 'Najlepiej do końca dnia we wtorek.' },
  { sender_username: 'zabkaCompany', recipient_username: 'jakub1', content: 'Dobra, zrobię wszystko, żeby zdążyć.' },
  { sender_username: 'zabkaCompany', recipient_username: 'jakub1', content: 'Hej, przesyłam wstępną koncepcję projektu. Co o niej sądzicie?' },
  { sender_username: 'jakub1', recipient_username: 'zabkaCompany', content: 'Wygląda świetnie! Czy mógłbyś dodać jeszcze kilka szczegółów w opisie projektu?' },
  { sender_username: 'zabkaCompany', recipient_username: 'jakub1', content: 'Jasne, poprawię to w ciągu kilku godzin.' },
  { sender_username: 'jakub1', recipient_username: 'zabkaCompany', content: 'Dzięki, będziemy czekać na aktualizację.' },
  { sender_username: 'zabkaCompany', recipient_username: 'jakub1', content: 'Hej, już dodałem brakujące informacje. Czy możecie to potwierdzić i przesłać mi umowę na maila?' },
  { sender_username: 'jakub1', recipient_username: 'zabkaCompany', content: 'Tak, wszystko wygląda dobrze. Przesyłam umowę. Czy możesz ją podpisać i odesłać do nas w ciągu dwóch dni?' },
  { sender_username: 'zabkaCompany', recipient_username: 'jakub1', content: 'Oczywiście, zajmę się tym jak najszybciej.' },
  { sender_username: 'zabkaCompany', recipient_username: 'jakub1', content: 'Wysłałem podpisaną umowę. Czy jakiś zaliczkę mam przesłać przed rozpoczęciem pracy?' },
  { sender_username: 'jakub1', recipient_username: 'zabkaCompany', content: 'Tak, prosimy o zaliczkę w wysokości 30% wartości projektu.' },
  { sender_username: 'zabkaCompany', recipient_username: 'jakub1', content: 'Rozumiem, prześlę ją w ciągu kilku dni.' },
];


const conv = reversedConversation.reverse();

const MessagesElement = (props) => {
  return (
    <>
      <ElementContainer onClick={props.onClick}>
        <Avatar src={props.avatar} />
        <BasicInfoContainer>
          <SmallNameText>
            {props.name} {props.surname}
          </SmallNameText>
          {/* <SmallText>{props.lastMessage}</SmallText> */}
        </BasicInfoContainer>
        {/* <DetailedInfoContainer>
          <Notification>{props.unseenMessages}</Notification>
          <SmallText>{props.lastOnline}</SmallText>
        </DetailedInfoContainer> */}
      </ElementContainer>
      <LineForm />
    </>
  );
};


const Chat = () => {
  const [get, setGet] = useState("");
  const [username, setUsername] = useState('');
  const [second, setSecond] = useState('wybierz');
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState(conv);

  const stompClientRef = useRef(null);

  const DMElement = (props) => {
    if (props.sender === username) {
      return (
        <SenderContainer>
          <SenderDM>{props.message}</SenderDM>
        </SenderContainer>
      );
    }
    else if (props.sender === second) {
      return (
        <ReceiverContainer>
          <ReceiverDM>{props.message}</ReceiverDM>
        </ReceiverContainer>
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decodeResult = await axios.request('/auth/decodeToken', {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('storageLogin'),
          },
        });
        setUsername(decodeResult.data.username);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const keyPress = useCallback(
    e => {
      if (e.key === 'Enter' && message.length > 0) {
        console.log('Wiadomośc wysłana');
        sendMessage();
      }
    },
    [message]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );


  useEffect(() => {
    if (username) {
      const socket = new SockJS('http://localhost:8080/ws');
      const stompClient = Stomp.over(socket);
      const onMessageReceived = (msg) => {
        const notification = JSON.parse(msg.body);
        console.log("odebrana wiadomość " + JSON.stringify(notification.id));

        const receivedMessage = {
          sender_username: notification.senderId,
          recipient_username: notification.senderName,
          content: notification.id,
        };

        const updatedConversation = [...conversation];
        updatedConversation.unshift(receivedMessage);
        setConversation(updatedConversation);
        console.log(conversation);

      }
      const onConnected = () => {
        console.log('Connected to WebSocket');
        stompClient.subscribe('/user/' + username + '/queue/messages', onMessageReceived);
      };

      const onError = (error) => {
        console.error('WebSocket error:', error);
      };

      stompClient.connect({}, onConnected, onError);
      stompClientRef.current = stompClient;

      return () => {
        console.log("DISCONNECT...")
        stompClient.disconnect();
      };
    }
  }, [username, second]);

  const sendMessage = () => {
    if (message.length > 0) {
      const newMessage = {
        sender_username: username,
        recipient_username: second,
        content: message,
      };

      const stompClient = stompClientRef.current;

      if (stompClient) {
        if (stompClient.connected) {
          console.log("wysłana:", newMessage);
          stompClient.send('/app/chat', {}, JSON.stringify(newMessage));
          const sentMessage = {
            sender_username: newMessage.sender_username,
            recipient_username: newMessage.recipient_username,
            content: newMessage.content
          };

          const updatedConversation = [...conversation];
          updatedConversation.unshift(sentMessage);
          setConversation(updatedConversation);
          //console.log(conversation);

          setMessage('');
        } else {
          console.log("błąd wysyłania: brak połączenia z WebSocket");
          // WebSocket na nowo
        }
      } else {
        console.log("błąd wysyłania: stompClient niezdefiniowany");
        // stompClient zainicjować na nowo
      }
    }

  };

  return (
    <>
      {username ? (
        <ChatWrapper>
          <MessagesLabel>
            <TitleText>Wiadomości {username}</TitleText>
            <MessagesWrapper>
              <MessagesElement
                name="Biedronka"
                surname=""
                avatar="/assets/cards/person1.jpg"
                lastMessage="Ale zajmę się tym."
                unseenMessages={32}
                lastOnline="1 godz."
                onClick={() => setSecond("Biedronka")}
              />
              <MessagesElement
                name="konrado"
                surname=""
                avatar="/assets/cards/person1.jpg"
                lastMessage="zywy."
                unseenMessages={32}
                lastOnline="1 godz."
                onClick={() => setSecond("konrado")}
              />
            </MessagesWrapper>
          </MessagesLabel>
          <DMWrapper>
            <DMHeaderContainer>
              <Avatar src="/assets/cards/person1.jpg" />
              <DMName>{second}</DMName>
            </DMHeaderContainer>
            <LineForm />
            <DMMessagesContainer>
              {conversation.map((msg, index) => (
                <DMElement key={index} recipient={msg.recipient_username} sender={msg.sender_username} message={msg.content} />
              ))}
            </DMMessagesContainer>
            <LineForm />
            <DMInputContainter>
              <Input type="text" placeholder="Napisz wiadomość" value={message} onChange={(e) => setMessage(e.target.value)} />
              <RiSendPlane2Line size={40} style={{ color: darkLight, marginLeft: '1rem', cursor: 'pointer' }} onClick={sendMessage} />
            </DMInputContainter>
          </DMWrapper>
        </ChatWrapper>) : (
        <LoadingPage />
      )}
    </>
  );
};

export default Chat;
