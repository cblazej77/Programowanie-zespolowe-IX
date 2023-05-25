import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { TitleText } from '../Home/CardsElement';
import { useNavigate, useLocation } from 'react-router-dom';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { COLORS } from '../../components/Colors';
import axios from '../../api/axios';
import {
    AboutMe,
    BoldLabel,
    Bracket,
    Bubble,
    BubbleWrap,
    BubblesDropDown,
    Button,
    DataText,
    DownSection,
    Image,
    InfoRow,
    InfoText,
    Left,
    LeftColumn,
    LeftInfoRow,
    LeftWrapper,
    LineForm,
    ModalBackground,
    ModalBottomSection,
    ModalBubbleContainer,
    ModalColumn,
    ModalData,
    ModalInfo,
    ModalRow,
    ModalTitle,
    ModalWrapper,
    NameText,
    ButtonMessageOff,
    ButtonMessage,
    ProfileImage,
    ProfileWrapper,
    RightColumn,
    RightWrapper,
    StyledDropDown,
    TopSection
} from './ProfileElements';
import {
    AboutInput,
    CommisionBottom,
    CommisionBubble,
    CommisionCard,
    CommisionEditBubble,
    CommisionText,
    CommisionTitle,
    CommisionTitleContainer,
    CommisionTop,
    LevelBubble,
    ModalEditRow,
    NumberInput,
    SmallCommisionBubble,
    StakeText,
    TitleInput
} from '../Home/CommisionsElements';
import LoadingPage from '../LoadingPage';
import { FiClock, FiMapPin } from 'react-icons/fi';
import { useParams } from 'react-router-dom';

const { darkLight, gray1 } = COLORS;
var stompClient = null;

