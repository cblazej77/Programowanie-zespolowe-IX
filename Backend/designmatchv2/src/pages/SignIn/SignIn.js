import React from 'react';
import { CenterButton, Button, LoginButton, GoogleButton, LineForm, InputField, InputLabel,InputGroup, StyledForm, StyledInput, StyledButton, StyledAlert, StyledLabel, MainName, AllPage, LogoIcon} from './Elements';

function LoginForm() {


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

    return (
      <AllPage>
        <MainName >DESIGNMATCH</MainName>
        <StyledForm >
            <LogoIcon />            

            <Input required type="text" label="Login:" id="login" />
            <Input required type="password" label="Haslo:" id="password" />

            <LineForm />
      
            <CenterButton>
              <Button to='/sign-up' type="submit"  >Zarejestruj się</Button>
              <LoginButton to='/' type="submit" >Zaloguj się</LoginButton>  
            </CenterButton>
            <CenterButton>
              <GoogleButton to='/' type="submit" >Kontynuuj z google</GoogleButton>
            </CenterButton>
            
        </StyledForm>
      </AllPage>
    )
}

export default LoginForm;