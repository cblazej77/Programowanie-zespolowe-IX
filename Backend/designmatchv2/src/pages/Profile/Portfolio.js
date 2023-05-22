import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import LoadingPage from '../LoadingPage';
import { Image, PortfolioImage, PortfolioImageContainer, PortfolioWrapper } from './ProfileElements';

const Portfolio = (props) => {
    const [entries, setEntries] = useState([]);

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

    return (
        <>
            {entries ? (
                <PortfolioWrapper>
                    {entries.map((entry, index) => (
                        <PortfolioImageContainer key={index}>
                            <PortfolioImage src={'/public/api/artist/getPortfolioImage/' + props.username + '/' + entry.id} />
                        </PortfolioImageContainer>
                    ))}
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
