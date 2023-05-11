import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { COLORS } from './Colors';
import axios from '../api/axios';


//czesc elementow, na szybko pisane mozna przeniesc gdzies indziej
    const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ButtonSave = styled.button`
height: 50px;
width: 25%;
cursor: pointer;
  position: sticky;
  position: -webkit-sticky;
  top: 450px;
  left: 100%;
`
const ButtonClose2 = styled.button`
height: 50px;
width: 25%;
cursor: pointer;
  position: sticky;
  position: -webkit-sticky;
  top: 450px;
  right: 75%;
`

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
  display: flex;
  flex-direction: column;
  line-height: 1.8px;
  color: #141414;
   @media screen and (max-width: 960px) {
    line-height: 2px;
  }
`;
const ButtonClose = styled.button`
  cursor: pointer;
  position: sticky;
  position: -webkit-sticky;
  top: 1px;
  left: 100%;
  width: 32px;
  height: 32px;
  padding: 5px;
  z-index: 10;
  &:hover {
    background: red;
  }
`;
const  ModalBubble = styled.p`
  padding: 5px 10px 5px 10px;
  display: inline-flex;
  margin-right: 15px;
  border-radius: 15px;
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.3);
  font-size: 16px;
  margin-bottom: 20px;
  margin-top: 5px;
  ${(props) => props.checked === true ? `
        font-size: 18px;
        background: red;
    ` : `back`}
`;

const Label = styled.label`
  height: 30px;
  z-index: 10;
  position: absolute;
  font-size: 32px;
  transform: translate(0, -25px);
  margin-left: 10%;
`

const ModalLanguages = ({showModal, setShowModal, languages, setLanguages}) => {
    const modalRef = useRef();
    const [availableLanguages, setAvailableLanguages] = useState('');
    const [languagesToAdd, setLanguagesToAdd] = useState([]);
    
//zamyka modala
    const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };
//wychiwytuje klawature
  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        console.log('I pressed');
      }
    },
    [setShowModal, showModal]
  );
//pobiera dane z bazy
  let languageData = {
    method: 'get',
    maxBodyLength: Infinity,
    url: "/api/artist/getAvailableLanguages",
    headers: {}
  };

useEffect(() => {
    
    const fetchData = async () => {
      try {
        const languageResponse = await axios.request(languageData);
        setAvailableLanguages(languageResponse.data);
    } catch (error) {
        console.log(error);
      }
    };
    fetchData();
}, []);

//wychiwytuje klawature 
useEffect(
  () => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  },
  [keyPress]
);

//potrzebne do dzialania tagow
function handleAddLanguage(language) {
    setLanguages((languages) => [...languages, language]);
  }
  function handleAddLanguagesToAdd(language) {
    setLanguagesToAdd((languagesToAdd) => [...languagesToAdd, language]);
  }
  function handleDeleteLanguagesToAdd(language) {
    setLanguagesToAdd(languagesToAdd.filter((l) => l !== language));
  }
  function handleClearLanguages() {
    setLanguages([]);
  }


  function handleClearLanguagesToAdd() {
    setLanguagesToAdd([]);
  }

  function addLanguages() {
    for (let i = 0; i < languagesToAdd.length; ++i) {
      handleAddLanguage(languagesToAdd[i]);
    }
    handleClearLanguagesToAdd();
  }
  

//wyswietla jezyki

  function ListAvailableLanguages() {
    if (availableLanguages) {
      const available = availableLanguages.filter((item) => {
        if (!languages.includes(item)) return item;
      });
      const list = available.map((item, id) => (
        <button
          onClick={() => {
            if (languagesToAdd.includes(item)) {
              handleDeleteLanguagesToAdd(item);
            } else {
              handleAddLanguagesToAdd(item);
            }
          }}
          key={id}
        >
          <ModalBubble key={id}
            checked={languagesToAdd.includes(item)}
          >
            <label style={{ marginRight: 2 }}>{item}</label>
          </ModalBubble>
        </button>
      ));
      return <>{list}</>;
    } else {
      return <label >pusto ListAvailableLanguages</label >;
    }
  }

  const handleClickSave = () => {
    addLanguages();
    setShowModal(prev => !prev);
  }


  return (
    <>
        {showModal ? ( 
            <Background onClick={closeModal} ref={modalRef}>
                <ModalWrapper showModal={showModal}>
                    <ButtonClose onClick={() => setShowModal(prev => !prev)}>X</ButtonClose>
                    <ButtonSave onClick = {handleClickSave}> Save</ButtonSave>
                    <ButtonClose2 onClick={() => setShowModal(prev => !prev)}> Close</ButtonClose2>
                    <ModalContent>
                        <ListAvailableLanguages />
                        <Label>Języki:</Label>
                    </ModalContent>
                </ModalWrapper >
            </Background>
         ) : null}
    </>
  )
};


export default ModalLanguages;