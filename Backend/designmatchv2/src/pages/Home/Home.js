import React, {useEffect} from 'react';
import {
  AllPage,
  HeroContainer,
} from './Styles';
import { useAuth } from '../../components/Auth';
import Cards from './Cards';


const Home = () => {
  const authApi = useAuth();

  useEffect(() => {
    if(localStorage.length > 0){
      let myKey = localStorage.getItem("storageLogin");
      console.log(myKey);
      authApi.login("Michal", "pssw");
    }
    else console.log("pusty localStorage");
  }, []);


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