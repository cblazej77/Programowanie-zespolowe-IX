import React, {useState} from "react";
import { StatusBar } from "expo-status-bar";

//formik
import { Formik } from "formik";

//icons
import {Octicons, Ionicons} from '@expo/vector-icons'

import {
    StyledContainer,
    InnerContainer,
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
    HeaderText
} from './../components/styles';
import { View, TouchableOpacity, processColor } from "react-native";

//Colors
const {brand, darkLight, primary, tertiary} = Colors;

//keyboard avoiding view
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

//Datetimepicker
import DateTimePicker from '@react-native-community/datetimepicker';

const Signup = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1));

    //Actual date of birth to be sent
    const [dob, setDob] = useState();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setDob(currentDate);
    }

    const showDatePicker = () => {
        setShow(true);
    }

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" ></StatusBar>
                <InnerContainer>
                    <HeaderText style={{fontSize: 30, color: darkLight, marginBottom: 30}}>Rejestracja</HeaderText>
                    
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode='date'
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}
                    
                    <Formik
                    initialValues={{fullName: '', email: '', dateOfBirth: '', password: '', confirmPassword: ''}}
                    onSubmit={(values) => {
                        console.log(values);
                        navigation.navigate("Login");
                    }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                            <MyTextInput 
                                label = "Imie i Nazwisko"
                                icon="person"
                                placeholder="Jan Kowalski"
                                placeholderTextColor={'#00000088'}
                                onChangeText={handleChange('fullName')}
                                onBlur={handleBlur('fullName')}
                                value={values.fullName}
                            />
                            <MyTextInput 
                                label = "Adres Email"
                                icon="mail"
                                placeholder="email@example.com"
                                placeholderTextColor={'#00000088'}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />
                            <MyTextInput 
                                label = "Data urodzenia"
                                icon="calendar"
                                placeholder="YYYY - MM - DD"
                                placeholderTextColor={'#00000088'}
                                onChangeText={handleChange('dateOfBirth')}
                                onBlur={handleBlur('dateOfBirth')}
                                value={dob ? dob.toDateString() : ''}
                                isDate={true}                      
                                editable={false}
                                showDatePicker={showDatePicker}  
                            />
                            <MyTextInput 
                                label = "Hasło"
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
                            <MyTextInput 
                                label = "Potwierdź hasło"
                                icon="lock"
                                placeholder="************"
                                placeholderTextColor={'#00000088'}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                            />
                            <MsgBox>...</MsgBox>
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>
                                    Zarejestruj się
                                </ButtonText>
                            </StyledButton>
                            <Line />
                            <ExtraView>
                                    <ExtraText>Masz już konto? </ExtraText>
                                    <TextLink onPress={() => navigation.navigate("Login")}>
                                        <TextLinkContent>Zaloguj się!</TextLinkContent>
                                    </TextLink>
                                </ExtraView>
                        </StyledFormArea>)}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={darkLight} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            {!isDate && <StyledTextInput {...props} />}
            {isDate && <TouchableOpacity onPress={showDatePicker}>
                <StyledTextInput {...props} />
                </TouchableOpacity>}
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    )
}

export default Signup;