import React, { useState, useEffect, useMemo } from 'react';
import { TitleText } from '../Home/CardsElement';
import { COLORS } from '../../components/Colors';
import axios from '../../api/axios';
import {
  AboutMe,
  BoldLabel,
  Bubble,
  BubbleWrap,
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
  ProfileImage,
  ProfileWrapper,
  RightColumn,
  RightWrapper,
  TopSection
} from './ProfileElements';
import { CommisionBottom, CommisionBubble, CommisionCard, CommisionText, CommisionTitle, CommisionTitleContainer, CommisionTop, LevelBubble } from '../Home/CommisionsElements';

const { darkLight } = COLORS;

const CommisionsData = [
  {
    title: "Projekt logo dla firmy produkującej kosmetyki naturalne",
    description: "Poszukujemy osoby do zaprojektowania logo dla naszej firmy. Chcielibyśmy, żeby logo nawiązywało do idei naturalności i ekologii, które są dla nas ważne. W zamian oferujemy dobre wynagrodzenie i ciekawe projekty do realizacji w przyszłości.",
    stake: 2000,
    deadline: "2 tyg.",
    level: "Mid",
    location: "Zdalnie",
    tags: [
      "Design logo",
      "Kosmetyki",
      "Ekologia",
    ],
    categories: [
      "logo",
      "Aobe Illustrator",
    ],
    languages: [
      "Polski",
      "Angielski",
    ],
  },
  {
    title: "Projekt opakowań dla nowej marki herbat ekologicznych",
    description: "Szukamy doświadczonego projektanta graficznego, który zaprojektuje dla nas opakowania do naszych herbat ekologicznych. Zależy nam na kreatywnym podejściu, które pozwoli wyróżnić nasze produkty na rynku. Oferujemy konkurencyjne wynagrodzenie oraz możliwość dalszej współpracy przy projektowaniu innych elementów graficznych.",
    stake: 3000,
    deadline: "3 tyg.",
    level: "Senior",
    location: "Zdalnie",
    tags: [
      "Design opakowań",
      "Herbaty",
      "Ekologia",
    ],
    categories: [
      "logo",
      "Aobe Illustrator",
    ],
    languages: [
      "Polski",
      "Angielski",
    ],
  },
  {
    title: "Projekt plakatu promującego wystawę sztuki nowoczesnej",
    description: "Jesteśmy galerią sztuki i poszukujemy projektanta graficznego, który zaprojektuje dla nas plakat promujący zbliżającą się wystawę sztuki nowoczesnej. Zależy nam na ciekawym i oryginalnym projekcie, który przyciągnie uwagę potencjalnych zwiedzających. Oferujemy dobrą stawkę oraz możliwość dalszej współpracy przy projektowaniu innych elementów graficznych.",
    stake: 2500,
    deadline: "2 tyg.",
    level: "Senior",
    location: "Zdalnie",
    tags: [
      "Design plakatu",
      "Sztuka",
      "Wystawa",
    ],
    categories: [
      "logo",
      "Aobe Illustrator",
    ],
    languages: [
      "Polski",
      "Angielski",
    ],
  },
];

const CompanyPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [get, setGet] = useState("");
  const [checkLoading, setCheckLoading] = useState(null);

  const companyName = 'Acme%20Corporation';

  const companyData = useMemo(() => ({
    method: 'get',
    maxBodyLength: 10000,
    url: '/companies/getCompanyProfileByName?name=' + companyName,
    headers: {},
  }),
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.request(companyData);
        setGet(result.data);
        setCheckLoading(result);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);



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
                    <ModalData style={{ color: darkLight }}>{modalData.stake} PLN</ModalData>
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
                    {modalData.categories.map((category, index) => (
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
          <TitleText>{props.stake} PLN</TitleText>
        </CommisionTop>
        <div>
          <CommisionText>{props.location}</CommisionText>
          <CommisionText>{props.deadline}</CommisionText>
        </div>
        <CommisionBottom>
          {props.tags.map((tag, indexT) => (
            <CommisionBubble key={indexT}>{tag}</CommisionBubble>
          ))}
        </CommisionBottom>
      </CommisionCard>
    );
  };

  return (
    <>
      <ProfileWrapper>
        <TopSection>
          <LeftWrapper>
            <ProfileImage><Image src="/assets/test.jpg" alt="Profile" /></ProfileImage>
            <NameText>{get.name}</NameText>
            <LineForm />
            <Button>Napisz wiadomość</Button>
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
              stake={com.stake}
              deadline={com.deadline}
              level={com.level}
              location={com.location}
              languages={com.languages}
              tags={com.tags}
              categories={com.categories}
            />
          ))}
        </DownSection>
      </ProfileWrapper>
      <Modal showModal={showModal} data={modalData} />
    </>

  );


};

export default CompanyPage;
