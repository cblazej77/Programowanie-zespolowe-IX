import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

//formik
import { Formik } from 'formik';

//icons
import { Octicons, Ionicons } from '@expo/vector-icons';

import {
  StyledContainer,
  InnerContainer,
  StyledFormArea,
  LeftIcon,
  StyledButton,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  ButtonText,
  MsgBox,
  Colors,
  ExtraText,
  ExtraView,
  TextLink,
  TextLinkContent,
  HeaderText,
  LinearGradientStyle,
} from './../components/styles';
import { View, ActivityIndicator } from 'react-native';

//Colors
const { darkLight, darkLight2, primary } = Colors;

//keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

//API client
import axios from 'axios';
import { default as baseURL } from '../components/AxiosAuth';

const Signup = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function passwordPatternValidation(password) {
    const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$');
    return regex.test(password);
  }

  function emailPatternValidation(email) {
    const regex = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    return regex.test(email);
  }

  function namesPatternValidation(name) {
    const regex = new RegExp("^([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+$");
    return regex.test(name);
  }

  function usernamesPatternValidation(name) {
    const regex = new RegExp('^([-_a-zA-ZÀ-ÿ0-9.]){4,20}$');
    return regex.test(name);
  }

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSignup = async () => {
    handleMessage(null);
    const url = baseURL + '/api/auth/register';
    try {
      setSubmitting(true);
      const response = await axios.post(url, JSON.stringify({ email, username, password, firstname, lastname }), {
        headers: { 'Content-Type': 'application/json' },
      });
      setSubmitting(false);
      handleMessage('Zarejestrowano użytkownika, proszę potwierdź email przed zalogowaniem', 'SUCCESS');
      await sleep(1500);
      navigation.navigate('Login');
    } catch (err) {
      setSubmitting(false);
      handleMessage('Błąd podczas rejestracji: kod ' + err.response.status, 'FAILED');
      if (!err?.response) {
        console.log('No Server Response');
      } else if (err.response?.status === 409) {
        console.log('Username Taken');
      } else {
        console.log('Registration Failed');
        console.log(err);
      }
    }
  };

  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };
  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark"></StatusBar>
        <InnerContainer>
          <HeaderText style={{ fontSize: 30, color: darkLight, marginBottom: 30 }}>Rejestracja</HeaderText>
          <Formik
            initialValues={{ email: '', username: '', password: '', firstname: '', lastname: '' }}
            onSubmit={() => {
              if (
                email == '' ||
                password == '' ||
                username == '' ||
                confirmPassword == '' ||
                firstname == '' ||
                lastname == ''
              ) {
                handleMessage('Proszę wypełnić wszystkie pola');
                setSubmitting(false);
              } else if (confirmPassword !== password) {
                handleMessage('Hasła się nie zgadzają');
                setSubmitting(false);
              } else if (!namesPatternValidation(firstname) || !namesPatternValidation(lastname)) {
                handleMessage('Wpisano niedozwolone znaki w imieniu lub nazwisku', 'FAILED');
                setSubmitting(false);
              } else if (!usernamesPatternValidation(username)) {
                handleMessage('Wpisano niedozwolone znaki w nazwie użytkownika', 'FAILED');
                setSubmitting(false);
              } else if (!emailPatternValidation(email)) {
                handleMessage('Wpisano email w nieprawidłowym formacie', 'FAILED');
                setSubmitting(false);
              } else if (!passwordPatternValidation(password) && confirmPassword === password) {
                handleMessage(
                  'Hasło musi zawierać wielkie i małe litery, liczby, oraz conajmiej jeden znak specjalny: !@#$%\nHasło musi zawierać między 8 a 24 znaki.',
                  'FAILED',
                );
                setSubmitting(false);
              } else {
                handleSignup();
              }
            }}
          >
            {({ handleBlur, handleSubmit }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Imie"
                  icon="person"
                  placeholder="Jan"
                  placeholderTextColor={'#00000088'}
                  onChangeText={setFirstname}
                  onBlur={handleBlur('firstname')}
                  value={firstname}
                />
                <MyTextInput
                  label="Nazwisko"
                  icon="person"
                  placeholder="Kowalski"
                  placeholderTextColor={'#00000088'}
                  onChangeText={setLastname}
                  onBlur={handleBlur('lastname')}
                  value={lastname}
                />
                <MyTextInput
                  label="Adres Email"
                  icon="mail"
                  placeholder="email@example.com"
                  placeholderTextColor={'#00000088'}
                  onChangeText={setEmail}
                  onBlur={handleBlur('email')}
                  value={email}
                  keyboardType="email-address"
                />
                <MyTextInput
                  label="Nazwa użytkownika"
                  icon="person"
                  placeholder="JanArt"
                  placeholderTextColor={'#00000088'}
                  onChangeText={setUsername}
                  onBlur={handleBlur('username')}
                  value={username}
                />
                <MyTextInput
                  label="Hasło"
                  icon="lock"
                  placeholder="************"
                  placeholderTextColor={'#00000088'}
                  onChangeText={setPassword}
                  onBlur={handleBlur('password')}
                  value={password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MyTextInput
                  label="Potwierdź hasło"
                  icon="lock"
                  placeholder="************"
                  placeholderTextColor={'#00000088'}
                  onChangeText={setConfirmPassword}
                  onBlur={handleBlur('confirmPassword')}
                  value={confirmPassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox type={messageType}> {message} </MsgBox>
                {!submitting && (
                  <LinearGradientStyle colors={[darkLight2, darkLight]}>
                    <StyledButton onPress={handleSubmit}>
                      <ButtonText>Zarejestruj się</ButtonText>
                    </StyledButton>
                  </LinearGradientStyle>
                )}
                {submitting && (
                  <LinearGradientStyle colors={[darkLight2, darkLight]}>
                    <StyledButton disabled={true}>
                      <ActivityIndicator size="large" color={primary} />
                    </StyledButton>
                  </LinearGradientStyle>
                )}
                <ExtraView>
                  <ExtraText>Masz już konto? </ExtraText>
                  <TextLink onPress={() => navigation.navigate('Login')}>
                    <TextLinkContent>Zaloguj się!</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={darkLight} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
        </RightIcon>
      )}
    </View>
  );
};

export default Signup;
