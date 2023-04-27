import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from './Colors';

const { darkLight, gray1 } = COLORS;

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
  width: 100%;
  @media screen max-width(1000px){
    
  }
`;

export const LeftWrapper = styled.div`
  margin: 0 5%;
  display: flex;
  flex: 0.8;
  flex-direction: column;
  align-items: center;
  padding: 0vh 3vw 1vh 3vw;
  justify-content: center;
  border-radius: 15px;
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.3);
  height: 60vh;
`;

export const ProfileImage = styled.div`
    width: 20vh;  
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
    font-size: 0.7vw;
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
  height: 60vh;
  flex-direction: column;
  float: left;
  border-radius: 15px;
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.3);
  overflow: auto;
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

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 2;
`

export const DataColumnt = styled(LeftColumn)`
  margin: 0 25px;
  text-align: right;
  flex: 1;
`;
export const RightColumn = styled(LeftColumn)`
  margin: 0 25px;
  flex: 2;
`;

export const InfoText = styled.text`
  
`;

export const HeaderText = styled.text`
    font-size: 1vw;
    margin-bottom: 1vh;
`;

export const DataText = styled(InfoText)`
    font-weight: bold;
`;

export const LeftInfoRow = styled.div`
    margin-bottom: 1.5vh;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
`;

export const NameText = styled.text`
  color: ${darkLight};
  font-size: 3vh;
`;

export const JobText = styled.text`
    color: ${gray1};
    font-size: 0.9vw;
    margin: 0vh 0px 0vh 0px;
    padding-top: 1vh;
`;

export const RatingWrapper = styled.div`
    padding-top: 1vh;
`;

export const DownSection = styled.div`
    width: 100%;
`;