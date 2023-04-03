import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

//formik
import { Formik } from "formik";

//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    StyledFormArea,
    LeftIcon,
    StyledButton,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    ButtonText,
    MsgBox,
    Line,
    Colors,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent,
    HeaderText,
    StatsText,
    RegularText,
    SmallText
} from './../components/styles';
import { SafeAreaView, View, ActivityIndicator } from "react-native";

//Colors
const { tertiary, darkLight, primary, link } = Colors;

//API client
import axios from 'axios';

//keyboard avoiding view
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

const Login = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const[messageType, setMessageType] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async (credentials, setSubmitting) => {
        handleMessage(null);
        const url = 'http://192.168.1.106:8080/api/auth/login';
        // axios
        // .post(url, credentials)
        // .then((response) => {
        //     const result = response.data;
        //     const {message, status, data} = result;

        //     if(status !== 'SUCCESS') {
        //         handleMessage(message, status);
        //     } else {
        //         navigation.navigate('MainNavigation', {...data[0] });
        //     }
        //     setSubmitting(false);
        // })
        // .catch(error => {
        //     console.log(error.JSON());
        //     setSubmitting('false');
        //     handleMessage("Wystąpił bład. Sprawdź swoje połączenie sieciowe i spróbuj ponownie");
        // })
            try{
                const response = await axios.post(url,
                  JSON.stringify({email, password}),
                  {
                  headers: { 'Content-Type': 'application/json' },
                  }
              );
              console.log(response?.data);
                  console.log(response?.accessToken);
                  console.log(JSON.stringify(response));
                  navigation.navigate('MainNavigation');
              }catch(err){
                  if (!err?.response) {
                      console.log('No Server Response');
                  } else if (err.response?.status === 409) {
                      console.log('Username Taken');
                  } else {
                      console.log('Login Failed')
                      console.log(err)
                  }
              } 
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    return (
        <KeyboardAvoidingWrapper style={{ backgroundColor: { primary } }}>
            <StyledContainer>
                <InnerContainer>
                    <PageLogo resizeMode="contain" source={require('./../assets/img/logo.png')}></PageLogo>
                    <HeaderText style={{ color: darkLight, marginVertical: 10 }}>Logowanie</HeaderText>
                    <Formik
                        initialValues={{email: '', password: ''}}
                        onSubmit={(values, {setSubmitting}) => {
                            if(email == '' || password == '') {
                                handleMessage('Proszę wypełnić oba pola');
                                setSubmitting(false);
                            } else {
                                handleLogin(values, setSubmitting);
                            }
                        }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (<StyledFormArea>
                            <MyTextInput 
                                label = "Adres Email"
                                icon="mail"
                                placeholder="email@example.com"
                                placeholderTextColor={'#00000088'}
                                onChangeText={setEmail}
                                onBlur={handleBlur('email')}
                                value={email}
                                keyboardType="email-address"
                            />
                            <MyTextInput 
                                label = "Hasło"
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
                            <MsgBox type={messageType}>{message}</MsgBox>
                            {!isSubmitting && <StyledButton onPress={handleSubmit}>
                                <StatsText style={{color: primary}}>
                                    Zaloguj się
                                </StatsText>
                            </StyledButton>}
                            {isSubmitting && <StyledButton disabled={true}>
                                <ActivityIndicator size="large" color={primary} />
                            </StyledButton>}
                            <StyledButton onPress={handleSubmit}>
                                <StatsText style={{color: primary}}>
                                    Kontynuuj bez logowania
                                </StatsText>
                            </StyledButton>
                            <Line />
                            <StyledButton google={true} onPress={handleSubmit}>
                                <Fontisto name="google" color={primary} size={25} />
                                <StatsText style={{color: primary}}>
                                    Kontunuuj z Google
                                </StatsText>
                            </StyledButton>
                            <ExtraView>
                                <SmallText>Nie masz jeszcze konta? </SmallText>
                                <TextLink onPress={() => navigation.navigate("Signup")}>
                                    <SmallText style={{color: link}}>Zarejestruj się!</SmallText>
                                </TextLink>
                            </ExtraView>
                        </StyledFormArea>)}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
}

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
    )
}

export default Login;

