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
} from './../components/styles';
import { SafeAreaView, ScrollView, View, Alert } from "react-native";

//Colors
const { tertiary, darkLight, primary } = Colors;

//const Login = () => {
export default function Login({ navigation }) {
    const [hidePassword, setHidePassword] = useState(true);

    //const GuestLogin = () => Alert.alert('Guest')
    const GuestLogin = () => navigation.navigate("MainNavigation")

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={primary} hidden={true}/>
            <ScrollView>
                <StyledContainer>
                    <InnerContainer>
                        <PageLogo resizeMode="contain" source={require('./../assets/img/logo.png')}></PageLogo>
                        <PageTitle>Logowanie</PageTitle>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            onSubmit={(values) => {
                                console.log(values);
                            }}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values }) => (<StyledFormArea>
                                <MyTextInput
                                    label="Adres Email"
                                    icon="mail"
                                    placeholder="email@example.com"
                                    placeholderTextColor={'#00000088'}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                />
                                <MyTextInput
                                    label="Hasło"
                                    icon="lock"
                                    placeholder="************"
                                    placeholderTextColor={'#00000088'}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />
                                <MsgBox>...</MsgBox>
                                <StyledButton onpress={handleSubmit}>
                                    <ButtonText>
                                        Zaloguj
                                    </ButtonText>
                                </StyledButton>
                                <StyledButton onPress={GuestLogin} >
                                    <ButtonText>Kontynuuj bez logowania</ButtonText>
                                </StyledButton>
                                <Line />
                                <StyledButton google={true} onPress={handleSubmit}>
                                    <Fontisto name="google" color={primary} size={25} />
                                    <ButtonText google={true}>
                                        Zaloguj się z Google
                                    </ButtonText>
                                </StyledButton>
                                <ExtraView>
                                    <ExtraText>Nie masz jeszcze konta? </ExtraText>
                                    <TextLink>
                                        <TextLinkContent>Zarejestruj się!</TextLinkContent>
                                    </TextLink>
                                </ExtraView>
                            </StyledFormArea>)}
                        </Formik>
                    </InnerContainer>
                </StyledContainer>
            </ScrollView>
        </SafeAreaView>
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

//export default Login;