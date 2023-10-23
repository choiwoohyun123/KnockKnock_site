import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UserProfile from "./UserProfile";
import TodayGame from "./TodayGame";
import * as Api from "../../api";
import UserModal from "./UserModal";
import { showAlert } from "../../assets/alert";
import { useNavigate } from "react-router-dom";
import { MOBILE_BREAK_POINT } from "../../components/layout/breakpoint.js";

const limit = 3;
const isLoverUser = ["Lover", "User"];
function TodayKnock() {
  const navigate = useNavigate();
  const [showStartModal, setShowStartModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [randomLovers, setRandomLovers] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);

  const [selectedCard, setSelectedCard] = useState();

  const usersGetRequest = async () => {
    try {
      const res = await Api.get(`users/network`);
      setRandomUsers(res.data.randomUsers);
    } catch (err) {
      if (err.response.data.message) {
        showAlert(err.response.data.message);
        navigate("/login", { replace: true });
      } else {
        alert("라우팅 경로가 잘못되었습니다.");
      }
    }
  };

  const cardsGetRequest = async () => {
    try {
      const res = await Api.get(`/cards?limit=${limit}`);
      setRandomLovers(res.data.randomLovers);
      setSelectedCard(res.data.card);
    } catch (err) {
      if (err.response.data.message) {
        // alert(err.response.data.message);
      } else {
        alert("라우팅 경로가 잘못되었습니다.");
      }
    }
  };

  const handleUserProfileClick = async (userId) => {
    try {
      const res = await Api.get(`/users/${userId}`);
      setSelectedUser(res.data);
      setShowUserModal(true);
    } catch (err) {
      if (err.response.data.message) {
        // alert(err.response.data.message);
      } else {
        alert("라우팅 경로가 잘못되었습니다.");
      }
    }
  };

  const handleStartClick = () => {
    setShowStartModal(true);
  };

  const handleStartModalExit = () => {
    cardsGetRequest();
    setShowStartModal(false);
  };

  const handleUserModalExit = () => {
    setShowUserModal(false);
  };

  const bannerImages = [
    "url('https://assets.xboxservices.com/assets/9d/26/9d2649d8-ce95-4845-9956-a8b54715d112.jpg?n=Accessory-Hub_Page-Hero-1084_403913_1920x720.jpg')",
  ];

  // const [bannerIndex, setBannerIndex] = useState(0);

  // const handleNextBanner = () => {
  //   setBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
  // };

  // const handlePrevBanner = () => {
  //   setBannerIndex((prevIndex) =>
  //     prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
  //   );
  // };

  useEffect(() => {
    usersGetRequest();
    cardsGetRequest();
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <div style={{ height: "10vh" }} />
      <Banner onClick={handleStartClick}>
        <StartButton onClick={handleStartClick}>START</StartButton>
        {/* <ArrowButtonLeft onClick={handlePrevBanner}>{"<"}</ArrowButtonLeft>
        <ArrowButtonRight onClick={handleNextBanner}>{">"}</ArrowButtonRight> */}
      </Banner>
      <div style={{ height: "3vh" }} />
      {showStartModal && (
        <ModalOverlay onClick={handleStartModalExit}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <TodayGame
              onExit={handleStartModalExit}
              selectedCard={selectedCard}
              onCardSelect={setSelectedCard}
            />
          </ModalContent>
        </ModalOverlay>
      )}
      {showUserModal && selectedUser && (
        <ModalOverlay onClick={handleUserModalExit}>
          <ModalContentUser onClick={(e) => e.stopPropagation()}>
            <CloseModalButton onClick={handleUserModalExit}>X</CloseModalButton>
            <UserModal user={selectedUser} onClose={handleUserModalExit} />
          </ModalContentUser>
        </ModalOverlay>
      )}

      {selectedCard && (
        <>
          <RandomUserExplainDiv>
            <p>같은 연애운을 가진 사람을 찾아봐요!</p>
          </RandomUserExplainDiv>
          <LoverProfilesContainer>
            {randomLovers.map((user) => (
              <UserProfile
                user={user.User}
                key={user.id}
                onClick={() => handleUserProfileClick(user.User.userId)}
                isLoverUser={isLoverUser[0]}
              />
            ))}
          </LoverProfilesContainer>
        </>
      )}
      <RandomUserExplainDiv>
        <p>랜덤으로 다양한 사람들을 만나볼까요?</p>
      </RandomUserExplainDiv>
      <UserProfilesContainer>
        {randomUsers.map((user) => (
          <UserProfile
            user={user}
            key={user.userId}
            onClick={() => handleUserProfileClick(user.userId)}
            isLoverUser={isLoverUser[1]}
          />
        ))}
      </UserProfilesContainer>
    </Container>
  );
}

export default TodayKnock;

const Container = styled.div`
  margin-bottom: 10rem;
`;

const Banner = styled.div`
  height: 40vh;
  display: flex;
  justify-content: flex-end;
  background-color: #391f41;
  background-image: url("/gamebackground.webp");
  position: relative;
  cursor: pointer;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  max-height: 100%;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);

  @media (max-width: 1024px) {
    height: 25vh;
  }
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    height: 20vh;
  }
`;

const StartButton = styled.button`
  font-family: "KIMM_Bold";
  margin-top: 1rem;
  margin-right: 1.2rem;
  height: 2rem;
  background-color: #e883de;
  color: #fff;
  padding: 10px 20px;
  border: 10px double #fff;
  border-radius: 5px;
  font-size: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    border: 10px double #3b0b0b;
    color: #391f41;
    transform: scale(1.02);
  }

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    height: 1rem;
    font-size: 10px;
    width: 4rem;
    margin-top: 0.5rem;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContentUser = styled.div`
  width: 30%;
  height: 85%;
  background-color: #ffffff;
  padding: 2rem;
  padding-top: 1.5rem;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  border-radius: 3rem;
  position: relative;

  @media (max-width: 1200px) {
    width: 50%;
    height: 80%;
  }
  @media (max-width: 900px) {
    width: 60%;
    height: 70%;
  }
  @media (max-width: 630px) {
    width: 70%;
    height: 70%;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  height: 80%;
  overflow: auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    width: 100%;
  }
`;

const LoverProfilesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15vw, 1fr));
  gap: 5%;
  row-gap: 1%;
  padding: 0 3%;
  margin: 0 0;
  align-items: center;
  justify-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(30vw, 1fr));
    gap: 0%;
    row-gap: 0%;
  }

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    grid-template-columns: repeat(auto-fit, minmax(20vw, 1fr));
    gap: 5%;
  }
`;

const UserProfilesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15vw, 1fr));
  gap: 10%;
  row-gap: 10%;
  padding: 5%;
  margin: 0 0;
  align-items: center;
  justify-items: center;

  @media (max-width: 800px) {
    grid-template-columns: repeat(auto-fit, minmax(20vw, 1fr));
    gap: 5%;
    row-gap: 10%;
  }

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    grid-template-columns: repeat(auto-fit, minmax(25vw, 1fr));
    gap: 5%;
    padding: 0 5%;
  }
`;

const RandomUserExplainDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 10px 20px;
  p {
    font-family: "KIMM_Bold";
    font-size: 2rem;
    color: #1d1d1f;
    font-weight: 600;
    line-height: 1.2;
    background-color: #fff0f5;
    padding: 5px;
    border-radius: 30px;
  }

  @media (max-width: 1024px) {
    margin: 0 0 50px 20px;
  }

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    p {
      font-size: 16px;
    }
    margin: 20px 20px 0 20px;
  }
`;
const CloseModalButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: transparent;
  color: #7b7b7b;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  margin-right: 0.8rem;
`;
