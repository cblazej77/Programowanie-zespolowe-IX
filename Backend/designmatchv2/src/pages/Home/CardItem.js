import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter, Route,Routes,  Navigate } from 'react-router-dom';
import {
  CardAvatar,
  CardLabel,
  CategoryHeaderText,
  CategoryText,
  CityText,
  DetailedInfoContainer,
  FirstPhoto,
  FourthPhoto,
  LevelText,
  NameText,
  RatingText,
  SecondPhoto,
  SimpleInfoContainer,
  ThirdPhoto,
} from "./CardsElement";
import { Rating } from "react-simple-star-rating";
import { useNavigate } from "react-router-dom";

function CardItem(props) {
  const navigate = useNavigate();

  const handleGoProfile = () => {
    
    let userNick = props.username;
    console.log(userNick);
      navigate(`/other-account/${userNick}`, { state: {
        argument: userNick,
      }});
  };

  return (
    <>
    <CardLabel>
      <SimpleInfoContainer>
        <CardAvatar src={props?.avatar} onClick ={handleGoProfile}/>
        <LevelText>{props?.level}</LevelText>
        <NameText>
          {props?.name} {props?.surname}
        </NameText>
        <div>
          <Rating
            initialValue={props?.rating}
            readonly={true}
            precision={0.5}
            size="1.6rem"
          />
          <RatingText>({props?.ratingCount} opinii)</RatingText>
        </div>
      </SimpleInfoContainer>
      <DetailedInfoContainer>
        <CityText>{props?.city}, PL</CityText>
        <CategoryHeaderText>Umiejętności:</CategoryHeaderText>
        <CategoryText>
          {props?.skills[0]}
          <br />
          {props?.skills[1]}
          <br />
          {props?.skills[2]}
          <br />
          {props?.skills[3]}
        </CategoryText>
      </DetailedInfoContainer>
      <FirstPhoto src={props?.project1} />
      <SecondPhoto src={props?.project2} />
      <ThirdPhoto src={props?.project3} />
      <FourthPhoto src={props?.project4} />
    </CardLabel>
    </>
         
  );
}

export default CardItem;
