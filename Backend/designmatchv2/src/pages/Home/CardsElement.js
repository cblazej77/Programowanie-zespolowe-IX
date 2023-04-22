import styled from 'styled-components';
import { COLORS } from '../../components/Colors';

const { darkLight, primary, grey1 } = COLORS;

export const Cards2 = styled.div`
    background: transparent;
`

export const CardsContainer = styled.div`
display: flex;
flex-flow: column;
align-items: center;
max-width: 1120px;
width: 90%;
margin: 0 auto;
`

export const SortLabel = styled.div`
`;

export const SortButton = styled.button`
    margin-left: 10px;
`

//>*:not(HeroContainer)
export const Sort = styled.div`
    display: flex;
    justify-content: flex-end;
    max-width: 1120px;
    width: 90%;
    margin: 0 auto 0;
    align-items: center;
    list-style: none;
`
export const Sort2 = styled.div`
    display: flex;
    max-width: 1120px;
    width: 90%;
    margin: 0 auto 0;
    align-items: center;
    list-style: none;
`

export const FilterWrapper = styled.div`
    flex: 1;
    flex-flow: column;
    width: 15vw;
    height: auto;
    display: flex;
    background: ${primary};
    border-radius: 10px;
    box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.4);
    padding: 0vh 1vw 2vh 1vw;

`;

export const FilterLabel = styled.div`
    position: fixed;
    top: 13vh;
`;

export const TitleText = styled.text`
    color: ${darkLight};
    font-size: 4vh;
`;

export const SubtitleText = styled.text`
    color: ${grey1};
    font-size: 2.2vh;
    margin: 2.5vh 0px 1.5vh 0px;
`;

export const CheckBox = styled.input`
    display: none;
`;

export const CheckBoxLabel = styled.label`
    display: inline-block;
    margin-right: 1vw;
    width: 2vh;
    height: 2vh;
    border-radius: 50%;
    background: #fff;
    border: 2px solid ${darkLight};
    transition: all 150ms;
    cursor: pointer;
    &:hover {
        background: ${darkLight};
    }
    ${CheckBox}:checked + & {
        background: ${darkLight};
    }
    ${CheckBox}:focus + & {
        box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
    }
`;

export const JobText = styled(SubtitleText)`
    color: ${grey1};
    font-size: 2vh;
    margin: 0vh 0px 0vh 0px;
`;

export const CheckBoxWrapper = styled.div`
    flex-flow: row;
    margin-bottom: 1vh;
    flex-shrink: 0;
    align-items: center;
    display: flex;
`;

export const Input = styled.input`
    border-radius: 10px;
    border: 0px;
    color: ${grey1};
    font-size: 1.8vh;
    padding: 0.3vw 0.5vw 0.3vw 0.5vw;
`;

export const SortLayout = styled.div`
    position: fixed;
    width: 75vw;
    top: 14vh;
    left: 19vw;
`;

export const SortContainer = styled.select`
    border-radius: 10px;
    border: 0px;
    font-size: 1.9vh;
    padding: 0.5vh 2vw 0.5vh 0.5vw;
    color: ${grey1};
`;
export const SortOption = styled.option`
`;

export const CardsLabel = styled.div`
    position: fixed;
    top: 14vh;
    right: 1vw;
    bottom: 0;
    width: 80vw;
    overflow-y: scroll;
`;

export const CardsWrapper = styled.div`
    position: fixed;
    padding-top: 1vh;
    top: 18vh;
    right: 0;
    bottom: 0;
    width: 81vw;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 0.5vw;
      }
    
      &::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
    
      &::-webkit-scrollbar-thumb {
        background: #888;
      }
    
      &::-webkit-scrollbar-thumb:hover {
        background: ${darkLight};
      }
`;

export const CardLabel = styled.div`
    border-radius: 10px;
    display: flex;
    box-shadow: 4px 2px 10px 2px rgba(0, 0, 0, 0.2);
    margin-bottom: 2vh;
    margin-right: 1.5vw;
`;

export const CardAvatar = styled.img`
    height: 6vw;
    width: 6vw;
    border-radius: 100%;
    object-fit: cover;
`;

export const SimpleInfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 16vw;
    height: 14vw;
    margin-top: 5vh;
    flex-direction: column;
`;

export const NameText = styled(JobText)`
    color: ${darkLight};
    font-size: 1.5vw;
`;

export const RatingText = styled(NameText)`
    font-size: 0.8vw;
    margin-left: 0.2vw;
`;

export const ProjectPhoto = styled.img`
    margin: 0px 1px 0px 1px;
    width: 16vw;
    object-fit: cover;
`;