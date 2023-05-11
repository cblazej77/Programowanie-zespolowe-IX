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

const ModalTags = ({showModal, setShowModal, tags, setTags}) => {
    const modalRef = useRef();
    const [availableTags, setAvailableTags] = useState('');
    const [tagsToAdd, setTagsToAdd] = useState([]);
    
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
  let tagsData = {
    method: 'get',
    maxBodyLength: Infinity,
    url: "/api/artist/getAvailableTags",
    headers: {}
  };

useEffect(() => {
    
    const fetchData = async () => {
      try {
        const tagsResponse = await axios.request(tagsData);
        setAvailableTags(tagsResponse.data);
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
function addTags() {
    for (let i = 0; i < tagsToAdd.length; ++i) {
      handleAddTag(tagsToAdd[i]);
    }
    handleClearTagsToAdd();
  }
  function handleClearTagsToAdd() {
    setTagsToAdd([]);
  }
  function handleAddTagsToAdd(tag) {
    setTagsToAdd((tagsToAdd) => [...tagsToAdd, tag]);
  }

  function handleDeleteTagsToAdd(tag) {
    setTagsToAdd(tagsToAdd.filter((t) => t !== tag));
  }
  function handleAddTag(tag) {
    setTags((tags) => [...tags, tag]);
  }

//wyswietla tagi
function ListAvailableTags() {
    if (availableTags) {
      const available = availableTags.filter((item) => {
        if (!tags.includes(item)) return item;
      });
      const list = available.map((item, id) => (
        <button onClick={() => {
            if(tagsToAdd.includes(item)) {handleDeleteTagsToAdd(item)}
            else {handleAddTagsToAdd(item)}
            }} key={id}>
          <ModalBubble
            key={id}
            checked={tagsToAdd.includes(item)}
          >
            <label style={{ marginRight: 2 }}>{item}</label>
          </ModalBubble>
        </button>
      ));
      return <>{list}</>;
    } else {
      return <label>pusto ListAvalileTags</label>;
    }
  }
  const handleClickSave = () => {
    addTags();
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
                        <ListAvailableTags />
                        <Label>Tagi:</Label>
                    </ModalContent>
                </ModalWrapper >
            </Background>
         ) : null}
    </>
  )
};


export default ModalTags;