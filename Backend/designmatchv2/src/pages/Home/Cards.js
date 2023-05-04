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
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [getData, setGetData] = useState(null);

  // useMemo tworzy elementy JSX tylko raz
  const citiesData = useMemo(() => ({
    method: 'get',
    maxBodyLength: 5000,
    url: "/api/artist/getAvailableCities",
    headers: {},
  }), []);

  const tagsData = useMemo(() => ({
    method: 'get',
    maxBodyLength: 5000,
    url: "/api/artist/getAvailableTags",
    headers: {},
  }), []);

  const categoriesData = useMemo(() => ({
    method: 'get',
    maxBodyLength: 5000,
    url: "/api/artist/getAvailableCategories",
    headers: {},
  }), []);

  // /artist/filter?level=&location=&category=&language=&subcategory=&tags=&page=0&size=10
  const filteredData = useMemo(() => ({
    method: 'get',
    maxBodyLength: Infinity,
    url: "/artist/filter?level=&location=&category=&language=&subcategory=&tags=&page=0&size=10",
  }), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citiesResponse, tagsResponse, categoriesResponse, filteredResponse] = await Promise.all([
          axios.request(citiesData),
          axios.request(tagsData),
          axios.request(categoriesData),
          axios.request(filteredData),
        ]);
        setCities(citiesResponse.data);
        setTags(tagsResponse.data);
        setCategories(categoriesResponse.data);
        setFiltered(filteredResponse.data);
        setGetData("Get all date");
      } catch (err) {
        console.error(err);
        setGetData(null);
      }
    };

    fetchData();
  }, [citiesData, tagsData, categoriesData, filteredData]);

  const cityOptions = useMemo(() => (
    cities.map((city, index) => (
      <StyledOption key={index} value={city}>{city}</StyledOption>
    ))
  ), [cities]);

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

  return (
    <Cards2>
      <FilterLabel>
        <TitleText>Filtruj</TitleText>
        <FilterWrapper>
          <SubtitleText>Skąd?</SubtitleText>
          <StyledSelect>
            <StyledOption value="">Wybierz lokalizację</StyledOption>
            {cityOptions}
          </StyledSelect>
          <SubtitleText>Języki</SubtitleText>
          <Input placeholder='Wpisz język' />
          <SubtitleText>Tagi</SubtitleText>
          <StyledSelect>
            <StyledOption value="">Wybierz tag</StyledOption>
            {tagOptions}
          </StyledSelect>
          <SubtitleText>Kategorie</SubtitleText>
          <StyledSelect>
            <StyledOption value="">Wybierz kategorię</StyledOption>
            {categoryOptions}
          </StyledSelect>
          {/* {categoryCheckBoxes} */}
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
            {/* <CardItem avatar="/assets/cards/person1.jpg"
              background="rgba(99, 81, 44"
              name="Maryla"
              surname="Kwarc"
              rating={3.5}
              ratingCount={12}
              project1="/assets/cards/design1.jpg"
              project2="/assets/cards/design2.png"
              project3="/assets/cards/design3.jpg"
              project4="/assets/cards/design4.png"
              city="Toruń"
              job="Graphic Designer, Illustrator, Branding, Packaging" />
            <CardItem avatar="/assets/cards/person2.jpg"
              background="rgba(137, 26, 145"
              name="Nicolette"
              surname="Félix"
              rating={4}
              ratingCount={10}
              project1="/assets/cards/design5.jpg"
              project2="/assets/cards/design6.jpg"
              project3="/assets/cards/design7.jpg"
              project4="/assets/cards/design8.jpg"
              city="Paris"
              job="Graphic Designer, Illustrator, Branding, Packaging" />
            <CardItem avatar="/assets/cards/person1.jpg"
              background="rgba(23, 15, 117"
              name="Maryla"
              surname="Kwarc"
              rating={3.5}
              ratingCount={15}
              project1="/assets/cards/design1.jpg"
              project2="/assets/cards/design2.png"
              project3="/assets/cards/design3.jpg"
              project4="/assets/cards/design4.png"
              city="Toruń"
              job="Graphic Designer, Illustrator, Branding, Packaging" />
            <CardItem avatar="/assets/cards/person1.jpg"
              background="rgb(140, 91, 18"
              name="Maryla"
              surname="Kwarc"
              rating={3.5}
              ratingCount={15}
              project1="/assets/cards/design1.jpg"
              project2="/assets/cards/design2.png"
              project3="/assets/cards/design3.jpg"
              project4="/assets/cards/design4.png"
              city="Toruń"
              country="PL"
              job="Graphic Designer, Illustrator, Branding, Packaging" />
            <CardItem avatar="/assets/cards/person1.jpg"
              background="rgba(12, 244, 122"
              name="Maryla"
              surname="Kwarc"
              rating={3.5}
              ratingCount={15}
              project1="/assets/cards/design1.jpg"
              project2="/assets/cards/design2.png"
              project3="/assets/cards/design3.jpg"
              project4="/assets/cards/design4.png"
              city="Toruń"
              job="Graphic Designer, Illustrator, Branding, Packaging" /> */}
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