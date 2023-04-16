import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { default as axios } from "../../api/axios"
import { CenterInput, InputGroupSecond, CenterButton, Button, SignUpButton, GoogleButton, LineForm, InputField, InputLabel, InputGroup, StyledForm, StyledInput, StyledButton, StyledAlert, StyledLabel, MainName, AllPage, LogoIcon } from './Elements';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

const Input: React.FC<InputProps> = ({ id, label, ...rest }) => {
  return (
    <InputGroup>
      <InputField id={id} {...rest} />
      <InputLabel htmlFor={id} > {label}</InputLabel>
    </InputGroup>
  );
}

const InputSecond: React.FC<InputProps> = ({ id, label, ...rest }) => {
  return (
    <InputGroupSecond>
      <InputField id={id} {...rest} />
      <InputLabel htmlFor={id} > {label}</InputLabel>
    </InputGroupSecond>
  );
}



function LoginForm() {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordSecond, setPasswordSecond] = useState('');

  const navigate = useNavigate();
  const REGISTER_URL = '/api/auth/register';

  const handleRegistration = async (e) => {
    try {
      const response = await axios.post(REGISTER_URL,
        JSON.stringify({ email, username: "brak3", password, firstname: name, lastname: surname }),
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

  return (
    <AllPage>
      <MainName >REJESTRACJA</MainName>
      <StyledForm style={{}}>
        <LogoIcon />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex" }}>
            <Input required type="text" label="imię:" id="nameId" onChange={e => setName(e.target.value)} />
            <InputSecond required type="text" label="nazwisko:" id="surnameId" onChange={e => setSurname(e.target.value)} />
          </div>
          <Input required type="text" label="email:" id="emailId" onChange={e => setEmail(e.target.value)} />
          <Input required type="password" label="hasło:" id="passwordId" onChange={e => setPassword(e.target.value)} />
          <Input style={{marginBottom: 20}} required type="password" label="potwierdź hasło:" id="passwordId" onChange={e => setPassword(e.target.value)} />
          {/*<Button to='/sign-in' type="submit">Zaloguj się</Button>*/}
          <SignUpButton to='#;return false;' onClick={handleRegistration} type="submit" >Zarejestruj się</SignUpButton>
          {/*{ enabled ?<LoginButton to='/' type="submit" onClick = {e => handleSubmit(e)}>Zaloguj się</LoginButton> :<LoginButton to='' type="submit" onClick= {e => handleSubmit(e)}>Zaloguj się</LoginButton>}*/}
          <LineForm />
          <GoogleButton to='/' type="submit" >Kontynuuj z google</GoogleButton>
          <div style={{fontSize: 14}}>
            <text>Masz już konto? </text>
            <Link to='/sign-in' type="submit">Zaloguj się!</Link>
            </div>
        </div>
      </StyledForm>
    </AllPage>
  )
}

export default LoginForm;