import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
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
  TitleText,
} from "./CardsElement";
import { Rating } from "react-simple-star-rating";
import { useNavigate } from "react-router-dom";
import { ModalBackground, ModalImageContainer, ModalInfo, ModalWrapper, PortfolioImage } from '../Profile/ProfileElements';
import axios from '../../api/axios';

function CardItem(props) {

  const navigate = useNavigate();

  const handleGoProfile = () => {

    let userNick = props.username;
    console.log(userNick);
    navigate(`/other-account/${userNick}`, {
      state: {
        argument: userNick,
      }
    });
  };

  return (
    <>
      <CardLabel>
        <SimpleInfoContainer>
          <CardAvatar onClick={handleGoProfile}
            src={'/public/api/artist/getProfileImageByUsername/' + props.username}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/cards/defaultavatar.png";
            }}
          />
          <LevelText>{props.level}</LevelText>
          <NameText>
            {props.name} {props.surname}
          </NameText>
        </SimpleInfoContainer>
        <DetailedInfoContainer>
          <CityText>{props.city}, PL</CityText>
          <CategoryHeaderText>Umiejętności:</CategoryHeaderText>
          <CategoryText>
            {props.skills[0]}
            <br />
            {props.skills[1]}
            <br />
            {props.skills[2]}
            <br />
            {props.skills[3]}
          </CategoryText>
        </DetailedInfoContainer>
        <FirstPhoto
          src={'/public/api/artist/getPortfolioImage/' + props.username + '/' + 1}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/assets/cards/background1.png";
          }}
        />
        <SecondPhoto
          src={'/public/api/artist/getPortfolioImage/' + props.username + '/' + 2}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/assets/cards/background2.png";
          }}
        />
        <ThirdPhoto
          src={'/public/api/artist/getPortfolioImage/' + props.username + '/' + 3}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/assets/cards/background3.png";
          }}
        />
        <FourthPhoto
          src={'/public/api/artist/getPortfolioImage/' + props.username + '/' + 4}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/assets/cards/background4.png";
          }}
        />
      </CardLabel>
    </>
  );
}

export default CardItem;
