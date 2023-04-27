import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../components/Auth';
import { default as axios } from "../../api/axios"
import { useGoogleLogin } from '@react-oauth/google';
import { LogoIcon2, FacebookButton, CenterButton, Button, LoginButton, GoogleButton, LineForm, StyledForm, StyledInput, StyledButton, StyledAlert, StyledLabel, MainName, AllPage, LogoIcon } from './Elements';
import InputText from '../../components/Input/InputText';
import PasswordInput from '../../components/Input/PasswordInput';
import FacebookLogin from '@greatsumini/react-facebook-login';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authApi = useAuth();


  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const minPassword = 3;
  const navigate = useNavigate();
  const location = useLocation()

  const redirectPath = location.state?.path || '/';
  const LOGIN_URL = '/api/auth/login';

  const handleSubmit = async (e) => {
    if (password.length < minPassword && email.length !== 0) {
      setPasswordInvalid(true);
    } else {
      setPasswordInvalid(false);

      e.preventDefault();
      try {
        const response = await axios.post(LOGIN_URL,
          JSON.stringify({ email, password }),
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
        console.log(response?.data);
        console.log(response?.accessToken);
        console.log(JSON.stringify(response));
        authApi.login(email, password);
        navigate(redirectPath, { replace: true });
      } catch (err) {

        if (!err?.response) {
          console.log('No Server Response');
        } else if (err.response?.status === 409) {
          console.log('Username Taken');
        } else {
          console.log('Registration Failed')
          console.log(err)
          setPasswordInvalid(true);
        }
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

      const handleEmailChange = (value) => {
        setEmail(value);
      }
      const handlePasswordChange = (value) => {
        setPassword(value);
      }
    
/*
  const buttonEnabled = (username, password) => {
      if(username.length > 0 && password.length > 2 ) {
          setEnabled(true);
      } else {
          setEnabled(false);
      }
  }

  /*
    const buttonEnabled = (username, password) => {
        if(username.length > 0 && password.length > 2 ) {
            setEnabled(true);
        } else {
            setEnabled(false);
        }
    }
  */



  return (
    <AllPage>
      <MainName >LOGOWANIE</MainName>
      <StyledForm >
      <LogoIcon2 />

        <InputText label="email:" name="login" id="loginId" onChange={handleEmailChange}/>
        <PasswordInput label="hasło:" name="login" id="passwordId" onChange = {handlePasswordChange}/>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {passwordInvalid ? <StyledAlert>Podane hasło jest nieprawidłowe.</StyledAlert> : <></>}
          <LoginButton to='' type="submit" onClick={e => handleSubmit(e)}>Zaloguj się</LoginButton>
          {/*{ enabled ?<LoginButton to='/' type="submit" onClick = {e => handleSubmit(e)}>Zaloguj się</LoginButton> :<LoginButton to='' type="submit" onClick= {e => handleSubmit(e)}>Zaloguj się</LoginButton>}*/}
          {/*<Button to='/sign-up' type="button" >Zarejestruj się</Button>*/}
          <LineForm />
          <GoogleButton to='#' type="button" onClick={ () => login()} >Kontynuuj z Google{' '}</GoogleButton>
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
          <div style={{ fontSize: 12 }}>
          <small>Nie masz jeszcze konta? </small>
            <Link to='/sign-up' type="submit">Zarejestruj się!</Link>
          </div>
        </div>

      </StyledForm>
    </AllPage>
  );
}
