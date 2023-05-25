import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AboutInput,
  EditIcon,
  EditImage,
  EditNameText,
  EditProfileImage,
  Image,
  InfoInputWrapper,
  InputInfoText,
  Left,
  LeftColumn,
  LeftWrapper,
  LineForm,
  ProfileImage,
  ProfileWrapper,
  RightWrapper,
  SmallTextArea,
  TopSection
} from './ProfileElements';
import styled from 'styled-components';
import sessionStoreCleaner from '../../components/sessionStoreCleaner';
import axios from '../../api/axios';
import LoadingPage from '../LoadingPage';
import { COLORS } from '../../components/Colors';
import { useRef } from 'react';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const { secondary, darkLight } = COLORS;

const ButtonSave = styled.button`
  padding: 20px 50px;
  font-size: 1.2rem;
  margin-top: 0;
  margin-left: 80vw;
  display: flex;
  color: white;
  border-radius: 15px;
  background: ${secondary};
  transform: translateY(2.5rem);
  cursor: pointer;
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
  const [username, setUsername] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState('');
  const [blob, setBlob] = useState('');

  const navigate = useNavigate();

  const maxChars = 255;
  const limitHeight = 60;
  useEffect (() => {
    sessionStoreCleaner.checkAndRemoveSessionStorage();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decodeResponse = await axios.request('/auth/decodeToken', {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('storageLogin'),
            'Content-Type': 'application/json',
          },
        });

        // const avatarResponse = await axios.request(
        //   '/public/api/company/getProfileImageByUsername/' + decodeResponse.data.username, {
        //     headers: {accept: 'application/json'}
        //   });

        const companyResponse = await axios.request({
          url: '/public/api/company/getProfileByUsername/' + decodeResponse.data.username
        });

        setUsername(decodeResponse.data.username);
        setGet(companyResponse.data);
        setCheckLoading(companyResponse);
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
      const response = await axios.put(
        '/api/company/updateProfileByUsername/' + username,
        get, {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('storageLogin'),
          'Content-Type': 'application/json',
        },
      });

      console.log(selectedImage); // Dodaj ten console.log
      if (selectedImage) {
        console.log(selectedImage);
        const formData = new FormData();
        console.log(formData);
        formData.append('file', selectedImage, selectedImage.name);

        axios.post(
          '/api/company/uploadProfileImage/' + username,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('storageLogin'),
            },
          })
      }
      //console.log('Data saved successfully!');
      //console.log(response.data);
      navigate('/account');
    } catch (err) {
      console.error('Error while saving data:', err);
    }
  }, [get, selectedImage]);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append('file', file, file.name);
      setBlob(formData);
      console.log(username);
      axios.post('/api/company/uploadProfileImage/' + username,
        formData,
        {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('storageLogin'),
            'Content-Type': 'multipart/form-data',
          },
        })
    }
  };

  const handleImageChange = (e) => {
    console.log('handleImageChange');
    // Wybrano plik
    const file = e.target.files[0];
    if (file) {
      // Sprawdź rozszerzenie pliku
      const extension = file.name.split('.').pop().toLowerCase();
      if (['jpg', 'jpeg', 'png'].includes(extension)) {
        console.log(file);
        setSelectedImage(file);
      } else {
        // Nieprawidłowy format pliku
        alert('Wybierz plik w formacie JPG, JPEG lub PNG.');
      }
    }
  };

  const handleEditImageClick = () => {
    console.log('handleEditImageClick');
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = handleImageChange;
    input.click();
  };

  return (
    <>
      {checkLoading ? (
        <ProfileWrapper>
          <TopSection>
            <LeftWrapper>
              <EditProfileImage onClick={handleEditImageClick}>
                {selectedImage ? (
                  <Image src={URL.createObjectURL(selectedImage)} alt="Profile" />
                ) : (
                  <Image
                    src={'/public/api/company/getProfileImageByUsername/' + get.username}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/assets/cards/defaultavatar.png";
                    }}
                    alt="Profile"
                  />
                )}
                <EditIcon size={40} />
              </EditProfileImage>
              <InfoInputWrapper>
                <InputInfoText>Nazwa firmy: </InputInfoText>
                <EditNameText
                  defaultValue={get.name}
                  value={get.name}
                  onChange={({ target }) =>
                    setGet({
                      ...get, name: target.value,
                    })} />
              </InfoInputWrapper>
              <InfoInputWrapper>
                <InputInfoText>Adres firmy: </InputInfoText>
                <EditNameText
                  defaultValue={get.address}
                  value={get.address}
                  onChange={({ target }) =>
                    setGet({
                      ...get, address: target.value,
                    })} />
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
              <Nawias>{get.description ? Math.min(get.description.length, maxChars) : 0}/{maxChars}</Nawias>
              <Left>
                <LineForm style={{ marginBottom: '3rem' }} />
                <LeftColumn>
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
          <ButtonSave style={{ background: darkLight }} onClick={handleSave}>Zapisz</ButtonSave>
        </ProfileWrapper>
      ) : (
        <LoadingPage />
      )}
    </>

  );


};

export default EditCompanyPage;
