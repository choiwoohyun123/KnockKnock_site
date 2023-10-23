import React, { useState } from 'react';
import styled from 'styled-components';

import { getImageSrc } from '../../util/imageCheck';
import { checkGender } from '../../util/checkGender';

const ParticipantList = ({ participantsList, handleAccept, handleReject, selectedOption, setIsProfileModalOpen, setSelectedUserId }) => {



  const handleProfileModalOpen = (participantUserId) => {
    setIsProfileModalOpen(true);
    setSelectedUserId(participantUserId);
  }


  return (
    <ParticipantModalDiv>
      {participantsList.map((participant, index) => (
        <Card key={index}>
          <Image src={getImageSrc(participant.User?.UserFiles?.[0]?.File?.url)} alt="profile" onClick={() => handleProfileModalOpen(participant.User.userId)}/>
          <Info>
            <p>{participant.User.nickname}</p>
            {checkGender(participant.User.gender) ? 
            <p>🙆🏻‍♂️{participant.User.gender}</p>
            :
            <p>🙆🏻‍♀️{participant.User.gender}</p>
            }
            <p>⏱{participant.User.age}살</p>
            <p>🛄{participant.User.job}</p>
          </Info>
          {selectedOption == "신청인원" ?
          <Actions>
            <Button onClick={() => handleAccept(participant.participantId)}>수락</Button>
            <Button onClick={() => handleReject(participant.participantId)}>거절</Button>
          </Actions>
          :
            <Actions>
            </Actions>
          }
          
        </Card>
      ))}
    </ParticipantModalDiv>
  );
};

export default ParticipantList;

const ParticipantModalDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  padding: 20px;
  height: 500px;
  overflow-y: auto;
`;


const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FFFFFF;
  border: 1px solid #E0E0E0;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  width: 80%;
  height: 30%;
`;

const Image = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.5;
  }
`;

const Info = styled.div`
  font-family: 'KIMM_Bold';
  flex: 1;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    margin: 2px 0px;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Button = styled.button`
  font-family: "KIMM_Bold";
  background-color: #f7cbd0;
  border: 10px double #fff;
  color: black;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px 2px;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 50px;

  &:hover {
    border: 10px double #3b0b0b;
    color: #3b0b0b;
    transform: scale(1.02);
  }
`;