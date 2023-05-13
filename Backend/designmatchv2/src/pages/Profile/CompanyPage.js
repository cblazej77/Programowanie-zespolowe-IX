import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Rating } from 'react-simple-star-rating';
import {
  RightColumn,
  InfoRow,
  LeftColumn,
  Right, Left,
  AboutMe,
  Button,
  Image,
  LeftWrapper,
  LineForm,
  ProfileImage,
  ProfileWrapper,
  RightWrapper,
  TopSection,
  LeftInfoRow,
  InfoText,
  DataText,
  NameText,
  DownSection,
  BoldLabel,
  BubbleWrap,
  Bubble,
  CommisionCard,
  CommisionTitle,
  CommisionBubble,
  CommisionText,
  CommisionTop,
  CommisionTitleContainer,
  CommisionBottom,
  LevelBubble,
} from '../../components/ProfileElements'
import { TitleText } from '../Home/CardsElement';

const CommisionsData = [
  {
    title: "Projekt logo dla firmy produkującej kosmetyki naturalne Projekt",
    description: "Poszukujemy osoby do zaprojektowania logo dla naszej firmy. Chcielibyśmy, żeby logo nawiązywało do idei naturalności i ekologii, które są dla nas ważne. W zamian oferujemy dobre wynagrodzenie i ciekawe projekty do realizacji w przyszłości",
    stake: 2000,
    deadline: "2 tyg.",
    level: "Mid",
    location: "Zdalnie",
    tags: [
      "Design logo",
      "Kosmetyki",
      "Ekologia",
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
  },
];

const CommisionElement = (props) => {
  return (
    <CommisionCard>
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

//UserName/UserInfo/MessageButton
const CompanyPage = () => {
  return (
    <>
      <ProfileWrapper>
        <TopSection>
          <LeftWrapper>
            <ProfileImage><Image src="/assets/test.jpg" alt="Profile" /></ProfileImage>
            <NameText>Oracle</NameText>
            <LineForm />
            <Button>Napisz wiadomość</Button>
          </LeftWrapper>
          <RightWrapper>
            <BoldLabel >O firmie:</BoldLabel>
            <AboutMe>get.bio</AboutMe>
            <Left>
              <LineForm />
              <InfoRow >
                <LeftColumn >
                  <InfoText>Linki:</InfoText>
                  <BubbleWrap>
                    <Bubble>get.website</Bubble>
                    <Bubble>get.linkedin</Bubble>
                  </BubbleWrap>
                </LeftColumn>
                <RightColumn>
                  <LeftInfoRow>
                    <InfoText>Adres:</InfoText>
                    <DataText>get.location</DataText>
                  </LeftInfoRow>
                  <LeftInfoRow>
                    <InfoText>NIP:</InfoText>
                    <DataText>get.NIP</DataText>
                  </LeftInfoRow>
                </RightColumn>
              </InfoRow>
            </Left>
          </RightWrapper>
        </TopSection>
        <DownSection>
          <TitleText>Zlecenia</TitleText>
          {CommisionsData.map((cms, indexC) => (
            <CommisionElement
              key={indexC}
              title={cms.title}
              description={cms.description}
              stake={cms.stake}
              deadline={cms.deadline}
              level={cms.level}
              location={cms.location}
              tags={cms.tags}
            />
          ))}
        </DownSection>
      </ProfileWrapper>

    </>

  );


};

export default CompanyPage;
