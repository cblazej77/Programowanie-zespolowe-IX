import styled from 'styled-components';
import { COLORS } from '../../components/Colors';
import { TitleText } from './CardsElement';

const {
    darkLight,
    darkLight2,
    gray1,
    white,
    primary,
    secondary,
    secondary1
} = COLORS;

export const CommisionLabel = styled.div`
    border-radius: 10px;
    display: flex;
    box-shadow: 4px 2px 10px 2px rgba(0, 0, 0, 0.2);
    margin: 0.5rem 0 5vh 0;
    margin-right: 1vw;
    position: relative;
    width: 95%;
    flex-direction: column;
    padding: 0.5rem 1rem;
    background: ${secondary1};
    transition: transform 0.3s ease;
    &:hover {
        transform: scale(1.02);
    }
`;

export const ModalCommisionWrapper = styled.div`
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

export const ModalCommisionBackground = styled.div`
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

export const CommisionLineForm = styled.div`
    background: #CCC;
    border-radius: 100%;
    height: 1px;
    width: 100%;
    margin 1rem 0;
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
