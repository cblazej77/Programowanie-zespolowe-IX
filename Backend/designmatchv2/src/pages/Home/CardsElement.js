import styled from 'styled-components';
import { COLORS } from '../../components/Colors';

const {
    darkLight,
    darkLight2,
    primary,
    gray,
    gray1,
    secondary,
    black
} = COLORS;

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
    height: 81vh;
    display: flex;
    background: ${primary};
    border-radius: 10px;
    box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.4);
    padding: 0vh 1vw 15vh 1vw;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 0.25vw;
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

export const FilterLabel = styled.div`
    position: fixed;
    top: 13vh;
`;

export const TitleText = styled.text`
    color: ${darkLight};
    font-size: 4vh;
`;

export const SubtitleText = styled.text`
    color: ${black};
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
    color: ${gray1};
    font-size: 0.9vw;
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
    color: ${darkLight};
    font-size: 1.8vh;
    padding: 0.3vw 0.5vw 0.3vw 0.5vw;
    ::placeholder {
        color: ${gray1};
    }
`;

export const SortLayout = styled.div`
    position: fixed;
    width: 75vw;
    top: 14vh;
    left: 19vw;
`;

export const StyledSelect = styled.select`
    border-radius: 10px;
    border: 0px;
    font-size: 1.9vh;
    padding: 0.5vh 2vw 0.5vh 0.5vw;
    color: ${gray1};
`;

//StyledOption, StyledOptgroup do stylizacji
export const StyledOption = styled.option`
`;

export const StyledOptgroup = styled.optgroup`
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
        background: ${primary};
      }
    
      &::-webkit-scrollbar-thumb {
        background: #888;
      }
    
      &::-webkit-scrollbar-thumb:hover {
        background: ${darkLight};
      }
`;

export const ProjectPhoto = styled.img`
    margin: 0px 1px 0px 1px;
    width: 15.5vw;
    object-fit: cover;
`;

export const FirstPhoto = styled(ProjectPhoto)`
`;

export const SimpleInfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 17vw;
    height: 14vw;
    margin-top: 5vh;
    flex-direction: column;
`;

export const DetailedInfoContainer = styled(SimpleInfoContainer)`
    position: absolute;
    left: 17vw;
    margin: 0px;
    width: 15.5vw;
    height: 16vw;
    opacity: 0;
`;

export const CardLabel = styled.div`
    border-radius: 10px;
    display: flex;
    box-shadow: 4px 2px 10px 2px rgba(0, 0, 0, 0.2);
    margin-bottom: 5vh;
    margin-right: 1vw;
    position: relative;
    &:hover > ${FirstPhoto} {
        transition: opacity 0.4s ease-out;
        opacity: 0.1;
    }
    &:hover > ${DetailedInfoContainer} {
        transition: opacity 0.4s ease-out;
        opacity: 1;
    }
`;

export const CardAvatar = styled.img`
    height: 7vw;
    width: 7vw;
    border-radius: 100%;
    object-fit: cover;
`;

export const NameText = styled(JobText)`
    color: ${darkLight};
    font-size: 1.5vw;
`;

export const RatingText = styled(NameText)`
    font-size: 0.8vw;
    margin-left: 0.2vw;
`;

export const CategoryText = styled(SubtitleText)`
    font-size: 1vw;
`;

