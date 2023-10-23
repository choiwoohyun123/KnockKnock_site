import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEllipsisV, FaEdit, FaTrashAlt } from "react-icons/fa";
import dayjs from "dayjs";
import { showSuccess, showAlert } from "../../assets/alert";

import * as Api from "../../api";

import styled from "styled-components";
import { isWriter } from "../../util/isWriter";
import { getImageSrc } from "../../util/imageCheck";
import { formatDate } from "../../util/formatDate";
import { timeAgo } from "../../util/TimeAgo";
import { postCardBlurCheck } from "../../util/postCardBlurCheck";
import { currentDate, currentTime } from "../../util/currentDateTime";

import DropdownMenu from "../../components/modal/DropdownMenu";
import Modal from "../../components/modal/Modal";
import GenderInfo from "../../components/play/GenderInfo";
import ParticipantList from "../../components/play/ParticipantList";
import ParticipantUserModal from "../../components/play/ParticipantUserModal";
import { MOBILE_BREAK_POINT } from "../../components/layout/breakpoint";

import { UserStateContext } from "../../context/user/UserProvider";

const limit = 5;

function PlayDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const userState = useContext(UserStateContext);

  const postId = location.pathname.match(/\/playdetail\/(\d+)/)[1];
  const userId = Number(localStorage.getItem("userId"));

  const [post, setPost] = useState([]);
  const [postMenuOpen, setPostMenuOpen] = useState(null);

  const [participantsList, setParticipantsList] = useState([]);
  const [participationFlag, setParticipationFlag] = useState();
  const [selectedUserId, setSelectedUserId] = useState();

  const [canceled, setCanceled] = useState();
  const [status, setStatus] = useState();

  const [dropdownSelection, setDropdownSelection] = useState("신청인원");
  const [genderSelection, setGenderSelection] = useState("전체");

  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const [comments, setComments] = useState([]);
  const [commentProfileImage, setCommentProfileImage] = useState();
  const [comment, setComment] = useState("");
  const [isAccepter, setIsAccepter] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);

  const [nextCursor, setNextCursor] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isReached, setIsReached] = useState(false);

  const [isEditing, setIsEditing] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  const isBlur = postCardBlurCheck(
    `${currentDate} ${currentTime}`,
    post.meetingTime
  );

  useEffect(() => {
    if (isParticipantModalOpen) {
      fetchParticipantsList();
    }
  }, [isParticipantModalOpen, dropdownSelection, genderSelection]);

  const fetchParticipantsList = async () => {
    try {
      const status = dropdownSelection === "신청인원" ? "pending" : "accepted";
      let res;
      if (status == "pending") {
        if (genderSelection == "전체") {
          res = await Api.get(`/participants/${postId}/userlist`);
        } else {
          res = await Api.get(
            `/participants/${postId}/userlist?gender=${genderSelection}`
          );
        }
        setParticipantsList(res.data.participantsList);
      } else if (status == "accepted") {
        res = await Api.get(`/participants/${postId}/acceptedlist`);
        setParticipantsList(res.data.acceptedUsers);
      }
    } catch (err) {
      showAlert("참여자 정보를 불러오는 데 실패했습니다.");
    }
  };

  const handleAccept = async (participantId) => {
    try {
      const res = await Api.put(`/participants/${participantId}/allow`);
      fetchParticipantsList();
      fetchGetDetail();

      showSuccess("수락하였습니다");
    } catch (err) {
      if (err.response.data.message) {
        showAlert(err.response.data.message);
      } else {
        alert("라우팅 경로가 잘못되었습니다.");
      }
    }
  };

  const handleReject = async (participantId) => {
    try {
      await Api.put(`/participants/${participantId}/deny`);
      fetchParticipantsList();
      showSuccess("거절하였습니다");
    } catch (err) {
      if (err.response.data.message) {
        showAlert(err.response.data.message);
      } else {
        alert("라우팅 경로가 잘못되었습니다.");
      }
    }
  };

  const fetchGetDetail = async () => {
    try {
      const res = await Api.get(`/posts/${postId}`);
      const postData = res.data.post;
      setPost(postData);
    } catch (err) {
      if (err.response.data.message) {
        showAlert(err.response.data.message);
      } else {
        alert("라우팅 경로가 잘못되었습니다.");
      }
    }
  };

  const handleApplyPost = async (postId) => {
    const confirmApplyPost = window.confirm("모임에 참가신청하시겠습니까?");
    if (confirmApplyPost) {
      applyPostRequest(postId);
    }
  };

  const handleApplyPut = async (postId) => {
    const confirmApplyPut = window.confirm(
      "정말로 참가신청을 취소하시겠습니까?"
    );
    if (confirmApplyPut) {
      applyPutRequest(postId);
      showSuccess("취소되었습니다");
    }
  };

  const applyPostRequest = async (postId) => {
    try {
      const res = await Api.post(`/participants/${postId}`);
      applyGetRequest();
      showSuccess("신청되었습니다");
    } catch (err) {
      if (err.response.data.message) {
        showAlert(err.response.data.message);
      } else {
        alert("라우팅 경로가 잘못되었습니다.");
      }
    }
  };

  const applyPutRequest = async (postId) => {
    try {
      const res = await Api.put(`/participants/${postId}`);
      applyGetRequest();
    } catch (err) {
      if (err.response.data.message) {
        showAlert(err.response.data.message);
      } else {
        alert("라우팅 경로가 잘못되었습니다.");
      }
    }
  };

  const applyGetRequest = async () => {
    try {
      const res = await Api.get(`/participants/${postId}`);
      const data = res.data;
      setCanceled(data.canceled);
      setStatus(data.status);
    } catch (err) {
      if (err.response.data.message) {
        // alert(err.response.data.message);
        setCanceled(true);
      } else {
        alert("라우팅 경로가 잘못되었습니다.");
      }
    }
  };

  const handlePostDelete = async (postId) => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      deletePostRequest(postId);
      showSuccess("삭제되었습니다");
    }
  };

  const deletePostRequest = async (postId) => {
    try {
      await Api.del(`/posts/${postId}`);
      navigate(`/play`);
    } catch (err) {
      if (err.response.data.message) {
        showAlert(err.response.data.message);
      } else {
        alert("라우팅 경로가 잘못되었습니다.");
      }
    }
  };

  const fetchGetComment = useCallback(
    async (cursor) => {
      try {
        if (cursor === -1) {
          setIsLoading(false);
          return;
        }
        setIsLoading(true);

        const res = await Api.get(
          `/comments/${postId}?cursor=${cursor}&limit=${limit}`
        );
        const commentData = res.data;
        setIsAccepter(true);

        if (commentData.commentList?.length < limit) {
          setNextCursor(-1);
        } else {
          setNextCursor(
            commentData.commentList[commentData.commentList.length - 1]
              .commentId
          );
        }

        let newComments;

        if (cursor === 0) {
          newComments = commentData.commentList;
        } else if (cursor > 0 && commentData.commentList.length > 0) {
          newComments = [...comments, ...commentData.commentList];
        } else if (commentData.commentList.length === 0) {
          newComments = [...comments];
        }

        setComments(newComments);
        setIsReached(false);
      } catch (err) {
        if (err.response.data.message) {
          // alert(err.response.data.message);
          setIsAccepter(false);
        } else {
          alert("라우팅 경로가 잘못되었습니다.");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [isReached]
  );

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 1) {
      setIsReached(true);
    }
  }, []);

  useEffect(() => {
    // 페이지 초기 렌더링 시에 List를 불러오기 위해 호출
    fetchGetComment(nextCursor);
    // 스크롤 이벤트 핸들러 등록 및 해제
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchGetComment]);

  const postComment = async (postId) => {
    try {
      const body = {
        content: comment,
      };

      const res = await Api.post(`/comments/${postId}`, body);
      // 새로 작성된 댓글 정보를 직접 만들어서 기존 댓글 목록에 추가
      const newComment = {
        content: comment,
        userId: userId,
        commentId: res.data.commentId,
        User: {
          UserFiles: [
            {
              File: {
                url: userState.user.profileImage,
              },
            },
          ],
          nickname: userState.user.nickname,
        },
      };

      setComments((prevComments) => [newComment, ...prevComments]);
      setComment("");
    } catch (err) {
      if (err.response.data.message) {
        showAlert(err.response.data.message);
      } else {
        alert("라우팅 경로가 잘못되었습니다.");
      }
    }
  };

  const handleProfileModalOpen = (commentUserId) => {
    setIsProfileModalOpen(true);
    setSelectedUserId(commentUserId);
  };

  const editComment = (commentId, content) => {
    setIsEditing(commentId);
    setEditedContent(content);
    setMenuOpen(null);
  };

  const saveComment = (commentId) => {
    editCommentRequest(commentId, editedContent);
    setIsEditing(null);
    setMenuOpen(null);
  };

  const editCommentRequest = async (commentId, editedContent) => {
    try {
      const body = {
        content: editedContent,
      };

      const res = await Api.put(`/comments/${postId}/${commentId}`, body);

      const newComment = {
        content: editedContent,
        userId: userId,
        commentId: commentId,
        User: {
          UserFiles: [
            {
              File: {
                url: userState.user.profileImage,
              },
            },
          ],
          nickname: userState.user.nickname,
        },
      };

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.commentId === commentId ? newComment : comment
        )
      );
    } catch (err) {
      if (err.response.data.message) {
        showAlert(err.response.data.message);
      } else {
        alert("라우팅 경로가 잘못되었습니다.");
      }
    }
  };

  const deleteComment = (commentId) => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      deleteCommentRequest(commentId);
      showSuccess("삭제되었습니다");
    }
  };

  const deleteCommentRequest = async (commentId) => {
    try {
      const res = await Api.del(`/comments/${postId}/${commentId}`);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.commentId !== commentId)
      );
    } catch (err) {
      if (err.response.data.message) {
        showAlert(err.response.data.message);
      } else {
        alert("라우팅 경로가 잘못되었습니다.");
      }
    }
  };

  useEffect(() => {
    fetchGetDetail();
    applyGetRequest();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isParticipantModalOpen) {
      document.body.style.overflow = "hidden"; // 배경 스크롤을 막음
    } else {
      document.body.style.overflow = "auto"; // 배경 스크롤을 허용함
    }
  }, [isParticipantModalOpen]);

  console.log(post);
  return (
    <>
      <TopBox>
        <TopInnerBox>
          <TopPtagBox>
            <p>다양한 단체 미팅 중</p>
            <p>원하는 미팅에 참여해보세요</p>
          </TopPtagBox>

          {isWriter({ userId, post }) ? (
            <TopBoxButton onClick={() => setIsParticipantModalOpen(true)}>
              신청인원 보기
            </TopBoxButton>
          ) : status === "rejected" ? (
            <TopBoxButton
              onClick={() => alert("거절당한 참가자는 신청할 수 없습니다.")}
            >
              신청하기
            </TopBoxButton>
          ) : post.isCompleted == true ? (
            <TopBoxButton
              onClick={() => alert("이미 모집 완료된 게시글 입니다.")}
            >
              신청하기
            </TopBoxButton>
          ) : canceled ? (
            <TopBoxButton onClick={() => handleApplyPost(postId)}>
              신청하기
            </TopBoxButton>
          ) : isAccepter ? (
            <TopBoxButton onClick={() => handleApplyPut(postId)}>
              참가성공!
            </TopBoxButton>
          ) : (
            <TopBoxButton onClick={() => handleApplyPut(postId)}>
              취소하기
            </TopBoxButton>
          )}

          {isParticipantModalOpen && (
            <Modal onClose={() => setIsParticipantModalOpen(false)}>
              <DropdownMenuDiv>
                <DropdownMenu
                  options={[
                    { label: "신청인원", value: "신청인원" },
                    { label: "모집된 인원", value: "모집된 인원" },
                  ]}
                  selectedOption={dropdownSelection}
                  handleOptionChange={(e) =>
                    setDropdownSelection(e.target.value)
                  }
                />

                {dropdownSelection === "신청인원" && (
                  <DropdownMenu
                    options={[
                      { label: "전체", value: "전체" },
                      { label: "남", value: "남" },
                      { label: "여", value: "여" },
                    ]}
                    selectedOption={genderSelection}
                    handleOptionChange={(e) =>
                      setGenderSelection(e.target.value)
                    }
                  />
                )}
              </DropdownMenuDiv>
              <ParticipantList
                participantsList={participantsList}
                handleAccept={handleAccept}
                handleReject={handleReject}
                selectedOption={dropdownSelection}
                setIsProfileModalOpen={setIsProfileModalOpen}
                setSelectedUserId={setSelectedUserId}
              />
            </Modal>
          )}

          {isProfileModalOpen && (
            <ModalOverlay>
              <ModalContentUser>
                <ParticipantUserModal
                  userId={selectedUserId}
                  setIsProfileModalOpen={setIsProfileModalOpen}
                />
              </ModalContentUser>
            </ModalOverlay>
          )}
        </TopInnerBox>
      </TopBox>
      <PostDetailBox>
        <PostDetailFirstBox>
          <FirstInputBox>
            <div
              style={{ display: "flex", width: "100%", alignItems: "center" }}
            >
              {isBlur ? (
                <RecruitAbleBox style={{ backgroundColor: "#C6D1D1" }}>
                  기간 만료
                </RecruitAbleBox>
              ) : post.isCompleted ? (
                <RecruitAbleBox>모집완료</RecruitAbleBox>
              ) : (
                <RecruitAbleBox>모집중</RecruitAbleBox>
              )}

              <GenderInfoBox>
                <GenderInfo
                  total={post.totalM}
                  filled={post.recruitedM}
                  color="#819FF7"
                />
                <GenderInfo
                  total={post.totalF}
                  filled={post.recruitedF}
                  color="#F78181"
                />
              </GenderInfoBox>
            </div>
            <EditDeleteButtonBox>
              {isWriter({ userId, post }) && (
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setPostMenuOpen((prev) =>
                      prev === postId ? null : postId
                    );
                  }}
                >
                  <FaEllipsisV />
                </IconButton>
              )}

              {postMenuOpen === postId && (
                <DropModifyDeleteDiv>
                  <IconButton onClick={() => navigate(`/playedit/${postId}`)}>
                    <FaEdit /> 수정
                  </IconButton>
                  <IconButton onClick={() => handlePostDelete(postId)}>
                    <FaTrashAlt />
                    삭제
                  </IconButton>
                </DropModifyDeleteDiv>
              )}
            </EditDeleteButtonBox>
          </FirstInputBox>

          <TitleInputBox>
            <p>{post.title}</p>
          </TitleInputBox>

          <InputBox style={{ flexDirection: "column", alignItems: "start" }}>
            <p style={{ margin: "0px 0px" }}>장소: {post.place}</p>
            <p style={{ margin: "10px 0px" }}>
              만남시간: {formatDate(post.meetingTime)}
            </p>
          </InputBox>
          <InputBox style={{ justifyContent: "center", width: "100%" }}>
            <img
              src={getImageSrc(post.PostFiles?.[0]?.File?.url)}
              alt="postImage"
              style={{
                width: "50%",
                height: "25vw",
                marginTop: "10px",
                marginRight: "10px",
              }}
            />
          </InputBox>
          <InputBox
            style={{
              justifyContent: "center",
              width: "100%",
              fontFamily: "Pretendard-Regular",
            }}
          >
            <span style={{ whiteSpace: "pre-line" }}>{post.content}</span>
          </InputBox>
        </PostDetailFirstBox>
        <CommentBox>
          {isAccepter ? (
            <>
              <p>댓글</p>
              <CommentInputArea>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="댓글을 작성해주세요."
                />
                <button onClick={() => postComment(postId)}>댓글 등록</button>
              </CommentInputArea>
            </>
          ) : (
            <p>수락된 참가자만 댓글확인 및 작성 할 수 있습니다.</p>
          )}

          {comments.map((comment, commentId) => (
            <CommentDetailBox key={commentId}>
              <CommentImageBox>
                <img
                  src={getImageSrc(comment.User?.UserFiles?.[0]?.File?.url)}
                  alt="유저 프로필"
                  onClick={() => handleProfileModalOpen(comment.userId)}
                />
              </CommentImageBox>
              <CommentContentBox>
                <CommentNicknameBox>
                  <p style={{ fontWeight: "bold" }}>{comment.User.nickname}</p>
                  <p style={{ color: "#555" }}>
                    {timeAgo(
                      dayjs(comment.createdAt).format("YYYY-MM-DD HH:mm")
                    )}
                  </p>
                </CommentNicknameBox>

                {comment.commentId === isEditing ? (
                  <CommentEditArea>
                    <textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      style={{ width: "100%", minHeight: "40px" }}
                    />
                    <button onClick={() => saveComment(comment.commentId)}>
                      수정
                    </button>
                    <button onClick={() => setIsEditing(null)}>취소</button>
                  </CommentEditArea>
                ) : (
                  <CommentEditDeleteBox>
                    <span
                      style={{
                        whiteSpace: "pre-line",
                        marginBottom: "10px",
                        fontFamily: "Pretendard-Regular",
                      }}
                    >
                      {comment.content}
                    </span>
                    {comment.userId === userId && (
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            setMenuOpen((prev) =>
                              prev === commentId ? null : commentId
                            );
                          }}
                        >
                          <FaEllipsisV />
                        </IconButton>
                        {menuOpen === commentId && (
                          <MenuWrapper>
                            <IconButton
                              onClick={() =>
                                editComment(comment.commentId, comment.content)
                              }
                            >
                              <FaEdit /> 수정
                            </IconButton>
                            <IconButton
                              onClick={() => deleteComment(comment.commentId)}
                            >
                              <FaTrashAlt /> 삭제
                            </IconButton>
                          </MenuWrapper>
                        )}
                      </div>
                    )}
                  </CommentEditDeleteBox>
                )}
              </CommentContentBox>
            </CommentDetailBox>
          ))}
        </CommentBox>
      </PostDetailBox>
    </>
  );
}

