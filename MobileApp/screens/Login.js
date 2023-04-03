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
import { SafeAreaView, View } from "react-native";

//Colors
const { tertiary, darkLight, primary, link } = Colors;

//keyboard avoiding view
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

const Login = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);

    return (
        <KeyboardAvoidingWrapper style={{ backgroundColor: { primary } }}>
            <StyledContainer>
                <InnerContainer>
                    <PageLogo resizeMode="contain" source={require('./../assets/img/logo.png')}></PageLogo>
                    <HeaderText style={{ color: darkLight, marginVertical: 10 }}>Logowanie</HeaderText>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values) => {
                            console.log(values);
                            navigation.navigate("MainNavigation");
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
                            <StyledButton onPress={handleSubmit}>
                                <StatsText style={{color: primary}}>
                                    Zaloguj się
                                </StatsText>
                            </StyledButton>
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

