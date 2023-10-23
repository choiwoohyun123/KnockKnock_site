import { useState, useEffect } from "react";
import styled from "styled-components";
import * as Api from "../../api";
import { Link } from "react-router-dom";
import { getImageSrc } from "../../util/imageCheck";
import { MOBILE_BREAK_POINT } from "../../components/layout/breakpoint";
const UserPostAndParticipants = () => {
  const [posts, setPosts] = useState([]);
  const [joins, setJoins] = useState([]);

  const fetchData = async () => {
    try {
      const resPosts = await Api.get("/users/mypage/posts");
      const resJoin = await Api.get("/users/mypage/participants");
      console.log(resPosts.data.posts);
      // console.log(resJoin.data);
      setPosts(resPosts.data.posts);
      setJoins(resJoin.data.participants);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  getImageSrc;
  return (
    <Userbox>
      <div style={{ fontFamily: "KIMM_Bold" }}>내가 쓴 게시글</div>

      <Postbox>
        {posts.map((post) => (
          <Content>
            <Link to={`/playdetail/${post.postId}`}>
              <p>{post.title}</p>
              <img src={getImageSrc(post.PostFiles[0]?.File.url)}></img>
            </Link>
          </Content>
        ))}
      </Postbox>

      <div style={{ fontFamily: "KIMM_Bold" }}>수락된 게시글</div>
      <Postbox>
        {joins.map((join) => (
          <Content>
            <Link to={`/playdetail/${join.Post.postId}`}>
              <p>{join.Post.title}</p>
              <img src={getImageSrc(join.Post.PostFiles[0]?.File.url)}></img>
            </Link>
          </Content>
        ))}
      </Postbox>
    </Userbox>
  );
};

const Userbox = styled.div`
  display: flex;
  height: 60vh;
  justify-content: space-between;
  flex-direction: column;
  background-color: #FFFFFF;
  padding: 2rem;
  overflow: auto;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  width: 28rem;
  border-radius: 20px;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    width: 66vw;
  }
`;

const Postbox = styled.div`
  width: 100%;
  height: 50%;
  border-top: 1px solid #dfdfdf;
  overflow-x: auto; // 가로 스크롤을 활성화
  display: flex; // 요소들을 가로로 쌓기 위해 flex 사용
  align-items: flex-start; // 가로 정렬을 위해 flex-start 사용

  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1rem;
  }
`;

const Content = styled.div`
  flex: 0 0 auto;
  border: 4px double #ffcccc;
  border-radius: 10px;
  margin: 20px 20px 0 0;
  width: 10rem;
  height: 10rem;
  padding: 1rem;
  cursor: pointer;

  &:hover {
    transform: scale(1.01);
  }

  a {
    text-decoration: none;
    color: inherit;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  img {
    width: 5rem;
    align-self: center;
    margin-top: auto;
  }
`;

export default UserPostAndParticipants;
