import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 96vh;
  align-items: center;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

export const TopSection = styled.div`
  margin-top: 4rem;
  margin-bottom: 2rem;
  height: 66%;
  display: flex;
  position: relative;
  width: 100%;
  @media screen max-width(1000px){
    
  }
`;

export const LeftWrapper = styled.div`
  margin: 0 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  justify-content: center;
  border-radius: 15px;
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.3);
`;

export const ProfileImage = styled.div`
    width: 60%;  
    align-items: center;
  `;

export const Image = styled.img`
  margin: 0 auto;
  width: 100%;
  max-width: 400px;
  border-radius: 50%;
  background: white;
  border: 3px solid #1D1D1F;
`;

export const LineForm = styled.div`
  background: #CCC;
  border-radius: 100%;
  margin: 20px 0;
  height: 1px;
  width: 100%;
`;


export const Button = styled(Link)`
    border: none;
    border-radius: 10px;
    box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.15);
    color: rgb(255, 255, 255);
    text-decoration: none;
    margin: 8px 0px;
    padding: 7px 15px;
    font-size: 14px;
    width: 100%;
    text-align: center;
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
    
`;

export const SmallButton = styled(Button)`
width: 45%;
`

export const RightWrapper = styled.div`
  margin: 0 5%;
  display: flex;
  padding: 60px;
  flex: 2;
  flex-direction: column;
  float: left;
  border-radius: 15px;
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.3);
`;

export const AboutMe = styled.text`
  margin: 0 50px;
  maxlength="500"
`

export const Left = styled.div`
  flex-basis: 50%;
`;
export const Right = styled(Left)`
`;

export const InfoRow = styled.div`
  margin: 0 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%%;
`

export const InfoColumnt = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
`

export const DataColumnt = styled(InfoColumnt)`
  margin: 0 25px;
  text-align: right;
  flex: 1;
`;
export const RightColumn = styled(InfoColumnt)`
  margin: 0 25px;
  flex: 3;
`;