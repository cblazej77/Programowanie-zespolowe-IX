import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../components/Auth';
import { default as axios } from "../../api/axios";
import { useGoogleLogin } from '@react-oauth/google';
import { FacebookButton, CenterInput, InputGroupSecond, CenterButton, Button, SignUpButton, GoogleButton, LineForm, StyledForm, StyledInput, StyledButton, StyledAlert, StyledLabel, MainName, AllPage, LogoIcon } from './Elements';
import InputText from '../../components/Input/InputText';
import PasswordInput from '../../components/Input/PasswordInput';
import FacebookLogin from '@greatsumini/react-facebook-login';

function LoginForm() {

  const [email, setEmail] = useState('');
  const [nick, setNick] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');

  const authApi = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || '/';
  const REGISTER_URL = '/api/auth/register';

  const handleRegistration = async (e) => {
    try {
      const response = await axios.post(REGISTER_URL,
        JSON.stringify({ email, username: nick, password, firstname: name, lastname: surname }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      navigate('/');
    } catch (err) {

      if (!err?.response) {
        console.log('No Server Response');
      } else if (err.response?.status === 409) {
        console.log('Username Taken');
      } else {
        console.log('Registration Failed')
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


  const handleName = (value) => {
    setName(value);
  }
  const handleSurname = (value) => {
    setSurname(value);
  }
  const handleNick = (value) => {
    setNick(value);
  }
  const handleEmail = (value) => {
    setEmail(value);
  }
  const handlePassword = (value) => {
    setPassword(value);
  }

  return (
    <AllPage>
      <MainName >REJESTRACJA</MainName>
      <StyledForm>
        <LogoIcon />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <InputText label="imię:" id="nameId" onChange={handleName} />
            <InputText label="nazwisko:" id="surnameId" onChange={handleSurname} />
          </div>
          <InputText label="nick:" id="nickId" onChange={handleNick} />
          <InputText label="email:" id="emailId" onChange={handleEmail} />
          <PasswordInput label="hasło:" name="signUp" id="passwordId" onChange={handlePassword} />
          
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <SignUpButton to='#;return false;' onClick={handleRegistration} type="submit" >Zarejestruj się</SignUpButton>
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
  )

  /*
   <FacebookButton>Kontynuuj z Facebook</FacebookButton>
   */
}

export default LoginForm;