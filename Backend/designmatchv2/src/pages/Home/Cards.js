import React from 'react'
import CardItem from './CardItem'
import './Cards.css'
import {
  Cards2,
  CardsContainer,
  FilterWrapper,
  Sort,
  Sort2,
  SortButton,
  SortLabel,
  SubtitleText,
  TitleText,
  CheckBoxLabel,
  CheckBoxWrapper,
  CheckBox,
  JobText,
  Input,
  FilterLabel,
  CardsLabel,
  SortLayout,
  SortContainer,
  SortOption,
  CardsWrapper
} from './CardsElement'

function Cards() {
  return (
    <Cards2>
      <FilterLabel>
        <TitleText>Filtruj</TitleText>
        <FilterWrapper>
          <SubtitleText>Rodzaj pracy</SubtitleText>
          <CheckBoxWrapper>
            <CheckBox type='checkbox' id='praca1' />
            <CheckBoxLabel htmlFor='praca1' />
            <JobText>Praca 1</JobText>
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
          <Input placeholder='Wpisz lokalizację' />
          <SubtitleText>Języki</SubtitleText>
          <Input placeholder='Wpisz język' />
        </FilterWrapper>
      </FilterLabel>
      <SortLayout>
        <SortContainer>
          <SortOption value="">Sortuj po...</SortOption>
          <SortOption value="1">najlepsza ocena</SortOption>
          <SortOption value="2">najwięcej prac</SortOption>
          <SortOption value="3">ostatnia aktywność</SortOption>
        </SortContainer>
      </SortLayout>

      <CardsWrapper>
        <CardItem avatar="/assets/cards/person1.jpg"
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
      </CardsWrapper>

      {/*
      <Sort2>
        <SortLabel>Filtruj </SortLabel>
        <SortButton>filtr1 </SortButton>
        <SortButton>filtr2 </SortButton>
        <SortButton>filtr3 </SortButton>
      </Sort2>
      <Sort>
        <SortLabel>Sortuj przez: </SortLabel>
        <SortButton>Sortowanie </SortButton>
      </Sort>
      <CardsContainer>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src="/assets/cards/AiPicture.jpg"
              text="Opis..."
              label="IA"

            />
            <CardItem
              src="/assets/cards/duck.png"
              text="Obrazek przedstawia kaczkę która jest żółta"
              label="Pixel"

            />

            <CardItem
              src="/assets/cards/AiPicture.jpg"
              text="Obraz wygenerowany przez sztuczną inteligencję"
              label="IAv4"

            />

          </ul>
          <ul className='cards__items'>
            <CardItem
              src="/assets/cards/AiPicture.jpg"
              text="Text jest tutaj"
              label="IA"

            />
            <CardItem
              src="/assets/cards/duck.png"
              text="pixel duck"
              label="Pixel"

            />

            <CardItem
              src="/assets/cards/AiPicture.jpg"
              text="City"
              label="IAv7"

            />

          </ul>
        </div>
      </CardsContainer>
  */}
    </Cards2>
  )
}

export default Cards;