import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import axios from '../api/axios';
import { xIcon } from '../assets/img/svg/SvgIcons';
import { FACEBOOK_URL, OWN_WEBSITE_URL, INSTAGRAM_URL, TWITTER_URL, LINKEDIN_URL, PINTEREST_URL } from './Regex';
import PropTypes from "prop-types";

    const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  position: relative;
  z-index: 10;
  border-radius: 10px;
      overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 0.5vw;
      }
    
      &::-webkit-scrollbar-track {
        background: grey;
      }
    
      &::-webkit-scrollbar-thumb {
        background: #888;
      }
    
      &::-webkit-scrollbar-thumb:hover {
        background: red;
      }
`;


const ModalContent = styled.div`
  justify-content: center;
  align-items: center;
  margin-top: 125px;
  margin-left: 100px;
  line-height: 1.8;
  color: #141414;
`;

const ButtonClose = styled.button`
cursor: pointer;
position: absolute;
top: 20px;
right: 20px;
width: 32px;
height: 32px;
padding: 0;
z-index: 10;
`;

const Label = styled.a`
margin-right: 10px;
outline: none;
text-decoration: none;
color: black;
`
const DivLink = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
`
const Input = styled.input`
      width: ${({width}) => width};
      border: ${({check}) => check ? '2px' : '1px' } solid ${({check}) => check ? 'red' : 'black' };
      height: 30px;
      margin-bottom: 10px; 
      margin-right: 33%;
`

const InputWebsite = styled(Input)`
  margin-right: 0px;
`
const ModalLinks = ({showModal, setShowModal, dribble, setDribble, facebook, setFacebook, instagram, linkedin, pinterest, twitter, website, setInstagram, setLinkedin, setPinterest, setTwitter, setWebsite}) => {
    const modalRef = useRef();
    
    const [link1, setLink1] = useState(facebook);
    const [link2, setLink2] = useState(instagram);
    const [link3, setLink3] = useState(linkedin);
    const [link4, setLink4] = useState(pinterest);
    const [link5, setLink5] = useState(twitter);
    const [link, setLink] = useState(website);

    const [check, setCheck] = useState(false);
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3, setCheck3] = useState(false);
    const [check4, setCheck4] = useState(false);
    const [check5, setCheck5] = useState(false);

const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };
  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        console.log('I pressed');
      }
    },
    [setShowModal, showModal]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );


  const checkValidFacebook = (e) => {
    setLink1(e.target.value);
    const regex = new RegExp(FACEBOOK_URL); 
    if(e.target.value.match(regex)  || e.target.value.length == "0") {
      setCheck1(false);
      setFacebook(e.target.value);
    }
    else{
      setCheck1(true);
      setFacebook("");
    }
  }
    const checkValidInstagram = (e) => {
      setLink2(e.target.value);
      const regex = new RegExp(INSTAGRAM_URL); 
      if(e.target.value.match(regex) || e.target.value.length == "0"){
        setCheck2(false);
        setInstagram(e.target.value);
      }
      else{
        setCheck2(true);
        setInstagram("");
      }
    }
  const checkValidLinekedin = (e) => {
  setLink3(e.target.value);
  const regex = new RegExp(LINKEDIN_URL); 
    if(e.target.value.match(regex) || e.target.value.length == "0"){
      setCheck3(false);
      setLinkedin(e.target.value);
    }
    else{
      setCheck3(true);
      setLinkedin("");
    }
  }
const checkValidPinterest = (e) => {
   setLink4(e.target.value);
   const regex = new RegExp(PINTEREST_URL); 
  if(e.target.value.match(regex) || e.target.value.length == "0"){
    setCheck4(false);
    setPinterest(e.target.value);
  }
  else{
    setCheck4(true);
    setPinterest("");
  }
}
const checkValidTwitter = (e) => {
  setLink5(e.target.value);
  const regex = new RegExp(TWITTER_URL); 
  if(e.target.value.match(regex)  || e.target.value.length == "0"){
    setCheck5(false);
    setTwitter(e.target.value);
  }
  else{
    setCheck5(true);
    setTwitter("");
  }
}

const checkValidWebsite = (e) => {
    setLink(e.target.value);
    const regex = new RegExp(OWN_WEBSITE_URL); 
    if( (e.target.value.length == "0") || (e.target.value.match(regex)) ){
      setCheck(false);
      setWebsite(e.target.value);
    }
    else{
      setCheck(true);
      setWebsite("");
    }
}


  return (
    <>
        {showModal ? ( 
            <Background onClick={closeModal} ref={modalRef}>
                <ModalWrapper showModal={showModal}>
                    <ModalContent>

                        <DivLink>

                           <Label href="https://www.facebook.com/" target="_blank" rel="noopener">Facebook:</Label>
                            <Input width="45%" placeholder='facebook.com' value={link1} check = {check1} onChange = {(e) => checkValidFacebook(e)}></Input>
                        </DivLink>
                        <DivLink>
                          <Label href="https://www.instagram.com/"target="_blank" rel="noopener" >Instagram:</Label>
                            <Input width="45%" placeholder='instagram.com'check = {check2}  value={link2} onChange = {(e) => checkValidInstagram(e)} ></Input>
                        </DivLink>
                        <DivLink>
                        <Label href="https://pl.linkedin.com/" target="_blank" rel="noopener">Linkedin:</Label>
                            <Input width="45%" placeholder='pl.linkedin.com' check = {check3} value={link3} onChange = {(e) => checkValidLinekedin(e)}></Input>
                        </DivLink>
                        <DivLink>
                        <Label href="https://pl.pinterest.com/" target="_blank" rel="noopener">Pinterest:</Label>
                            <Input width="45%" placeholder='pl.pinterest.com' check = {check4} value={link4} onChange = {(e) => checkValidPinterest(e)}></Input>
                        </DivLink>
                        <DivLink>
                        <Label href="https://twitter.com/" target="_blank" rel="noopener">Twitter:</Label>
                            <Input width="45%" placeholder='twitter.com' check = {check5} value={link5} onChange = {(e) => checkValidTwitter(e)}></Input>
                        </DivLink>
                        <DivLink>
                            <Label>Own website:</Label>
                            <Input width="45%" placeholder='www.example.com' value={link} check = {check}  onChange = {(e) => checkValidWebsite(e)}></Input>
                        </DivLink>
                       
                        <ButtonClose onClick={() => setShowModal(prev => !prev)}>X</ButtonClose>
                    </ModalContent>
                </ModalWrapper >
            </Background>
         ) : null}
    </>
  )
};
ModalLinks.propTypes = {
  facebook: PropTypes.string,
  instagram: PropTypes.string,
  linkedin: PropTypes.string,
  website: PropTypes.string,
  pinterest: PropTypes.string,

  setFacebook: PropTypes.func,
  setInstagram: PropTypes.func,
  setLinkedin: PropTypes.func,
  setWebsite: PropTypes.func,
  setPinterest: PropTypes.func,
};
export default ModalLinks;