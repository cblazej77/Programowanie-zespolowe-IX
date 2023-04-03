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

//API client
import axios from 'axios';

//Datetimepicker
//import DateTimePicker from '@react-native-community/datetimepicker';

const Signup = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    //const [date, setDate] = useState(new Date(2000, 0, 1));
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');

    //Actual date of birth to be sent
    // const [dob, setDob] = useState();

    // const onChange = (event, selectedDate) => {
    //     const currentDate = selectedDate || date;
    //     setShow(false);
    //     setDate(currentDate);
    //     setDob(currentDate);
    // }

    // const showDatePicker = () => {
    //     setShow(true);
    // }

    const handleSignup = async (credentials, setSubmitting) => {
        handleMessage(null);
        const url = 'http://192.168.1.106:8080/api/auth/register';
        // axios
        //     .post(url, credentials)
        //     .then((response) => {
        //         const result = response.data;
        //         const { message, status, data } = result;

        //         if (status !== 'SUCCESS') {
        //             handleMessage(message, status);
        //         } else {
        //             navigation.navigate('MainNavigation', { ...data });
        //         }
        //         setSubmitting(false);
        //     })
        //     .catch(error => {
        //         console.log(error.JSON());
        //         setSubmitting(false);
        //         handleMessage("Wystąpił bład. Sprawdź swoje połączenie sieciowe i spróbuj ponownie");
        //     });
            try{
                const response = await axios.post(url,
                  JSON.stringify({email, username, password, firstname, lastname}),
                  {
                  headers: { 'Content-Type': 'application/json' },
                  }
              );
              console.log(response?.data);
                  console.log(response?.accessToken);
                  console.log(JSON.stringify(response));
                  navigation.navigate('Login');
              }catch(err){
          
                  if (!err?.response) {
                      console.log('No Server Response');
                  } else if (err.response?.status === 409) {
                      console.log('Username Taken');
                  } else {
                      console.log('Registration Failed')
                      console.log(err)
                  }
              } 
    };

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
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
                    initialValues={{email: '', username: '', password: '', firstname: '', lastname: ''}}
                    onSubmit={(values, {setSubmitting}) => {
                        if(email == '' || 
                        password == '' || 
                        username == '' || 
                        confirmPassword == '' || 
                        firstname == '' || 
                        lastname == '') {
                            handleMessage('Proszę wypełnić wszystkie pola');
                            setSubmitting(false);
                        } else if(confirmPassword !== password) {
                            handleMessage('Hasła się nie zgadzają');
                            setSubmitting(false);
                        } else if(password.length < 8 && confirmPassword === password) {
                            handleMessage('Hasło musi zawierać conajmniej 8 znaków');
                            setSubmitting(false);
                        } else {
                            handleSignup(values, setSubmitting);
                        }
                    }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (<StyledFormArea>
                            <MyTextInput 
                                label = "Imie"
                                icon="person"
                                placeholder="Jan"
                                placeholderTextColor={'#00000088'}
                                onChangeText={setFirstname}
                                onBlur={handleBlur('firstname')}
                                value={firstname}
                            />
                            <MyTextInput 
                                label = "Nazwisko"
                                icon="person"
                                placeholder="Kowalski"
                                placeholderTextColor={'#00000088'}
                                onChangeText={setLastname}
                                onBlur={handleBlur('lastname')}
                                value={lastname}
                            />
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
                            {/* <MyTextInput 
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
                            /> */}
                            <MyTextInput 
                                label = "Nazwa użytkownika"
                                icon="person"
                                placeholder="JanArt"
                                placeholderTextColor={'#00000088'}
                                onChangeText={setUsername}
                                onBlur={handleBlur('username')}
                                value={username}
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
                            <MyTextInput 
                                label = "Potwierdź hasło"
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