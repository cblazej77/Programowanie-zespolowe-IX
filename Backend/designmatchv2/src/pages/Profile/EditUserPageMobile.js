import React, { useState, useEffect, useMemo } from 'react';
import { Rating } from 'react-simple-star-rating';
import styled from 'styled-components';
import { default as axios } from '../../api/axios';
import { COLORS } from '../../components/Colors';
import Modal from '../../components/modalTags';
import ModalLinks from '../../components/ModalLinks';
import ModalSkills from '../../components/ModalSkills';
import ModalLanguages from '../../components/ModalLanguages';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './Dropdown.css';


import {
  RightColumn,
  InfoRow,
  LeftColumn as LeftColumn,
  Left,
  InputInfoText,
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
  BubbleWrap,
  Bubble,
  ModalBubble,
  BoldLabel,
  DataTextArena,
  SmallInput,
  BubbleLinks

} from './ProfileElements'
import LoadingPage from '../LoadingPage';


const {
  secondary,
} = COLORS;

const FirstScreen = 1954;//wyświetlić (15opini niżej)
const SecondScreen = 1000;
const getArtistProfileURL = process.env.REACT_APP_GET_ARTIST_PROFILE;
const getUserURL = process.env.REACT_APP_GET_USER;
const getShortArtistProfileURL = process.env.REACT_APP_GET_SHORT_ARTIST_PROFILE;

const AboutMe = styled.textarea`
  margin: 0px 50px;
  height: ${props => props.hag};
  resize: none;
  overflow: auto;
  min-height: ${props => props.hag};
  max-height: 60px;
  z-index: 10;
`

const Nawias = styled.p`
  border: 1px solid red;
  margin: auto 15px auto auto;
`;
const ButtonSave = styled.button`
  padding: 20px 50px;
  font-size: 1.2rem;
  margin-top: 0;
  margin-left: 80vw;
  display: flex;
  color: white;
  border-radius: 15px;
  border: 1px solid black;
  background: ${secondary};
  transform: translateY(2.5rem);
  &:hover {
    transition: 0.3s;
    border: 2px solid rgba(0, 0, 0, 0.5);
    box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.4);
  }
`;
const ButtonEdit = styled.button`
  padding: 5px 20px;
  color: black;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 2px 6px 0 rgba(0, 0, 0, 0.4);
  &:hover{
    transition: 0.3s;
    border: 2px solid rgba(0, 0, 0, 0.5);
    box-shadow: 0px 4px 12px 0 rgba(0, 0, 0, 0.4);
  }
`;

