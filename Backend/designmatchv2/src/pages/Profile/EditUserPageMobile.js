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


import {
  RightColumn,
  InfoRow,
  LeftColumn as LeftColumn,
  Left,
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
  BubbleWrap,
  Bubble,
  ModalBubble,
  BoldLabel,
  DataTextArena,

} from './ProfileElements'
import LoadingPage from '../LoadingPage';

import {
  CheckBoxLabel,
  CheckBoxWrapper,
  CheckBox,
  CategoryText,
  StyledOptgroup,
  StyledOption,
  StyledSelect,
} from '../Home/CardsElement';

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
  zIndex: 10;
`

const Nawias = styled.p`
  border: 1px solid red;
  margin: auto 15px auto auto;
`
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
  &:hover{
    transition: 0.3s;
    border: 2px solid rgba(0, 0, 0, 0.5);
    box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.4);
  }
`
const ButtonEdit = styled.button`
  padding: 5px 20px;
  color: black;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 2px 6px 0 rgba(0, 0, 0, 0.4);
  }
  &:hover{
    transition: 0.3s;
    border: 2px solid rgba(0, 0, 0, 0.5);
    box-shadow: 0px 4px 12px 0 rgba(0, 0, 0, 0.4);
  }
`

//UserName/UserInfo/MessageButton
const EditUserPageMobile = () => {
  const [get, setGet] = useState(null);//przechwytuje dane i na ich podstawie loguje
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
  const [userInfo, setUserInfo] = useState('');
  const [artistProfile, setArtistProfile] = useState('');
  const [artistShortProfile, setArtistShortProfile] = useState('');
  const [availableTags, setAvailableTags] = useState('');
  const [availableCategories, setAvailableCategories] = useState('');
  const [availableSkills, setAvailableSkills] = useState([]);
  const [availableLevels, setAvailableLevels] = useState([]);
  const [availableLocations, setAvailableLocations] = useState([]);
  const [tagsModalVisible, setTagsModalVisible] = useState(false);
  const [skillsModalVisible, setSkillsModalVisible] = useState(false);
  const [availableLanguages, setAvailableLanguages] = useState('');
  //Hooks for temp values when editing
  const [bio, setBio] = useState('');
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
  const [tagsToAdd, setTagsToAdd] = useState([]);
  const [skillsToAdd, setSkillsToAdd] = useState([]);
  const [languagesToAdd, setLanguagesToAdd] = useState([]);


  //edycja profilu
  //const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("20.07.2001");//nie siciaga z bazy
  const [education, setEducation] = useState([]);
  const job = "";

  const [click, setClick] = useState(true);
  const [button, setButton] = useState(true);

  //checkbox
  const [categories, setCategories] = useState([]);
  const [choseLevel, setChoseLevel] = useState([]);

  //do textarea
  const limitHeight = 60;
  const maxChars = 300;
  const chars = bio.length;


  //pobieranie danych z backendu
  const profileName = 'jakub1';
  let levelsData = {
    method: 'get',
    maxBodyLength: Infinity,
    url: "/api/artist/getAvailableLevels",
    headers: {}
  };

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
  let citiesData = {
    method: 'get',
    maxBodyLength: Infinity,
    url: "/api/artist/getAvailableCities",
    headers: {}
  };
  let tagsData = {
    method: 'get',
    maxBodyLength: Infinity,
    url: "/api/artist/getAvailableTags",
    headers: {}
  };
  let categoriesData = {
    method: 'get',
    maxBodyLength: Infinity,
    url: "/api/artist/getAvailableCategories",
    headers: {}
  };
  let languageData = {
    method: 'get',
    maxBodyLength: Infinity,
    url: "/api/artist/getAvailableLanguages",
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

  function handleAddTagsToAdd(tag) {
    setTagsToAdd((tagsToAdd) => [...tagsToAdd, tag]);
  }

  function handleDeleteTagsToAdd(tag) {
    setTagsToAdd(tagsToAdd.filter((t) => t !== tag));
  }

  function handleAddSkillsToAdd(skill) {
    setSkillsToAdd((skillsToAdd) => [...skillsToAdd, skill]);
  }

  function handleDeleteSkillsToAdd(skill) {
    setSkillsToAdd(skillsToAdd.filter((s) => s !== skill));
  }

  function handleAddAvailableSkills(skill) {
    setAvailableSkills((availableSkills) => [...availableSkills, skill]);
  }

  function handleDeleteAvailableSkills(skill) {
    setAvailableSkills(availableSkills.filter((s) => s !== skill));
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

  function handleClearTagsToAdd() {
    setTagsToAdd([]);
  }

  function handleClearSkillsToAdd() {
    setSkillsToAdd([]);
  }

  function handleClearAvailableSkills() {
    setAvailableSkills([]);
  }

  function clear() {
    handleClearEducationList();
    handleClearExperienceList();
    handleClearLanguages();
    handleClearSkills();
    handleClearTags();
    handleClearTagsToAdd();
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

  async function updateArtistProfile() {
    educationList.map((item) => {
      delete item.id;
    });
    experienceList.map((item) => {
      delete item.id;
    });
    const response = await axios.put(
      getArtistProfileURL,
      {
        bio: bio,
        level: level,
        location: location,
        skills: skills,
        tags: tags,
        languages: languages,
        education: educationList,
        experience: experienceList,
        website: website,
        facebook: facebook,
        linkedin: linkedin,
        instagram: instagram,
        dribble: dribble,
        pinterest: pinterest,
        twitter: twitter,
      },
      {
        params: { username: profileName },
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      },
    );
  }

  // function getIdOfLastEducationElement() {
  //   let l = educationList.length;
  //   if (l > 0) {
  //     return educationList.at(l - 1).id;
  //   } else return -1;
  // }

  // function getIdOfLastExperienceElement() {
  //   let l = experienceList.length;
  //   if (l > 0) {
  //     return experienceList.at(l - 1).id;
  //   } else return -1;
  // }

  function addTags() {
    for (let i = 0; i < tagsToAdd.length; ++i) {
      handleAddTag(tagsToAdd[i]);
    }
    handleClearTagsToAdd();
  }

  function addSkills() {
    for (let i = 0; i < skillsToAdd.length; ++i) {
      handleAddSkill(skillsToAdd[i]);
    }
    handleClearSkillsToAdd();
  }


  //    const categoriesData = useMemo(() => ({
  //     method: 'get',
  //     maxBodyLength: 5000,
  //     url: "/api/artist/getAvailableCategories",
  //     headers: {},
  //   }), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //odebranie wszsytkich wyników
        const levelsResponse = await axios.request(levelsData);
        const artistResponse = await axios.request(profileData);
        const artistShortResponse = await axios.request(profileNameData);
        const citiesResponse = await axios.request(citiesData);
        const categoriesResponse = await axios.request(categoriesData);
        const tagsResponse = await axios.request(tagsData);
        const languageResponse = await axios.request(languageData);
        setGet(artistResponse.data);
        setArtistProfile(artistResponse.data);
        setArtistShortProfile(artistShortResponse.data);
        setAvailableTags(tagsResponse.data);//
        setAvailableLevels(levelsResponse.data);
        setAvailableLanguages(languageResponse);
        setAvailableLocations(citiesResponse.data);
        handleClearAvailableSkills();
        setAvailableCategories(categoriesResponse.data);
        // setChoseLevel(level.data);
        setName(artistShortProfile.firstname);
        setSurname(artistShortProfile.lastname);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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

  useEffect(() => {
    if (availableCategories) {
      for (let i = 0; i < availableCategories.categories.length; ++i) {
        for (let j = 0; j < availableCategories.categories[i].subcategories.length; ++j) {
          handleAddAvailableSkills(availableCategories.categories[i].subcategories[j]);
        }
      }
    }
  }, [availableCategories]);

  function ListAvailableTags() {
    if (availableTags) {
      const available = availableTags.filter((item) => {
        if (!tags.includes(item)) return item;
      });
      const list = available.map((item, id) => (
        <button onClick={() => {
          if (tagsToAdd.includes(item)) { handleDeleteTagsToAdd(item) }
          else { handleAddTagsToAdd(item) }
        }} key={id}>
          <ModalBubble
            key={id}
            checked={tagsToAdd.includes(item)}
          >
            <label style={{ marginRight: 2 }}>{item}</label>
          </ModalBubble>
        </button>
      ));
      return <>{list}</>;
    } else {
      return <label>pusto ListAvalileTags</label>;
    }
  }
  function ListTags() {
    if (tags) {
      const list = tags.map((item, id) => (

        <Bubble key={id} >
          <label>{item}</label>
          <button onClick={() => handleDeleteTag(item)}>
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
            <button onClick={openModalSkills}>
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
            <button onClick={openModalLanguages}>
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
              maxLength={7}
              type="text"
              style={{ flexWrap: 'wrap', width: '50%' }}
              defaultValue={item.start_date}
              onChange={(e) => {
                item.start_date = e.target.value;
              }}
              placeholder="Wpisz datę rozpoczęcia w formacie MM/YYYY"
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
              maxLength={7}
              type="text"
              style={{ flexWrap: 'wrap', width: '50%' }}
              defaultValue={item.start_date}
              onChange={(e) => {
                item.start_date = e.target.value;
              }}
              placeholder="Wpisz datę rozpoczęcia"
            />
          </LeftInfoRow>
          <LeftInfoRow>
            <InfoText>Do: </InfoText>
            <input
              maxLength={7}
              type="text"
              style={{ flexWrap: 'wrap', width: '50%' }}
              defaultValue={item.end_date}
              onChange={(e) => {
                item.end_date = e.target.value;
              }}
              placeholder="Wpisz datę zakończenia w formacie MM/YYYY"
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


  const levelOptions = useMemo(() => (
    availableLevels.map((availableLevels, index) => (
      <StyledOption key={index} value={availableLevels}>{availableLevels}</StyledOption>
    ))
  ), [availableLevels]);

  //wysweitlanie dropbox


  //wyswietlanie checkboxow
  const categoryCheckBoxes = useMemo(() => {
    if (!Array.isArray(categories.categories)) {
      return null;
    }
    return categories.categories.map((category, indexC) => (
      <>
        <CategoryText key={indexC}>{category.name}</CategoryText>
        {category.subcategories.map((subcategory, indexS) => (
          <CheckBoxWrapper key={indexS}>
            <CheckBox type='checkbox' id={subcategory} />
            <CheckBoxLabel htmlFor={subcategory} />
            <JobText>{subcategory}</JobText>
          </CheckBoxWrapper>
        ))}

      </>
    ));
  });


  const handleClick = () => setClick(!click);

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
  const Default = "...";
  return (

    <>
      <Modal showModal={showModalTags} setShowModal={setShowModalTags} tags={tags} setTags={setTags} />
      <ModalSkills showModal={showModalSkills} setShowModal={setShowModalSkills} skills={skills} setSkills={setSkills} />
      <ModalLinks showModal={showModalLinks} setShowModal={setShowModalLinks} />
      <ModalLanguages showModal={showModalLanguages} setShowModal={setShowModalLanguages} languages={languages} setLanguages={setLanguages} />
      {artistProfile ? (
        <ProfileWrapper>
          <TopSection>
            <LeftWrapper>
              <ProfileImage><Image src="/assets/test.jpg" alt="Profile" /></ProfileImage>
              <ButtonEdit style={{ marginTop: "5px", marginBottom: "10px" }}>Zmień zdjęcie(ND)</ButtonEdit>
              <div>
                <NameText value={name} onChange={(e) => setName(e.target.value)} />
                <NameText value={surname} onChange={(e) => setSurname(e.target.value)} />
              </div>
              {/* zostaw to znikanie, bo dziwnie się świecą te elementy */}
              {(!showModalTags && !showModalLinks && !showModalSkills && !showModalLanguages) && <Dropdown
                options={availableLevels} onChange={(e) => setLevel(e)} value={level} placeHolder={level}
              />}
              {/* zostaw to znikanie, bo dziwnie się świecą te elementy */}
              {(!showModalTags && !showModalLinks && !showModalSkills && !showModalLanguages) && <RatingWrapper>
                <Rating
                  size="3.5vh"
                  readonly={true}
                  allowFraction={true}
                  initialValue={ratingCount}
                />
                <JobText>({reviewCount} opinii)</JobText>
              </RatingWrapper>}
              <LineForm />
              <Button>Napisz wiadomość</Button>
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <SmallButton >Napisz opinię</SmallButton>
                <SmallButton > Obserwuj</SmallButton>
              </div>
            </LeftWrapper>
            <RightWrapper>
              <BoldLabel >O mnie: </BoldLabel>
              <AboutMe hag={height} value={artistProfile.bio} onChange={(e) => setBio(e.target.value)} maxLength={maxChars} onKeyDown={(e) => handleKeyDown(e)} ></AboutMe>
              <Nawias>({chars}/{maxChars})</Nawias>
              <LineForm />
              <Left>
                <InfoRow >
                  <LeftColumn >
                    <LeftInfoRow>
                      <InfoText>Członek od:</InfoText>
                      <DataTextArena value={date} onChange={(e) => hanldeDate(e)} />
                    </LeftInfoRow>
                    <LeftInfoRow>
                      <InfoText>Miejscowość:</InfoText>
                      {/* zostaw to znikanie, bo dziwnie się świecą te elementy */}
                      {(!showModalTags && !showModalLinks && !showModalSkills && !showModalLanguages) && <Dropdown
                        options={availableLocations} onChange={(e) => setLocation(e)} value={location} placeHolder={location}
                      />}
                    </LeftInfoRow>
                    <LeftInfoRow>
                      <InfoText>Prace:</InfoText>
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
                    {/* <BubbleWrap>
                      {get.languages?.length ? (
                        get.languages.map((language, index) => <Bubble key={index}>{language}</Bubble>)
                      ) : <Bubble>{Default}</Bubble>}
                    </BubbleWrap> */}
                    <LineForm />
                    <LeftInfoRow>
                      <HeaderText>Linki:</HeaderText>
                      <ButtonEdit onClick={openModalLinks}>Edytuj</ButtonEdit>
                    </LeftInfoRow>
                    <BubbleWrap>
                      <Bubble>{get.website}</Bubble>
                      <Bubble>{get.linkedin}</Bubble>
                    </BubbleWrap>
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
          {(!showModalTags && !showModalLinks && !showModalSkills && !showModalLanguages) && <ButtonSave>ZAPISZ</ButtonSave>}
          <DownSection>

          </DownSection>
        </ProfileWrapper>
      ) : (<LoadingPage />)}
    </>

  );


};

export default EditUserPageMobile;