export default PlayDetail;
const IconButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  padding: 10px;
  &:hover {
    color: #333;
  }
`;

const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  background-color: #fff;
  height: 200px;
  margin: 0px 0px 50px 0px;
  padding-bottom: 0px;
`;

const TopInnerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10%;
  width: 75%;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    flex-direction: column;
    gap: 0;
    align-items: start;
  }
`;

const TopPtagBox = styled.div`
  font-family: "KIMM_Bold";
  font-size: 3rem;
  color: #1d1d1f;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 0px;

  p {
    margin: 0px;
    font-size: 2rem;
    color: #1d1d1f;
    line-height: 1.2;
  }

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    height: 40px;
    // padding: 50px 0 0 80px;

    p {
      font-size: 0.8rem;
    }
  }
`;

const TopBoxButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100%;
  font-family: "KIMM_Bold";
  padding: 10px 10px;
  background-color: #f7cbd0;
  color: black;
  border: 10px double #fff;
  border-radius: 50px;
  cursor: pointer;
  margin: 10px 0;
  width: 30%;
  height: 100px;
  transition: 0.3s;
  text-overflow: ellipsis;

  &:hover {
    border: 1px solid #3b0b0b;
    color: #3b0b0b;
    transform: scale(1.02);
  }

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    height: 40px;
    width: 50%;
    height: 60%;
    font-size: 0.8rem;
  }
`;

const PostDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  height: 100%;
  margin: 0 0 0 0;
  padding: 20px 50px 20px 50px;
`;

const FirstInputBox = styled.div`
  display: flex;
  justify-content: start;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  width: 100%;
  font-family: "KIMM_Bold";
`;

const InputBox = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px;
  width: 80%;
  font-family: "KIMM_Bold";
`;

const TitleInputBox = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px;
  width: 80%;
  font-family: "KIMM_Bold";
  font-size: 3rem;
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    font-size: 1.2rem;
  }
`;

const RecruitAbleBox = styled.div`
  font-family: "KIMM_Bold";
  background-color: #f7cbd0; // Same as the button above
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  border-radius: 30px;
  padding: 20px 0px 20px 0px;
  height: 20%;
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    width: 30%;
  }
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 85%;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    width: 100%;
  }
`;

const CommentInputArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  textarea {
    width: 90%;
    padding: 10px;
    margin-right: 10px;
    resize: none; // 사용자가 textarea 크기를 변경하지 못하게 함
    border: 1px solid #cccccc; // Light gray border
  }

  button {
    width: 20%;
    background-color: #f7cbd0;
    color: black;
    padding: 10px 10px;
    border: 5px double #fff;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.3s;
    text-overflow: ellipsis;

    &:hover {
      border: 5px solid #3b0b0b;
      color: #3b0b0b;
      transform: scale(1.02);
    }

    @media (max-width: ${MOBILE_BREAK_POINT}) {
      font-size: 0.5rem;
    }
  }
`;

