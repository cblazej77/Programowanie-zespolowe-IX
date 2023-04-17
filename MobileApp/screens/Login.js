import React, { useState, useEffect } from "react";
import { LinearGradient } from 'expo-linear-gradient';
//keyboard avoiding view
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
//Google auth
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
//Facebook auth
import * as AuthSession from 'expo-auth-session';
import * as Facebook from 'expo-auth-session/providers/facebook';
//axios API
//import axios from "axios";
import {default as baseURL} from "../components/AxiosAuth";
import axios from "axios";


//formik
import { Formik } from "formik";

//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    StyledFormArea,
    LeftIcon,
    StyledButton,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    MsgBox,
    Line,
    Colors,
    ExtraView,
    TextLink,
    HeaderText,
    StatsText,
    SmallText,
    LinearGradientStyle
} from './../components/styles';
import { View, ActivityIndicator, StyleSheet, Image, Text  } from "react-native";

//Colors
const { tertiary, darkLight, primary, link, darkLight2, green, green2 } = Colors;

//dismising the popup after successful auth
WebBrowser.maybeCompleteAuthSession();


const Login = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [googleToken, setGoogleToken] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const [googleSubmiting, setGoogleSubmiting] = useState(false);
    const [user, setUser] = useState(null);

    const [requestG, responseG, promptAsyncG] = Google.useAuthRequest({
        androidClientId: '37019238552-c6q0hq4kn55o6e1ahobtuvconehs243h.apps.googleusercontent.com',
        iosClientId: '37019238552-bvqremi6rf14qlgbg8iqagg1mjndo5h0.apps.googleusercontent.com',
        expoClientId: '37019238552-7n7e9jrdi9gcliagtqhalfq34afibh9c.apps.googleusercontent.com',
      });

      const [requestF, responseF, promptAsyncF] = Facebook.useAuthRequest({
        clientId: "739036054553215",
      });

      if (requestF) {
        console.log(
          "You need to add this url to your authorized redirect urls on your Facebook app: " +
            requestF.redirectUri
        );
      }
      
      useEffect(() => {
        if (responseG?.type === "success") {
          setGoogleToken(responseG.authentication.accessToken);
          getUserInfo();
        }
      }, [responseG, googleToken]);

      useEffect(() => {
        if (responseF && responseF.type === "success" && responseF.authentication) {
          (async () => {
            const userInfoResponse = await fetch(
              `https://graph.facebook.com/me?access_token=${responseF.authentication.accessToken}&fields=id,name,picture.type(large)`
            );
            const userInfo = await userInfoResponse.json();
            setUserInfo(userInfo);
          })();
        }
      }, [responseF]);

      const handleGoogleLogin = async () => {
        setGoogleSubmiting(true);
        const succ = await promptAsync();
        handleMessage("Google login successful", 'SUCCESS');
        console.log(userInfo);
        setGoogleSubmiting(false);
        navigation.navigate('MainNavigation', userInfo);
        console.log(userInfo);
        
      }

      const handleFacebookLogin = async () => {
        const result = await promptAsyncF();
        if (result.type !== "success") {
          alert("Uh oh, something went wrong");
          return;
        }
      };

    const handleLogin = async (credentials, setSubmitting) => {
        handleMessage(null);
        const url = baseURL + '/api/auth/login';
        console.log(url);
        try {
            const response = await axios.post(url,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response));
            navigation.navigate('MainNavigation');
        } catch (err) {
            handleMessage("Nie udało się zalogować", 'FAILED');
            setSubmitting(false);
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

    const getUserInfo = async () => {
        try {
          const response = await fetch(
            "https://www.googleapis.com/userinfo/v2/me",
            {
              headers: { Authorization: `Bearer ${googleToken}` },
            }
          );
    
          const user = await response.json();
          setUserInfo(user);
          console.log(userInfo);
          navigation.navigate('MainNavigation', userInfo);
        } catch (error) {
            console.log(error);
          // Add your own error handler here
        }
      };


    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    return (
        <KeyboardAvoidingWrapper style={{ backgroundColor: { primary } }}>
            <StyledContainer>
                <InnerContainer>
                    <PageLogo resizeMode="contain" source={require('./../assets/img/logo.png')}/>
                    <HeaderText bold={true} style={{ color: darkLight, marginVertical: 10 }}>Logowanie</HeaderText>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values, { setSubmitting }) => {
                            if (email == '' || password == '') {
                                handleMessage('Proszę wypełnić oba pola');
                                setSubmitting(false);
                            } else {
                                handleLogin(values, setSubmitting);
                            }
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (<StyledFormArea>
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
                            <MsgBox type={messageType}>{message}</MsgBox>
                            {!isSubmitting &&
                            <LinearGradientStyle colors={[darkLight2, darkLight]} >
                                    <StyledButton onPress={handleSubmit}>
                                        <StatsText style={{ color: primary }}>
                                            Zaloguj się
                                        </StatsText>
                                    </StyledButton>
                                </LinearGradientStyle>}
                            {isSubmitting && 
                            <LinearGradientStyle colors={[darkLight2, darkLight]} >
                                <StyledButton disabled={true}>
                                    <ActivityIndicator size="large" color={primary} />
                                </StyledButton>
                            </LinearGradientStyle>}
                            <LinearGradientStyle colors={[darkLight2, darkLight]} >
                                <StyledButton onPress={() => navigation.navigate("MainNavigation")}>
                                    <StatsText style={{ color: primary }}>
                                        Kontynuuj bez logowania
                                    </StatsText>
                                </StyledButton>
                            </LinearGradientStyle>
                            {!googleSubmiting && userInfo === null &&
                            <LinearGradientStyle colors={[green, green2]}>
                                <StyledButton google={true} disabled={!requestG} onPress={() => {
                                    promptAsyncG();
                                }}>
                                    <Fontisto name="google" color={primary} size={25} />
                                    <StatsText style={{ color: primary }}>
                                        Kontynuuj z Google
                                    </StatsText>
                                </StyledButton>
                            </LinearGradientStyle>}
                            {googleSubmiting &&
                            <LinearGradientStyle colors={[green, green2]}>
                                <StyledButton google={true} disabled={true}>
                                    <ActivityIndicator size="large" color={primary} />
                                </StyledButton>
                            </LinearGradientStyle>}
                            {userInfo ? (
        <Profile userInfo={userInfo} />
      ) : (<LinearGradientStyle colors={[darkLight, darkLight2]}>
                                <StyledButton disabled={!requestF} onPress={() => {
                                    handleFacebookLogin();
                                }}>
                                    <StatsText style={{ color: primary }}>
                                        Kontynuuj z Facebook
                                    </StatsText>
                                </StyledButton>
                            </LinearGradientStyle>)}
                            <ExtraView>
                                <SmallText>Nie masz jeszcze konta? </SmallText>
                                <TextLink onPress={() => navigation.navigate("Signup")}>
                                    <SmallText style={{ color: link }}>Zarejestruj się!</SmallText>
                                </TextLink>
                            </ExtraView>
                        </StyledFormArea>)}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
}

function Profile({ userInfo }) {
    return (
      <View style={styles.profile}>
        <Image source={{ uri: userInfo.picture.data.url }} style={styles.image} />
        <Text style={styles.name}>{userInfo.name}</Text>
        <Text>ID: {userInfo.id}</Text>
      </View>
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    profile: {
      alignItems: "center",
    },
    name: {
      fontSize: 20,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
  });

export default Login;

