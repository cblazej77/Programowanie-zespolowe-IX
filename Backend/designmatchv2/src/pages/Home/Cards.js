import React, { useEffect, useState } from 'react'
import CardItem from './CardItem'
import {
  Cards2,
  FilterWrapper,
  SubtitleText,
  TitleText,
  CheckBoxLabel,
  CheckBoxWrapper,
  CheckBox,
  JobText,
  Input,
  FilterLabel,
  StyledSelect,
  StyledOption,
  CardsWrapper,
  StyledOptgroup,
  CategoryText,
  RightLabel,
  TopSection,
  Button,
} from './CardsElement'
import axios from '../../api/axios';
import { useMemo } from 'react';
import LoadingPage from '../LoadingPage';

const Cards = () => {
  const [cities, setCities] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [getData, setGetData] = useState(null);
  const [selectLanguage, setSelectLanguage] = useState("");
  const [selectCity, setSelectCity] = useState("");
  const [selectTag, setSelectTag] = useState("");
  const [selectCategories, setSelectCategories] = useState("");
  const urlFilter = process.env.REACT_APP_GET_ARTIST_FILTER;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citiesResponse, languagesResponse, tagsResponse, categoriesResponse] = await Promise.all([
          axios.request({
            method: 'get',
            maxBodyLength: 5000,
            url: "/api/artist/getAvailableCities",
            headers: {},
          }),
          axios.request({
            method: 'get',
            maxBodyLength: 5000,
            url: "/api/artist/getAvailableLanguages",
            headers: {},
          }),
          axios.request({
            method: 'get',
            maxBodyLength: 5000,
            url: "/api/artist/getAvailableTags",
            headers: {},
          }),
          axios.request({
            method: 'get',
            maxBodyLength: 5000,
            url: "/api/artist/getAvailableCategories",
            headers: {},
          }),
        ]);
        setCities(citiesResponse.data);
        setLanguages(languagesResponse.data);
        setTags(tagsResponse.data);
        setCategories(categoriesResponse.data);
        setGetData("Get all date");
      } catch (err) {
        console.error(err);
        setGetData(null);
      }
    };

    fetchData();
  }, []);

  const cityOptions = useMemo(() => (
    cities.map((city, index) => {
      const normalizedValue = city.toUpperCase().replace(/[ĄąĆćĘęŁłŃńÓóŚśŹźŻż]/g, match => {
        const replacements = {
          'Ą': 'A',
          'ą': 'a',
          'Ć': 'C',
          'ć': 'c',
          'Ę': 'E',
          'ę': 'e',
          'Ł': 'L',
          'ł': 'l',
          'Ń': 'N',
          'ń': 'n',
          'Ó': 'O',
          'ó': 'o',
          'Ś': 'S',
          'ś': 's',
          'Ź': 'Z',
          'ź': 'z',
          'Ż': 'Z',
          'ż': 'z',
        };
        return replacements[match] || match;
      });
      const value = (normalizedValue === "ZDALNIE") ? 'REMOTE' : normalizedValue;
      return (
        <StyledOption key={index} value={value}>{city}</StyledOption>
      );
    })
  ), [cities]);

  const languageOptions = useMemo(() => (
    languages.map((language, index) => (
      <StyledOption key={index} value={language}>{language}</StyledOption>
    ))
  ), [tags]);

  const tagOptions = useMemo(() => (
    tags.map((tag, index) => (
      <StyledOption key={index} value={tag}>{tag}</StyledOption>
    ))
  ), [tags]);

  // niżej są 2 opcje wyświetlania filtrowania kategorii
  // tutaj jest dropbox
  const categoryOptions = useMemo(() => {
    if (!Array.isArray(categories.categories)) {
      return null;
    }

    return categories.categories.map((category, indexC) => (
      <StyledOptgroup label={category.name} key={indexC} >
        {category.subcategories.map((subcategory, indexS) => (
          <StyledOption key={indexS} value={subcategory}>{subcategory}</StyledOption>
        ))}
      </StyledOptgroup>
    ));
  });

  // a tutaj są checkboxy
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
    const FilteredResponse = async () => {
      let level = [];
      let location = [];
      location.push({
        selectCity: selectCity
      });
      const response = await axios.put(
        '/artist/filte',
        {
          level: [],
          location: location,
          skills: {selectCategories},
          tags: selectTag,
        },
        {
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        },
        )
        .catch((error) => {
          console.log("FiltredError  ", error);
        });
        setFiltered(response.data);
        console.log("Filtred:     ", response);
    }


  //console.log(filtered.content[0].firstname);

  const filteredCards = useMemo(() => {
    if (!Array.isArray(filtered.content)) {
      return null;
    }

    return filtered.content.map((filter, indexF) => (
      <CardItem key={indexF}
        avatar="/assets/cards/person1.jpg"
        name={filter.firstname}
        surname={filter.lastname}
        level={filter.level}
        rating={3.5}
        ratingCount={12}
        city={filter.city}
        skills={filter.skills}
        project1="/assets/cards/design1.jpg"
        project2="/assets/cards/design2.png"
        project3="/assets/cards/design3.jpg"
        project4="/assets/cards/design4.png"
      />
    ));
  });

  const handleCityChange = (event) => {
    setSelectCity(event.target.value);
    FilteredResponse();
    //setFilterURL(`/artist/filter?level=&location=${event.target.value}&category=&language=&subcategory=&tags=${selectTag}&page=0&size=10`);
  };

  const handleTagChange = (event) => {
    setSelectTag(event.target.value);
    FilteredResponse();
    //setFilterURL(`/artist/filter?level=&location=${selectCity}&category=&language=&subcategory=&tags=${event.target.value}&page=0&size=10`);
  };

  const handleLanguageChange = (event) => {
    
    setSelectLanguage(event.target.value);
    FilteredResponse();
  }

  const handleCategoriesChange = (event) => {
    
    setSelectCategories(event.target.value);
    FilteredResponse();
  }

  return (
    <Cards2>
      <FilterLabel>
        <TitleText>Filtruj</TitleText>
        <FilterWrapper>
          <SubtitleText>Skąd?</SubtitleText>
          <StyledSelect onChange={handleCityChange}>
            <StyledOption value="">Wybierz lokalizację</StyledOption>
            {cityOptions}
          </StyledSelect>
          <SubtitleText>Języki</SubtitleText>
          <StyledSelect onChange={handleLanguageChange}>
            <StyledOption value="">Wybierz język</StyledOption>
            {languageOptions}
          </StyledSelect>
          <SubtitleText>Tagi</SubtitleText>
          <StyledSelect onChange={handleTagChange}>
            <StyledOption value="">Wybierz tag</StyledOption>
            {tagOptions}
          </StyledSelect>
          <SubtitleText>Kategorie</SubtitleText>
          <StyledSelect onChange={handleCategoriesChange}>
            <StyledOption value="">Wybierz kategorię</StyledOption>
            {categoryOptions}
          </StyledSelect>
          {categoryCheckBoxes}
        </FilterWrapper>
      </FilterLabel>

      {getData ? (
        <RightLabel>
          <TopSection>
            <Button>Filtruj</Button>
            <StyledSelect>
              <StyledOption value="">Sortuj po...</StyledOption>
              <StyledOption value="1">najlepsza ocena</StyledOption>
              <StyledOption value="2">najwięcej prac</StyledOption>
              <StyledOption value="3">ostatnia aktywność</StyledOption>
            </StyledSelect>
          </TopSection>
          <CardsWrapper>
            {filteredCards}
          </CardsWrapper>
        </RightLabel>

      ) : (
        <LoadingPage /> //test tego albo
        /*
        <CardsWrapper> //tego nie wiem co lepsze
          <CardItem />
          <CardItem />
          <CardItem />
        </CardsWrapper>
        */
      )}
    </Cards2>
  )
}

export default Cards;