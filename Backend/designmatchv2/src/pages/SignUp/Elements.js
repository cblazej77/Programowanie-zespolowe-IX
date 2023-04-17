import styled from "styled-components"
import { Link } from 'react-router-dom';

import { xIcon } from "../../assets/img/svg/SvgIcons"


export const AllPage = styled.div`
    display: flex;
    position: relative;
    height: calc(83vh - 80px);
    justify-content: center;
    left: 50%;
    margin-right: 50%;
    margin-bottom: 10%;
    transform: translate(-50%, 17%);
    padding: 0 rem;
    @media screen and (max-width: 960px) {
      transform: translate(-50%, 10%);
     }
     @media screen and (max-width: 1544px) {
      height: calc(100vh - 80px);
     }
`

/*zwieksza caly formularz bez loga*/
export const StyledForm = styled.form`
    background: linear-gradient(
    to left,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.35)
    );
    box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.3);
    margin: 15px auto;
    border-radius: 15px;
    transform: translateY(3rem);
    min-width: 300px;
    max-width: 500px;
    padding: 24px;
    text-align: center;
    position: absolute;
    scale: 1.2;
    @media screen and (max-width: 540px) {
      padding: 36px 24px;
  }
`

export const StyledLabel = styled.label`
  display: block;
  position: relative;
  transform: translate(-37%, 1.9rem);
  color: lightgrey;
  font-size: 0.8rem;
  transition: left 0.3s, opacity 0.3s;
`

export const StyledInput = styled.input`
  display: absolute;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

export const StyledAlert = styled.div`
  padding: 10px;
  background-color: #f44336;
  color: white;
  margin: 5px auto 5px;
  border-radius: 5px;
`

  export const MainName = styled.div`
    font-size: 2.35em;
    color: rgba(255,255,255, 0.75);
    font-family: "Norwesterregular";
    position: absolute;
    transform: translateY(-1.2rem);
    @media screen and (max-width: 960px) {
       font-size: 0px;
      }
  `

  export const LogoIcon = styled(xIcon)`
  transform: translateY(-0.3rem);
  height: 80px;
  width: auto;
  color: white;
  border-radius: 50%;
  border: solid 1px rgba(255, 255, 2555, 1);
  overflow: hidden;
  `;

  export const LineForm = styled.div`
    background: rgba(255, 255, 255, 0.5);
    border-radius: 100%;
    height: 2px;
    margin: 30px auto 20px;
  `




export const InputLabel = styled.label`
  color: #8d8d8d;
  position: absolute;
  top: 21px;
  left: 55px;
  background: none;
  transform: translate(-1.5rem, -50%);
  transition: left 0.35s, opacity 0.3s;
`;

export const InputField = styled.input`
  outline: none;
  border: 1px solid #dadce0;
  font-size: 0.8rem;
  width: 95%;
  border: none;
  border-radius: 18px;
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.35);
  color: rgb(1, 1, 1);
  padding: 12px 24px;
  &:focus
  {
    border: 2px solid black;
  }

  &:valid + ${InputLabel}
  {
    left: 200px;
    opacity: 0;
  }

  &:focus + ${InputLabel}
  {
    left: 200px;
    opacity: 0;
    transition: 0.3s;
  }
`;
export const CenterInput = styled.div`
display: flex;
padding-bottom: 15px;
height: 100%;
position: relative;
@media screen and (max-width: 540px) {
  padding-bottom: 0px;
  padding-top: 0px;
}
`
export const InputGroup = styled.div`
  position: relative;
  top: 15px;
  padding-bottom: 15px;
  width: 100%;
  @media screen and (max-width: 540px) {
    padding-bottom: 60px;
  }
`;
export const InputGroupSecond = styled.div`
  position: relative;
  top: 15px;
  padding-bottom: 15px;
  width: 100%;
  @media screen and (max-width: 540px) {
    position: absolute;
    top: 65%;
  }
`;
  

export const CenterButton = styled.div`
  position: relative;
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 0.9rem;
  height: 100%;
  @media screen and (max-width: 540px) {
    padding-bottom: 0px;
    padding-top: 0px;
  }
`


export const Button = styled(Link)`
    background: transparent;
    border: none;
    border-radius: 18px;
    margin-left: 5px; 
    box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.15);
    color: rgb(255, 255, 255);
    padding: 10px 15px;
    text-decoration: none;
    @media screen and (max-width: 540px) {
      display: fixed;
      transform: translateY(2.5rem);
      &:hover{
        transform: scale(1.05) translateY(2.5rem);
        transition: 0.3s;
        border: 1px solid rgba(0, 0, 0, 0.5);
        box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.4);
      }
    }
    @media screen and (min-width: 540px) {
      &:hover{
       border: 1px solid rgba(0, 0, 0, 0.5);
        transform: scale(1.05);
        transition: 0.3s;
        box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.4);
      }
    }
    
`


export const SignUpButton = styled(Button)`
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.25)
    );
    margin-left: 15px; 
    box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.35);
    @media screen and (max-width: 540px) {
      display: fixed;
      margin-left: 5px; 
      transform: translateY(-3rem);
      &:hover{
        transform: scale(1.05) translateY(-3rem);
      }
    }
    
`
export const DisabledButton = styled(SignUpButton)`
color: currentColor;
  cursor: not-allowed;
  opacity: 0.5;
  `

export const GoogleButton = styled(Button)`
    background: transparent;
    padding: 10px 22px;
    @media screen and (max-width: 540px) {
      display: fixed;
      transform: translateY(0.7rem);
      &:hover{
        transform: scale(1.05) translateY(0.7rem);
      }
    }
`
export const FacebookButton = styled(Button)`
    background: transparent;
    @media screen and (max-width: 540px) {
      display: fixed;
      transform: translateY(1.3rem);
      &:hover{
        transform: scale(1.05) translateY(1.3rem);
      }
    }
`