import React, { useState, useEffect } from 'react';
import { Rating } from 'react-simple-star-rating';
import { default as axios } from '../../api/axios'
import LoadingPage from '../LoadingPage';
import {
  AboutMe,
  BoldLabel,
  BottomSection,
  BottomWrapper,
  Bubble,
  BubbleLinks,
  BubbleWrap,
  Button,
  DataText,
  HeaderText,
  Image,
  InfoRow,
  InfoText,
  JobText,
  Left,
  LeftColumn,
  LeftInfoRow,
  LeftWrapper,
  LineForm,
  NameText,
  ProfileImage,
  ProfileWrapper,
  RatingText,
  RatingWrapper,
  RightColumn,
  RightWrapper,
  SmallButton,
  TopSection
} from './ProfileElements';
import { TitleText } from '../Home/CardsElement';
import Portfolio from './Portfolio';

const FirstScreen = 1954;//wyświetlić (15opini niżej)
const SecondScreen = 1000;
const getArtistProfileURL = process.env.REACT_APP_GET_ARTIST_PROFILE;
const getUserURL = process.env.REACT_APP_GET_USER;
const getShortArtistProfileURL = process.env.REACT_APP_GET_SHORT_ARTIST_PROFILE;

//UserName/UserInfo/MessageButton
const UserPage = () => {
  const [get, setGet] = useState("");
  const [checkLoading, setCheckLoading] = useState(null);
  const [shortProfile, setShortProfile] = useState("");
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  const [rating, setRating] = useState(0); //rating wyslac do bazy jako ocenę
  const [button, setButton] = useState(true);
  const [username, setUsername] = useState('');

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

        const userResult = await axios.request({
          url: '/public/api/artist/getArtistProfileByUsername/' + decodeResult.data.username
        });

        setUsername(decodeResult.data.username);
        setGet(userResult.data);
        setCheckLoading(userResult);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (get) {
      clear();
      for (let i = 0; i < get.education.length; i++) {
        handleAddEducationElement(
          i,
          get.education[i].school_name,
          get.education[i].faculty,
          get.education[i].field_of_study,
          get.education[i].degree,
          get.education[i].start_date,
          get.education[i].end_date,
          get.education[i].description,
        );
      }
      for (let i = 0; i < get.experience.length; i++) {
        handleAddExperienceElement(
          i,
          get.experience[i].company,
          get.experience[i].city,
          get.experience[i].position,
          get.experience[i].description,
          get.experience[i].start_date,
          get.experience[i].end_date,
        );
      }
    }
  }, [get]);

  const handleAddEducationElement = (newId, schoolName, faculty, fieldOfStudy, degree, startDate, endDate, description) => {
    setEducationList((prevList) => [
      ...prevList,
      {
        id: newId,
        faculty,
        school_name: schoolName,
        field_of_study: fieldOfStudy,
        degree,
        start_date: startDate,
        end_date: endDate,
        description,
      },
    ]);
  };

  function handleAddExperienceElement(id, company, city, position, description, start_date, end_date) {
    setExperienceList((experienceList) => [
      ...experienceList,
      {
        id: id,
        company: company,
        city: city,
        position: position,
        description: description,
        start_date: start_date,
        end_date: end_date,
      },
    ]);
  }

  function clear() {
    handleClearEducationList();
    handleClearExperienceList();
  }
  function handleClearEducationList() {
    setEducationList([]);
  }

  function handleClearExperienceList() {
    setExperienceList([]);
  }

  function ListEducation() {
    const list = educationList.map((item, index) => {
      return (
        <div key={item.id}>
          {index !== 0 && <LineForm />}
          <HeaderText>Wykształcenie</HeaderText>
          <LeftInfoRow>
            <InfoText>Uczelnia:</InfoText>
            <label>{item.school_name}</label>
          </LeftInfoRow>
          <LeftInfoRow>
            <InfoText>Kierunek:</InfoText>
            <label>{item.faculty}</label>
          </LeftInfoRow>
          <LeftInfoRow>
            <InfoText>Dziedzina nauk: </InfoText>
            <label>{item.field_of_study}</label>
          </LeftInfoRow>
          <LeftInfoRow>
            <InfoText>Stopień: </InfoText>
            <label>{item.degree}</label>
          </LeftInfoRow>
          <LeftInfoRow>
            <InfoText>Od: </InfoText>
            <label>{item.start_date}</label>
          </LeftInfoRow>
          <LeftInfoRow>
            <InfoText>Opis: </InfoText>
            <label>{item.description}</label>
          </LeftInfoRow>
        </div>
      );
    });

    return (
      <>
        {list}
      </>
    );
  }

  function ListLinks() {
    return (<>
      {(get.facebook || get.instagram || get.linkedin || get.pinterest || get.twitter || get.website) && (
        <>
          <LineForm />
          <InfoText>Media społecznościowe:</InfoText>
        </>
      )}
      <BubbleWrap>
        {get.facebook && <BubbleLinks href={get.facebook}>facebook</BubbleLinks>}
        {get.instagram && <BubbleLinks href={get.instagram}>instagram</BubbleLinks>}
        {get.linkedin && <BubbleLinks href={get.linkedin}>linkedin</BubbleLinks>}
        {get.pinterest && <BubbleLinks href={get.pinterest}>pinterest</BubbleLinks>}
        {get.twitter && <BubbleLinks href={get.twitter}>twitter</BubbleLinks>}
        {get.website && <BubbleLinks href={get.website}>website</BubbleLinks>}
      </BubbleWrap>
    </>
    )
  }

  function ListExperience() {

    const list = experienceList.map((item, index) => {
      return (
        <div key={item.id}>
          <LineForm />
          <HeaderText>Doświadczenie</HeaderText>
          <LeftInfoRow>
            <InfoText>Nazwa firmy: </InfoText>
            <label>{item.comapny}</label>
          </LeftInfoRow>
          <LeftInfoRow>
            <InfoText>Miasto: </InfoText>
            <label>{item.city}</label>
          </LeftInfoRow>
          <LeftInfoRow>
            <InfoText>Stanowisko: </InfoText>
            <label>{item.position}</label>
          </LeftInfoRow>
          <LeftInfoRow>
            <InfoText>Od: </InfoText>
            <label>{item.start_date}</label>
          </LeftInfoRow>
          <LeftInfoRow>
            <InfoText>Do: </InfoText>
            <label>{item.end_date}</label>
          </LeftInfoRow>
        </div>
      );
    });

    return (
      <>
        {list}
      </>
    );
  }

  const showButton = () => {
    if (window.innerWidth <= 1000) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  function handleRating(rate) {
    setRating(rate);
  }

  window.addEventListener('resize', showButton);

  const reviewCount = 15; //pobrac to z bazy
  const ratingCount = 2.5; //pobrac z bazy
  const Default = "...";

  return (
    <>{checkLoading && get ? (
      <ProfileWrapper>
        <TopSection>
          <LeftWrapper>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <ProfileImage>
                {username && <Image src={'http://localhost:8080/public/api/artist/getProfileImageByUsername/' + username} alt="Profile" />}
              </ProfileImage>
              <JobText>{get.level}</JobText>
            </div>
            <NameText>{get.firstname} {get.lastname} </NameText>
            {/* <RatingWrapper>
              <Rating
                size="2rem"
                allowFraction={true}
                initialValue={ratingCount}
                onClick={handleRating}
              onPointerEnter={() => console.log('Enter')}
              onPointerLeave={() => console.log('Leave')}
              onPointerMove={(value, index) => console.log(value, index)}
              />
              <RatingText>({reviewCount} opinii)</RatingText>
            </RatingWrapper> */}
            {/* <LineForm />
            <Button>Napisz wiadomość</Button>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <SmallButton>Napisz opinię</SmallButton>
              <SmallButton>Like</SmallButton>
            </div> */}
          </LeftWrapper>
          <RightWrapper>
            <BoldLabel>O mnie:</BoldLabel>
            <AboutMe>{get.bio}</AboutMe>
            <Left>
              <LineForm />
              <InfoRow>
                <LeftColumn>
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
                  <ListLinks />
                </LeftColumn>
                {get.education.length > 0 || get.experience.length > 0 ? (
                  <RightColumn>
                    <ListEducation />
                    <ListExperience />
                  </RightColumn>) : null}
              </InfoRow>
            </Left>
          </RightWrapper>
        </TopSection>
        <BottomSection>
          <TitleText>Portfolio</TitleText>
          <BottomWrapper>
            <Portfolio username={username} />
          </BottomWrapper>
        </BottomSection>
      </ProfileWrapper>
    ) : (<LoadingPage />)}
    </>

  );
};

export default UserPage;
