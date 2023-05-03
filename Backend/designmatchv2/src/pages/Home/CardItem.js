import React from 'react';
import { Link } from 'react-router-dom';
import { CardAvatar, CardLabel, CategoryText, CityText, DetailedInfoContainer, FirstPhoto, FourthPhoto, NameText, ProjectPhoto, RatingText, SecondPhoto, SimpleInfoContainer, ThirdPhoto } from './CardsElement';
import { Rating } from 'react-simple-star-rating';

function CardItem(props) {
  return (
    <CardLabel style={{backgroundColor: props.background + ", 0.1)"}}>
      <SimpleInfoContainer>
        <CardAvatar src={props.avatar} />
        <NameText>{props.name} {props.surname}</NameText>
        <div>
        <Rating initialValue={props.rating} readonly={true} precision={0.5} size="1.6rem"/>
        <RatingText>({props.ratingCount} opinii)</RatingText>
        </div>
      </SimpleInfoContainer>
      <DetailedInfoContainer>
        <CityText>{props.city}, PL</CityText>
        <CategoryText>
          info
        </CategoryText>
      </DetailedInfoContainer>
      <FirstPhoto src={props.project1}/>
      <SecondPhoto src={props.project2}/>
      <ThirdPhoto src={props.project3}/>
      <FourthPhoto src={props.project4}/>
    </CardLabel>
  );
}

export default CardItem;