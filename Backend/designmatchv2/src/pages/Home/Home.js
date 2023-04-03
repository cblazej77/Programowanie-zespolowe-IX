import React from 'react';
import {
  AllPage,
  HeroContainer,
  SortLabel,
  SortButton,
  Sort
} from './Styles';

import Cards from './Cards';


const Home = () => {
  return (
    <>
    <AllPage>
        <HeroContainer>
          <Cards />
        </HeroContainer>

    </AllPage>
    </>
    
  )
};

export default Home;

/*
      <HeroBG>
      </HeroBG>
      
      <HeroContent>
        <HeroItems>
          <HeroH1>Strona główna</HeroH1>
          <HeroH2>Testowa...</HeroH2>
                  </HeroItems>
      </HeroContent>
      */