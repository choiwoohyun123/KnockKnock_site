import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import * as API from "../../api";
import { getImageSrc } from "../../util/imageCheck";
import { MOBILE_BREAK_POINT } from "../../components/layout/breakpoint";

const socket = io.connect("http://localhost:3000", {
  path: "/socket.io",
  transports: ["websocket"],
});

function formatMessageTime(createdAt, prevCreatedAt) {
  const date = new Date(createdAt);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();

  if (
    !prevCreatedAt ||
    date.toDateString() !== new Date(prevCreatedAt).toDateString()
  ) {
    return `${month} ${day}일 ${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  }

  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
}
function ChatComponent() {
  const [isProfileImageModalOpen, setIsProfileImageModalOpen] = useState(false);
  const [clickedProfileImageUrl, setClickedProfileImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [allChats, setAllChats] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const [userName, setUserName] = useState("");
  const [senderId, setSenderId] = useState(null);
  const [recieverId, setRecieverId] = useState("");
  const [notifications, setNotifications] = useState([]);
  let prevCreatedAt = null;

  const messageRef = useRef(null);
  const scrollToBottom = () => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  };
  console.log(senderId);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useEffect(() => {
    // socket.on("getOnlineUsers", (onlineUsers) => {
    //   setAllChats(onlineUsers);
    // });
    // socket.emit("addNewUser", senderId);
    socket.on("getMessage", (message) => {
      const newMessage = {
        chatId: chatId,
        content: message.content.trim(),
        senderId: message.senderId,
        createdAt: new Date().toISOString(),
      };
      setChatHistory((prevChatHistory) => [...prevChatHistory, newMessage]);
    });

    socket.on("getNotification", (notification) => {
      addNotification(notification.senderId);
    });

    return () => {
      socket.off("getOnlineUsers");
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [chatId, senderId]);
  const addNotification = (senderId) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      {
        senderId,
        isRead: false,
        date: new Date(),
      },
    ]);
  };

  useEffect(() => {
    API.get("/chats")
      .then((response) => {
        const chats = response.data.allChats;
        setAllChats(chats);

        if (chats.length > 0) {
          const lastChat = chats[chats.length - 1];
          const lastChatMessages = lastChat.currentUserInfo.chatId
            ? API.get(`/messages/${lastChat.currentUserInfo.chatId}`)
            : Promise.resolve({ data: { messageList: [] } });

          Promise.all([lastChatMessages])
            .then(([messagesResponse]) => {
              const messages = messagesResponse.data.messageList;
              setChatHistory(messages);
              setRecieverId(lastChat.currentUserInfo.reciever);
              setChatId(lastChat.currentUserInfo.chatId);
              setProfileImage(lastChat.recieverInfo.UserFiles[0].File.url);
              setUserName(lastChat.recieverInfo.nickname);
              setSenderId(lastChat.currentUserInfo.sender);
              socket.emit("addNewUser", lastChat.currentUserInfo.sender);
            })
            .catch((error) => {
              console.error("채팅 정보를 가져오는데 실패했습니다:", error);
            });
        }
      })
      .catch((error) => {
        console.error("유저 목록 가져오는데 실패,,", error);
      });
  }, []);

  const handleSendMessage = async () => {
    if (chatId && message.trim() !== "") {
      const newMessage = {
        chatId: chatId,
        content: message.trim(),
        senderId,
        createdAt: new Date().toISOString(),
      };
      try {
        socket.emit("sendMessage", {
          content: message,
          recieverId: recieverId,
          senderId,
          createdAt: newMessage.createdAt,
        });
        const response = await API.post("/messages", newMessage);
        setChatHistory([...chatHistory, newMessage]);
        setMessage("");
      } catch (error) {
        console.error("메시지 전송에 실패했습니다:", error);
      }
    }
  };
  const handleProfileImageClick = (imageUrl) => {
    setClickedProfileImageUrl(imageUrl);
    setIsProfileImageModalOpen(true);
  };

  const handleChatClick = async (chat) => {
    try {
      setRecieverId(chat.currentUserInfo.reciever);
      setChatId(chat.currentUserInfo.chatId);
      setProfileImage(chat.recieverInfo.UserFiles[0].File.url);
      setUserName(chat.recieverInfo.nickname);
      setSenderId(chat.currentUserInfo.sender);
      socket.emit("addNewUser", chat.currentUserInfo.sender);

      const messagesResponse = await API.get(
        `/messages/${chat.currentUserInfo.chatId}`
      );
      const messages = messagesResponse.data.messageList;
      console.log(messages, "message!!!");
      setChatHistory(messages);
    } catch (error) {
      console.error("채팅 정보를 가져오는데 실패했습니다:", error);
    }
  };
  const ProfileImageModal = ({ imageUrl, onClose }) => {
    return (
      <ModalOverlay>
        <ModalContent>
          <LargeProfileImage src={imageUrl} alt="프로필사진" />
          <CloseButton onClick={onClose}>닫기</CloseButton>
        </ModalContent>
      </ModalOverlay>
    );
  };
  useEffect(() => {
    if (chatId) {
      API.get(`/messages/${chatId}`)
        .then((response) => {
          const messages = response.data.messageList;
          console.log(messages, "message!!!");
          setChatHistory(messages);
        })
        .catch((error) => {
          console.error("채팅 메시지를 가져오는데 실패:", error);
        });
    }
  }, [chatId]);
  console.log(chatHistory);

  return (
    <ChatContainer>
      <MessageChat>
        <UserName>{userName}</UserName>
        <MessageBox ref={messageRef}>
          {Array.isArray(chatHistory) && chatHistory.length > 0 ? (
            chatHistory.map((chat, index) => {
              const isUserMessage = Number(chat.senderId) === senderId;
              const showDate = formatMessageTime(chat.createdAt, prevCreatedAt);

              prevCreatedAt = chat.createdAt;
              return (
                <MessageContainer
                  key={chat.messageId}
                  isUserMessage={isUserMessage}
                >
                  {Number(chat.senderId) !== senderId && (
                    <ProfileImage
                      src={profileImage || getImageSrc(profileImage)}
                      alt="프로필사진"
                      onClick={() =>
                        handleProfileImageClick(
                          profileImage || getImageSrc(profileImage)
                        )
                      }
                    />
                  )}

                  <BubbleWithTime isUserMessage={isUserMessage}>
                    {index === 0 || showDate ? (
                      <MessageTime>{showDate}</MessageTime>
                    ) : null}
                    <Bubble
                      className="message-bubble"
                      isUserMessage={isUserMessage}
                    >
                      {chat.content}
                    </Bubble>
                  </BubbleWithTime>
                </MessageContainer>
              );
            })
          ) : (
            <div></div>
          )}
        </MessageBox>
        {isProfileImageModalOpen && (
          <ProfileImageModal
            imageUrl={clickedProfileImageUrl}
            onClose={() => setIsProfileImageModalOpen(false)}
          />
        )}
        <ChatInputContainer>
          <ChatInput
            type="text"
            placeholder="메시지를 입력하세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <SendButton onClick={handleSendMessage}>전송</SendButton>
        </ChatInputContainer>
      </MessageChat>
      <ChatRoom>
        <UserList>
          {allChats.length > 0 &&
            allChats
              .slice()
              .reverse()
              .map((chat) => {
                const profileImageUrl = chat.recieverInfo.UserFiles[0].File.url;
                return (
                  <UserListItem
                    key={chat.currentUserInfo.chatId}
                    onClick={() => handleChatClick(chat)}
                  >
                    <ProfileImage
                      src={profileImageUrl || getImageSrc(profileImageUrl)}
                      alt="프로필사진"
                    />
                    <UserName>
                      {chat.recieverInfo.nickname.length > 5
                        ? `${chat.recieverInfo.nickname.slice(0, 3)}...`
                        : chat.recieverInfo.nickname}
                    </UserName>
                  </UserListItem>
                );
              })}
        </UserList>
      </ChatRoom>
    </ChatContainer>
  );
}

export default ChatComponent;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MessageChat = styled.div`
  display: flex;
  width: 28rem;
  height: 46vh;
  margin-top: -1rem;
  margin-bottom: 1rem;
  border-radius: 20px;
  flex-direction: column;
  background-color: #ffffff;
  padding: 2rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  // border: 1px solid black;
  /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 1); */
  justify-content: space-between;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    width: 84vw;
    padding: 0rem;
  }
