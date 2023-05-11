import styled from "styled-components";
import { COLORS } from "../../components/Colors";
import { Link } from "react-router-dom";

const {
  darkLight,
  darkLight2,
  primary,
  gray,
  gray1,
  secondary,
  secondary1,
  black,
  red,
  white,
} = COLORS;

export const ChatWrapper = styled.div`
  overflow: hidden;
`;

export const MessagesLabel = styled.div`
  position: fixed;
  bottom: 0;
  left: 2vw;
  height: calc(100vh - 6rem);
  width: 23rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  @media screen and (max-width: 960px) {
    display: none;
  }
`;

export const TitleText = styled.text`
  color: ${darkLight};
  font-size: 2.2rem;
`;

export const MessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${primary};
  border-radius: 10px;
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.4);
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.25rem;
  }

  &::-webkit-scrollbar-track {
    background: ${primary};
  }

  &::-webkit-scrollbar-thumb {
    background: ${gray1};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${darkLight};
  }
`;

export const DMWrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 2vw;
  height: calc(100vh - 6rem);
  width: calc(96% - 23rem - 3vw);
  flex-flow: column;
  background: ${primary};
  border-radius: 10px;
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.4);
`;

export const DMHeaderContainer = styled.div`
  padding: 0.5rem 0 0 0.5rem;
  width: 100%;
`;

export const DMName = styled.text`
  margin-left: 1rem;
  font-size: 2rem;
  color: ${darkLight};
`;

export const LineForm = styled.div`
  background: #ccc;
  border-radius: 100%;
  height: 1px;
  width: 100%;
`;

export const DMMessagesContainer = styled.div`
  height: calc(100% - 8.5rem);
  width: 100%;
`;

export const DMInputContainter = styled.div`
  width: 100%;
  padding: 1rem 0.5rem;
`;

export const Input = styled.input`
  border-radius: 10px;
  border: 0px;
  color: ${darkLight};
  font-size: 1.3rem;
  width: 100%;
  padding: 0.5rem 1rem;
  ::placeholder {
    color: ${gray1};
  }
`;

export const ElementContainer = styled.div`
  display: flex;
  padding: 0.5rem;
`;

export const Avatar = styled.img`
  height: 4rem;
  width: 4rem;
  border-radius: 100%;
  object-fit: cover;
`;

export const BasicInfoContainer = styled.div`
  padding: 0 0.5rem;
  display: flex;
  justify-content: center;
  width: 15rem;
  flex-direction: column;
`;

export const SmallNameText = styled.text`
  color: ${darkLight};
  font-size: 1.3rem;
`;

export const SmallText = styled.text`
  font-size: 0.9rem;
  color: ${gray1};
`;

export const DetailedInfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  width: 3rem;
  flex-direction: column;
`;

export const Notification = styled.span`
  background: ${red};
  color: ${white};
  border-radius: 15px;
  padding: 0rem 0.5rem;
  width: 2rem;
  display: flex;
  justify-content: center;
`;

