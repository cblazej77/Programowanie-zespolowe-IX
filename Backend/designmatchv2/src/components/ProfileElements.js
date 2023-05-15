import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from './Colors';
import { TitleText } from '../pages/Home/CardsElement';
import { StyledTextarea } from '../pages/Profile/ProfileElements';

const { darkLight, darkLight2, gray1, white, primary } = COLORS;

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 96vh;
  align-items: center;
  box-sizing: border-box;
`;

export const TopSection = styled.div`
  margin-top: 4rem;
  margin-bottom: 7rem;
  display: flex;
  padding: 0 3vw;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 960px) {
    flex-direction: column;
    }
  }
`;

export const LeftWrapper = styled.div`
  display: flex;
  margin-right: 1.5vw;
  flex-direction: column;
  align-items: center;
  padding: 1rem 1.9rem;
  justify-content: space-evenly;
  border-radius: 15px;
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.3);
  font-size: 0.9vw;
  height: 30rem;
  width: 30rem;
  @media screen and (max-width: 960px) {
    width: 85vw;
    margin: 0;
  }
}
`;

export const RightWrapper = styled.div`
  margin-left: 1.5vw;
  display: flex;
  padding: 60px;
  height: 30rem;
  width: 55rem; 
  flex-direction: column;
  border-radius: 15px;
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.3);
  overflow: auto;
  @media screen and (max-width: 960px) {
      width: 85vw;
      height: auto;
      margin: 2rem 0 0 0;
  }
`;

export const ProfileImage = styled.div`
    width: 11rem;  
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
  margin: 1rem 0;
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
    padding: 7px 0px;
    font-size: 0.9rem;
    width: 100%;
    text-align: center;
    background: linear-gradient(
      to top,
      #4A4E69,
      #555978
  );
    
    
`;

export const SmallButton = styled(Button)`
  width: 45%;
`

export const Left = styled.div`
  flex-basis: 50%;
  padding-top: 2rem;
`;

export const Right = styled(Left)`
`;

export const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
`

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  margin-right: 1.8vw;
  @media screen and (max-width: 960px) {
    margin: 2rem 0 0 0;
  }
`;

export const RightColumn = styled(LeftColumn)`
  margin: 0 0 0 1.8vw;
  @media screen and (max-width: 960px) {
    margin: 2rem 0 0 0;
  }
`;

export const InfoText = styled.text`
  font-size: 1.1rem;
`;

export const HeaderText = styled.text`
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: ${darkLight};
`;

export const DataText = styled(InfoText)`
    font-weight: bold;
`;

export const LeftInfoRow = styled.div`
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
`;
export const BubbleLinks = styled.a.attrs(props => ({
  target: '_blank',
  rel: 'noopener',
  href: props.href.startsWith('http://') || props.href.startsWith('https://')
    ? props.href : `https://${props.href}`
}))`

 padding: 5px 10px 5px 10px;
  display: inline-flex;
  margin-right: 15px;
  border-radius: 15px;
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.3);
  font-size: 16px;
  margin-bottom: 20px;
  margin-top: 5px;
`

export const NameText = styled.text`
  color: ${darkLight};
  font-size: 2rem;
  padding-bottom: 0.5rem;
`;

export const JobText = styled.text`
    color: ${gray1};
    font-size: 1.2rem;
    margin-top: 0.2rem;
`;

export const RatingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 0rem;
`;

export const DownSection = styled.div`
    width: calc(85rem + 3vw);
    display: flex;
    flex-direction: column;
    @media screen and (max-width: calc(85rem + 3vw)) {
      width: calc(100% - 6vw);
    }
`;

export const BubbleWrap = styled.div`
  padding-top: 1rem;
`;

export const Bubble = styled.p`
  padding: 5px 10px 5px 10px;
  display: inline-flex;
  margin-right: 15px;
  border-radius: 15px;
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.3);
  font-size: 16px;
  margin-bottom: 20px;
  margin-top: 5px;
`;

export const BoldLabel = styled.h3`
  margin-bottom: 5px; 
`;

export const GuestButtons = styled.div`
    display: none;
    flex-direction: column;
    width: 100%;
`;

export const OwnerButtons = styled.div`
    display: flex;
    width: 100%;
`;

export const AboutMe = styled.text`
  margin: 0 50px;
  maxlength="500"
`;

export const DataColumnt = styled(LeftColumn)`
  margin: 0 25px;
  text-align: right;
  flex: 1;
`;

export const RatingText = styled(JobText)`
  font-size: 0.9rem;
`;

export const CommisionCard = styled.div`
  display: flex;
  padding: 1rem 1.5rem;
  border-radius: 15px;
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.3);
  flex-direction: column;
  margin-bottom: 2.5rem;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.02);
  }  
`;

export const CommisionTitle = styled(TitleText)`
  font-size: 2.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CommisionTitleContainer = styled.div`
  display: flex;
  allign-items: flex-start;
  max-width: 70rem;
`;

export const CommisionBubble = styled.p`
  display: inline-block;
  justify-content: center;
  align-items: flex-start;
  color: ${darkLight};
  border: 1px solid ${darkLight};
  border-radius: 15px;
  height: 1.6rem;
  font-size: 1rem;
  padding: 0rem 0.6rem; 
  margin: 0.2rem;
  vertical-align: top;
  @media screen and (max-width: 1280px) {
    font-size: 0.9rem;
    height: 1.4rem;
  }
`;

export const LevelBubble = styled(CommisionBubble)`
    background: ${darkLight2};
    color: ${white};
    margin-right: 1rem;
    border: 0px;
`;

export const CommisionText = styled.text`
  color: ${gray1};
  font-size: 1.2rem;
  margin-left: 0.5rem;
  margin-right: 1rem;
`;

export const CommisionTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CommisionBottom = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ModalBackground = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    left: 0;
    top: 0;
    background: rgba(255,255,255,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalWrapper = styled.div`
    overflow-y: auto; 
    width: 95rem;
    height: 80%;
    border-radius: 15px;
    flex-direction: column;
    background: ${primary};
    box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.4);
    display: flex;
    padding: 2rem;
    font-size: 1.5rem;
    @media screen and (max-width: 100rem) {
      width: 95%;
    }
    @media screen and (max-width: 1280px) {
      font-size: 1.2rem;
    }
`;

export const ModalTitle = styled.text`
  font-size: 150%;
  color: ${darkLight};
  margin-bottom: 1rem;
`;

export const ModalInfo = styled.text`
  color: ${gray1};
`;

export const ModalBottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
`;

export const ModalColumn = styled.div`
  display: flex;
  width: 47%;
  flex-direction: column;
  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

export const ModalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.7rem 0;
`;

export const ModalData = styled(ModalInfo)`
  font-weight: bold;
`;

export const ModalBubbleContainer = styled.div`
  margin-top: 1rem;
`;

export const InfoInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SmallTextArea = styled(StyledTextarea)`
  font-size: 1rem;
  height: 1.8rem;
  padding: 0.1rem 0 0 0.5rem;
`;


