import React, { useState, useEffect, useMemo } from 'react';
import { TitleText } from '../Home/CardsElement';
import { COLORS } from '../../components/Colors';
import axios from '../../api/axios';
import {
  AboutMe,
  BoldLabel,
  Bracket,
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
  StyledDropDown,
  TopSection
} from './ProfileElements';
import {
  AboutInput,
  CommisionBottom,
  CommisionBubble,
  CommisionCard,
  CommisionText,
  CommisionTitle,
  CommisionTitleContainer,
  CommisionTop,
  InfoInputText,
  LevelBubble,
  ModalEditRow,
  NumberInput,
  StakeText,
  TitleInput
} from '../Home/CommisionsElements';

const { darkLight } = COLORS;




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
  const [checkLoading, setCheckLoading] = useState(null);
  // const [languagesT, setLanguagesT] = useState([]);
  const [CommisionsData, setCommisionsData] = useState([
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
      skills: [
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
      skills: [
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
      skills: [
        "logo",
        "Aobe Illustrator",
      ],
      languages: [
        "Polski",
        "Angielski",
      ],
    },
  ]);
  const maxChars = 300;
  let chars = 0;
  const companyName = 'Acme%20Corporation';

  const citiesData = useMemo(
    () => ({
      method: 'get',
      maxBodyLength: 5000,
      url: '/api/artist/getAvailableCities',
      headers: {},
    }),
    [],
  );

  const tagsData = useMemo(
    () => ({
      method: 'get',
      maxBodyLength: 5000,
      url: '/api/artist/getAvailableTags',
      headers: {},
    }),
    [],
  );

  const languagesData = useMemo(
    () => ({
      method: 'get',
      maxBodyLength: 5000,
      url: '/api/artist/getAvailableLanguages',
      headers: {},
    }),
    [],
  );

  const levelsData = useMemo(
    () => ({
      method: 'get',
      maxBodyLength: 5000,
      url: '/api/artist/getAvailableLevels',
      headers: {},
    }),
    [],
  );

  const categoriesData = useMemo(
    () => ({
      method: 'get',
      maxBodyLength: 5000,
      url: '/api/artist/getAvailableCategories',
      headers: {},
    }),
    [],
  );

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
        const [companyResponse, citiesResponse, tagsResponse, categoriesResponse, languagesResponse, levelsResponse] = await Promise.all(
          [
            axios.request(companyData),
            axios.request(citiesData),
            axios.request(tagsData),
            axios.request(categoriesData),
            axios.request(languagesData),
            axios.request(levelsData),
          ],
        );
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
  }, [companyData, citiesData, tagsData, categoriesData, languagesData, levelsData]);

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
      title: "",
      description: "",
      stake: "",
      deadline: "",
      level: "",
      location: "",
      tags: [],
      skills: [],
      languages: [],
    });

    const [skillsT, setSkillsT] = useState([])
    const [languagesT, setLanguagesT] = useState(languages);
    const [tagsT, setTagsT] = useState(tags);

    useEffect(() => {
      if (categories && categories.categories && Array.isArray(categories.categories)) {
        const updatedSkills = categories.categories.flatMap(category =>
          category.subcategories.map(subcategory => ({
            value: subcategory,
            label: subcategory,
          }))
        );
        console.log(updatedSkills);
        setSkillsT(updatedSkills);
      }
    }, []);

    const handleAddCommission = () => {
      console.log(modalEditData);
      setCommisionsData((prevData) => [...prevData, modalEditData]);
      setShowModalEdit(false);
    };

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
                        value={modalEditData.stake}
                        onChange={({ target }) =>
                          setModalEditData({ ...modalEditData, stake: target.value, })}
                      />
                      <ModalData style={{ color: darkLight }}>PLN</ModalData>
                    </div>
                  </ModalEditRow>
                  <ModalRow>
                    <ModalInfo>Czas wykonania:</ModalInfo>
                    <NumberInput
                      value={modalEditData.deadline}
                      onChange={({ target }) =>
                        setModalEditData({ ...modalEditData, deadline: target.value, })}
                    />
                  </ModalRow>
                  <ModalRow>
                    <ModalInfo>Poziom zaawansowania:</ModalInfo>
                    <StyledDropDown
                      className='dropdown-level'
                      options={levels}
                      value={modalEditData.level}
                      placeHolder={modalEditData.level}
                      onChange={(e) =>
                        setModalEditData({ ...modalEditData, level: e.value, })}
                    />
                  </ModalRow>
                  <ModalRow>
                    <ModalInfo>Lokalizacja:</ModalInfo>
                    <StyledDropDown
                      className='dropdown-location'
                      options={cities}
                      value={modalEditData.location}
                      placeHolder={modalEditData.location}
                      onChange={(e) =>
                        setModalEditData({ ...modalEditData, location: e.value, })}
                    />
                  </ModalRow>
                  <LineForm />
                </ModalColumn>
                <ModalColumn>
                  <div style={{ display: 'flex' }}>
                    <ModalInfo>Wymagane umiejętności:</ModalInfo>
                    <StyledDropDown
                      className='dropdown-skills'
                      options={skillsT}
                      value={modalEditData.skills}
                      placeHolder={modalEditData.skills}
                      onChange={(e) => {
                        const selectedSkill = e.value;
                        setSkillsT((prevSkills) => prevSkills.filter((ski) => ski.value !== selectedSkill));
                        setModalEditData((prevData) => ({
                          ...prevData,
                          skills: [...prevData.skills, selectedSkill]
                        }));
                      }}
                    />
                  </div>
                  <ModalBubbleContainer>
                    {Array.isArray(modalEditData.skills) && modalEditData.skills.map((skill, index) => (
                      <CommisionBubble
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
                      </CommisionBubble>
                    ))}
                  </ModalBubbleContainer>
                  <LineForm />
                  <div style={{ display: 'flex' }}>
                    <ModalInfo>Wymagane języki:</ModalInfo>
                    <StyledDropDown
                      className='dropdown-languages'
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
                  </div>
                  <ModalBubbleContainer>
                    {Array.isArray(modalEditData.languages) && modalEditData.languages.map((language, index) => (
                      <CommisionBubble
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
                      </CommisionBubble>
                    ))}
                  </ModalBubbleContainer>
                  <LineForm />
                  <div style={{ display: 'flex' }}>
                    <ModalInfo>Tagi:</ModalInfo>
                    <StyledDropDown
                      className='dropdown-tags'
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
                  </div>
                  <ModalBubbleContainer>
                    {Array.isArray(modalEditData.tags) && modalEditData.tags.map((tag, index) => (
                      <CommisionBubble
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
                      </CommisionBubble>
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
          <StakeText>{props.stake} PLN</StakeText>
        </CommisionTop>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          margin: '0.4rem 0',
        }}>
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
              stake={com.stake}
              deadline={com.deadline}
              level={com.level}
              location={com.location}
              languages={com.languages}
              tags={com.tags}
              skills={com.skills}
            />
          ))}
        </DownSection>
      </ProfileWrapper>
      <ModalEdit showModalEdit={showModalEdit} />
      <Modal showModal={showModal} data={modalData} />
    </>
  );
};

export default CompanyPage;
