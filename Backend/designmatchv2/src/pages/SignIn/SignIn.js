import React, {useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../components/Auth';
import {default as axios} from "../../api/axios"
import { CenterButton, Button, LoginButton, GoogleButton, LineForm, InputField, InputLabel,InputGroup, StyledForm, StyledInput, StyledButton, StyledAlert, StyledLabel, MainName, AllPage, LogoIcon} from './Elements';


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

export const SignIn =() => {
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

          try{
            const response = await axios.post(LOGIN_URL,
              JSON.stringify({email, password}),
              {
              headers: { 'Content-Type': 'application/json' },
              }
          );
          console.log(response?.data);
              console.log(response?.accessToken);
              console.log(JSON.stringify(response));
              authApi.login(email, password);
              navigate(redirectPath, {replace: true});
          }catch(err){

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
          /*{axios.post(
            'http://localhost:8080/api/auth/register',
            {
                'email': 'jakub1@gmail.com',
                'username': 'jakub1',
                'password': 'password',
                'firstname': 'Jakub',
                'lastname': 'Kasinski'
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
              console.log(response);
            }, (error) => {
              console.log(error);
            });
      }*/}
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
        <MainName >DESIGNMATCH</MainName>
        <StyledForm >
            <LogoIcon />            

            <Input required type="text" label="Email:" id="loginId" onChange={e => setEmail(e.target.value)}/>
            <Input required type="password" label="Haslo:" id="passwordId" onChange={e => setPassword(e.target.value)} />
            { passwordInvalid ? <StyledAlert>Password is invalid.</StyledAlert>: <LineForm />}
            
            <CenterButton>
              <Button to='/sign-up' type="button" >Zarejestruj się</Button>
              <LoginButton to='' type="submit" onClick= {e => handleSubmit(e)}>Zaloguj się</LoginButton>
              {/*{ enabled ?<LoginButton to='/' type="submit" onClick = {e => handleSubmit(e)}>Zaloguj się</LoginButton> :<LoginButton to='' type="submit" onClick= {e => handleSubmit(e)}>Zaloguj się</LoginButton>}*/}
            </CenterButton>
            <CenterButton>
              <GoogleButton to='/' type="button" >Kontynuuj z google</GoogleButton>
            </CenterButton>
            
        </StyledForm>
      </AllPage>
    )
}