`;

const ChatRoom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #ffffff;
  /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 1); */
  overflow-x: scroll;
  // height: 6rem;
  /* margin-top: 2rem; */
  width: 32rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.15), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  // border: 0.5px solid black;
  border-radius: 20px;
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    width: 80vw;
    // align-items: normal;
    margin-top: 0.5px;
    padding: 0px 10px;
  }
`;

const UserListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 5rem;
  gap: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    width: 100%;
    align-items: center;
  }
`;

const UserList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin: 10px 0;
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    font-size: 0.7rem;
  }
`;
const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const Bubble = styled.div`
  background-color: ${(props) => (props.isUserMessage ? "#F7CBD0" : "#FFFFFF")};
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 0.8rem;
  padding-right: 1rem;
  padding-left: 1rem;
`;
const BubbleWithTime = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isUserMessage ? "row" : "row-reverse")};
  align-items: flex-end;
`;

const MessageTime = styled.span`
  font-size: 0.7rem;
  color: #999;
`;
const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 10px;
  justify-content: ${(props) =>
    props.isUserMessage ? "flex-end" : "flex-start"};

  &:nth-child() {
    flex-direction: ${(props) => (props.isUserMessage ? "row-reverse" : "row")};
  }

  .message-bubble {
    ${(props) =>
      props.isUserMessage
        ? "margin-left: 10px; margin-right: 10px;"
        : "margin-right: 10px; margin-left: 10px;"}
  }

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    padding: 0px 5px;
  }
`;

const ProfileImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  margin-top: 5px;
  border-radius: 50%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const UserName = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    margin: 10px 0px;
  }
`;

const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 1rem 0rem 1rem;
  margin-top: auto;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    margin-bottom: 20px;
  }
`;

const ChatInput = styled.input`
  border: none;
  width: 50rem;
  height: 1.8rem;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  outline: none;
`;

const SendButton = styled.button`
  margin-left: 10px;
  width: 9rem;
  height: 3rem;
  padding: 10px 20px;
  background-color: #ffffff;
  color: #b5b5b5;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f2f2f2;
  }
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    font-size: 0.7rem;
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
`;

const ModalContent = styled.div`
  background-color: rgba(247, 203, 208, 0.3);
  max-width: 25rem;
  max-height: 70vh;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: rgba(247, 203, 208, 0.8);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);

  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
const LargeProfileImage = styled.img`
  max-width: 80%;
  max-height: 80vh;
  margin: auto;
  display: block;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  position: relative;
`;
