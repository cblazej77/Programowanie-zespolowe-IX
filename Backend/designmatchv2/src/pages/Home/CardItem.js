import React from 'react';
import { Link } from 'react-router-dom';
import { CardAvatar, CardLabel, CategoryText, DetailedInfoContainer, FirstPhoto, NameText, ProjectPhoto, RatingText, SimpleInfoContainer } from './CardsElement';
import { Rating } from 'react-simple-star-rating';

function CardItem(props) {
  return (
    <CardLabel style={{backgroundColor: props.background + ", 0.1)"}}>
      <SimpleInfoContainer>
        <CardAvatar src={props.avatar} />
        <NameText>{props.name} {props.surname}</NameText>
        <div>
        <Rating initialValue={props.rating} readonly={true} precision={0.5} size="1.6vw"/>
        <RatingText>({props.ratingCount} opinii)</RatingText>
        </div>
      </SimpleInfoContainer>
      <DetailedInfoContainer>
        <CategoryText>
          info
        </CategoryText>
      </DetailedInfoContainer>
      <FirstPhoto src={props.project1}/>
      <ProjectPhoto src={props.project2}/>
      <ProjectPhoto src={props.project3}/>
      <ProjectPhoto src={props.project4}/>
    </CardLabel>
  );
}

export default CardItem;