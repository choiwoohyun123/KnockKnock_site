import styled, { keyframes } from "styled-components";

import { useAsyncValue, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import * as Api from "../../api";

import PostCard from "../../components/play/PostCard";
import Pagination from "../../components/commons/Pagenation";
import { UserStateContext } from "../../context/user/UserProvider";
import { MOBILE_BREAK_POINT } from "../../components/layout/breakpoint";
import { showAlert } from "../../assets/alert";

function Play() {
  const navigate = useNavigate();
  const user = useContext(UserStateContext);
  const [postList, setPostList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPostCount, setAllPostCount] = useState(0);
  const [postType, setPostType] = useState("");

  const perPage = 6;
  const lastPage = Math.ceil(allPostCount / perPage);

  const fetchPosts = async () => {
    try {
      const res = await Api.get(
        `/posts?page=${currentPage}&perPage=${perPage}&type=${postType}`
      );
      setPostList(res.data.postList);
      setAllPostCount(res.data.allPostCount);
    } catch (err) {
      showAlert(err.response.data.message);
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchPosts();
    window.scrollTo(0, 0);
  }, [postType]);

  useEffect(() => {
    fetchPosts();
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <>
      <TopBox>
        <TopPtagBox>
          <p>히히 낙낙 !</p>
          <br></br>
          <p>다양한 단체 미팅 중 원하는 미팅에 참여해보세요</p>
        </TopPtagBox>
        <TopButtonBox>
          <PostButton
            style={{ marginRight: "10px" }}
            onClick={() => navigate(`/playadd`)}
          >
            게시글 만들기
          </PostButton>
        </TopButtonBox>
      </TopBox>
      <CategoryButtonBox>
        <CategoryButton onClick={() => setPostType("")} $isActive={postType === ""}>🚪전체</CategoryButton>
        <CategoryButton onClick={() => setPostType("술")} $isActive={postType === "술"}>🍻술</CategoryButton>
        <CategoryButton onClick={() => setPostType("영화")} $isActive={postType === "영화"}>🍿영화</CategoryButton>
        <CategoryButton onClick={() => setPostType("식사")} $isActive={postType === "식사"}>🍽️식사</CategoryButton>
        <CategoryButton onClick={() => setPostType("카페")} $isActive={postType === "카페"}>🧋카페</CategoryButton>
        <CategoryButton onClick={() => setPostType("산책")} $isActive={postType === "산책"}>🧑‍🤝‍🧑산책</CategoryButton>
        <CategoryButton onClick={() => setPostType("드라이브")} $isActive={postType === "드라이브"}>🚗드라이브</CategoryButton>
        <CategoryButton onClick={() => setPostType("공연관람")} $isActive={postType === "공연관람"}>🎭공연관람</CategoryButton>
        <CategoryButton onClick={() => setPostType("기타")} $isActive={postType === "기타"}>⚫기타</CategoryButton>
      </CategoryButtonBox>
      <PostCardBox>
        {postList.map((post) => (
          <PostCard key={post.postId} post={post} />
        ))}
      </PostCardBox>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        lastPage={lastPage}
      />
    </>
  );
}

export default Play;

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TopBox = styled.div`
  display: flex;
  justify-content: center;
  height: 10%;
  margin: 50px 0px 60px 0px;
  gap: 10%;
  
  p {
    font-family: 'KIMM_Bold';
    font-size: 6rem; 
    color: #1d1d1f; 
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 0px;
  }

  p:last-of-type {
    font-size: 2rem; 
    color: #1d1d1f; 
    font-weight: 500;
    line-height: 1.2;
  }

  animation: ${fadeInAnimation} 0.5s ease-in-out;
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    flex-direction: column;
    
    p {
      font-size: 2rem;
      margin-bottom: -0.3px;
    }

    p:last-of-type {
      font-size: 0.8rem;
    }
`;

const TopPtagBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;


const TopButtonBox = styled.div`
  display: flex;
  width: 20%;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    width: 30%;
  }
`;

const PostButton = styled.button`
  font-size: 15px;
  font-family: "KIMM_Bold";
  padding: 10px 10px;
  background-color: #f7cbd0;
  color: black;
  border: 10px double #fff;
  border-radius: 50px;
  cursor: pointer;
  margin: 200px 0 0 30px;
  width: 80%;
  height: 100px;
  transition: 0.3s;
  text-overflow: ellipsis;

  &:hover {
    border: 10px double #3b0b0b;
    color: #3b0b0b;
    transform: scale(1.02);
  }
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    width: 100%;
    white-space: nowrap; // Allow the text to wrap
    margin: 40px 0 0 0;
    height: 100%;
    font-size: 0.4rem;
  }
`;

const CategoryButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0px -35px 50px -35px;
  background-color: #ffffff;
  padding: 20px 20px;
  border-top: 1px solid #d2d2d2;
  border-bottom: 1px solid #d2d2d2;
  animation: ${fadeInAnimation} 0.6s ease-in-out;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    margin: 0px;
  }
`;


const CategoryButton = styled.div`
  font-size: 1.5rem;
  font-family: "Pretendard-Regular";
  color: ${props => props.$isActive ? "#f7cbd0" : "#1d1d1f"}; // 선택된 버튼이면 #f7cbd0 색상, 그렇지 않으면 #1d1d1f 색상을 사용
  cursor: pointer;
  text-align: center;

  &:hover {
    transform: scale(1.1);
    color: #f7cbd0;
  }

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    font-size: 0.7rem;
    max-width: 100px;
    white-space: normal;
  }
`;

const PostBox = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  margin: 30px 50px 30px 50px;
`;

const PostCardBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 10px;
  padding: 20px;
  margin: 0 10px;
  justify-items: center;
  align-items: center;
  max-width: 100vw;
  animation: ${fadeInAnimation} 0.6s ease-in-out;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    grid-template-columns: 1fr;
  }
`;

