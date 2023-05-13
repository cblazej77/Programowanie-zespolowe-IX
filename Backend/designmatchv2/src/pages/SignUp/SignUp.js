import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../components/Auth';
import { default as axios } from "../../api/axios";
import { useGoogleLogin } from '@react-oauth/google';
import { FacebookButton, ErrorLabel, ErrorLabel2, CenterInput, InputGroupSecond, CenterButton, Button, SignUpButton, GoogleButton, LineForm, StyledForm, StyledInput, StyledButton, StyledAlert, StyledLabel, MainName, AllPage, LogoIcon } from './Elements';
import InputText from '../../components/Input/InputText';
import PasswordInput from '../../components/Input/PasswordInput';
import FacebookLogin from '@greatsumini/react-facebook-login';
import ModalConfirm from '../../components/ModalConfirm';
import { useEffect } from 'react';
import { USERNAME_REGEX, NAME_REGEX, PASSWORD_REGEX, EMAIL_REGEX } from '../../components/Regex';

function LoginForm() {

  const [email, setEmail] = useState('');
  const [nick, setNick] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);//
  const [navigateGo, setNavigateGo] = useState(false);//po zamknięciu modala przekierowywuje na stronę główną
  const [submitting, setSubmitting] = useState(false);
  const [checkRegexEmail, setCheckRegexEmail] = useState(true);
  const [checkRegexNick, setCheckRegexNick] = useState(true);
  const [checkRegexName, setCheckRegexName] = useState(true);
  const [checkRegexSurname, setCheckRegexSurname] = useState(true);
  const [checkRegexPassword, setCheckRegexPassword] = useState(true);

  const [allInput, setAllInput] = useState(true);

  const authApi = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.path || '/';
  const REGISTER_URL = '/api/auth/register';

  const openModal = () => {
    setShowModal(prev => !prev);
  }

  const handleCheckBlockButton = () => {
    if(name === "" || surname === "" || nick === "" || email === "" || password === "") {
      setAllInput(false);
      setSubmitting(false);
    }
    else if(checkRegexName && checkRegexEmail && checkRegexNick && checkRegexSurname && checkRegexPassword){
      handleRegistration();
    }
    else  setSubmitting(false);

  }
  const clear = () => {
    setEmail("");
    setNick("");
    setName("");
    setSurname("");
    setPassword("");
    setCheckRegexEmail(true);
    setCheckRegexName(true);
    setCheckRegexNick(true);
    setCheckRegexPassword(true);
    setCheckRegexPassword(true);
    setAllInput(true);
  }

  const handleRegistration = async (e) => {
    try {
      setSubmitting(true);
      const response = await axios.post(REGISTER_URL,
        JSON.stringify({ email, username: nick, password, firstname: name, lastname: surname }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      setSubmitting(false);
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      openModal();
      clear();
    } catch (err) {
      setSubmitting(false);
      if (!err?.response) {
        console.log('No Server Response');
      } else if (err.response?.status === 409) {
        console.log('Username Taken');
      } else {
        console.log('Registration Failed');
        console.log(err)
      }
    }
  }

  const login = useGoogleLogin({
    onSuccess: CodeResponse  => {
      console.log(CodeResponse );
      authApi.login("Michal", "pssw");
      navigate(redirectPath, {replace: true});
    },
    flow: 'auth-code',
  });

    useEffect(() => {
      if(navigateGo) navigate('/');
    }, [navigateGo]);

  const handleName = (value) => {
    setName(value);
    if(value && namesPatternValidation(value)) {
      setCheckRegexName(true);
    }
    else{
      setCheckRegexName(false);
    }


  }
  const handleSurname = (value) => {
    setSurname(value);
    setAllInput(true);
    if(value && namesPatternValidation(value)) setCheckRegexSurname(true);
    else setCheckRegexSurname(false);
  }
  const handleNick = (value) => {
    setNick(value);
    setAllInput(true);
    if(value && usernamesPatternValidation(value)) setCheckRegexNick(true);
    else setCheckRegexNick(false);
  }
  const handleEmail = (value) => {
    setEmail(value);
    setAllInput(true);
    if(value && emailPatternValidation(value)) setCheckRegexEmail(true);
    else setCheckRegexEmail(false);
  
  }
  const handlePassword = (value) => {
    setPassword(value);
    setAllInput(true);
    if(value && passwordPatternValidation(value)) setCheckRegexPassword(true);
    else setCheckRegexPassword(false);
  }

  function passwordPatternValidation(password) {
    const regex = new RegExp(PASSWORD_REGEX);
    return regex.test(password);
  }

  function emailPatternValidation(email) {
    const regex = new RegExp(EMAIL_REGEX);
    return regex.test(email);
  }

  function namesPatternValidation(name) {
    const regex = new RegExp(NAME_REGEX);
    return regex.test(name);
  }

  function usernamesPatternValidation(username) {
    const regex = new RegExp(USERNAME_REGEX);
    return regex.test(username);
  }


  return (

    <>
    <ModalConfirm showModal={showModal} setShowModal={setShowModal} navigateGo={navigateGo} setNavigateGo={setNavigateGo}/>
    <AllPage>
      <MainName >REJESTRACJA</MainName>
      <StyledForm>
        <LogoIcon />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <InputText label="imię:" id="nameId" onChange={handleName} checkRegex={checkRegexName}/>
            <InputText label="nazwisko:" id="surnameId" onChange={handleSurname} checkRegex={checkRegexSurname}/>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            { ((!checkRegexName && name!=="") || (!checkRegexSurname && surname!=="")) &&<ErrorLabel2>Zaczyna sie mała literą lub wpisano niedozolone znaki w imieniu lub nazwisku</ErrorLabel2> }
          </div>
          
          <InputText label="nick:" id="nickId" onChange={handleNick} checkRegex={checkRegexNick}/>
          { (!checkRegexNick && nick!=="") && <ErrorLabel>Wpisano niedozwolone znaki w nazwie użytkownika</ErrorLabel> }
          <InputText label="email:" id="emailId" onChange={handleEmail} checkRegex={checkRegexEmail} />
          { (!checkRegexEmail && email !=="" ) && <ErrorLabel>Wpisano email w nieprawidłowym formacie.</ErrorLabel>}
          <PasswordInput label="hasło:" name="signUp" id="passwordId" onChange={handlePassword} checkRegex={checkRegexPassword}/>
          { (!checkRegexPassword && password!=="") && <ErrorLabel>Hasło musi zawierać wielkie i małe litery, liczby, oraz conajmiej jeden znak specjalny: !@#$%\nHasło musi zawierać między 8 a 24 znaki. </ErrorLabel>}
          { (!allInput) && <ErrorLabel>Wszystkie pola musza być zepełnione</ErrorLabel>}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            { !submitting ? <SignUpButton onClick={handleCheckBlockButton} type="submit" value="Submit">Zarejestruj się</SignUpButton> :
            <SignUpButton type="submit" value="Submit">Zarejestruj się</SignUpButton> }
            {/*{ enabled ?<LoginButton to='/' type="submit" onClick = {e => handleSubmit(e)}>Zaloguj się</LoginButton> :<LoginButton to='' type="submit" onClick= {e => handleSubmit(e)}>Zaloguj się</LoginButton>}*/}
            <LineForm />
            <GoogleButton to='' type="button" onClick={ () => login()} >Kontynuuj z google</GoogleButton>
            <FacebookLogin
  appId="739036054553215"
  scope={email}
  onSuccess={(response) => {
    console.log('Login Success!', response);
  }}
  onFail={(error) => {
    console.log('Login Failed!', error);
  }}
  onProfileSuccess={(response) => {
    console.log('Get Profile Success!', response);
    authApi.login(response.name, "passwordini");
    navigate(redirectPath, {replace: true});
    
  }}
  render={({ onClick }) => (
    <FacebookButton onClick={onClick} >Kontynuuj z Facebook</FacebookButton>
  )}
/>
            <div style={{ fontSize: 14 }}>
              <text>Masz już konto? </text>
              <Link to='/sign-in' type="button">Zaloguj się!</Link>
            </div>
          </div>
        </div>
      </StyledForm>
    </AllPage>
    </>
  )

}

export default LoginForm;