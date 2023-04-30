import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Rating } from 'react-simple-star-rating';
import { default as axios } from '../api/axios'
import {
  RightColumn,
  InfoRow,
  LeftColumn as LeftColumn,
  DataColumnt,
  Right, Left,
  AboutMe,
  SmallButton,
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
  HeaderText,
  NameText,
  JobText,
  RatingWrapper,
  DownSection,
  RatingText,
  BoldLabel,
  BubbleWrap,
  Bubble
} from '../components/ProfileElements'
import LoadingPage from './LoadingPage';

const FirstScreen = 1954;//wyświetlić (15opini niżej)
const SecondScreen = 1000;
const getArtistProfileURL = process.env.REACT_APP_GET_ARTIST_PROFILE;
const getUserURL = process.env.REACT_APP_GET_USER;
const getShortArtistProfileURL = process.env.REACT_APP_GET_SHORT_ARTIST_PROFILE;

//UserName/UserInfo/MessageButton
const UserPage = () => {
  const [get, setGet] = useState(null);

  const [rating, setRating] = useState(0); //rating wyslac do bazy jako ocenę
  const [click, setClick] = useState(true);
  const [button, setButton] = useState(true);

  const job = "";
  const profileName = 'jakub1';
  let profileData = {
    method: 'get',
    maxBodyLength: Infinity,
    url: getArtistProfileURL + profileName,
    headers: {}
  };
  let profileNameData = {
    method: 'get',
    maxBodyLength: Infinity,
    url: getShortArtistProfileURL + profileName,
    headers: {}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result1 = await axios.request(profileData);
        const result2 = await axios.request(profileNameData);
        setGet(result1.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);



  const handleClick = () => setClick(!click);

  const handleRating = (rate: number) => {
    setRating(rate)
  }

  const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () => console.log('Leave')
  const onPointerMove = (value: number, index: number) => console.log(value, index)

  const showButton = () => {
    if (window.innerWidth <= 1000) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  window.addEventListener('resize', showButton);

  const reviewCount = 15; //pobrac to z bazy
  const ratingCount = 2.5; //pobrac z bazy
  const Default = "...";
  return (
    <>{get ? (
      <ProfileWrapper>
        <TopSection>
          <LeftWrapper>
            <ProfileImage><Image src="/assets/test.jpg" alt="Profile" /></ProfileImage>
            <JobText> {get.level} </JobText>
            <NameText>Tomasz Nowak</NameText>
            <RatingWrapper>
              <Rating
                size="2rem"
                allowFraction={true}
                initialValue={ratingCount}
                onClick={handleRating}
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                onPointerMove={onPointerMove}
              />
              <RatingText>({reviewCount} opinii)</RatingText>
            </RatingWrapper>
            <LineForm />
            <Button>Napisz wiadomość</Button>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <SmallButton >Napisz opinię</SmallButton>
              <SmallButton > Obserwuj</SmallButton>
            </div>
          </LeftWrapper>
          <RightWrapper>
            <BoldLabel >O mnie:</BoldLabel>
            <AboutMe>{get.bio}</AboutMe>
            
            <Left>
            <LineForm />
              <InfoRow >
                <LeftColumn >
                  <LeftInfoRow>
                    <InfoText>Członek od:</InfoText>
                    <DataText>20.20.2023</DataText>
                  </LeftInfoRow>
                  <LeftInfoRow>
                    <InfoText>Miejscowość:</InfoText>
                    <DataText>{get.location}</DataText>
                  </LeftInfoRow>
                  <LeftInfoRow>
                    <InfoText>Prace:</InfoText>
                    <DataText>20</DataText>
                  </LeftInfoRow>
                  <LineForm />
                  <InfoText>Języki:</InfoText>
                  <BubbleWrap>
                    {get.languages?.length ? (
                      get.languages.map((language, index) => <Bubble key={index}>{language}</Bubble>)
                    ) : <Bubble>{Default}</Bubble>}
                  </BubbleWrap>
                  <LineForm />
                  <InfoText>Umiejętności:</InfoText>
                  <BubbleWrap>
                    {get.skills?.length ? (
                      get.skills.map((skill, index) => <Bubble key={index}>{skill}</Bubble>)
                    ) : <Bubble>{Default}</Bubble>}
                  </BubbleWrap>
                  <LineForm />
                  <InfoText>Linki:</InfoText>
                  <BubbleWrap>
                    <Bubble>{get.website}</Bubble>
                    <Bubble>{get.linkedin}</Bubble>
                  </BubbleWrap>
                </LeftColumn>
                <RightColumn>
                  <HeaderText>Wykształcenie</HeaderText>
                  <LeftInfoRow>
                    <InfoText>Nazwa szkoły/uczelni:</InfoText>
                    <DataText>{get.education[0].school_name}</DataText>
                  </LeftInfoRow>
                  <LeftInfoRow>
                    <InfoText>Wydział:</InfoText>
                    <DataText>{get.education[0].faculty}</DataText>
                  </LeftInfoRow>
                  <LeftInfoRow>
                    <InfoText>Kierunek:</InfoText>
                    <DataText>{get.education[0].field_of_study}</DataText>
                  </LeftInfoRow>
                  <LeftInfoRow>
                    <InfoText>Data rozpoczęcia:</InfoText>
                    <DataText>{get.education[0].start_date}</DataText>
                  </LeftInfoRow>
                  <LeftInfoRow>
                    <InfoText>Data zakończenia:</InfoText>
                    <DataText>{get.education[0].end_date}</DataText>
                  </LeftInfoRow>
                  <LineForm />
                  <HeaderText>Doświadczenie</HeaderText>
                  <LeftInfoRow>
                    <InfoText>Firma:</InfoText>
                    <DataText>{get.experience[0].company}</DataText>
                  </LeftInfoRow>
                  <LeftInfoRow>
                    <InfoText>Miasto:</InfoText>
                    <DataText>{get.experience[0].city}</DataText>
                  </LeftInfoRow>
                  <LeftInfoRow>
                    <InfoText>Stanowisko:</InfoText>
                    <DataText>{get.experience[0].position}</DataText>
                  </LeftInfoRow>
                  <LeftInfoRow>
                    <InfoText>Data rozpoczęcia:</InfoText>
                    <DataText>{get.experience[0].start_date}</DataText>
                  </LeftInfoRow>
                  <LeftInfoRow>
                    <InfoText>Data zakończenia:</InfoText>
                    <DataText>{get.experience[0].end_date}</DataText>
                  </LeftInfoRow>
                </RightColumn>
              </InfoRow>
            </Left>
          </RightWrapper>
        </TopSection>
        <DownSection>
          
        </DownSection>
      </ProfileWrapper>
    ) : (<LoadingPage />)}
    </>

  );


};

export default UserPage;
