import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {default as axios} from "../../api/axios"
import { CenterInput,InputGroupSecond,  CenterButton, Button, SignUpButton, GoogleButton, LineForm, InputField, InputLabel,InputGroup, StyledForm, StyledInput, StyledButton, StyledAlert, StyledLabel, MainName, AllPage, LogoIcon} from './Elements';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    id: string;
    label: string;
}

  const Input: React.FC<InputProps> = ({ id, label, ...rest}) => {
    return (
      <InputGroup>
        <InputField id={id} {...rest}/>
        <InputLabel htmlFor={id} > {label}</InputLabel>
      </InputGroup>
    );
  }

  const InputSecond: React.FC<InputProps> = ({ id, label, ...rest}) => {
    return (
      <InputGroupSecond>
        <InputField id={id} {...rest}/>
        <InputLabel htmlFor={id} > {label}</InputLabel>
      </InputGroupSecond>
    );
  }



function LoginForm() {

  const[email, setEmail] = useState('');
  const[name, setName] = useState('');
  const[surname, setSurname] = useState('');
  const[password, setPassword] = useState('');
  const[passwordSecond, setPasswordSecond] = useState('');

  const navigate = useNavigate();
  const REGISTER_URL = '/api/auth/register';

  const handleRegistration = async (e) => {
    try{
      const response = await axios.post(REGISTER_URL,
        JSON.stringify({email, username: "brak2", password, firstname: name, lastname: surname}),
        {
        headers: { 'Content-Type': 'application/json' },
        }
    );
    console.log(response?.data);
        console.log(response?.accessToken);
        console.log(JSON.stringify(response));
        navigate('/');
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
  }

    return (
      <AllPage>
        <MainName >DESIGNMATCH</MainName>
        <StyledForm >
            <LogoIcon />
            
            <CenterInput>
                <Input required type="text" label="Imie:" id="nameId" onChange={e => setName(e.target.value)} />
                <InputSecond required type="text" label="Nazwisko:" id="surnameId"  onChange={e => setSurname(e.target.value)} />
            </CenterInput>

            <CenterInput>
              <Input required type="text" label="Email:" id="emailId" onChange={e => setEmail(e.target.value)}/>
              <InputSecond required type="password" label="Haslo:" id="passwordId"  onChange={e => setPassword(e.target.value)} />
            </CenterInput>
            
            <LineForm />


            <CenterButton>
              <Button to='/sign-in'  type="submit">Zaloguj się</Button>
              <SignUpButton to='#;return false;' onClick={handleRegistration} type="submit" >Zarejestruj się</SignUpButton>
              {/*{ enabled ?<LoginButton to='/' type="submit" onClick = {e => handleSubmit(e)}>Zaloguj się</LoginButton> :<LoginButton to='' type="submit" onClick= {e => handleSubmit(e)}>Zaloguj się</LoginButton>}*/}
            </CenterButton>
            <CenterButton>
              <GoogleButton to='/' type="submit" >Kontynuuj z google</GoogleButton>
            </CenterButton>
            
        </StyledForm>
      </AllPage>
    )
}

export default LoginForm;