//UserName/UserInfo/MessageButton
const EditUserPageMobile = () => {
  const [get, setGet] = useState(null);//przechwytuje dane i na ich podstawie loguje // juz nie
  const [height, setHeight] = useState("20px");//do zmiejszającego się textarena

  //popUp - modal
  const [showModalTags, setShowModalTags] = useState(false);
  const [showModalSkills, setShowModalSkills] = useState(false);
  const [showModalLinks, setShowModalLinks] = useState(false);
  const [showModalLanguages, setShowModalLanguages] = useState(false);

  const openModalTags = () => {
    setShowModalTags(prev => !prev);
  }

  const openModalSkills = () => {
    setShowModalSkills(prev => !prev);
  }

  const openModalLinks = () => {
    setShowModalLinks(prev => !prev);
  }

  const openModalLanguages = () => {
    setShowModalLanguages(prev => !prev);
  }

  //Hooks for working logins    
  const [token, setToken] = useState('');//wcześniej get
  const [artistProfile, setArtistProfile] = useState(null);
  const [artistShortProfile, setArtistShortProfile] = useState(null);
  const [availableLevels, setAvailableLevels] = useState([]);
  const [availableLocations, setAvailableLocations] = useState([]);

  //Hooks for temp values when editing
  const [bio, setBio] = useState("");
  const [level, setLevel] = useState('');
  const [location, setLocation] = useState('');
  const [dribble, setDribble] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [pinterest, setPinterest] = useState('');
  const [twitter, setTwitter] = useState('');
  const [website, setWebsite] = useState('');
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  const [skills, setSkills] = useState([]);
  const [tags, setTags] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [skillsToAdd, setSkillsToAdd] = useState([]);


  //edycja profilu
  //const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [date, setDate] = useState("20.07.2001");//nie siciaga z bazy

  const [click, setClick] = useState(true);
  const [button, setButton] = useState(true);

  //do textarea
  const limitHeight = 60;
  const maxChars = 300;
  let chars;
  if(bio) chars = bio.length;
  else chars = 0;



  //pobieranie danych z backendu
  const profileName = 'jkasinski1';
  let levelsData = {
    method: 'get',
    maxBodyLength: Infinity,
    url: "/public/api/filter/getAvailableLevels",
    headers: {}
  };
  let profileData = {
    method: 'get',
    maxBodyLength: Infinity,
    url: getArtistProfileURL,
    headers: {}
  };
  let profileNameData = {
    method: 'get',
    maxBodyLength: Infinity,
    url: getShortArtistProfileURL,
    headers: {}
  };
  let citiesData = {
    method: 'get',
    maxBodyLength: Infinity,
    url: "/public/api/filter/getAvailableCities",
    headers: {}
  };
 


  const handleDeleteEducationElement = (id) => {
    setEducationList((prevList) => prevList.filter((item) => item.id !== id));
  };

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


  function handleChangeEducationElement(
    id,
    school_name,
    faculty,
    field_of_study,
    degree,
    start_date,
    end_date,
    description,
  ) {
    setEducationList(
      educationList.map((e) => {
        if (e.id === id) {
          e.school_name = school_name;
          e.faculty = faculty;
          e.field_of_study = field_of_study;
          e.degree = degree;
          e.start_date = start_date;
          e.end_date = end_date;
          e.description = description;
        }
        return e;
      }),
    );
  }

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

  function handleChangeExperienceElement(id, company, city, position, description, start_date, end_date) {
    setExperienceList(
      experienceList.map((e) => {
        if (e.id === id) {
          e.company = company;
          e.city = city;
          e.position = position;
          e.start_date = start_date;
          e.end_date = end_date;
          e.description = description;
        }
        return e;
      }),
    );
  }

  function handleDeleteExperienceElement(id) {
    setExperienceList(experienceList.filter((e) => e.id !== id));
  }

  function handleAddSkill(skill) {
    setSkills((skills) => [...skills, skill]);
  }

  function handleDeleteSkill(skill) {
    setSkills(skills.filter((s) => s !== skill));
  }

  function handleAddTag(tag) {
    setTags((tags) => [...tags, tag]);
  }

  function handleDeleteTag(tag) {
    setTags(tags.filter((t) => t !== tag));
  }

  function handleAddLanguage(language) {
    setLanguages((languages) => [...languages, language]);
  }

  function handleDeleteLanguage(language) {
    setLanguages(languages.filter((l) => l !== language));
  }



  //funkcje czyszczace
  function handleClearEducationList() {
    setEducationList([]);
  }

  function handleClearExperienceList() {
    setExperienceList([]);
  }

  function handleClearSkills() {
    setSkills([]);
  }

  function handleClearTags() {
    setTags([]);
  }

  function handleClearLanguages() {
    setLanguages([]);
  }


  function handleClearSkillsToAdd() {
    setSkillsToAdd([]);
  }


  function clear() {
    handleClearEducationList();
    handleClearExperienceList();
    handleClearLanguages();
    handleClearSkills();
    handleClearTags();
    handleClearSkillsToAdd();
    setBio('');
    setLevel('');
    setLocation('');
    setDribble('');
    setFacebook('');
    setInstagram('');
    setTwitter('');
    setPinterest('');
    setWebsite('');
    setLinkedin('');
  }

  const updateArtistProfile = async () => {
    let education = educationList;
    let experience = experienceList;

    education.map((item, index) => {
      delete item.id;
    });
    experience.map((item, index) => {
      delete item.id;
    });
    const response = await axios
      .put(
          '/api/artist/updateProfileByUsername/jkasinski1',
        {
          bio: bio,
          level: level.value,
          location: location.value,
          skills: skills,
          tags: tags,
          languages: languages,
          education: education,
          experience: experience,
          website: website,
          facebook: facebook,
          linkedin: linkedin,
          instagram: instagram,
          dribble: dribble,
          pinterest: pinterest,
          twitter: twitter,
        },
        {
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' , 'Access-Control-Allow-Origin' : '*', 'Authorization' : 'Bearer ' + localStorage.getItem("storageLogin")},
        },
      )
      .catch((error) => {
        console.log("updateArtist  ", error);
      });
      console.log("updateArtist response:     ", response);
    if ((response.status = 200)) {
      experience = null;
      education = null;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        //odebranie wszsytkich wyników
        const levelsResponse =      await axios.request(levelsData);
        const artistResponse =      await axios.request(profileData);
        const artistShortResponse = await axios.request(profileNameData);
        const citiesResponse =      await axios.request(citiesData);
        setArtistShortProfile(artistShortResponse.data);
        setGet(artistResponse.data);
        setArtistProfile(artistResponse.data);
        setAvailableLevels(levelsResponse.data);
        setAvailableLocations(citiesResponse.data);
      } catch (error) {
        console.log("fetchData w useEffect ", error);
      }
    };
    fetchData();
  }, []);

  useEffect( () => {
    if(artistShortProfile){
      setName(artistShortProfile.firstname);
      setSurname(artistShortProfile.lastname);
    }
    
  }, [artistShortProfile])

  useEffect(() => {
    if (artistProfile) {
      clear();
      setBio(artistProfile.bio);
      setLevel(artistProfile.level);
      setLocation(artistProfile.location);
      for (let i = 0; i < artistProfile.education.length; i++) {
        handleAddEducationElement(
          i,
          artistProfile.education[i].school_name,
          artistProfile.education[i].faculty,
          artistProfile.education[i].field_of_study,
          artistProfile.education[i].degree,
          artistProfile.education[i].start_date,
          artistProfile.education[i].end_date,
          artistProfile.education[i].description,
        );
      }
      for (let i = 0; i < artistProfile.experience.length; i++) {
        handleAddExperienceElement(
          i,
          artistProfile.experience[i].company,
          artistProfile.experience[i].city,
          artistProfile.experience[i].position,
          artistProfile.experience[i].description,
          artistProfile.experience[i].start_date,
          artistProfile.experience[i].end_date,
        );
      }
      for (let i = 0; i < artistProfile.skills.length; i++) {
        handleAddSkill(artistProfile.skills[i]);
      }
      for (let i = 0; i < artistProfile.tags.length; i++) {
        handleAddTag(artistProfile.tags[i]);
      }
      for (let i = 0; i < artistProfile.languages.length; i++) {
        handleAddLanguage(artistProfile.languages[i]);
      }
      setDribble(artistProfile.dribble);
      setFacebook(artistProfile.facebook);
      setInstagram(artistProfile.instagram);
      setLinkedin(artistProfile.linkedin);
      setPinterest(artistProfile.pinterest);
      setTwitter(artistProfile.twitter);
      setWebsite(artistProfile.website);
    }
  }, [artistProfile]);



