import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import UserProfile from "./UserProfile";
import * as Api from "../../api";
import { MOBILE_BREAK_POINT } from "../../components/layout/breakpoint";
import { UserStateContext } from "../../context/user/UserProvider";

import Typewriter from "typewriter-effect";

const limit = 3;
const randomId = Math.floor(Math.random() * 10) + 1;

const TodayGame = ({ onExit, selectedCard, onCardSelect }) => {
  const userState = useContext(UserStateContext);

  const [showIntro, setShowIntro] = useState(true);

  const cardsGetRequest = async () => {
    try {
      const res = await Api.get(`/cards?limit=${limit}`);
      onCardSelect(res.data.card);
    } catch (err) {
      if (err.response.data.message) {
        // alert(err.response.data.message);
      } else {
        alert("라우팅 경로가 잘못되었습니다.");
      }
    }
  };

  const cardsPostRequset = async (cardId) => {
    try {
      await Api.post(`/cards?cardId=${cardId}`);
      cardsGetRequest();
    } catch (err) {
      if (err.response.data.message) {
        // alert(err.response.data.message);
      } else {
        alert("라우팅 경로가 잘못되었습니다.");
      }
    }
  };

  const handleCardClick = (cardId) => {
    // Start the animations
    const cards = document.querySelectorAll(".image-container");
    cards.forEach((card) => card.classList.add("animate"));

    setTimeout(() => {
      cardsPostRequset(cardId);
    }, 1000); // Wait for the animations to finish
  };

  const Intro = () => (
    <IntroContainer>
      <IntroImage src={"./gameExplain.png"} />
      <Typewriter
        options={{
          strings: ["이번 달 연애운을 알아볼까요?"],
          autoStart: true,
          loop: false,
          delay: 50, // this means 50ms delay between each character, adjust according to your needs
        }}
      />
    </IntroContainer>
  );

  useEffect(() => {
    if (showIntro) {
      setTimeout(() => {
        setShowIntro(false);
      }, 5000); // 5초 후에 사라짐
    }
  }, [showIntro]);


  useEffect(() => {
    cardsGetRequest();
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <>
      {showIntro ? (
        <Intro />
      ) : selectedCard ? (
        <>
          <CardDiv>
            <CardImageContainer>
              <CardImage src={selectedCard.CardFile?.File?.url} />
              <CardContent>
                <p>
                  <Nickname>{userState.user.nickname}</Nickname>
                  {selectedCard.content[0]}
                </p>
                <p>
                  <Nickname>{userState.user.nickname}</Nickname>
                  {selectedCard.content[1]}
                </p>
              </CardContent>
            </CardImageContainer>
          </CardDiv>
          <ExitBox>
            <ExitButton onClick={onExit}>Exit</ExitButton>
          </ExitBox>
        </>
      ) : (
        <>
          <Container>
            <ImageContainer className="image-container">
              <Image
                src={"011.png"}
                onClick={() => handleCardClick(randomId)}
              />
            </ImageContainer>
            <ImageContainer className="image-container">
              <Image
                src={"012.png"}
                onClick={() => handleCardClick(randomId)}
              />
            </ImageContainer>
            <ImageContainer className="image-container">
              <Image
                src={"011.png"}
                onClick={() => handleCardClick(randomId)}
              />
            </ImageContainer>
            <ImageContainer className="image-container">
              <Image
                src={"012.png"}
                onClick={() => handleCardClick(randomId)}
              />
            </ImageContainer>
            <ImageContainer className="image-container">
              <Image
                src={"011.png"}
                onClick={() => handleCardClick(randomId)}
              />
            </ImageContainer>
            <ImageContainer className="image-container">
              <Image
                src={"012.png"}
                onClick={() => handleCardClick(randomId)}
              />
            </ImageContainer>
            <ImageContainer className="image-container">
              <Image
                src={"011.png"}
                onClick={() => handleCardClick(randomId)}
              />
            </ImageContainer>
            <ImageContainer className="image-container">
              <Image
                src={"012.png"}
                onClick={() => handleCardClick(randomId)}
              />
            </ImageContainer>
            <ImageContainer className="image-container">
              <Image
                src={"011.png"}
                onClick={() => handleCardClick(randomId)}
              />
            </ImageContainer>
            <ImageContainer className="image-container">
              <Image
                src={"012.png"}
                onClick={() => handleCardClick(randomId)}
              />
            </ImageContainer>
          </Container>
          <ExitBox>
            <ExitButton onClick={onExit}>Exit</ExitButton>
          </ExitBox>
        </>
      )}
    </>
  );
};

export default TodayGame;
const moveToCenter = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(50% - 50px)); } /* 50px should be half of card width */
`;

// Fade out
const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

// Fade in
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const CardDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  // border: 3px solid yellow;
  background-image: url(/cardblack.jpg);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    background-size: cover;
  }
`;

