import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
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

function LoginForm() {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordInvalid, setPasswordInvalid] = React.useState(false);
    const [enabled, setEnabled] = React.useState(false);
    const minPassword = 3;
    const navigate = useNavigate();

    const handleSubmit = (e) => {
      if (password.length < minPassword) {
          setPasswordInvalid(true);
      } else {
          setPasswordInvalid(false);
          //e.preventDefault();
          //navigate('/');
          axios.post(
            "http://localhost:8080/api/auth/login",
            {
              email: "emailTest@email.com",
              password: "test1"
            }
          )
          .then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });
      }
  }

  const usernameEntered = (e) => {
      setUsername(e);
       //buttonEnabled(username, password)
  }

  const passwordEntered = (e) => {
      setPassword(e);
      //buttonEnabled(username, password);
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

            <Input required type="text" label="Login:" id="loginId" value={username} onChange={e => usernameEntered(e.target.value)}/>
            <Input required type="password" label="Haslo:" id="passwordId" value={password} onChange={e => passwordEntered(e.target.value)} />
            
            { passwordInvalid ? <StyledAlert>Password is invalid.</StyledAlert>: <LineForm />}
            
            <CenterButton>
              <Button to='/sign-up' type="submit" >Zarejestruj się</Button>
              <LoginButton to='' type="submit" onClick= {e => handleSubmit(e)}>Zaloguj się</LoginButton>
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