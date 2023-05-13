import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

    const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #010101;
  position: relative;
  z-index: auto;
  border-radius: 10px;
`;


const ModalContent = styled.div`
  display: flex;
  align-items: center;
  line-height: 1.8px;
  color: #141414;
  position: fixed;
   @media screen and (max-width: 960px) {
    line-height: 2px;
  }
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

const Label = styled.label`
margin-top: 50%;
`

const ModalConfirm = ({showModal, setShowModal, navigateGo, setNavigateGo }) => {
    const modalRef = useRef();



const closeModal = e => {
    if (modalRef.current === e.target) {
      setNavigateGo(true);
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


  return (
    <>
        {showModal ? ( 
            <Background onClick={closeModal} ref={modalRef}>
                <ModalWrapper showModal={showModal}>
                    <ModalContent>
                        <Label>Pomyślnie, Zarejestrowano użytkownika,</Label>
                        <label>Aby dokończyć rejestrację potwierdz email przed zalogowaniem</label>
                        <ButtonClose onClick={closeModal} ref={modalRef}>[X]</ButtonClose>
                    </ModalContent>
                </ModalWrapper >
            </Background>
         ) : null}
    </>
  )
};

export default ModalConfirm;