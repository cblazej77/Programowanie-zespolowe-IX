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
  const [entries, setEntries] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const ModalOpen = (data) => {
    console.log(data);
    setModalData(data);
    setShowModal(true);
  };

  const ModalClose = () => {
    setShowModal(false);
  };

  const handleWrapperClick = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const portfolioEntriesResponse = await axios.request(
          '/public/api/artist/getPortfolioEntries/' + props.username,
          {
            params: { page: 0, size: 4 },
            headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          },
        );

        setEntries(portfolioEntriesResponse.data.content);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleGoProfile = () => {
    let userNick = props.username;
    console.log(userNick);
    navigate(`/other-account/${userNick}`, {
      state: {
        argument: userNick,
      }
    });
  };

  const handleImageError = (e, fallbackSrc) => {
    if (e.target.src !== fallbackSrc) {
      e.target.src = fallbackSrc;
      e.target.style.cursor = "default";
    }
  };

  const PhotoModal = ({ showModal }) => {
    return (
      <>
        {showModal && modalData && (
          <ModalBackground onClick={ModalClose}>
            <ModalWrapper onClick={handleWrapperClick}>
              <TitleText>{modalData.name}</TitleText>
              <ModalInfo>{modalData.description}</ModalInfo>
              <ModalImageContainer>
                <PortfolioImage src={'/public/api/artist/getPortfolioImage/' + props.username + '/' + modalData.id} />
              </ModalImageContainer>
            </ModalWrapper>
          </ModalBackground>
        )}
      </>
    );
  };

  return (
    <>
      {entries ? (
        <CardLabel>
          <SimpleInfoContainer>
            <CardAvatar onClick={handleGoProfile}
              src={'/public/api/artist/getProfileImageByUsername/' + props.username}
              onError={(e) => handleImageError(e, "/assets/cards/defaultavatar.png")}
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
            onClick={() => ModalOpen(entries[0])}
            src={'/public/api/artist/getPortfolioImage/' + props.username + '/' + 1}
            onError={(e) => handleImageError(e, "/assets/cards/background1.png")}
          />
          <SecondPhoto
            onClick={() => ModalOpen(entries[1])}
            src={'/public/api/artist/getPortfolioImage/' + props.username + '/' + 2}
            onError={(e) => handleImageError(e, "/assets/cards/background2.png")}
          />
          <ThirdPhoto
            onClick={() => ModalOpen(entries[2])}
            src={'/public/api/artist/getPortfolioImage/' + props.username + '/' + 3}
            onError={(e) => handleImageError(e, "/assets/cards/background3.png")}
          />
          <FourthPhoto
            onClick={() => ModalOpen(entries[3])}
            src={'/public/api/artist/getPortfolioImage/' + props.username + '/' + 4}
            onError={(e) => handleImageError(e, "/assets/cards/background4.png")}
          />
          <PhotoModal showModal={showModal} />
        </CardLabel>
      ) : (
        <>
        </>
      )}
    </>
  );
}

export default CardItem;
