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
`;

export const SortLabel = styled.div`
`;

export const SortButton = styled.button`
    margin-left: 10px;
`;

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
    width: 17rem;
    height: 80vh;
    display: flex;
    background: ${primary};
    border-radius: 10px;
    box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.4);
    padding: 0vh 1rem 10rem 1rem;
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

export const FilterLabel = styled.div`
    position: fixed;
    @media screen and (max-width: 960px) {
        display: none;
    }
`;

export const TitleText = styled.text`
    color: ${darkLight};
    font-size: 2.2rem;
`;

export const SubtitleText = styled.text`
    color: ${black};
    font-size: 1.2rem;
    margin: 1.8rem 0 0.8rem 0;
`;

export const CheckBox = styled.input`
    display: none;
`;

export const CheckBoxLabel = styled.label`
    display: inline-block;
    margin-right: 1rem;
    width: 1.1rem;
    height: 1.1rem;
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

// do zmiany
export const JobText = styled(SubtitleText)`
    color: ${gray1};
    font-size: 1rem;
    margin: 0;
    cursor: default;
    &:hover {
        color: ${darkLight};
    }
    ${CheckBox}:checked + & {
        color: ${darkLight};
    }
`;

export const CheckBoxWrapper = styled.div`
    flex-flow: row;
    margin-bottom: 0.7rem;
    flex-shrink: 0;
    align-items: center;
    display: flex;
`;

export const Input = styled.input`
    border-radius: 10px;
    border: 0px;
    color: ${darkLight};
    font-size: 1rem;
    padding: 0.2rem 1rem 0.2rem 0.5rem;
    ::placeholder {
        color: ${gray1};
    }
`;

export const SortLayout = styled.div`
    width: 75vw;
`;

export const StyledSelect = styled.select`
    border-radius: 10px;
    border: 0px;
    font-size: 1rem;
    padding: 0.2rem 1rem 0.2rem 0.5rem;
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
    width: 81vw;
    height: 82vh;
    padding-top: 1.3rem;
    padding-bottom: 10rem;
    overflow: auto;
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
    font-size: 1.5rem;
`;

export const RatingText = styled(NameText)`
    font-size: 0.8vw;
    margin-left: 0.2vw;
`;

export const CategoryText = styled(SubtitleText)`
    font-size: 1.2rem;
`;

export const RightLabel = styled.div`
    position: fixed;
    left: 21rem;
`;
