import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Rating } from 'react-simple-star-rating'
import {default as axios} from '../api/axios'
import { RightColumn, InfoRow, InfoColumnt,DataColumnt, Right, Left, AboutMe, SmallButton, Button, Image, LeftWrapper, LineForm, ProfileImage, ProfileWrapper, RightWrapper, TopSection } from '../components/ProfileElements'
const FirstScreen = 1954;//wyświetlić (15opini niżej)
const SecondScreen = 1000;

const PROFILE_URL = '/api/artist/updateArtistProfile?username';



const BubbleWrap  = styled.div`
`;
const Bubble = styled.p`
  padding: 8px;
  display: inline-flex;
  margin-right: 15px;

  border-radius: 15px;
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.3);
  font-size: 16px;
  margin-bottom: 20px;
`;
const BoldLabel = styled.h3`
  margin-bottom: 5px;
`


//UserName/UserInfo/MessageButton
const UserPage = () => {
  const [get, setGet] = useState(null);
  
  const [rating, setRating] = useState(0); //rating wyslac do bazy jako ocenę
  const [click, setClick] = useState(true);
  const [button, setButton] = useState(true);
  
  useEffect(() => {
    axios.get(PROFILE_URL + "wd").then((Response) => {
      setGet(Response.data);
  });
  
  }, []);
  


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



  window.addEventListener('resize', showButton);

  const reviewCount = 15;//pobrac to z bazy
  const ratingCount = 2.5;//pobrac z bazy
  const name = "Dan";
  const surname = "Hiong";
  const job = "3d Retail Designer";
  const city = "Toruń";
  const country = "Polska"
  const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rutrum, lorem ut maximus blandit, justo nulla suscipit magna, in pharetra nisi erat eget ligula. Praesent lacinia pretium consequat. Curabitur tincidunt feugiat ipsum ut vulputate. Maecenas ultrices, est in luctus accumsan, est justo gravida sapien, eu finibus mi nunc in lorem. Cras fringilla turpis id dolor lobortis, ut hendrerit magna placerat. Suspendisse at eros scelerisque, tristique lacus elementum, sagittis lectus. Sed libero."
  return (
    <ProfileWrapper>
      <TopSection>
        <LeftWrapper>
          <ProfileImage><Image src="/assets/test.jpg" alt="Profile" /></ProfileImage>
          <text>{name} {surname}</text>
          <text>{get.level}</text>
          <div>
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
            <SmallButton  >Napisz opinię</SmallButton>
            <SmallButton > Obserwuj</SmallButton>
          </div>
        </LeftWrapper>
        <RightWrapper>
          <BoldLabel >O mnie:</BoldLabel>
          <AboutMe>{ get.bio }</AboutMe>
          <LineForm />
          <Left>
            <InfoRow>
              <InfoColumnt>
                <text>Członek od:</text>
                <text>Miasto: </text>
                <text>Obserwujący:</text>
                <text>Obserwowani:</text>
                <text>Prace: </text>
              </InfoColumnt>
              <DataColumnt>
                <text><b>20.20.2023</b></text>
                <text><b>{get.location}, {country}</b></text>
                <text><b>20</b></text>
                <text><b>5</b></text>
                <text><b>0</b></text>
              </DataColumnt>
              <RightColumn>
                <text>
                  Umiejętności:
                </text>
                <BubbleWrap>
                    <Bubble>Łowienie</Bubble>
                    <Bubble>Szycie</Bubble>
                </BubbleWrap>
                <text>
                  Języki:
                </text>
                <BubbleWrap>
                  <Bubble>Angielski</Bubble>
                  <Bubble>Matematyka</Bubble>
                </BubbleWrap>
                <text>
                  Linki:
                </text>
                <BubbleWrap>
                  <Bubble>GitHub</Bubble>
                  <Bubble>LinkedIn</Bubble>
                </BubbleWrap>
              </RightColumn>
            </InfoRow>
          </Left>
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
  
  /*const RightColumn = styled.div`
  border: solid black;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
`;
*/

};


export default UserPage;

/*
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

*/