const ExitBox = styled.div`
  display: flex;
  justify-content: center;

  animation: ${fadeIn} 2s;
`;

const ExitButton = styled.button`
  font-family: "KIMM_Bold";
  margin-top: 2rem;
  height: 2rem;
  background-color: #E883DE;
  color: #fff;
  padding: 10px 20px;
  border: 10px double #fff;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    border: 10px double #3b0b0b;
    color: #391F41;
    transform: scale(1.02);
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  animation: ${fadeIn} 2s;
`;

const ImageContainer = styled.div`
  flex: 0 0 20%; /* 초기 크기를 20%로 설정 (5장씩 나열) */
  min-width: 75px; /* 카드의 최소 크기 설정을 75px로 변경 */
  height: 70%; /* 높이를 절반으로 줄임 */
  background-color: #ffffff;
  text-align: center;
  line-height: 50px; /* line-height를 절반으로 줄임 */
  transition: width 1s, height 1s;

  /* 화면 크기에 따라 카드 수 변경 */
  @media (max-width: 1200px) {
    flex: 0 0 25%; /* 초기 크기를 30%로 설정 (4장씩 나열) */
  }

  @media (max-width: 800px) {
    flex: 0 0 33.33%; /* 초기 크기를 33.33%로 설정 (3장씩 나열) */
  }

  &.animate {
    animation: ${moveToCenter} 1s forwards, ${fadeOut} 1s 1s forwards;
  }
`;

const Image = styled.img`
  width: 50%; /* 너비를 절반으로 줄임 */
  height: 50%; /* 높이를 절반으로 줄임 */
  object-fit: cover;
  transition: width 1s, height 1s;

  ${ImageContainer}:hover & {
    width: 100px; /* hover 시 너비를 100px로 설정 */
    height: 150px; /* hover 시 높이를 150px로 설정 */
  }
`;

const CardImage = styled.img`
  margin-top: 30px;
  // border: 1px solid blue;
  border-radius: 10px;
  width: 30%;
  // height: 30%;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    width: 40%;
  }
`;

const CardImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 3s;
  // border: 1px solid red;
  height: 90%;
  width: 65%;
  margin-top: 50px;
  
  @media (max-width: 1024px) {
    width: 100%;
  }
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    width: 100%;
  }
  @media (max-height: 700px) {
    font-size: 0.5rem;
    width: 70%;
  }
`;
const CardContent = styled.div`
  margin: 20px 20px;
  padding: 5px;
  color: #fff;
  width: 45%;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    width: 80%;
  }
`;
const Nickname = styled.span`
  font-weight: bold;
  color: #ffc4c4;
`;

const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 70%;
  font-size: 2rem;
  font-family: "SEBANG_Gothic_Bold";
  animation: ${fadeIn} 2s, ${fadeOut} 2s 3s forwards; /* fade in 애니메이션은 2초 동안, 그리고 3초 후에 fade out 애니메이션을 2초 동안 적용 */

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    margin-top: 10%;
    width: 100%;
    font-size: 1rem;
    height: 60%;
  }
`;

const IntroImage = styled.img`
  width: 80%;
  height: 80%;


  @media (max-width: ${MOBILE_BREAK_POINT}) {
    width: 80%;
    height: 100%;
  }
`;
