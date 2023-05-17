import styled from "styled-components";
import { closeEye, openEye } from "../../assets/img/svg/SvgIcons";

export const LabelInput = styled.label`
  position: absolute;
  background: none;
  font-size: 1.3rem;
  top: 10px;
  left: 25px;
  transition: 0.3s;
  cursor: text;
  color: grey;
`;

export const InputGroup = styled.div`
    position: relative;
    padding-bottom: 15px;
    margin: 0px 0.3vw 0px 0.3vw;
`;

export const Input = styled.input`
outline: none;
border: 0 solid #dadce0;
font-size: 0.8rem;
width: 100%;
border-radius: 10px;
color: rgb(1, 1, 1);
padding: 12px 24px;

border-bottom: 2px solid ${({value, checkRegex}) => value ? (checkRegex ? 'black' : 'red') : 'none'};
padding-right: ${({isWithButton}) => isWithButton ? '45px' : '10px'};
&:valid + ${LabelInput}
{
  left: 250px;
  opacity: 0;
  
}
&::-ms-reveal {
  display: none
}
&:focus{
  border-bottom: 2px solid ${({value, checkRegex}) => value ? (checkRegex ? 'black' : 'red') : 'black'};//tutaj dziala po kliknieciu, a po wpisaniu dziala wyzej
}

&:focus + ${LabelInput}
{
  left: 250px;
  opacity: 0;
  transition: 0.4s;
}
`;
export const OpenEyeIcon = styled(openEye)`
  height: 30px;
  width: auto;
  transform: translateY( 0.2rem);
`
export const CloseEyeIcon = styled(closeEye)`
  height: 30px;
  width: auto;
  transform: translateY( 0.2rem);
`

export const NotButton = styled.div`
    position: absolute;
    transform: translateX(-39px);
    display: inline;
    cursor: pointer;
    padding: 2px 5px;
    &:hover
    {
        border-radius: 0 10px 10px 0;
        background: lightgrey;
    }
`;