const CommentDetailBox = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 11px;
  width: 100%;
  border-bottom: 1px solid #cccccc; // Light gray border
`;

const CommentImageBox = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;

  img {
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    margin-right: 20px;
    object-fit: cover;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      opacity: 0.5;
    }
  }
`;

const CommentNicknameBox = styled.div`
  display: flex;
  justify-content: start;
  margin-right: 10px;

  p {
    margin: 5px 10px 0px 0px;
  }
`;

const CommentContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90%;
`;

const CommentEditArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  textarea {
    width: 90%;
    padding: 10px;
    margin: 10px 10px 10px 0px;
    resize: none; // 사용자가 textarea 크기를 변경하지 못하게 함
    border: 1px solid #cccccc; // Light gray border
  }

  button {
    width: 10%;
    background-color: #f7cbd0;
    color: black;
    padding: 10px;
    border: 5px double #fff;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.3s;
    margin-right: 3%;
    text-overflow: ellipsis;
    &:hover {
      border: 5px solid #3b0b0b;
      color: #3b0b0b;
      transform: scale(1.02);
    }
  }
`;

const CommentEditDeleteBox = styled.div`
  position: relative;
  display: flex;
  width: 100%;

  p {
    width: 90%;
  }
  span {
    width: 90%;
  }
`;

