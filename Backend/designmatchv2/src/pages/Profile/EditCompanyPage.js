import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
  InfoInputWrapper,
  SmallTextArea,
} from '../../components/ProfileElements'
import { DataText, DataTextArena, HeaderText, InputInfoText, NameText, StyledTextarea } from './ProfileElements';
import styled from 'styled-components';
import axios from '../../api/axios';
import LoadingPage from '../LoadingPage';
import { COLORS } from '../../components/Colors';

const { secondary } = COLORS;

const ButtonSave = styled.button`
  padding: 20px 50px;
  font-size: 1.2rem;
  margin-top: 0;
  margin-left: 80vw;
  display: flex;
  color: white;
  border-radius: 15px;
  border: 1px solid black;
  background: ${secondary};
  transform: translateY(2.5rem);
  &:hover {
    transition: 0.3s;
    border: 2px solid rgba(0, 0, 0, 0.5);
    box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.4);
  }
`;

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
  const [get, setGet] = useState({});
  const [checkLoading, setCheckLoading] = useState(null);
  const [bio, setBio] = useState("");
  const [putData, setPutData] = useState({});

  const maxChars = 300;
  const limitHeight = 60;
  const companyName = 'Acme%20Corpo';

  const companyData = useMemo(() => ({
    method: 'get',
    maxBodyLength: 10000,
    url: `/companies/getCompanyProfileByName?name=${companyName}`,
    headers: {},
  }), [companyName]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.request(companyData);
        setGet(result.data);
        setCheckLoading(result);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

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

  const handleSave = useCallback(async () => {
    try {
      const response = await axios.put(`/companies/updateCompanyProfileByName?name=${companyName}`, get);
      console.log('Data saved successfully!');
      console.log(response.data);
    } catch (err) {
      console.error('Error while saving data:', err);
    }
  }, [companyName, get]);

  return (
    <>
      {checkLoading ? (
        <ProfileWrapper>
          <TopSection>
            <LeftWrapper>
              <ProfileImage><Image src="/assets/test.jpg" alt="Profile" /></ProfileImage>
              <InfoInputWrapper>
                <InputInfoText>Nazwa firmy: </InputInfoText>
                <NameText
                  defaultValue={get.name}
                  value={get.name}
                  onChange={({ target }) =>
                    setGet({
                      ...get, name: target.value,
                    })} />
              </InfoInputWrapper>
              <InfoInputWrapper>
                <InputInfoText>Adres firmy: </InputInfoText>
                <NameText>get.address</NameText>
              </InfoInputWrapper>
            </LeftWrapper>
            <RightWrapper>
              <InputInfoText>Opis firmy:</InputInfoText>
              <AboutInput
                defaultValue={get.description}
                value={get.description}
                onChange={({ target }) =>
                  setGet({ ...get, description: target.value, })}
                maxLength={maxChars}
                onKeyDown={(e) => handleKeyDown(e)}
              />
              <Nawias>({Math.min(get.description.length, maxChars)}/{maxChars})</Nawias>
              <Left>
                <LineForm style={{ marginBottom: '3rem' }} />
                <LeftColumn >
                  <InfoInputWrapper>
                    <InputInfoText>Strona firmy: </InputInfoText>
                    <SmallTextArea
                      defaultValue={get.website}
                      value={get.website}
                      onChange={({ target }) =>
                        setGet({ ...get, website: target.value, })} />
                  </InfoInputWrapper>
                  <InfoInputWrapper>
                    <InputInfoText>Linkedin: </InputInfoText>
                    <SmallTextArea
                      defaultValue={get.linkedin}
                      value={get.linkedin}
                      onChange={({ target }) =>
                        setGet({ ...get, linkedin: target.value, })} />
                  </InfoInputWrapper>
                  <InfoInputWrapper>
                    <InputInfoText>Facebook: </InputInfoText>
                    <SmallTextArea
                      defaultValue={get.facebook}
                      value={get.facebook}
                      onChange={({ target }) =>
                        setGet({ ...get, facebook: target.value, })} />
                  </InfoInputWrapper>
                  <InfoInputWrapper>
                    <InputInfoText>Instagram: </InputInfoText>
                    <SmallTextArea
                      defaultValue={get.instagram}
                      value={get.instagram}
                      onChange={({ target }) =>
                        setGet({ ...get, instagram: target.value, })} />
                  </InfoInputWrapper>
                  <InfoInputWrapper>
                    <InputInfoText>Twitter: </InputInfoText>
                    <SmallTextArea
                      defaultValue={get.twitter}
                      value={get.twitter}
                      onChange={({ target }) =>
                        setGet({ ...get, twitter: target.value, })} />
                  </InfoInputWrapper>
                </LeftColumn>
              </Left>
            </RightWrapper>
          </TopSection>
          <ButtonSave onClick={handleSave}>Zapisz</ButtonSave>
        </ProfileWrapper>
      ) : (
        <LoadingPage />
      )}
    </>

  );


};

export default EditCompanyPage;
