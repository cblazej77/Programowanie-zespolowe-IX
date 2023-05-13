import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Rating } from 'react-simple-star-rating';
import { default as axios } from '../../api/axios'
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
  Bubble,
  BubbleLinks
} from '../../components/ProfileElements'
import LoadingPage from '../LoadingPage';
import { useParams } from 'react-router-dom';

const FirstScreen = 1954;//wyświetlić (15opini niżej)
const SecondScreen = 1000;
const getArtistProfileURL = process.env.REACT_APP_GET_ARTIST_PROFILE;
const getUserURL = process.env.REACT_APP_GET_USER;
const getShortArtistProfileURL = process.env.REACT_APP_GET_SHORT_ARTIST_PROFILE;

//UserName/UserInfo/MessageButton
const OtherUserPage = ({ argument }) => {
   // const { argument } = useParams();
  const [get, setGet] = useState("");
  const [checkLoading, setCheckLoading] = useState(null);
  const [shortProfile, setShortProfile] = useState("");
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);

  const [rating, setRating] = useState(0); //rating wyslac do bazy jako ocenę
  const [click, setClick] = useState(true);
  const [button, setButton] = useState(true);



  useEffect(() => { 
    let profileName = 'WojciechDuklas';
    console.log(argument);
    console.log({argument});
    // if(argument) profileName = 'WojciechDuklas';
    // else profileName = 'Jakub1';

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

    const fetchData = async () => {
      try {
        const result1 = await axios.request(profileData);
        const result2 = await axios.request(profileNameData);
        setGet(result1.data);
        setCheckLoading(result1);
        setShortProfile(result2.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if(get){
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

  const handleAddEducationElement = (newId, faculty, schoolName, fieldOfStudy, degree, startDate, endDate, description) => {
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
          <InfoText>Kierunek: </InfoText>
            <label>{item.faculty}</label>
          </LeftInfoRow>
          <LeftInfoRow>
          <InfoText>Uczelnia: </InfoText>
          <label>{item.school_name}</label>
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
  function ListLinks(){
    return(    <>
      { (get.facebook || get.instagram || get.linkedin || get.pinterest || get.twitter || get.website) &&  (
      <>
        <LineForm />
        <InfoText>Media społecznościowe:</InfoText>
      </>
      )}
      <BubbleWrap>
    
        {get.facebook && <BubbleLinks href={get.facebook}  > facebook</BubbleLinks>}
        {get.instagram && <BubbleLinks href={get.instagram}> instagram </BubbleLinks>}
        {get.linkedin && <BubbleLinks href={get.linkedin}> linkedin  </BubbleLinks>}
        {get.pinterest && <BubbleLinks href={get.pinterest}> pinterest  </BubbleLinks>}
        {get.twitter && <BubbleLinks href={get.twitter}> twitter  </BubbleLinks>}
        {get.website && <BubbleLinks href={get.website}> website  </BubbleLinks>}
     
      
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
    <>{checkLoading && get ? (

      <ProfileWrapper>
        <TopSection>
          <LeftWrapper>
            <ProfileImage><Image src="/assets/test.jpg" alt="Profile" /></ProfileImage>
            <JobText> {get.level} </JobText>
            <NameText>{shortProfile.firstname} {shortProfile.lastname} </NameText>
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
              <SmallButton > Like</SmallButton>
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
                    <DataText>{shortProfile.city}</DataText>
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
                <RightColumn>

                  <ListEducation />
                  <ListExperience />
          
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

export default OtherUserPage;
