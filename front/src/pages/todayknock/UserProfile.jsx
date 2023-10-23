import React from "react";
import styled from "styled-components";
import { getImageSrc } from "../../util/imageCheck";
import { MOBILE_BREAK_POINT } from "../../components/layout/breakpoint.js";

const UserProfile = ({ user, onClick, isLoverUser }) => {
  const {
    nickname,
    gender,
    birthday,
    age,
    job,
    region,
    mbti,
    height,
    introduce,
  } = user;

  const handleMouseEnter = () => {
    document.getElementById(`userInfo-${user.userId}`).style.opacity = 1;
  };

  const handleMouseLeave = () => {
    document.getElementById(`userInfo-${user.userId}`).style.opacity = 0;
  };

  const MAX_NICKNAME_LENGTH = 7;

  return (
    <>
      {isLoverUser == "Lover" ? (
        <LoverProfileContainer>
          <LoverProfilePicture
            src={getImageSrc(user.UserFiles?.[0]?.File?.url)}
            alt="프로필 사진"
            onClick={onClick}
          />
          <HoverText>프로필 정보 보기</HoverText>
          <LoverProfileNickname>
            {user.nickname.length > MAX_NICKNAME_LENGTH
              ? `${user.nickname.substring(0, MAX_NICKNAME_LENGTH)}...`
              : user.nickname}
          </LoverProfileNickname>
        </LoverProfileContainer>
      ) : (
        <UserProfileContainer
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={onClick}
        >
          <ProfilePicture
            src={getImageSrc(user.UserFiles[0]?.File?.url)}
            alt="프로필 사진"
          />

          <UserInfo id={`userInfo-${user.userId}`}>
            <UserInfoText>{nickname}</UserInfoText>
            <UserInfoText>{age}</UserInfoText>
            <UserInfoText>
              {introduce || "안녕하세요. 반갑습니다."}
            </UserInfoText>

            {/* <UserInfoText>{nickname}</UserInfoText>
            <UserInfoText>{age}세</UserInfoText>
            <UserInfoText>{introduce || "안녕하세요. 반갑습니다."}</UserInfoText> */}
          </UserInfo>
        </UserProfileContainer>
      )}
    </>
  );
};

export default UserProfile;

const UserProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;  

  min-width: 300px;
  min-height: 300px;
  max-width: 300px;
  max-height: 300px;
  overflow: hidden;
  position: relative;
  transition: background-color 0.3s;
  cursor: pointer;
  border-radius: 10%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  @media (max-width: 1620px) {
    min-width: 200px;
    min-height: 200px;
    max-width: 200px;
    max-height: 200px;
  }

  @media (max-width: 873px) {
    min-width: 150px;
    min-height: 150px;
    max-width: 150px;
    max-height: 150px;
  }

  @media (max-width: 527px) {
    min-width: 100px;
    min-height: 100px;
    max-width: 100px;
    max-height: 100px;
  }
`;

const ProfilePicture = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10%;
`;

const Name = styled.h3`
  margin-top: 1.5rem;
  color: #666666;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  top: 60%;
  left: 0;
  width: 100%;
  height: 40%;
  background: linear-gradient(to bottom, transparent, black);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
  color: #fff;
`;

const UserInfoText = styled.p`
  margin: 5px;
`;

const UserNicknameAgeTextDiv = styled.div`
  display: flex;
`;

const LoverProfileContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 85%;
  position: relative;
  border-radius: 100%;

    @media (max-width: ${MOBILE_BREAK_POINT}) {
    width: 80%;
    height: 70%;
  }
`;

const LoverProfilePicture = styled.img`
  // width: 120%;
  // height: 80%;
  min-width: 300px;
  min-height: 300px;
  max-width: 300px;
  max-height: 300px;
  border: 4px dashed #f7cbd0;
  border-radius: 100%;
  cursor: pointer;
  transition: all 0.3s ease; // Transition effect

  &:hover {
    border: 4px solid #fecde4;
    transform: scale(1.02);
    opacity: 0.5; // Image will darken on hover
  }

  
  @media (max-width: 960px) {
    min-width: 200px;
    min-height: 200px;
    max-width: 200px;
    max-height: 200px;
  }

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    min-width: 130px;
    min-height: 130px;
    max-width: 130px;
    max-height: 130px;
  }

  @media (max-width: 500px) {
    min-width: 100px;
    min-height: 100px;
    max-width: 100px;
    max-height: 100px;
  }
`;

const LoverProfileNickname = styled.p`
  font-size: 0.9rem;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    font-size: 0.7rem;
  }
`;

const HoverText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  color: dark; // Change this as needed
  transition: all 0.3s ease;
  font-size: 0.8rem;

  ${LoverProfileContainer}:hover & {
    opacity: 1;
  }

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    font-size: 0.4rem;
  }
`;
