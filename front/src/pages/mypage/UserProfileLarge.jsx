import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import * as S from "./style";
import * as Api from "../../api";
// import { UserStateContext } from "../../App";
import UserProfileEdit from "./UserProfileEdit";
import UserNewPwdandOut from "./UserNewPwdandOut";
import { getImageSrc } from "../../util/imageCheck";
import { UserStateContext } from "../../context/user/UserProvider";
import { MOBILE_BREAK_POINT } from "../../components/layout/breakpoint";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

const UserProfileContainer = styled.div`
  width: 22rem;
  margin-top: -2rem;
  /* border: 2px solid blue; */
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    width: 100%;
    z-index: 2;
  }
`;
const UserProfileBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  /* margin-left: 3rem; */
  /* margin-right: 3rem; */
  /* border: 2px solid red; */
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    margin-left: 0;
    margin-right: 0;
  }
`;
const Nickname = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #4b4a4a;
  font-size: 2rem;
  font-family: "KIMM_Bold";
  margin: 0.5rem;
`;

const Email = styled.div`
  margin: 0.8rem;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #cacaca;
`;

const Tagline = styled.div`
  border: 0.1rem #bcbcbc;
  height: auto;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #676565;
  font-size: 0.9rem;
  font-family: "KIMM_Bold";
`;

const UserInformation = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;
const UserPersonalInformation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin: 1rem auto;

  /* border: 3px solid black; */
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    flex-direction: row;
    justify-content: center;
  }
`;
const UserLineContainer = styled.div`
  display: flex;
  // width: 10rem;
  margin-bottom: 0.3rem;
  justify-content: space-around;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border: 1px solid black;
`;
const UserLine = styled.h3`
  margin: 0.3rem;
  /* color: #8f8f8f; */
  color: black;
  font-size: 1rem;
  font-family: "KIMM_Bold";
`;

const HobbyBox = styled.div`
  width: 3.8rem;
  height: 2rem;
  border-radius: 2rem;
  background-color: #fa9393;
  margin: 0rem 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.7rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;
const IdealBox = styled.div`
  width: 3.8rem;
  height: 2rem;
  border-radius: 2rem;
  background-color: rgb(248, 143, 255);
  margin: 0rem 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.7rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const PersonBox = styled.div`
  width: 3.8rem;
  height: 2rem;
  border-radius: 2rem;
  background-color: #87d5fc;
  margin: 0rem 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.7rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;
const HobbyBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  top: 50%;
  left: 50%;
  /* transform: translate(20%, 20%); */
  margin: 2rem;
  /* width: 15rem; */
  /* border: 1px solid green; */
`;
const ProfilePicture = styled.img`
  width: 8rem;
  height: 8rem;
  border-color: #f2f2f2e2;
  border-width: 4px;
  border-style: solid;
  border-radius: 100%;
  margin-top: -5.5rem;
  margin-right: 50rem;
  margin-left: 8rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    position: relative;
    top: initial;
    left: initial;
    transform: initial;
    margin: 0 auto;
    display: block;
    margin-top: -5rem; /* Adjust as needed */
    margin-bottom: 1rem; /* Adjust as needed */
    z-index: 1000;
  }
`;
function shuffleArray(array) {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
let formattedJob;
const UserProfileLarge = () => {
  const [user, setUser] = useState([]);
  const userState = useContext(UserStateContext);

  useEffect(() => {
    Api.get("/users/mypage")
      .then((response) => {
        setUser(response.data);
        console.log(userState);
      })
      .catch((error) => {
        console.error("API 호출 오류:", error);
      });
  }, [userState]);
  const shuffledHobby = shuffleArray(user.hobby || []);
  const shuffledIdeal = shuffleArray(user.ideal || []);
  const shuffledPersonality = shuffleArray(user.personality || []);

  return (
    <UserProfileContainer>
      <ProfilePicture
        src={getImageSrc(user.profileImage)}
        alt="Profile Picture"
        style={{ backgroundColor: "#f2f2f2e2" }}
      />
      <S.ButtonSection>
        <UserProfileEdit user={user} />
        <UserNewPwdandOut user={user} />
      </S.ButtonSection>
      <UserProfileBox>
        <UserInformation>
          <Nickname>{user.nickname}</Nickname>
          <Email>{user.email}</Email>
          <Tagline>{user.introduce}</Tagline>
        </UserInformation>
        <UserPersonalInformation>
          {user.mbti !== "" && <UserLine>{user.mbti}</UserLine>}

          {user.height !== 0 && <UserLine>{user.height + "cm"}</UserLine>}
          <UserLine>
            {userState.user.job.length > 3
              ? `${userState.user.job.slice(0, 3)}...`
              : userState.user.job}
          </UserLine>
          <UserLine>{user.region}</UserLine>
        </UserPersonalInformation>
      </UserProfileBox>
      <p
        style={{
          textAlign: "center",
          fontSize: "1rem",
          fontFamily: "KIMM_Bold",
          margin: "0",
        }}
      >
        <span style={{ padding: "5px", color: "#fa9393" }}>취미</span>
        <span style={{ padding: "5px", color: "rgb(248, 143, 255)" }}>
          성격
        </span>
        <span style={{ padding: "5px", color: "#87d5fc" }}>이상형</span>
      </p>
      <HobbyBoxContainer>
        {shuffledHobby.map((hobby, index) => (
          <HobbyBox key={index} style={{ order: index }}>
            {hobby}
          </HobbyBox>
        ))}
      </HobbyBoxContainer>
      <HobbyBoxContainer>
        {shuffledIdeal.map((ideal, index) => (
          <IdealBox key={index} style={{ order: index }}>
            {ideal}
          </IdealBox>
        ))}
      </HobbyBoxContainer>
      <HobbyBoxContainer>
        {shuffledPersonality.map((personality, index) => (
          <PersonBox key={index} style={{ order: index }}>
            {personality}
          </PersonBox>
        ))}
      </HobbyBoxContainer>
    </UserProfileContainer>
  );
};

export default UserProfileLarge;