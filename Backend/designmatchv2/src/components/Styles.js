import {COLORS } from './Colors';
import styled from 'styled-components';


export const HeroContainer = styled.div`
    display: flex;
    position: relative;
    height: 100vh;
    justify-content: center;
    align-items: center;
    padding; 0 1rem;
`;
export const HeroBG = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;
export const HeroContent = styled.div`
    z-index: 3;
    max-height: 100%;
`;

export const HeroItems = styled.div`
display: flex;
flex-direction: column;
align-items: center;
text-align: center;
height: 25%;
max-height: 100%;
padding: 0;
color: #fff;
line-height: 1.1;
font-weight:bold;
`
export const HeroH1 = styled.div`
font-size: clamp(1.5rem, 6vw, 4rem);;
letter-spacing: 3px;
padding: 0 1rem;
`

export const HeroH2 = styled.div`
font-size: clamp(1rem, 3vw, 3rem);
`


