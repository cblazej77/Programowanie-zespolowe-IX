import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Rating } from 'react-simple-star-rating'
import { Button, Image, LeftWrapper, LineForm, ProfileImage, ProfileWrapper, RightWrapper, TopSection } from '../components/ProfileElements'
const FirstScreen = 1954;//wyświetlić (15opini niżej)
const SecondScreen = 1000;

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
  const job = "3d Retail Designer";
  const city = "Toruń";
  const country = "Polska"
  const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."

  return (
    <ProfileWrapper>
      <TopSection>
        <LeftWrapper>
          <ProfileImage><Image src="/assets/test.jpg" alt="Profile" /></ProfileImage>
          <text>{name} {surname}</text>
          <text>{job}</text>
          <div>
            {/*<RatingIcon>&#9733;</RatingIcon><RatingIcon>&#9733;</RatingIcon><RatingIcon>&#9733;</RatingIcon><RatingIcon>&#11240;</RatingIcon><RatingIcon>&#9734;</RatingIcon>*/}
            <Rating
              allowFraction={true}
              initialValue={ratingCount}
              onClick={handleRating}
              onPointerEnter={onPointerEnter}
              onPointerLeave={onPointerLeave}
              onPointerMove={onPointerMove}
            />
            <text>({reviewCount} opinii)</text>
          </div>
          <LineForm />
          <Button>Napisz wiadomość</Button>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <Button style={{width: "45%"}}>Napisz opinię</Button>
            <Button style={{width: "45%"}}>Obserwuj</Button>
          </div>
        </LeftWrapper>
        <RightWrapper>
          <text>O mnie:</text>
          <text>{description}</text>
          <LineForm />
        </RightWrapper>
      </TopSection>
    </ProfileWrapper>
  );


  //   return (
  //     <ProfileWrapper>
  //       <TopSection>
  //         <LeftWrapper>
  //           {/* Obrazek test.jpg jest zdecydowanie za duzy[rozdzielczosc] */}
  //           <ProfileImage><Image src="/assets/test.jpg" alt="Profile" /></ProfileImage>
  //           <UserName>{name} { surname}</UserName>
  //           <UserInfo>{city}, {country}</UserInfo>
  // <RatingWrapper>
  //   {/*<RatingIcon>&#9733;</RatingIcon><RatingIcon>&#9733;</RatingIcon><RatingIcon>&#9733;</RatingIcon><RatingIcon>&#11240;</RatingIcon><RatingIcon>&#9734;</RatingIcon>*/}
  //   <Rating
  //     allowFraction = {true}
  //     initialValue={ratingCount}
  //     onClick={handleRating}
  //     onPointerEnter={onPointerEnter}
  //     onPointerLeave={onPointerLeave}
  //     onPointerMove={onPointerMove}
  //  />

  // </RatingWrapper>
  //           <label>({reviewCount} opini)</label>
  //           <MessageButton>Wiadomość</MessageButton>
  //           <JoinedDate>Joined: 01/01/2022</JoinedDate>
  //         </LeftWrapper>
  //         {click && <RightWrapper>
  //           <BoldLabel>O mnie: </BoldLabel>
  //           <Description>{description}</Description>
  //           <BoldLabel>Umiejętności: </BoldLabel>
  //           <SkillsWrap>
  //             <Skills>Łowienie</Skills>
  //             <Skills>Rybki</Skills>
  //           </SkillsWrap>
  //           <InfoWrapper>
  //           <BoldLabel>Linki: </BoldLabel>
  //             <Links>
  //               <a href="#">Portfolio</a>
  //               <a href="#">LinkedIn</a>
  //             </Links>

  //           </InfoWrapper>
  //           <LineForm />
  //           <BoldLabel>Języki: </BoldLabel>
  //             <Languages> English, Spanish</Languages>
  //             <BoldLabel>Doświadczenie zawodowe: </BoldLabel>


  //           </RightWrapper> }
  //   </TopSection>
  //   <BottomSection>
  //     {click && <>
  //       <Project></Project>
  //       <Project></Project>
  //       <Project></Project>
  //       <Project></Project>
  //       <Project></Project>
  //     <Project></Project> 
  //      </>}
  //   </BottomSection>

  // </ProfileWrapper>
  // );


};


export default UserPage;