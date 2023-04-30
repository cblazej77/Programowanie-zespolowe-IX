import React from 'react';
import {
  AllPage,
  HeroContainer,
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