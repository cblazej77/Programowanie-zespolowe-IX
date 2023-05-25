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
import { RiSendPlane2Line } from 'react-icons/ri';

const { darkLight, white, black } = COLORS;



var stompClient = null;
const Chat = () => {
  const [renderFlag, setRenderFlag] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [fullName, setFullName] = useState('');
  const [first, setfirst] = useState(true);
  const [second, setSecond] = useState('');
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState("");
  const [checkMess, setCheckMess] = useState(false);
  const [dataProfile, setDataProfile] = useState([]);
  //const stompClientRef = useRef(null);

  const DMElement = (props) => {
    let copySecond = sessionStorage.getItem("active");
    if (props.sender === username) {
      return (
        <SenderContainer>
          <SenderDM>{props.message}</SenderDM>
        </SenderContainer>
      );
    }
    else if (props.sender === copySecond) {
      return (
        <ReceiverContainer>
          <ReceiverDM>{props.message}</ReceiverDM>
        </ReceiverContainer>
      );
    }
  };

  const MessagesElement = (props) => {
    const [shortLastMessage, setShortLastMessage] = useState('');
    const [notificationCount, setNotificationCount] = useState(null);
    const [returnNotificationCount, setReturnNotificationCount] = useState(false);
    const [leftName, setLeftName] = useState('');
    const [urlMessageElement, setUrlMessageElement] = ('');

    useEffect(() => {
      const fetchData = async () =>{
          const response = await axios.get(`/messages/` + props.nick + `/` + username + `/count`);
          let responseURL;
          //ZDJĘCIA//
          //if(props.company == null) responseURL = await axios.get(`/public/api/artist/getProfileImageByUsername/` + username);
          //else responseURL = await axios.get(`/public/api/company/getProfileImageByUsername/` + username);
          //setUrlMessageElement();
          setNotificationCount(response.data);
          if(response.data !== 0) setReturnNotificationCount(true);
          else setReturnNotificationCount(false);
    };
    fetchData();
  }, [props.nick]);

  useEffect(() =>{
    let shortMessage = props.lastMessage.slice(0, 25);
    if(shortMessage == "!$@DM@$!") shortMessage = '';
    if(shortMessage.length == 25) shortMessage = shortMessage + "...";
    setShortLastMessage(shortMessage);
  }, [props.lastMessage]);
  
  useEffect(() => {
    if(props.company == null) setLeftName(props.name + " " + props.surname);
    else setLeftName(props.company);
  }, [props.company]);

  
    
    return (
        <>
          <ElementContainer onClick = {() => handleChangeActive(props.nick)}>
            <Avatar src={urlMessageElement} />
            <BasicInfoContainer>
              <SmallNameText>
                {leftName}
              </SmallNameText>
              <SmallText> {shortLastMessage} </SmallText>
            </BasicInfoContainer>
            {returnNotificationCount && <DetailedInfoContainer>
              <Notification>{notificationCount}</Notification>
              {/*<SmallText>{props.lastOnline}</SmallText>*/}
            </DetailedInfoContainer> }
          </ElementContainer>
          <LineForm />
        </>
    );
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
        if(first) fetchDataLeftSide(decodeResult.data.username);
      } catch (err) {
        console.log("źle odkodowany token: " + err);
      }
    };
    let copySecond = sessionStorage.getItem("active");
    //if(username !== '' && second !== ""){
      if(username !== '' && second !== ''){
      connect();
    }  
    fetchData();

  }, [username, second]);

  const keyPress = useCallback(

    e => {
      if (e.key === 'Enter' ){
        if(message.length > 0) {
          if (second.length > 0) {
            sendMessage();
          }else console.log("Zła dlugosc second: " + second);
        }else console.log("zła długość message" + message);
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

  const connect= () => {
    const Stomp = require("stompjs");
    let SockJS = require("sockjs-client");
    SockJS = new SockJS("http://localhost:8080/ws");
    stompClient = Stomp.over(SockJS);
    stompClient.connect({}, onConnected, onError());;
  };

  const onError = (error) => {
    console.error('WebSocket error:', error);
  };

        const onConnected = () => {
          stompClient.subscribe('/user/' + username + '/queue/messages', onMessageReceived);
        };

        const onMessageReceived = async (msg) => {
          const notification = JSON.parse(msg.body);
          let copySecond = sessionStorage.getItem("active");
          if(copySecond == notification.senderId) {

            try{
            let messageContent=  await axios.get(`/messages/${notification.id}`)
                  if(messageContent.data.content != "!$@DM@$!"){
                  const receivedMessage = {
                    sender_username: notification.senderId,
                    recipient_username: notification.senderName,
                    content: messageContent.data.content,
                  };

                  let updatedConversation = JSON.parse(sessionStorage.getItem("message"));

                  updatedConversation.unshift(receivedMessage);
                  setConversation(updatedConversation);
                  sessionStorage.setItem("message", JSON.stringify(updatedConversation));
                }}
                catch(error){ 
                  console.log("Error retrieving message content:", error);
                  
                };
          }
        else{
          console.log("nowa wiadomość od " + notification.senderId +", a ty patrzysz na chat: " + second);
          let selectedPerson = dataProfile.find(person => person.username === notification.senderId);
          fetchDataLeftSide(username);
        }
      }

  const sendMessage = () => {
    if (message.length > 0) {
      const newMessage = {
        sender_username: username,
        recipient_username: second,
        content: message,
      };

      if (stompClient) {
        if (stompClient.connected) {
          stompClient.send('/app/chat', {}, JSON.stringify(newMessage));

          const updatedConversation = [...conversation];
          updatedConversation.unshift(newMessage);
          setConversation(updatedConversation);
          sessionStorage.setItem("message", JSON.stringify(updatedConversation));
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

  const fetchDataLeftSide = async (users) => {
    try {

      const response = await axios.get(`/messages/conversations/` + users);
        setDataProfile(response.data);
         if(dataProfile !== []) {
           console.log("Istnieje hisotira wiadomości dla" + users);
            sessionStorage.setItem("active", response.data[0].username);
            //setSecond(response.data[0].username);
            sessionStorage.setItem("person", JSON.stringify(response.data));
             if(response.data[0].company_name === null) setFullName(response.data[0].first_name + " " + response.data[0].last_name);
             else setFullName(response.data[0].company_name);
            handleChangeActive(response.data[0].username);
            setRenderFlag(true);  
             setfirst(false);
            
      //   handleChangeActive(second);
       }else{
        console.log("brak historii wiadomości dla użytkownika: " + users);
        setFullName("Brak uzytkownika do wyswietlenia");
        setRenderFlag(true);
        setfirst(false);
        sessionStorage.removeItem("active");
       }
    } catch (error) {
      console.log("ERROR in fetchDataLeftSide" + error);
    }
  };

  const handleChangeActive = (user) =>{

    console.log("handleAdd :)" + user);
    if(second !== user && second != '') {
        try {
            stompClient.disconnect();
        } catch (e) {console.log("stomp Client ma problem z disconnected, ZAWSZE");}
    }
    if(username !== '' && user !== ''){
     let datePerson =  JSON.parse(sessionStorage.getItem("person"));
      let dfp = datePerson.find(person => person.username === user);
      if(dfp.company_name == null) setFullName( dfp.first_name + " " +  dfp.last_name);
      else setFullName(dfp.company_name);
     sessionStorage.removeItem("message");

    axios.get(`/messages/` + username + `/` + user)
        .then((response) => {
          const filtredMessages = response.data.filter((message) => message.content !== "!$@DM@$!");
          const axiosHistoryMessage = filtredMessages.map((message) => ({
            sender_username: message.sender_username,
            recipient_username: message.recipient_username,
            content: message.content,
          }));
          sessionStorage.setItem("message", JSON.stringify(axiosHistoryMessage.reverse()));
          setConversation(axiosHistoryMessage);
          console.log("SESSION STORE ACTIVE IN HANDLCAHGNGEACTIVE" + user);
          sessionStorage.setItem("active", user);
          setSecond(user);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            console.log("remove");
            sessionStorage.removeItem("message");
            setConversation("");
            console.log("ELSE SESSION STORE ACTIVE IN HANDLCAHGNGEACTIVE" + user);
            //sessionStorage.setItem("active", user);
            setSecond(user);
          } else {
            console.log(error);
          }
        });
    }
  };

  /*
                {!(username === "JulkaMazowiecka") && <MessagesElement
                  name="Julka"
                  surname="COś tam"
                  avatar="/assets/cards/person1.jpg"
                  lastMessage="Ale zajmę się tym."
                  unseenMessages={32}
                  lastOnline="1 godz."
                  onClick={() => handleChangeActive("JulkaMazowiecka")}
              />}
              {!(username === "MichalMostowiak") && <MessagesElement
                name="Michal"
                surname="Mostowia"
                avatar="/assets/cards/person1.jpg"
                lastMessage="zywy."
                unseenMessages={32}
                lastOnline="1 godz."
                onClick={() => handleChangeActive("MichalMostowiak")}
              />
   */

  return (
    <>
      {renderFlag ? (
        <ChatWrapper>
          <MessagesLabel>
            <TitleText>Wiadomości {username}</TitleText>
            <MessagesWrapper>
                {dataProfile.map((item) => (
                    <MessagesElement
                        key={item.username}
                        name={item.first_name}
                        surname={item.last_name}
                        company={item.company_name}
                        lastMessage={item.last_message}
                        nick={item.username}
                    />))}
                    {/* brak hisotrii label */}
            </MessagesWrapper>
            {/*{!(username === "WojciechDuklas") && <MessagesElement*/}
            {/*  name="Wojciech"*/}
            {/*  surname="Duklas"*/}
            {/*  avatar="/assets/cards/person1.jpg"*/}
            {/*  lastMessage="Ale zajmę się tym."*/}
            {/*  unseenMessages={32}*/}
            {/*  lastOnline="1 godz."*/}
            {/*  onClick={() => handleChangeActive("mateczka")}*/}
            {/*/>}*/}
          </MessagesLabel>
          <DMWrapper>
            <DMHeaderContainer>
              <Avatar src="/assets/cards/person1.jpg" />
              <DMName>{fullName}</DMName>
            </DMHeaderContainer>
            <LineForm />
            <DMMessagesContainer>
                {conversation && <>
                  {conversation.map((msg, index) => (
                      <DMElement key={index} recipient={msg.recipient_username} sender={msg.sender_username} message={msg.content} />
                  ))}
                </>
                }
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
