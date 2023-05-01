import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import axios from '../api/axios';
import { xIcon } from '../assets/img/svg/SvgIcons';


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

const Input = styled.input`
      width: ${({width}) => width};
      border: ${({check}) => check ? '2px' : '1px' } solid ${({check}) => check ? 'red' : 'black' };
      height: 30px;
      margin-bottom: 10px; 
`

const ModalLinks = ({showModal, setShowModal}) => {
    const modalRef = useRef();
    const [link1, setLink1] = useState("");
    const [short1, setShort1] = useState("");
    const [check1, setCeck1] = useState(false);
    const [link2, setLink2] = useState("");
    const [short2, setShort2] = useState("");
    const [check2, setCeck2] = useState(false);
    const [link3, setLink3] = useState("");
    const [short3, setShort3] = useState("");
    const [check3, setCeck3] = useState(false);

    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression); 

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

    const checkValidLink1 = (e) => {
        setLink1(e.target.value);
        if((short1.length == 0 && e.target.value.length == 0) || (short1.length != 0 && e.target.value.length != 0) && e.target.value.match(regex) ) setCeck1(false);
            else if(( short1.length != 0 && e.target.value.length == 0) || (short1.length == 0 && e.target.value.length != 0)) setCeck1(true);
    }
    const checkValidShort1 = (e) => {
        setShort1(e.target.value);
        if((e.target.value.length == 0 && link1.length == 0) || (e.target.value.length != 0 && link1.length != 0 && link1.match(regex)) ) setCeck1(false);
            else if(( e.target.value.length != 0 && link1.length == 0) || (e.target.value.length == 0 && link1.length != 0)) setCeck1(true);
    }
    
    const checkValidLink2 = (e) => {
        setLink2(e.target.value);
        if((short2.length == 0 && e.target.value.length == 0) || (short2.length != 0 && e.target.value.length != 0) && e.target.value.match(regex) ) setCeck2(false);
            else if(( short2.length != 0 && e.target.value.length == 0) || (short2.length == 0 && e.target.value.length != 0)) setCeck2(true);
    }
    const checkValidShort2 = (e) => {
        setShort2(e.target.value);
        if((e.target.value.length == 0 && link2.length == 0) || (e.target.value.length != 0 && link2.length != 0 && link2.match(regex)) ) setCeck2(false);
        else if(( e.target.value.length != 0 && link2.length == 0) || (e.target.value.length == 0 && link2.length != 0)) setCeck2(true);
    }

    const checkValidLink3 = (e) => {
        setLink3(e.target.value);
        if((short3.length == 0 && e.target.value.length == 0) || (short3.length != 0 && e.target.value.length != 0) && e.target.value.match(regex) ) setCeck3(false);
            else if(( short3.length != 0 && e.target.value.length == 0) || (short3.length == 0 && e.target.value.length != 0)) setCeck3(true);
    }
    const checkValidShort3 = (e) => {
        setShort3(e.target.value);
        if((e.target.value.length == 0 && link3.length == 0) || (e.target.value.length != 0 && link3.length != 0 && link3.match(regex)) ) setCeck3(false);
        else if(( e.target.value.length != 0 && link3.length == 0) || (e.target.value.length == 0 && link3.length != 0)) setCeck3(true);
    }


  return (
    <>
        {showModal ? ( 
            <Background onClick={closeModal} ref={modalRef}>
                <ModalWrapper showModal={showModal}>
                    <ModalContent>

                         <label>Pierwszy link</label>
                        <div>
                           
                            <Input width="30%" placeholder='example' value={short1} check ={check1} onChange = {(e) => checkValidShort1(e)}></Input>
                            <Input width="45%" placeholder='www.example.com' value={link1} check ={check1} onChange = {(e) => checkValidLink1(e)}></Input>
                        </div> <label>Drugi link</label>
                        <div>
                       
                            <Input width="30%" placeholder='example' value={short2} check ={check2} onChange = {(e) => checkValidShort2(e)}></Input>
                            <Input width="45%" placeholder='www.example.com' value={link2} check ={check2} onChange = {(e) => checkValidLink2(e)}></Input>
                        </div>
                        <label>Trzeci link</label>
                        <div>
                        
                            <Input width="30%" placeholder='example' value={short3} check ={check3} onChange = {(e) => checkValidShort3(e)}></Input>
                            <Input width="45%" placeholder='www.example.com' value={link3} check = {check3} onChange = {(e) => checkValidLink3(e)}></Input>
                        </div>
                        <ButtonClose onClick={() => setShowModal(prev => !prev)}>X</ButtonClose>
                    </ModalContent>
                </ModalWrapper >
            </Background>
         ) : null}
    </>
  )
};

export default ModalLinks;