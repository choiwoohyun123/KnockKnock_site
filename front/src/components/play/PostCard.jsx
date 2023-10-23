import styled from "styled-components";
import dayjs from "dayjs";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as Api from "../../api";

import { timeAgo } from "../../util/TimeAgo";
import { isWriter } from "../../util/isWriter";
import { currentDate, currentTime } from "../../util/currentDateTime";
import { postCardBlurCheck } from "../../util/postCardBlurCheck";

import { getImageSrc } from "../../util/imageCheck";

import GenderInfo from "./GenderInfo";

const MAX_TITLE_LENGTH = 10;

function PostCard({ post }) {
  const navigate = useNavigate();

  const isBlur = postCardBlurCheck(
    `${currentDate} ${currentTime}`,
    post.meetingTime
  );

  return (
    <Card
      $isBlur={isBlur}
      onClick={() => navigate(`/playdetail/${post.postId}`)}
    >
      <ContentBox>
        <ProfileBox>
          <ProfileImage
            src={getImageSrc(post?.User?.UserFiles?.[0]?.File?.url)}
            alt="유저 프로필"
          />
          <Nickname>{post?.User?.nickname}</Nickname>
        </ProfileBox>
        <ImageBox>
          <Image
            src={getImageSrc(post.PostFiles?.[0]?.File?.url)}
            alt="postImage"
          />
        </ImageBox>
        <Category>{post.type}</Category>
        <Title>
          {post.title.length > MAX_TITLE_LENGTH
            ? `${post.title.substring(0, MAX_TITLE_LENGTH)}...`
            : post.title}
          <RecruitmentStatusBox $isCompleted={post.isCompleted}>
            {post.isCompleted ? "모집완료" : "모집중"}
          </RecruitmentStatusBox>
        </Title>
        <DetailBox>
          {/* <DetailItem></DetailItem> */}
          <GenderInfo
            total={post.totalM}
            filled={post.recruitedM}
            color="#819FF7"
            gender="🙆🏻‍♂️"
          />
          {/* <DetailItem>여자</DetailItem> */}
          <GenderInfo
            total={post.totalF}
            filled={post.recruitedF}
            color="#F78181"
            gender="🙆🏻‍♀️"
          />
          <InfoContainer>
            <DetailItem>장소: {post.place}</DetailItem>
            <DetailItem>
              {timeAgo(dayjs(post.createdAt).format("YYYY-MM-DD HH:mm"))}
            </DetailItem>
          </InfoContainer>
        </DetailBox>
      </ContentBox>
    </Card>
  );
}

export default PostCard;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  margin: 20px 0 20px 0;
  padding: 20px;
  font-family: "Pretendard-Regular";
  width: 80%;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.15), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  background-color: ${(props) => (props.$isBlur ? "#C6D1D1" : "#FFFFFF")};
  // transition: transform 0.2s ease-in-out;
  // height: 60vh;

  &:hover {
    transform: scale(1.02);
    cursor: pointer;
  }

  @media (max-width: 768px) {
    display: block;
    width: 70%; /* Set width to 50% for two cards in one row on larger screens */
  }
`;

const ImageBox = styled.div`
  // width: 25vw;
  height: 30vh;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  margin: 20px 0px;

  @media (max-width: 1100px) {
    height: 20vh;
    border-right: 0px;
  }
`;

const Image = styled.img`
  width: 60%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
`;

const ContentBox = styled.div`
  flex: 1;
  // display: flex;
  // flex-direction: column;
  // justify-content: space-between;
  // background-color: red;
  // padding-left: 20px;
`;

const Category = styled.h2`
  background-color: #f7cbd0;
  border-radius: 30px;
  font-size: 0.8rem;
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 25px;
  display: inline-block;
  padding: 3px 7px 3px 7px;
`;

const Title = styled.p`
  font-weight: bold;
  margin-left: 10px;
  display: inline-block;
  // width: 18vw;
  // white-space: nowrap;
  // text-overflow: ellipsis;
  // overflow: hidden;
`;

const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  font-size: 0.9em;
  color: #555;
  margin: 10px 0 20px 30px;
`;

const DetailItem = styled.p`
  font-weight: bold;
  font-size: 1.04rem;
  margin: 10px 20px 5px 0;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 20px;
  background-color: #f7e2ea;
  opacity: 80%;
  border-radius: 40px;
`;

const ProfileImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Nickname = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
  margin-left: 3px;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RecruitmentStatusBox = styled.div`
  background-color: ${(props) => (props.$isCompleted ? "#F08080" : "#32CD32")};
  border-radius: 8px;
  font-size: 0.8rem;
  margin-left: 8px;
  padding: 3px 7px;
  display: inline-block;
  color: white;
`;
