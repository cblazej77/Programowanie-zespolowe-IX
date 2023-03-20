import React from 'react';
import {
  HeroContainer,
  HeroBG,
  HeroContent,
  HeroItems,
  HeroH1,
  HeroH2
} from '../../components/Styles';

import Cards from './Cards';


const Home = () => {
  return (
    <HeroContainer>
          <Cards />
    </HeroContainer>
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