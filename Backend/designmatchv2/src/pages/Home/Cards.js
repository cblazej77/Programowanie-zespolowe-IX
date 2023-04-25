import React, { useEffect, useState } from 'react'
import CardItem from './CardItem'
import './Cards.css'
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
  SortLayout,
  StyledSelect,
  StyledOption,
  CardsWrapper
} from './CardsElement'
import axios from '../../api/axios';

const Cards = () => {
  const [cities, setCities] = useState(null);
  const [tags, setTags] = useState(null);

  const citiesData = {
    method: 'get',
    maxBodyLength: 5000,
    url: "/api/artist/getAvailableCities",
    headers: {}
  };

  const tagsData = {
    method: 'get',
    maxBodyLength: 5000,
    url: "/api/artist/getAvailableTags",
    headers: {}
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const result = await axios.request(citiesData);
        setCities(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchTags = async () => {
      try {
        const result = await axios.request(tagsData);
        setTags(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (cities && tags) {
      const citiesList = cities.map((city, index) => (
        <StyledOption key={index} value={city}>{city}</StyledOption>
      ));
      const tagsList = tags.map((tag, index) => (
        <StyledOption key={index} value={tag}>{tag}</StyledOption>
      ));
      setCities(citiesList);
      setTags(tagsList);
    }

    fetchCities();
    fetchTags();
  }, []);

    

  return (
    <>{cities && tags ? (
      <Cards2>
        <FilterLabel>
          <TitleText>Filtruj</TitleText>
          <FilterWrapper>
            <SubtitleText>Rodzaj pracy</SubtitleText>
            <CheckBoxWrapper>
              <CheckBox type='checkbox' id='praca1' />
              <CheckBoxLabel htmlFor='praca1' />
              <JobText>{cities[0]}</JobText>
            </CheckBoxWrapper>
            <CheckBoxWrapper>
              <CheckBox type='checkbox' id='praca2' />
              <CheckBoxLabel htmlFor='praca2' />
              <JobText>Praca 2</JobText>
            </CheckBoxWrapper>
            <CheckBoxWrapper>
              <CheckBox type='checkbox' id='praca3' />
              <CheckBoxLabel htmlFor='praca3' />
              <JobText>Praca 3</JobText>
            </CheckBoxWrapper>
            <CheckBoxWrapper>
              <CheckBox type='checkbox' id='praca4' />
              <CheckBoxLabel htmlFor='praca4' />
              <JobText>Praca 4</JobText>
            </CheckBoxWrapper>
            <SubtitleText>Skąd?</SubtitleText>
            <StyledSelect>
              <StyledOption value="">Wybierz lokalizację</StyledOption>
              {cities.map((city, index) => (
                <StyledOption key={index} value={city}>{cities[index]}</StyledOption>
              ))}
            </StyledSelect>
            <SubtitleText>Języki</SubtitleText>
            <Input placeholder='Wpisz język' />
            <SubtitleText>Tagi</SubtitleText>
            <StyledSelect>
              <StyledOption value="">Wybierz tag</StyledOption>
              {tags.map((tag, index) => (
                <StyledOption key={index} value={tag}>{tags[index]}</StyledOption>
              ))}
            </StyledSelect>
          </FilterWrapper>
        </FilterLabel>
        <SortLayout>
          <StyledSelect>
            <StyledOption value="">Sortuj po...</StyledOption>
            <StyledOption value="1">najlepsza ocena</StyledOption>
            <StyledOption value="2">najwięcej prac</StyledOption>
            <StyledOption value="3">ostatnia aktywność</StyledOption>
          </StyledSelect>
        </SortLayout>

        <CardsWrapper>
          <CardItem avatar="/assets/cards/person1.jpg"
            background="rgba(99, 81, 44"
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
          <CardItem avatar="/assets/cards/person2.jpg"
            background="rgba(137, 26, 145"
            name="Nicolette"
            surname="Félix"
            rating={3}
            ratingCount={10}
            project1="/assets/cards/design5.jpg"
            project2="/assets/cards/design6.jpg"
            project3="/assets/cards/design7.jpg"
            project4="/assets/cards/design8.jpg"
            city="Paris"
            country="FR"
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
            country="PL"
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
            country="PL"
            job="Graphic Designer, Illustrator, Branding, Packaging" />
        </CardsWrapper>
      </Cards2>
    ) : (<div>Loading...</div>)}
    </>
  )
}

export default Cards;