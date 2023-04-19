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
    min-width: 350px;
    
    @media screen and (max-width: 960px) {
      transform: translate(-50%, 10%);
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
    flex-direction: column;
    margin: 15px auto;
    transform: translateY(3rem);
    border-radius: 5px;
    min-width: 300px;
    max-width: 400px;
    padding: 24px;
    text-align: center;
    position: absolute;
    scale: 1.3;
    @media screen and (max-width: 540px) {
        padding: 35px 24px;
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
  margin-top: 5px;
  color: #F00;
  font-size: 12px;
`

export const MainName = styled.div`
    font-size: 2.35em;
    color: #555978;
    font-family: "Norwesterregular";
    position: absolute;
    transform: translateY(-1.6rem);
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
  margin: 10px 0px 10px 0px;
  width: 80%;
  height: 1px;
  background-color: #bbb;
`;

export const CenterButton = styled.div`
  position: relative;
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 0.8rem;
  height: 100%;
  @media screen and (max-width: 540px) {
    padding-bottom: 0px;
    padding-top: 0px;
  }
`;

export const Button = styled(Link)`
    background: transparent;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.15);
    color: rgb(255, 255, 255);
    padding: 7px 0px;
    text-decoration: none;
    margin: 8px 0px;
    width: 80%;
    background: linear-gradient(
      to top,
      #4A4E69,
      #555978
  );
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
        transform: scale(1.05) ;
        transition: 0.3s;
        box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.4);
      }
    }
    
`



export const LoginButton = styled(Button)`
    box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.35);
    margin-top: 20px;
    font-size: 14px;
    @media screen and (max-width: 540px) {
      display: fixed;
      transform: translateX(0px);
      transform: translateY(-3rem);
      &:hover{
        transform: scale(1.05) translateY(-3rem);
      }
    }
    
`

export const GoogleButton = styled(Button)`
    background: linear-gradient(
      to top,
      #3dc428,
      #5ad946
    );
    padding: 10px 22px;
    font-size: 14px;
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
    background: transparent;
    @media screen and (max-width: 540px) {
      display: fixed;
      transform: translateY(1.3rem);
      &:hover{
        transform: scale(1.05) translateY(1.3rem);
      }
    }
`