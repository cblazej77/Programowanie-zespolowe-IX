import styled from "styled-components"
import { Link } from 'react-router-dom';

import { logo } from "../../assets/img/svg/SvgIcons"


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
    border-radius: 5px;
    transform: translateY(3rem);
    min-width: 300px;
    max-width: 500px;
    padding: 24px;
    text-align: center;
    position: absolute;
    scale: 1.15;
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
    color: #555978;
    transform: translateY(-1.8rem);
    @media screen and (max-width: 960px) {
       font-size: 0px;
      }
  `

  export const LogoIcon = styled(logo)`
  transform: translateY(-0.3rem);
  height: 200px;
  width: auto;
  color: #555978;
  `;

export const LineForm = styled.div`
  margin: 20px 0px 20px 0px;
  width: 100%;
  height: 1px;
  background-color: #bbb;
`;

export const InputLabel = styled.label`
  color: #888;
  position: absolute;
  top: 12px;
  left: 15px;
  background: none;
  font-size: 14px;
  transition: 0.3s;
`;

export const InputField = styled.input`
  outline: none;
  border: 0px solid #dadce0;
  font-size: 0.8rem;
  width: 100%;
  border: none;
  border-radius: 5px;
  color: rgb(1, 1, 1);
  padding: 12px 24px;
  background-color: #ddd;
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
  margin-left: 10px;
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
    border-radius: 5px;
    margin-left: 5px; 
    box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.15);
    color: rgb(255, 255, 255);
    padding: 10px 15px;
    background: transparent;
    text-decoration: none;
    width: 70%;
    font-size: 16px;
    background: linear-gradient(
      to top,
      #4A4E69,
      #555978
  );
  margin: 5px 0px;
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
      to top,
      #4A4E69,
      #555978
    );
    margin: 5px 0px;
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
  background: linear-gradient(
    to top,
    #3dc428,
    #5ad946
  );
  margin-bottom: 15px;
  @media screen and (max-width: 540px) {
      display: fixed;
      transform: translateY(0.7rem);
      &:hover{
        transform: scale(1.05) translateY(0.7rem);
      }
    }
`
export const FacebookButton = styled(Button)`
  background: linear-gradient(
    to top,
    #4267B2,
    #5074be
  );
  margin-bottom: 10px;
    @media screen and (max-width: 540px) {
      display: fixed;
      transform: translateY(1.3rem);
      &:hover{
        transform: scale(1.05) translateY(1.3rem);
      }
  }
`