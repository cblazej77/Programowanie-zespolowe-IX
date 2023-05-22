import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { TitleText } from '../Home/CardsElement';
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
import { FiBriefcase, FiClock, FiMapPin } from 'react-icons/fi';

const { darkLight, gray1 } = COLORS;

const CompanyPage = () => {
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

  const maxChars = 300;

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
        const decodeResponse = await axios.request('/auth/decodeToken', {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('storageLogin'),
            'Content-Type': 'application/json',
          },
        });

        const companyResponse = await axios.request({
          url: '/public/api/company/getProfileByUsername/' + decodeResponse.data.username,
        });

        const commissionResponse = await axios.request({
          url: '/public/api/commission/getAllCommissionFirmByUsername/' + decodeResponse.data.username,
          headers: {},
        });

        const [citiesResponse, tagsResponse, categoriesResponse, languagesResponse, levelsResponse] = await Promise.all(
          [
            axios.request(citiesData),
            axios.request(tagsData),
            axios.request(categoriesData),
            axios.request(languagesData),
            axios.request(levelsData),
          ],
        );
        setUsername(decodeResponse.data.username);
        setCommisionsData(commissionResponse.data);
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

  const openModalEditClick = () => {
    setShowModalEdit(true);
  };

  const closeModalEditClick = () => {
    setShowModalEdit(false);
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

  const ModalEdit = ({ showModalEdit }) => {
    const [modalEditData, setModalEditData] = useState({
      client_username: username,
      title: "",
      description: "",
      deadline: "",
      level: [],
      rate: 0,
      location: [],
      tags: [],
      skills: [],
      languages: [],
    });

    const [skillsT, setSkillsT] = useState([])
    const [languagesT, setLanguagesT] = useState(languages);
    const [tagsT, setTagsT] = useState(tags);
    const [locationT, setLocationT] = useState(cities);
    const [levelT, setLevelT] = useState(levels);

    useEffect(() => {
      if (categories && categories.categories && Array.isArray(categories.categories)) {
        const updatedSkills = categories.categories.flatMap(category =>
          category.skills.map(subcategory => ({
            value: subcategory,
            label: subcategory,
          }))
        );
        setSkillsT(updatedSkills);
      }
    }, []);

    const handleAddCommission = useCallback(async () => {
      console.log(modalEditData);
      try {
        const response = await axios.post(
          `/api/commission/create`,
          modalEditData,
          {
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('storageLogin'),
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('Data saved successfully!');
        console.log(response.data);
      } catch (err) {
        console.error('Error while saving data:', err);
      }
      console.log(modalEditData);
      setShowModalEdit(false);
    },);

    return (
      <>
        {showModalEdit && (
          <ModalBackground onClick={closeModalEditClick}>
            <ModalWrapper onClick={handleWrapperClick}>
              <ModalInfo>Tytuł zlecenia:</ModalInfo>
              <TitleInput
                value={modalEditData.title}
                onChange={({ target }) =>
                  setModalEditData({ ...modalEditData, title: target.value, })}
              />
              <ModalInfo>Opis:</ModalInfo>
              <AboutInput
                maxLength={maxChars}
                value={modalEditData.description}
                onChange={({ target }) =>
                  setModalEditData({ ...modalEditData, description: target.value, })}
              />
              {modalEditData.description && (<Bracket>({Math.min(modalEditData.description.length, maxChars)}/{maxChars})</Bracket>)}
              <LineForm />
              <ModalBottomSection>
                <ModalColumn>
                  <ModalEditRow>
                    <ModalInfo>Stawka:</ModalInfo>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                      <NumberInput
                        type="number"
                        maxLength={12}
                        value={modalEditData.rate}
                        onChange={({ target }) =>
                          setModalEditData({ ...modalEditData, rate: parseInt(target.value) })}
                      />
                      <ModalData style={{ color: darkLight }}>PLN</ModalData>
                    </div>
                  </ModalEditRow>
                  <ModalEditRow>
                    <ModalInfo>Czas wykonania:</ModalInfo>
                    <NumberInput
                      placeHolder={'dzień/miesiąc/rok'}
                      value={modalEditData.deadline}
                      onChange={({ target }) =>
                        setModalEditData({ ...modalEditData, deadline: target.value, })}
                    />
                  </ModalEditRow>
                  <ModalEditRow>
                    <ModalInfo>Poziom zaawansowania:</ModalInfo>
                    <BubblesDropDown
                      options={levelT}
                      value={modalEditData.level}
                      placeHolder={modalEditData.level}
                      onChange={(e) => {
                        const selectedLevel = e.value;
                        setLevelT((prevLevel) => prevLevel.filter((lev) => lev !== selectedLevel));
                        setModalEditData((prevData) => ({
                          ...prevData,
                          level: [...prevData.level, selectedLevel]
                        }));
                      }}
                    />
                  </ModalEditRow>
                  <ModalBubbleContainer>
                    {Array.isArray(modalEditData.level) && modalEditData.level.map((lev, index) => (
                      <CommisionEditBubble
                        key={index}
                        onClick={() => {
                          setLevelT((prevLevel) => [...prevLevel, lev]);
                          setModalEditData((prevData) => ({
                            ...prevData,
                            level: prevData.level.filter((s) => s !== lev)
                          }));
                        }}
                      >
                        {lev}
                      </CommisionEditBubble>
                    ))}
                  </ModalBubbleContainer>
                  <ModalEditRow>
                    <ModalInfo>Lokalizacja:</ModalInfo>
                    <BubblesDropDown
                      options={locationT}
                      value={modalEditData.location}
                      placeHolder={modalEditData.location}
                      onChange={(e) => {
                        const selectedLocation = e.value;
                        setLocationT((prevLocation) => prevLocation.filter((loc) => loc !== selectedLocation));
                        setModalEditData((prevData) => ({
                          ...prevData,
                          location: [...prevData.location, selectedLocation]
                        }));
                      }}
                    />
                  </ModalEditRow>
                  <ModalBubbleContainer>
                    {Array.isArray(modalEditData.location) && modalEditData.location.map((loc, index) => (
                      <CommisionEditBubble
                        key={index}
                        onClick={() => {
                          setLocationT((prevLocation) => [...prevLocation, loc]);
                          setModalEditData((prevData) => ({
                            ...prevData,
                            location: prevData.location.filter((s) => s !== loc)
                          }));
                        }}
                      >
                        {loc}
                      </CommisionEditBubble>
                    ))}
                  </ModalBubbleContainer>
                  <LineForm />
                </ModalColumn>
                <ModalColumn>
                  <ModalEditRow>
                    <ModalInfo>Wymagane umiejętności:</ModalInfo>
                    <BubblesDropDown
                      options={skillsT}
                      value={modalEditData.skills}
                      placeholder='Wybierz'
                      onChange={(e) => {
                        const selectedSkill = e.value;
                        setSkillsT((prevSkills) => prevSkills.filter((ski) => ski.value !== selectedSkill));
                        setModalEditData((prevData) => ({
                          ...prevData,
                          skills: [...prevData.skills, selectedSkill]
                        }));
                      }}
                    />
                  </ModalEditRow>
                  <ModalBubbleContainer>
                    {Array.isArray(modalEditData.skills) && modalEditData.skills.map((skill, index) => (
                      <CommisionEditBubble
                        key={index}
                        onClick={() => {
                          setSkillsT((prevSkills) => [...prevSkills, skill]);
                          setModalEditData((prevData) => ({
                            ...prevData,
                            skills: prevData.skills.filter((s) => s !== skill)
                          }));
                        }}
                      >
                        {skill}
                      </CommisionEditBubble>
                    ))}
                  </ModalBubbleContainer>
                  <LineForm />
                  <ModalEditRow>
                    <ModalInfo>Wymagane języki:</ModalInfo>
                    <BubblesDropDown
                      options={languagesT}
                      value={modalEditData.languages}
                      placeHolder={modalEditData.languages}
                      onChange={(e) => {
                        const selectedLanguage = e.value;
                        setLanguagesT((prevLanguages) => prevLanguages.filter((lang) => lang !== selectedLanguage));
                        setModalEditData((prevData) => ({
                          ...prevData,
                          languages: [...prevData.languages, selectedLanguage]
                        }));
                      }}
                    />
                  </ModalEditRow>
                  <ModalBubbleContainer>
                    {Array.isArray(modalEditData.languages) && modalEditData.languages.map((language, index) => (
                      <CommisionEditBubble
                        key={index}
                        onClick={() => {
                          setLanguagesT((prevLanguages) => [...prevLanguages, language]);
                          setModalEditData((prevData) => ({
                            ...prevData,
                            languages: prevData.languages.filter((s) => s !== language)
                          }));
                        }}
                      >
                        {language}
                      </CommisionEditBubble>
                    ))}
                  </ModalBubbleContainer>
                  <LineForm />
                  <ModalEditRow>
                    <ModalInfo>Tagi:</ModalInfo>
                    <BubblesDropDown
                      options={tagsT}
                      value={modalEditData.tags}
                      placeHolder={modalEditData.tags}
                      onChange={(e) => {
                        const selectedTag = e.value;
                        setTagsT((prevTags) => prevTags.filter((ta) => ta !== selectedTag));
                        setModalEditData((prevData) => ({
                          ...prevData,
                          tags: [...prevData.tags, selectedTag]
                        }));
                      }}
                    />
                  </ModalEditRow>
                  <ModalBubbleContainer>
                    {Array.isArray(modalEditData.tags) && modalEditData.tags.map((tag, index) => (
                      <CommisionEditBubble
                        key={index}
                        onClick={() => {
                          setTagsT((prevTags) => [...prevTags, tag]);
                          setModalEditData((prevData) => ({
                            ...prevData,
                            tags: prevData.tags.filter((s) => s !== tag)
                          }));
                        }}
                      >
                        {tag}
                      </CommisionEditBubble>
                    ))}
                  </ModalBubbleContainer>
                  <LineForm />
                  <Button
                    onClick={handleAddCommission}>
                    Dodaj
                  </Button>
                </ModalColumn>
              </ModalBottomSection>
            </ModalWrapper>
          </ModalBackground>
        )}
      </>
    );
  };

  const Modal = ({ showModal }) => {
    const handleDeleteCommission = useCallback(async () => {
      console.log(modalData.id);
      try {
        const response = await axios.delete(
          `/public/api/deleteCommission/` + modalData.id,
          {
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('storageLogin'),
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('Data saved successfully!');
        console.log(response.data);
      } catch (err) {
        console.error('Error while saving data:', err);
      }
      setShowModal(false);
    },);

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
                  <Button onClick={handleDeleteCommission} style={{ marginTop: '4rem' }}>Usuń zlecenie</Button>
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
              <ProfileImage><Image src="/assets/test.jpg" alt="Profile" /></ProfileImage>
              <NameText>{get.name}</NameText>
              <LineForm />
              <Button onClick={() => openModalEditClick()}>
                Dodaj zlecenie
              </Button>
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
                id={com.id}
              />
            ))}
          </DownSection>
        </ProfileWrapper>) : (<LoadingPage />)}
      <ModalEdit showModalEdit={showModalEdit} />
      <Modal showModal={showModal} data={modalData} />

    </>
  );
};

export default CompanyPage;