const OtherCompanyPage = () => {
    const { argument } = useParams();
    const [cities, setCities] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [levels, setLevels] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [get, setGet] = useState("");
    const [CommisionsData, setCommisionsData] = useState([]);
    const [username, setUsername] = useState('');
    const [myUsername, setmyUsername] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = location.state?.path || '/';

    const citiesData = useMemo(
        () => ({
            method: 'get',
            maxBodyLength: 5000,
            url: '/public/api/filter/getAvailableCities',
            headers: {},
        }),
        [],
    );

    const tagsData = useMemo(
        () => ({
            method: 'get',
            maxBodyLength: 5000,
            url: '/public/api/filter/getAvailableTags',
            headers: {},
        }),
        [],
    );

    const languagesData = useMemo(
        () => ({
            method: 'get',
            maxBodyLength: 5000,
            url: '/public/api/filter/getAvailableLanguages',
            headers: {},
        }),
        [],
    );

    const levelsData = useMemo(
        () => ({
            method: 'get',
            maxBodyLength: 5000,
            url: '/public/api/filter/getAvailableLevels',
            headers: {},
        }),
        [],
    );

    const categoriesData = useMemo(
        () => ({
            method: 'get',
            maxBodyLength: 5000,
            url: '/public/api/filter/getAvailableCategories',
            headers: {},
        }),
        [],
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const companyResponse = await axios.request({
                    url: '/public/api/company/getProfileByUsername/' + argument,
                });

                const commissionResponse = await axios.request({
                    url: '/public/api/commission/getAllCommissionFirmByUsername/' + argument,
                    headers: {},
                });

                const decoderResult = await axios.request({
                    url: '/auth/decodeToken',
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('storageLogin'),
                      },
                })

                const [citiesResponse, tagsResponse, categoriesResponse, languagesResponse, levelsResponse] = await Promise.all(
                    [
                        axios.request(citiesData),
                        axios.request(tagsData),
                        axios.request(categoriesData),
                        axios.request(languagesData),
                        axios.request(levelsData),
                    ],
                );
                setUsername(argument);
                setCommisionsData(commissionResponse.data);
                setmyUsername(decoderResult.data.username);
                setGet(companyResponse.data);
                setCities(citiesResponse.data);
                setTags(tagsResponse.data);
                setLevels(levelsResponse.data);
                setLanguages(languagesResponse.data);
                setCategories(categoriesResponse.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [citiesData, tagsData, categoriesData, languagesData, levelsData]);

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
              if (stompClient) {
                 if (stompClient.connected) {
               let newMessage = {
                 sender_username: myUsername,
                 recipient_username: argument,
                 content: "!$@DM@$!",
               };
          
               stompClient.send('/app/chat', {}, JSON.stringify(newMessage))
               try {
                stompClient.disconnect();
            } catch (e) {console.log("stomp Client ma problem z disconnected, ZAWSZE");}
            navigate('/chat');
             }else console.log("błąd wysyłania: brak połączenia z WebSocket");
           }else  console.log("błąd wysyłania: stompClient niezdefiniowany");
            };


    const openModalClick = (data) => {
        setModalData(data);
        setShowModal(true);
    };

    const closeModalClick = () => {
        setShowModal(false);
    };

    const handleWrapperClick = (event) => {
        event.stopPropagation();
    };

    const Modal = ({ showModal }) => {
        return (
            <>
                {showModal && (
                    <ModalBackground onClick={closeModalClick}>
                        <ModalWrapper onClick={handleWrapperClick}>
                            <ModalTitle>{modalData.title}</ModalTitle>
                            <ModalInfo>{modalData.description}</ModalInfo>
                            <LineForm />
                            <ModalBottomSection>
                                <ModalColumn>
                                    <ModalRow>
                                        <ModalInfo>Stawka:</ModalInfo>
                                        <ModalData style={{ color: darkLight }}>{modalData.rate} PLN</ModalData>
                                    </ModalRow>
                                    <ModalRow>
                                        <ModalInfo>Czas wykonania:</ModalInfo>
                                        <ModalData>{modalData.deadline}</ModalData>
                                    </ModalRow>
                                    <ModalRow>
                                        <ModalInfo>Poziom zaawansowania:</ModalInfo>
                                        <ModalData>{modalData.level}</ModalData>
                                    </ModalRow>
                                    <ModalRow>
                                        <ModalInfo>Lokalizacja:</ModalInfo>
                                        <ModalData>{modalData.location}</ModalData>
                                    </ModalRow>
                                    <LineForm />
                                </ModalColumn>
                                <ModalColumn>
                                    <ModalInfo>Wymagane umiejętności:</ModalInfo>
                                    <ModalBubbleContainer>
                                        {modalData.skills.map((category, index) => (
                                            <CommisionBubble key={index}>{category}</CommisionBubble>
                                        ))}
                                    </ModalBubbleContainer>
                                    <LineForm />
                                    <ModalInfo>Wymagane języki:</ModalInfo>
                                    <ModalBubbleContainer>
                                        {modalData.languages.map((language, index) => (
                                            <CommisionBubble key={index}>{language}</CommisionBubble>
                                        ))}
                                    </ModalBubbleContainer>
                                    <LineForm />
                                    <ModalInfo>Tagi:</ModalInfo>
                                    <ModalBubbleContainer>
                                        {modalData.tags.map((tag, index) => (
                                            <CommisionBubble key={index}>{tag}</CommisionBubble>
                                        ))}
                                    </ModalBubbleContainer>
                                </ModalColumn>
                            </ModalBottomSection>
                        </ModalWrapper>
                    </ModalBackground>
                )}
            </>
        );
    };

    const CommisionElement = (props) => {
        return (
            <CommisionCard onClick={() => openModalClick(props)}>
                <CommisionTop>
                    <CommisionTitleContainer>
                        <CommisionTitle>
                            {props.title}
                        </CommisionTitle>
                        <LevelBubble>
                            {props.level}
                        </LevelBubble>
                    </CommisionTitleContainer>
                    <StakeText>{props.rate} PLN</StakeText>
                </CommisionTop>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    margin: '0.4rem 0',
                    alignItems: 'center',
                }}>
                    <FiMapPin size={18} style={{ color: gray1 }} />
                    <CommisionText>{props.location}</CommisionText>
                    <FiClock size={18} style={{ color: gray1 }} />
                    <CommisionText>{props.deadline}</CommisionText>
                </div>
                <CommisionBottom>
                    {props.tags.map((tag, indexT) => (
                        <SmallCommisionBubble key={indexT}>{tag}</SmallCommisionBubble>
                    ))}
                </CommisionBottom>
            </CommisionCard>
        );
    };

    return (
        <>
            {get ? (
                <ProfileWrapper>
                    <TopSection>
                        <LeftWrapper>
                            <ProfileImage><Image src={'/public/api/company/getProfileImageByUsername/' + username}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/assets/cards/defaultavatar.png";
                                }} alt="Profile" /></ProfileImage>
                            <NameText>{get.name}</NameText>
                            <LineForm />
                            {(argument !== myUsername && myUsername != '') ? <ButtonMessage onClick ={()=> connect()}>Napisz wiadomość</ButtonMessage> : <ButtonMessage onClick={() => navigate(redirectPath, { replace: true })} > Napisz wiadomość </ButtonMessage> }
                        </LeftWrapper>
                        <RightWrapper>
                            <BoldLabel>O firmie:</BoldLabel>
                            <AboutMe>{get.description}</AboutMe>
                            <Left>
                                <LineForm />
                                <InfoRow>
                                    <LeftColumn>
                                        <InfoText>Linki:</InfoText>
                                        <BubbleWrap>
                                            <Bubble>{get.website}</Bubble>
                                            <Bubble>{get.linkedin}</Bubble>
                                            <Bubble>{get.facebook}</Bubble>
                                            <Bubble>{get.instagram}</Bubble>
                                            <Bubble>{get.twitter}</Bubble>
                                        </BubbleWrap>
                                    </LeftColumn>
                                    <RightColumn>
                                        <LeftInfoRow>
                                            <InfoText>Adres:</InfoText>
                                            <DataText>{get.companyAdress}</DataText>
                                        </LeftInfoRow>
                                        <LeftInfoRow>
                                            <InfoText>NIP:</InfoText>
                                            <DataText>{get.nip}</DataText>
                                        </LeftInfoRow>
                                        <LeftInfoRow>
                                            <InfoText>REGON:</InfoText>
                                            <DataText>{get.regon}</DataText>
                                        </LeftInfoRow>
                                        <LeftInfoRow>
                                            <InfoText>KRS:</InfoText>
                                            <DataText>{get.krs}</DataText>
                                        </LeftInfoRow>
                                    </RightColumn>
                                </InfoRow>
                            </Left>
                        </RightWrapper>
                    </TopSection>
                    <DownSection>
                        <TitleText>Zlecenia</TitleText>
                        {CommisionsData.map((com, indexC) => (
                            <CommisionElement
                                key={indexC}
                                title={com.title}
                                description={com.description}
                                rate={com.rate}
                                deadline={com.deadline}
                                level={com.level}
                                location={com.location}
                                languages={com.languages}
                                tags={com.tags}
                                skills={com.skills}
                            />
                        ))}
                    </DownSection>
                </ProfileWrapper>) : (<LoadingPage />)}
            <Modal showModal={showModal} data={modalData} />

        </>
    );
};

export default OtherCompanyPage;