function ListTags() {
  if (tags) {
    const list = tags.map((item, id) => (

      <Bubble key={id} >
        <label>{item}</label>
        <button onClick={() =>handleDeleteTag(item)}>
        [X]</button>
      </Bubble> 
    ));
    return (
      <>
        {list}
        <Bubble >
        <button onClick={openModalTags}>   
            <label>Dodaj</label>  
        </button>  
        </Bubble>
      </>
    );
  } else {
    return <label>empty</label>;
  }
}
function ListSkills() {
  if (skills) {
    const list = skills.map((item, id) => (
      <Bubble key={id} >
        <label>{item}</label>
        <button onClick={() => handleDeleteSkill(item)}>
          [X] </button>
      </Bubble>
    ));
    return (
      <>
        {list}
          <Bubble >
            <button onClick ={openModalSkills}>
              <label>Dodaj</label>
            </button>
           
          </Bubble>
      </>
    );
  } else {
    return <label>pusty ListSkills</label>;
  }
}
function ListLanguages() {
  if (languages) {
    const list = languages.map((item, id) => (
      <Bubble key={id} >
        <label>{item}</label>
        <button onClick={() => handleDeleteLanguage(item)}>
              [X] </button>
      </Bubble>
    ));
    return (
      <>
        {list}
          <Bubble >
            <button onClick ={openModalLanguages}>
              <label>Dodaj</label>
            </button>
            
          </Bubble>
      </>
    );
  } else {
    return <label></label>;
  }
}
  function ListEducation() {

    const list = educationList.map((item) => {
      return (
        <div key={item.id}>
          <LeftInfoRow>
          <InfoText>Kierunek: </InfoText>
            <input
              maxLength={50}
              type="text"
              style={{ flexWrap: 'wrap', width: '82%' }}
              defaultValue={item.faculty}
              onChange={(e) => {
                item.faculty = e.target.value;
              }}
              placeholder="Wpisz kierunek"
            />
          </LeftInfoRow>
          <LeftInfoRow>
          <InfoText>Uczelnia: </InfoText>
            <input
              maxLength={100}
              type="text"
              style={{ flexWrap: 'wrap', width: '83%' }}
              defaultValue={item.school_name}
              onChange={(e) => {
                item.school_name = e.target.value;
              }}
              placeholder="Wpisz nazwę uczelni"
            />
          </LeftInfoRow>
          <LeftInfoRow>
            <InfoText>Dziedzina nauk: </InfoText>
            <input
              maxLength={50}
              type="text"
              style={{ flexWrap: 'wrap', width: '69%' }}
              defaultValue={item.field_of_study}
              onChange={(e) => {
                item.field_of_study = e.target.value;
              }}
              placeholder="Wpisz dziedzinę nauk"
            />
          </LeftInfoRow>
          <LeftInfoRow>
            <InfoText>Stopień: </InfoText>
            <input
              maxLength={30}
              type="text"
              style={{ flexWrap: 'wrap', width: '50%' }}
              defaultValue={item.degree}
              onChange={(e) => {
                item.degree = e.target.value;
              }}
              placeholder="Wpisz stopień"
            />
          </LeftInfoRow>
          <LeftInfoRow>
            <InfoText>Od: </InfoText>
            <input
              maxLength={10}
              type="text"
              style={{ flexWrap: 'wrap', width: '50%' }}
              defaultValue={item.start_date}
              onChange={(e) => {
                item.start_date = e.target.value;
              }}
              placeholder="Data rozpoczęcia, DD/MM/YYYY"
            />
          </LeftInfoRow>
          <LeftInfoRow>
            <InfoText>Opis: </InfoText>
            <input
              maxLength={255}
              type="text"
              style={{ flexWrap: 'wrap', width: '90%' }}
              defaultValue={item.description}
              onChange={(e) => {
                item.description = e.target.value;
              }}
              placeholder="Wpisz opis"
            />
          </LeftInfoRow>
          <div style={{ alignItems: 'center' }}>
            <button
              onClick={() => handleDeleteEducationElement(item.id)}
              style={{ alignContent: 'center', marginBottom: 3, marginTop: 3 }}
            >
              Usuń
            </button>
          </div>
        </div>
      );
    });

    const handleAddEducationClick = () => {
      const newId = getIdOfLastEducationElement() + 1;
      handleAddEducationElement(newId, '', '', '', '', '', '', '');
    };

    const getIdOfLastEducationElement = () => {
      if (educationList.length > 0) {
        return educationList[educationList.length - 1].id;
      }
      console.log("return in getIDOfLastEducationElement ");
      return 0;
    };

    return (
      <>
      {list}
        <div style={{ alignItems: 'center' }}>
          <button
            onClick={handleAddEducationClick}
            style={{ alignContent: 'center', marginBottom: 3, marginTop: 3 }}
          >
            Dodaj
          </button>
        </div>
      </>
    );
  }
  function ListLinks(){
    return(    <>
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

    const list = experienceList.map((item) => {
      return (
        <div key={item.id}>
          <LeftInfoRow>
          <InfoText>Nazwa firmy: </InfoText>
            <input
              maxLength={50}
              type="text"
              style={{ flexWrap: 'wrap', width: '82%' }}
              defaultValue={item.comapny}
              onChange={(e) => {
                item.comapny = e.target.value;
              }}
              placeholder="Wpisz nazwę firmy"
            />
          </LeftInfoRow>
          <LeftInfoRow>
          <InfoText>Miasto: </InfoText>
            <input
              maxLength={100}
              type="text"
              style={{ flexWrap: 'wrap', width: '83%' }}
              defaultValue={item.city}
              onChange={(e) => {
                item.city = e.target.value;
              }}
              placeholder="Wpisz miasto"
            />
          </LeftInfoRow>
          <LeftInfoRow>
            <InfoText>Stanowisko: </InfoText>
            <input
              maxLength={50}
              type="text"
              style={{ flexWrap: 'wrap', width: '69%' }}
              defaultValue={item.position}
              onChange={(e) => {
                item.position = e.target.value;
              }}
              placeholder="Wpisz stanowisko"
            />
          </LeftInfoRow>
          <LeftInfoRow>
            <InfoText>Od: </InfoText>
            <input
              maxLength={10}
              type="text"
              style={{ flexWrap: 'wrap', width: '50%' }}
              defaultValue={item.start_date}
              onChange={(e) => {
                item.start_date = e.target.value;
              }}
              placeholder="Datę rozpoczęcia, DD/MM/YYYY"
            />
          </LeftInfoRow>
          <LeftInfoRow>
            <InfoText>Do: </InfoText>
            <input
              maxLength={10}
              type="text"
              style={{ flexWrap: 'wrap', width: '50%' }}
              defaultValue={item.end_date}
              onChange={(e) => {
                item.end_date = e.target.value;
              }}
              placeholder="Datę zakończenia, DD/MM/YYYY"
            />
          </LeftInfoRow>
          
          <div style={{ alignItems: 'center' }}>
            <button
              onClick={() => handleDeleteExperienceElement(item.id)}
              style={{ alignContent: 'center', marginBottom: 3, marginTop: 3 }}
            >
              Usuń
            </button>
          </div>
        </div>
      );
    });

    const handleAddExperienceClick = () => {
      const newId = getIdOfLastExperienceElement() + 1;
      handleAddExperienceElement(newId, '', '', '', '', '', '');
    };

    const getIdOfLastExperienceElement = () => {
      if (experienceList.length > 0) {
        return experienceList[experienceList.length - 1].id;
      }
      console.log("return in getIdOfLastExperienceElement ");
      return 0;
    };

    return (
      <>
      {list}
        <div style={{ alignItems: 'center' }}>
          <button
            onClick={handleAddExperienceClick}
            style={{ alignContent: 'center', marginBottom: 3, marginTop: 3 }}
          >
            Dodaj
          </button>
        </div>
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


  const hanldeDate = (e) => {
    setDate(e.target.value);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      let max = `${Math.min(e.target.scrollHeight + 20, limitHeight)}px`;
      setHeight(max);
    }
    else {
      e.target.style.height = 'inherit';
      e.target.style.height = `${Math.min(e.target.scrollHeight, limitHeight)}px`;
      setHeight(e.target.style.height);
    }

  };

  window.addEventListener('resize', showButton);

  const reviewCount = 15;
  const ratingCount = 2.5; //pobrac z bazy
  return (
   
    <>
      <Modal showModal={showModalTags} setShowModal={setShowModalTags} tags={tags} setTags={setTags}/>
      <ModalSkills showModal={showModalSkills} setShowModal={setShowModalSkills} skills={skills} setSkills={setSkills}/>
      <ModalLinks showModal={showModalLinks} setShowModal={setShowModalLinks} dribble={dribble} setDribble={setDribble} facebook={facebook} setFacebook={setFacebook} instagram={instagram} setInstagram={setInstagram} 
      linkedin={linkedin} setLinkedin={setLinkedin} pinterest={pinterest} setPinterest={setPinterest} twitter={twitter} setTwitter={setTwitter} website={website} setWebsite={setWebsite}/>
      <ModalLanguages showModal={showModalLanguages} setShowModal={setShowModalLanguages} languages={languages} setLanguages={setLanguages}/>
      {artistProfile ? (
        <ProfileWrapper>
          <TopSection>
            <LeftWrapper>
              <ProfileImage><Image src="/assets/test.jpg" alt="Profile" /></ProfileImage>
              <ButtonEdit style={{ marginTop: "5px", marginBottom: "10px" }}>Zmień zdjęcie(ND)</ButtonEdit>
              <div>
              <InputInfoText>Imię:</InputInfoText>
                  <NameText value={name} onChange={(e) => setName(e.target.value)} />
                  <InputInfoText>Nazwisko:</InputInfoText>
                  <NameText value={surname} onChange={(e) => setSurname(e.target.value)} />
              </div>
              {/* zostaw to znikanie, bo dziwnie się świecą te elementy */}
              <InputInfoText>Poziom doświadczenia:</InputInfoText>
              {(!showModalTags && !showModalLinks && !showModalSkills && !showModalLanguages) && <Dropdown className='dropdown-level'
              options={availableLevels} onChange={(e) => setLevel(e)} value={level} placeHolder={level}
              />}
            </LeftWrapper>
            <RightWrapper>
              <InputInfoText >O mnie: </InputInfoText>
              <AboutMe hag={height} value={bio} onChange={(e) => setBio(e.target.value)} maxLength={maxChars} onKeyDown={(e) => handleKeyDown(e)} ></AboutMe>
              <Nawias>({chars}/{maxChars})</Nawias>
              <LineForm />
              <Left>
                <InfoRow >
                  <LeftColumn >
                    <LeftInfoRow>
                      <InputInfoText>Członek od:</InputInfoText>
                      <SmallInput value={date} onChange={(e) => hanldeDate(e)} />
                    </LeftInfoRow>
                    <LeftInfoRow>
                      <InputInfoText>Miejscowość:</InputInfoText>
                      {/* zostaw to znikanie, bo dziwnie się świecą te elementy */}
                      {(!showModalTags && !showModalLinks && !showModalSkills && !showModalLanguages) && <Dropdown
                       options={availableLocations} onChange={(e) => setLocation(e)} value={location} placeHolder={location}
                    /> }
                    </LeftInfoRow>
                    <LeftInfoRow>
                      <InputInfoText>Prace:</InputInfoText>
                      <DataText>20</DataText>
                    </LeftInfoRow>
                    
                    <LineForm />
                    <LeftInfoRow>
                      <HeaderText>Tags:</HeaderText>
                      
                    </LeftInfoRow>
                    <BubbleWrap>
                      <ListTags />
                    </BubbleWrap>
                    <LineForm />
                    <LeftInfoRow>
                      <HeaderText>Skills:</HeaderText>
                    </LeftInfoRow>
                    <BubbleWrap>
                      <ListSkills />
                    </BubbleWrap>
                    <LineForm />
                    <LeftInfoRow>
                      <HeaderText>Języki:</HeaderText>
                    </LeftInfoRow>
                    <BubbleWrap>
                      <ListLanguages />
                    </BubbleWrap>
                    <LineForm />
                    <LeftInfoRow>
                      <HeaderText>Media społecznościowe:</HeaderText>
                      <ButtonEdit onClick={openModalLinks}>Edytuj</ButtonEdit>
                    </LeftInfoRow>
                    <ListLinks />
                  </LeftColumn>
                  <RightColumn>
                    <LeftInfoRow>
                      <HeaderText>Wykształcenie:</HeaderText>
                    </LeftInfoRow>
                    <ListEducation />
                    <LeftInfoRow>
                      <HeaderText>Doświadczenie:</HeaderText>
                    </LeftInfoRow>
                    <ListExperience />
                  </RightColumn>
                </InfoRow>
              </Left>
            </RightWrapper>
          </TopSection>
          {/* zostaw to znikanie, bo dziwnie się świecą te elementy */}
          {(!showModalTags && !showModalLinks && !showModalSkills && !showModalLanguages) && <ButtonSave onClick={updateArtistProfile}>ZAPISZ</ButtonSave>}
          <DownSection>

          </DownSection>
        </ProfileWrapper>
      ) : (<LoadingPage />)}
    </>

  );


};

export default EditUserPageMobile;