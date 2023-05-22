import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import LoadingPage from '../LoadingPage';
import {
    Image,
    ModalBackground,
    ModalImageContainer,
    ModalInfo,
    ModalWrapper,
    PortfolioImage,
    PortfolioImageContainer,
    PortfolioWrapper
} from './ProfileElements';
import { TitleText } from '../Home/CardsElement';

const Portfolio = (props) => {
    const [entries, setEntries] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const portfolioEntriesResponse = await axios.request(
                    '/public/api/artist/getPortfolioEntries/' + props.username,
                    {
                        params: { page: 0, size: 10 },
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

    const PhotoModal = ({ showModal }) => {
        return (
            <>
                {showModal && (
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
                <PortfolioWrapper>
                    {entries.map((entry, index) => (
                        <PortfolioImageContainer key={index} onClick={() => ModalOpen(entry)}>
                            <PortfolioImage src={'/public/api/artist/getPortfolioImage/' + props.username + '/' + entry.id} />
                        </PortfolioImageContainer>
                    ))}
                    <PhotoModal showModal={showModal} />
                </PortfolioWrapper>
            ) : (
                <>
                    Wczytywanie . . .
                </>
            )}
        </>
    );
};

export default Portfolio;