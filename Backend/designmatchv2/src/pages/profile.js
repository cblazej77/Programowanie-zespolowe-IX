import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { Rating } from 'react-simple-star-rating'

const FirstScreen = 1954;//wyświetlić (15opini niżej)
const SecondScreen = 1000;


const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 96vh;
  align-items: center;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

const TopSection = styled.div`
  margin-top: 4rem;
  margin-bottom: 2rem;
  height: 66%;
  display: flex;
  width: 100%;
  flex: 1;
  @media screen max-width(1000px){
    
  }
`;

const LeftWrapper = styled.div`
  margin: 0 5%;
  display: flex;
  flex: 1;
  padding: 8rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.3);
`;
const ProfileImage = styled.div`
    width: 100%;  
    align-items: center;
  `;

const Image = styled.img`
  margin: 0 auto;
  width: 100%;
  max-width: 400px;
  border-radius: 50%;
  background: white;
  border: 3px solid #1D1D1F;
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const RatingIcon = styled.span`
  margin-right: 5px;
  font-size: 20px;
`;
const UserName = styled.h2`
  margin-top: 20px;
`;

const UserInfo = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;

const MessageButton = styled.button`
  background-color: #008cff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  margin: 30px auto;
  &:hover {
    background-color: #0070c0;
  }
`;

const RightWrapper = styled.div`
  margin: 0 5%;
  display: flex;
  padding: 15rem;
  flex: 2;
  flex-direction: column;
  float: left;
  border-radius: 15px;
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.3);
`;

const Description = styled.p`
  margin-left: 50px;
  font-size: 16px;
  margin-bottom: 20px;
`;
const SkillsWrap = styled.div`
`;
const Skills = styled.p`
  padding: 8px;
  display: inline-flex;
  margin-right: 15px;

  border-radius: 15px;
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.3);
  font-size: 16px;
  margin-bottom: 20px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const JoinedDate = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  & > a {
    margin-right: 10px;
    font-size: 16px;
  }
`;

const Languages = styled.p`
  font-size: 16px;
`;
const BoldLabel = styled.h3`
`

const BottomSection = styled.div`
  border: solid green;
  display: flex;
  flex-wrap: wrap;
  width: 66%;
  flex: 1;
`;

const Project = styled.div`
  width: 300px;
  height: 300px;
  margin: 10px;
  background-color: #eee;
  border: solid black;
`;

const LeftColumn = styled.div`
  border: solid black;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  border-right: 1px solid #ccc;
  box-sizing: border-box;
`;

const RightColumn = styled.div`
  border: solid black;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
`;
const LineForm = styled.div`
background: rgba(0, 0, 0, 0.5);
border-radius: 100%;
height: 1px;
margin: 0 5% 0;
`

//UserName/UserInfo/MessageButton
const UserPage = () => {

  const [rating, setRating] = useState(0); //rating wyslac do bazy jako ocenę

  const [click, setClick] = useState(true);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);

  const handleRating = (rate: number) => {
    setRating(rate)
  }

  const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () => console.log('Leave')
  const onPointerMove = (value: number, index: number) => console.log(value, index)

  const showButton = () => {
    if (window.innerWidth <= 1000) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  const reviewCount = 15;//pobrac to z bazy
  const ratingCount = 2.5;//pobrac z bazy
  const name = "Dan";
  const surname = "Hiong";
  const city = "Toruń";
  const country = "Polska"
  const description ="Lorem ipsum dolor sit amet, consectetur adipiscing elit."

  return (
    <ProfileWrapper>
      <TopSection>
        <LeftWrapper>
          {/* Obrazek test.jpg jest zdecydowanie za duzy[rozdzielczosc] */}
          <ProfileImage><Image src="/assets/test.jpg" alt="Profile" /></ProfileImage>
          <UserName>{name} { surname}</UserName>
          <UserInfo>{city}, {country}</UserInfo>
          <RatingWrapper>
            {/*<RatingIcon>&#9733;</RatingIcon><RatingIcon>&#9733;</RatingIcon><RatingIcon>&#9733;</RatingIcon><RatingIcon>&#11240;</RatingIcon><RatingIcon>&#9734;</RatingIcon>*/}
            <Rating
              allowFraction = {true}
              initialValue={ratingCount}
              onClick={handleRating}
              onPointerEnter={onPointerEnter}
              onPointerLeave={onPointerLeave}
              onPointerMove={onPointerMove}
           />
            
          </RatingWrapper>
          <label>({reviewCount} opini)</label>
          <MessageButton>Wiadomość</MessageButton>
          <JoinedDate>Joined: 01/01/2022</JoinedDate>
        </LeftWrapper>
        {click && <RightWrapper>
          <BoldLabel>O mnie: </BoldLabel>
          <Description>{description}</Description>
          <BoldLabel>Umiejętności: </BoldLabel>
          <SkillsWrap>
            <Skills>Łowienie</Skills>
            <Skills>Rybki</Skills>
          </SkillsWrap>
          <InfoWrapper>
          <BoldLabel>Linki: </BoldLabel>
            <Links>
              <a href="#">Portfolio</a>
              <a href="#">LinkedIn</a>
            </Links>
            
          </InfoWrapper>
          <LineForm />
          <BoldLabel>Języki: </BoldLabel>
            <Languages> English, Spanish</Languages>
            <BoldLabel>Doświadczenie zawodowe: </BoldLabel>
          
       
          </RightWrapper> }
  </TopSection>
  <BottomSection>
    {click && <>
      <Project></Project>
      <Project></Project>
      <Project></Project>
      <Project></Project>
      <Project></Project>
    <Project></Project> 
     </>}
  </BottomSection>

</ProfileWrapper>
);
};


export default UserPage;