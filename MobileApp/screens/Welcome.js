import React from "react";
import { StatusBar } from "expo-status-bar";

import {
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    WelcomeConteiner,
    WelcomeImage,
    Avatar,
    HeaderText,
    Colors
} from './../components/styles';

const { darkLight } = Colors;

const Welcome = () => {
    return (
        <>
            <StatusBar style="dark" ></StatusBar>
            <InnerContainer>
                <WelcomeImage resizeMode="cover" source={require('./../assets/img/logo.png')} />
                <WelcomeConteiner>
                    <HeaderText style={{ fontSize: 35, color: darkLight }}>Witaj!</HeaderText>
                    <SubTitle welcome={true}>Jan Kowalski</SubTitle>
                    <SubTitle welcome={true}>jankowalski@gmail.com</SubTitle>
                    <StyledFormArea>
                        <Avatar resizeMode="cover" source={require('./../assets/img/avatar.png')}></Avatar>

                        <Line />
                        <StyledButton onpress={() => { }}>
                            <ButtonText>Wyloguj</ButtonText>
                        </StyledButton>

                    </StyledFormArea>
                </WelcomeConteiner>
            </InnerContainer>
        </>
    );
}


export default Welcome;