import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../components/Auth';
import { default as axios } from "../../api/axios"
import { CenterButton, Button, LoginButton, GoogleButton, LineForm, InputField, InputLabel, InputGroup, StyledForm, StyledInput, StyledButton, StyledAlert, StyledLabel, MainName, AllPage, LogoIcon } from './Elements';


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

const Input: React.FC<InputProps> = ({ id, label, ...rest }) => {
  return (
    <InputGroup >
      <InputField style={{}} id={id} {...rest} />
      <InputLabel htmlFor={id} > {label}</InputLabel>
    </InputGroup>
  );
}

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
    if (password.length < minPassword && email.length != 0) {
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
        <LogoIcon />
        <Input required type="text" label="email@example.com" id="loginId" onChange={e => setEmail(e.target.value)} />
        <Input required type="password" label="************" id="passwordId" onChange={e => setPassword(e.target.value)} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {passwordInvalid ? <StyledAlert>Podane hasło jest nieprawidłowe.</StyledAlert> : <></>}
          <LoginButton to='' type="submit" onClick={e => handleSubmit(e)}>Zaloguj się</LoginButton>
          {/*{ enabled ?<LoginButton to='/' type="submit" onClick = {e => handleSubmit(e)}>Zaloguj się</LoginButton> :<LoginButton to='' type="submit" onClick= {e => handleSubmit(e)}>Zaloguj się</LoginButton>}*/}
          {/*<Button to='/sign-up' type="button" >Zarejestruj się</Button>*/}
          <LineForm />
          <GoogleButton to='/' type="button" >Kontynuuj z google</GoogleButton>
          <div style={{ fontSize: 12 }}>
            <text>Nie masz jeszcze konta? </text>
            <Link to='/sign-up' type="submit">Zarejestruj się!</Link>
          </div>
        </div>

      </StyledForm>
    </AllPage>
  );
}