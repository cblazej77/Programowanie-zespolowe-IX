import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../components/Colors";

const { darkLight, gray, gray1, primary, white } = COLORS;

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
  margin-bottom: 2rem;
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
  justify-content: center;
  border-radius: 15px;
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.3);
  font-size: 0.9vw;
  height: 35rem;
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
  height: 35rem;
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
  border: 3px solid #1d1d1f;
`;

export const LineForm = styled.div`
  background: #ccc;
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
    cursor: not-allowed;
    background: ${gray1};
  );
    
    
`;

export const SmallButton = styled(Button)`
  width: 45%;
`;

export const Left = styled.div`
  flex-basis: 50%;
  padding-top: 2rem;
`;

export const Right = styled(Left)``;

export const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
`;

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

export const NameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0px;
`;

export const InputInfoText = styled.text`
  width: 100%;
  color: ${gray1};
  margin: 0.4rem 0px;
  font-size: 1rem;
`;

export const LevelContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const LevelSelect = styled.select`
  border-radius: 10px;
  border: 0px;
  font-size: 1.2rem;
  width: 100%;
  padding: 0.2rem 1rem 0.2rem 0.5rem;
  color: ${gray1};
`;

export const StyledTextarea = styled.textarea`
  &:hover {
    border: 1px solid ${darkLight};
  }
  color: ${darkLight};
  width: 100%;
  height: 3rem;
  white-space: nowrap;
  resize: none;
  overflow: hidden;
  font-size: 1.5rem;
  border-radius: 10px;
  background: ${white};
  border: 1px solid ${gray};
  margin-bottom: 1rem;
  padding: 0.5rem 0px 0rem 0.7rem;
`;

export const NameText = styled(StyledTextarea)``;

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
  width: 100%;
  
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

export const BubbleLinks = styled.a`

 padding: 5px 10px 5px 10px;
  display: inline-flex;
  margin-right: 15px;
  border-radius: 15px;
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.3);
  font-size: 16px;
  margin-bottom: 20px;
  margin-top: 5px;
`

export const  ModalBubble = styled.p`
  padding: 5px 10px 5px 10px;
  display: inline-flex;
  margin-right: 15px;
  border-radius: 15px;
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.3);
  font-size: 16px;
  margin-bottom: 20px;
  margin-top: 5px;
  ${(props) => props.checked === true && `
        fontSize: 18px;
        background-color: red;
    `}
`;

export const BoldLabel = styled.h3`
  margin-bottom: 5px;
`;

export const DataTextArena = styled.textarea`
  display: flex;
  text-align: right;
  font-weight: bold;
  resize: none;
  overflow: hidden;
  margin-left: 6vw;
`;

export const SmallInput = styled(StyledTextarea)`
  font-size: 1rem;
  height: 2.5rem;
`;

