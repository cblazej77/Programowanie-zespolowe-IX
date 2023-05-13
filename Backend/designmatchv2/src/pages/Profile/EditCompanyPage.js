import React, { useState } from 'react';
import {
  RightColumn,
  InfoRow,
  LeftColumn,
  Left,
  AboutMe,
  Image,
  LeftWrapper,
  LineForm,
  ProfileImage,
  ProfileWrapper,
  RightWrapper,
  TopSection,
  LeftInfoRow,
  InfoText,
  BoldLabel,
  BubbleWrap,
  Bubble,
} from '../../components/ProfileElements'
import { DataText, DataTextArena, HeaderText, NameText, StyledTextarea } from './ProfileElements';
import styled from 'styled-components';

const AboutInput = styled(StyledTextarea)`
  min-height: 15rem;
  font-size: 1.2rem;
  overflow-y: auto;
  white-space: normal;
`;

const Nawias = styled.p`
  margin: auto 15px auto auto;
`;

const ButtonEdit = styled.button`
  padding: 5px 20px;
  color: black;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 2px 6px 0 rgba(0, 0, 0, 0.4);
  }
  &:hover{
    transition: 0.3s;
    border: 2px solid rgba(0, 0, 0, 0.5);
    box-shadow: 0px 4px 12px 0 rgba(0, 0, 0, 0.4);
  }
`;

//UserName/UserInfo/MessageButton
const EditCompanyPage = () => {
  const [height, setHeight] = useState("20px");
  const [bio, setBio] = useState("");
  const maxChars = 300;
  const chars = bio.length;
  const limitHeight = 60;

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      let max = `${Math.min(e.target.scrollHeight + 20, limitHeight)}px`;
      setHeight(max);
    } else {
      e.target.style.height = "inherit";
      e.target.style.height = `${Math.min(
        e.target.scrollHeight,
        limitHeight
      )}px`;
      setHeight(e.target.style.height);
    }
  };

  return (
    <>
      <ProfileWrapper>
        <TopSection>
          <LeftWrapper>
            <ProfileImage><Image src="/assets/test.jpg" alt="Profile" /></ProfileImage>
            <NameText>Oracle</NameText>
          </LeftWrapper>
          <RightWrapper>
              <BoldLabel >O firmie:</BoldLabel>
             <AboutInput
                hag={height}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={maxChars}
                onKeyDown={(e) => handleKeyDown(e)}
              />
              <Nawias>
                ({chars}/{maxChars})
              </Nawias>
              <LineForm />
            <Left>
            <LineForm />
              <InfoRow >
                <LeftColumn>
                  <LeftInfoRow>
                      <HeaderText>Linki:</HeaderText>
                      <ButtonEdit>Edytuj</ButtonEdit>
                    </LeftInfoRow>
                    <BubbleWrap>
                      <Bubble>get.website</Bubble>
                       <Bubble>get.linkedin</Bubble>
                    </BubbleWrap>
                </LeftColumn>
                <RightColumn>
                  <LeftInfoRow>
                    <InfoText>Adres:</InfoText>
                    <DataTextArena>get.location</DataTextArena>
                  </LeftInfoRow>
                  <LeftInfoRow>
                    <InfoText>NIP:</InfoText>
                    <DataTextArena>get.NIP</DataTextArena>
                  </LeftInfoRow>
                </RightColumn>
              </InfoRow>
            </Left>
          </RightWrapper>
        </TopSection>
      </ProfileWrapper>
   
    </>

  );


};

export default EditCompanyPage;