const MenuWrapper = styled.div`
  width: 20%;
  margin: 0px 0px 0px 0px;
  position: absolute;
  top: 0;
  left: 100%;
  display: flex;
  background: #fff;
  background-color: rgba(255, 255, 255, 0);

  z-index: 1;
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    top: 70%;
    left: 70%;
  }
`;

const DropdownMenuDiv = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const DropModifyDeleteDiv = styled.div`
  position: absolute;
  top: 100%; // 아이콘의 바로 아래에 위치하도록 설정
  right: 0%; // 아이콘의 왼쪽 끝을 기준으로 설정
  display: flex;
  gap: 20px;
  align-items: center;
`;

const GenderInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 15px;
  padding: 10px;
  gap: 10px;
`;

const PostDetailFirstBox = styled.div`
  font-family: "Pretendard-Regular";
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  padding: 20px;
  margin-bottom: 20px;
  width: 80%;
`;

const EditDeleteButtonBox = styled.div`
  position: relative;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 10px;
  gap: 10px;
  // font-family: "San Francisco", Arial, sans-serif;
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
  width: 40%;
  height: 80%;
  background-color: #fff;
  padding: 1rem;
  padding-top: 2rem;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  @media (max-width: 1080px) {
    width: 50%;
    height: 80%;
  }
  @media (max-width: 768px) {
    width: 60%;
    height: 80%;
  }
  @media (max-width: 460px) {
    width: 90%;
    height: 80%;
  }
`;
